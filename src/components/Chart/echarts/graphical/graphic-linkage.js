/**
		* @msg 多图形联动图
		----------------------------------------------------------------*/
import collect from 'collect.js'
import { merge } from 'lodash'
import defaultChartConfig from './default-chart-config'
export default {
	graphicLinkage(params) {
		const { series, xAxisData, yAxisData } = params

		let grid = []
		const xAxisIndex = []
		let height = ''
		// 单个容器有多y轴的情况
		let gridArr = yAxisData.map(item => item.gridIndex)
		let gridLength = Math.max.apply(null, gridArr)

		let length = gridLength + 1 || yAxisData.length
		if (length > 1 && length < 6) {
			height = length + 0.5
		} else if (length <= 1) {
			height = 1
		} else {
			height = length + 1.5
		}

		for (let i = 0; i < length; i++) {
			xAxisIndex.push(i)
			let list = {
				show: true,
				left: 100,
				right: 50,
				height: (98 - 24) / height + '%',
				top: (i * (98 - 20)) / length + 6 + '%',
				backgroundColor: '#f1f1f1',
				borderColor: 'transparent'
			}
			grid.push(list)
		}

		const options = {
			dataZoom: [
				{
					show: true,
					realtime: true,
					bottom: 30,
					xAxisIndex
				}
			],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					animation: false
				},
				order: 'seriesAsc',
				textStyle: {
					color: '#5c6c7c',
					fontSize: 14,
					lineHeight: 30,
					fontWeight: 400
				},
				padding: [10, 10],
				formatter: function (params) {
					// 分解不同系列的 数据
					let paramsObj = {}
					params.map(e => {
						if (!paramsObj[e.axisIndex]) {
							paramsObj[e.axisIndex] = []
							paramsObj[e.axisIndex].push(e)
						} else {
							paramsObj[e.axisIndex].push(e)
						}
					})

					// 展示数据
					let text = ''
					for (const key in paramsObj) {
						const item = paramsObj[key]
						text += '<div style="padding-bottom: 5px;">'
						item.map((e, index) => {
							if (index == 0) {
								text += `${e.name}<br>`
							}
							text += `${e.marker} ${e.seriesName}：${e.value}<br>`
						})
						text += '</div>'
					}
					return text
				}
			},

			axisPointer: {
				link: { xAxisIndex: 'all' }
			},

			grid,
			xAxis: this.getGraphicLinkageXaxis(yAxisData, xAxisData),
			yAxis: this.getGraphicLinkageYaxis(yAxisData),
			series: series
		}
		return merge({},defaultChartConfig.graphicLinkage, options)
	},
	//设置多图形联动图 X轴
	getGraphicLinkageXaxis(yAxis, xAxis) {
		let xAxisArr = []

		const ys = collect(yAxis).groupBy('gridIndex')
		const keys = ys.keys().all()
		if (keys.length == 1 && !keys[0]) {
			yAxis.map((e, index) => {
				const _indexe = yAxis.length - 1
				let list = {
					type: e.type || 'category',
					gridIndex: e.gridIndex == undefined ? index : e.gridIndex,
					show: true,
					boundaryGap: true,
					axisLine: { show: false, onZero: false },
					axisTick: { show: e.axisTick || _indexe == index, alignWithLabel: true },
					axisLabel: {
						show: _indexe == index ? true : false
					},
					data: xAxis
				}
				xAxisArr.push(list)
			})
		} else {
			let index = 0
			ys.each((y, key) => {
				const e = y.first()
				let list = {
					type: e.type || 'category',
					gridIndex: e.gridIndex == undefined ? index : e.gridIndex,
					boundaryGap: true,
					show: index + 1 == keys.length ? true : false,
					axisLine: { show: false },
					axisTick: { show: true },
					data: xAxis
				}
				xAxisArr.push(list)
				index++
			})
		}
		return xAxisArr
	},

	// 设置多图形联动图 Y轴
	getGraphicLinkageYaxis(yAxises) {
		if (typeof yAxises[0] == 'string') {
			return yAxises
		}
		let yAxisArr = []

		// 多系列的 Y轴遍历
		yAxises.map((e, index) => {
			const option = {
				type: 'value',
				nameLocation: 'middle', // 名称的位置
				nameRotate: 0,
				nameGap: 10,
				axisLine: {
					show: false
				},
				axisTick: { show: true, alignWithLabel: true },
				splitLine: {
					show: false
				},
				gridIndex: index,
				data: [],
				min: 0,
				interval: null
			}
			const yAxis = merge(option, e, { interval: e.max })
			yAxisArr.push(yAxis)
		})
		return yAxisArr
	},

	exportOptions(type, params) {
		return this[type](params)
	}
}
