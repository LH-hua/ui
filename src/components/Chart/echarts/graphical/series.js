import { cloneDeep, merge } from 'lodash'
import { drawWindArrows, windArrow, getWindLevel, arrToZip, renderArrow } from '../utils/wind'
/*
    * 根据不同类型图表更新不同系列对象
    @type         类型
    @seriesItem   系列项
*/
export default class seriesAuth {
	constructor(type, seriesItem, yAxis, index) {
		this.type = type
		this.yAxis = yAxis
		this.item = seriesItem
		this[type] ? this[type](seriesItem, index) : null
	}

	stackBar(item) {
		item.type = 'bar'
		item.stack = item.stack || 'total'
	}
	stripBar(item) {
		item.type = 'bar'
	}
	smoothLine(item) {
		item.type = 'line'
		item.smooth = true
		item.lineStyle = {
			color: 'red'
		}
	}
	stackLine(item) {
		item.type = 'line'
		item.stack = item.stack || 'total'
	}
	areahLine(item) {
		item.type = 'line'
		item.itemStyle = {
			normal: {
				areaStyle: {
					color: item.color || null
				}
			}
		}
	}
	stackAreaLine(item) {
		item.type = 'line'
		item.stack = item.stack || 'total'
		item.itemStyle = {
			normal: {
				areaStyle: {
					color: item.color || null
				}
			}
		}
	}
	manyAreaLine(item) {
		item.type = 'line'
		//item.stack = item.stack || 'total'
		item.smooth = true
		item.showSymbol = false
		item.itemStyle = {
			normal: {
				color: item.color || null,
				areaStyle: {
					color: item.color || null
				}
			}
		}
	}
	polarPie(item) {
		item.type = 'bar'
		item.stack = item.stack || 'total'
		item.coordinateSystem = 'polar'
		item.emphasis = {
			focus: 'series'
		}
	}
	nestedPie(item, index) {
		item.type = 'pie'
		if (index % 2 == 0) {
			item.selectedMode = 'single'
			item.radius = [0, '30%']
		} else {
			item.radius = ['45%', '60%']
			item.labelLine = {
				length: 30
			}
		}
	}
	boxplot(item) {
		item.type = 'boxplot'
		item.itemStyle.normal.color = '#fff'
	}
	scatterMap(item) {
		item.symbol = 'circle'
		// item.symbolRotate = item.symbolRotate || 0
		item.type = 'scatter'
		item.symbolSize = null
	}
	monthMap(item) {
		item.type = 'heatmap'
		item.coordinateSystem = 'calendar'
	}
	graphicLinkage(item) {
		function findIndex(name, data) {
			if (!name) return
			let index = 0
			//根据归属名判断给定统一的index
			const i = data.findIndex(item => item.name == name)
			index = i >= 0 ? i : 0
			return index
		}
		const index = findIndex(item.siteName, this.yAxis)
		item.xAxisIndex = index
		item.yAxisIndex = index
		item.stack = item.siteName
		this[item.type] ? this[item.type](item, index) : null
	}
	wind(item, index) {
		// 解析二维数组
		let arr = arrToZip(item.value)
		let speed = arr[0] //风速
		let direction = arr[1] //风向

		item.value = arr[0] //假数据
		item.data = arr[0] //假数据

		item.type = 'custom'
		item.renderItem = (params, api) => {
			// 绘制风向的图形
			return drawWindArrows(params, api, direction[index], speed[index])
		}
		item.z = 10
	}
	followWind(item) {
		let arr = arrToZip(item.value)
		let speed = arr[0] //风速
		let direction = arr[1] //风向

		item.type = 'line'

		const data = []
		for (let i = 0; i < speed.length; i++) {
			const level = getWindLevel(speed[i])
			data.push({
				value: speed[i],
				// 风矢不用尾羽，风速用折线表示
				symbol: `path://${windArrow(-1)}`,
				symbolRotate: level === 0 ? 0 : -direction[i],
				symbolSize: [25, 20],
				symbolKeepAspect: true,
				itemStyle: {
					color: level === 0 ? 'white' : item.color
				}
			})
		}
		item.data = data

		item.z = 10
		item.itemStyle = {
			color: item.color,
			borderColor: '#000'
		}
	}
	arrowWind(item, index) {
		// 数据源 【'X轴对应名称','风速','角度','箭头的位置'】
		let ArrowOptions = cloneDeep(item)

		// 绘制自定义的属性
		const arrow = merge(ArrowOptions, {
			name: item.name ? item.name + '—风向' : '风向',
			type: 'custom',
			renderItem: (params, api) => {
				// 绘制风箭头
				const i = renderArrow(params, api, ArrowOptions.data[index], index)
				return i
			},
			encode: {
				x: 0,
				y: 3
			},
			data: ArrowOptions.data
		})

		// 绘制line 的折线
		let lineOptions = cloneDeep(item)
		let lineDatat = []
		lineOptions.data.map(e => {
			lineDatat.push(e[1])
		})
		const line = merge(lineOptions, {
			name: item.name ? item.name + '—风速' : '风速',
			type: 'line',
			smooth: true,
			data: lineDatat
		})

		// 合并两个系列值
		this.item = [arrow, line]
	}
}
