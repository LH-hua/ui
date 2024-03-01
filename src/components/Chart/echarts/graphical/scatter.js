/**
		* @msg 散点图
		----------------------------------------------------------------*/
import { getType } from '../../../../utils'
import defaultChartConfig, { yAxisConfig } from './default-chart-config'
import { merge } from 'lodash'

export default {
	scatter(params) {
		const { series, xAxisData, yAxisData } = params
		let yAxis = yAxisData
		if (!yAxisData || (getType(yAxisData) == 'array' && yAxisData.length == 0)) {
			yAxis = { type: 'value' }
		}
    //处理多y轴默认样式
    if (Array.isArray(yAxis) && yAxis.length > 0) {
      yAxis = yAxis.map(item => {
        return merge({}, yAxisConfig, item)
      })
    }
		let xAxis = xAxisData
		if (!xAxisData || (getType(xAxisData) == 'array' && xAxisData.length == 0)) {
			xAxis = { type: 'value' }
		}
		const options = {
			yAxis: yAxis,
			xAxis: xAxis,
			series
		}
		return merge({},defaultChartConfig.scatterMap, options)
	},
	scatterMap(params) {
		// 参考网址 https://www.makeapie.com/editor.html?c=xh8F0HE3A4
		const { series, xAxisData } = params
		let xData = xAxisData
		const options = {
			visualMap: {
				type: 'continuous',
				text: ['%', ''],
				itemHeight: 200,
				show: false,
				min: -100,
				max: 100,
				calculable: true,
				align: 'left',
				color: 'black',
				orient: 'vertical',
				left: 'right',
				top: 'middle',
				symbolSize: 800,
				inRange: {
					color: defaultChartConfig.scatterMap.color,
					opacity: 1
				}
			},
			tooltip: {
				trigger: 'item',
				axisPointer: null,
				position: 'top',
				formatter: function (params) {
					const value = params.value
					const i = value[0]
					const j = value[1]
					const axisX = xData[j]
					const axisY = xData[i]
					return (
						'<div style="border-bottom: 1px solid rgba(255,255,255,.3); padding-bottom: 7px;margin-bottom: 7px">' +
						axisX +
						' 与 ' +
						axisY +
						'</div>' +
						'相关性系数:  ' +
						value[2] +
						'<br>'
					)
				}
			},
			xAxis: {
				type: 'category',
				data: xAxisData,
				axisLabel: {},
				splitLine: {
					show: true
				},
				axisLine: {
					show: true
				}
			},
			yAxis: {
				type: 'category',
				data: xAxisData,
				splitLine: {
					show: true
				},
				axisLine: {
					show: true
				},
				axisLabel: {}
			},
			series: {
				type: 'scatter',
				symbol: 'circle',
				hoverAnimation: true,
				symbolSize: function (params) {
					const value = params[2]
					const ratio = -Math.sqrt(Math.abs(params[2])) / 13 + 1
					let w = Math.abs(value) > 70 ? 26 : 18
					let h = 18 * ratio
					if (xAxisData.length <= 15) {
						w = Math.abs(value) > 70 ? 55 : 40
						h = 40 * ratio
					} else if (xAxisData.length <= 30) {
						w = Math.abs(value) > 70 ? 33 : 25
						h = 25 * ratio
					}
					return [w, h]
				},
				symbolRotate: function (value) {
					const rotate = value[2] > 0 ? 45 : -45
					return rotate
				},
				itemStyle: {
					normal: {
						opacity: 0.8
					},
					emphasis: {
						opacity: 1,
						borderType: 'solid',
						borderWidth: 1,
						borderColor: '#ccc',
						shadowColor: '#ccc',
						shadowBlur: 2,
						shadowOffsetX: 2,
						shadowOffsetY: 2
					}
				},
				data: series,
				label: {
					normal: {
						show: true,
						color: '#000',
						formatter: function (params) {
							const data = params.value
							return data[2]
						}
					},
					emphasis: {
						fontStyle: 'italic',
						fontWeight: 'bold',
						fontSize: 16
					}
				}
			}
		}
		return merge({},defaultChartConfig.scatterMap, options)
	},
	exportOptions(type, params) {
		return this[type](params)
	}
}
