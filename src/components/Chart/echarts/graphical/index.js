import seriesAuth from './series'
import bar from './bar'
import line from './line'
import boxplot from './boxplot'
import wind from './wind'
import pie from './pie'
import scatter from './scatter'
import hotPower from './hot-power'
import monthMap from './month-map'
import gauge from './gauge'
import graphicLinkage from './graphic-linkage'
import many from './many'
import visualMap from './visualMap'
import { getType } from '../../../../utils'
import { merge } from 'lodash'

const charts = [
	{
		items: ['bar', 'stackBar', 'stripBar', 'stackstripBar'],
		called: bar
	},
	{
		items: ['line', 'smoothLine', 'stackLine', 'stackSmoothLine', 'areahLine', 'stackAreaLine', 'manyAreaLine'],
		called: line
	},
	{
		items: ['boxplot'],
		called: boxplot
	},
	{
		items: ['wind', 'followWind', 'arrowWind'],
		called: wind
	},
	{
		items: ['pie', 'annularPie', 'polarPie', 'nestedPie'],
		called: pie
	},
	{
		items: ['scatterMap', 'scatter'],
		called: scatter
	},
	{
		items: ['hotPower'],
		called: hotPower
	},
	{
		items: ['monthMap', 'calendar'],
		called: monthMap
	},
	{
		items: ['gauge'],
		called: gauge
	},
	{
		items: ['graphicLinkage'],
		called: graphicLinkage
	},
	{
		items: ['many'],
		called: many
	},
	{
		items: ['visualMap', 'scatterVisualMap'],
		called: visualMap
	}
]

export default class getOptions {
	constructor(type, chartData, xAxis, yAxis, chartColor, hotGraph, markLine, mapOption) {
		this.type = type
		this.chartData = chartData || []
		this.xAxis = xAxis
		this.yAxis = yAxis
		this.chartColor = chartColor
		this.hotGraph = hotGraph
		this.markLine = markLine
		this.options = null
		this.mapOption = mapOption
		this.getOption()
	}
	// 默认的series配置
	getSeriesData() {
		let series = []
		this.chartData.map((e, index) => {
			// 遍历 基础 图形数据
			const list = merge({
				type: e.type || this.type,
				name: e.name, //图表名称
				data: e.value,
				zlevel: 1,
				value: e.value, //图表值
				showSymbol: e.isSymbol || true, // 显示图案
				symbolSize: e.symbolSize || 6, // 图案的大小
				symbol: e.symbol || 'circle', // 图案的类型
				yAxisIndex: e.yAxisIndex || 0,
				renderType: e.type,
				showAllSymbol: false, // false，随主轴标签间隔隐藏策略。
				itemStyle: {
					normal: {
						lineStyle: {
							width: e.width || 2.5
						},
						color: e.color || null
					}
				}
			}, e)

			let type = e.type || this.type
			const yAxis = this.yAxis

			/* 多图形联动图表做额外处理 */
			if (this.type == 'graphicLinkage') {
				type = this.type
			}
			/* 配置对应类型的series */
			const item = new seriesAuth(type, list, yAxis, index).item
			if (getType(item) == 'array') {
				item.map(i => {
					series.push(i)
				})
			} else {
				series.push(item)
			}
		})

		// 获取makerLine Y 轴线
		if (this.markLine && this.markLine.length > 0) {
			series = this.getMarkLine(series)
		}
		return series
	}
	getOption() {
		const option = {
			xAxisData: this.xAxis,
			yAxisData: this.yAxis,
			series: this.getSeriesData(),
			chartColor: this.chartColor,
			hotGraph: this.hotGraph,
			mapOption: this.mapOption
		}
		const target = charts.find(item => item.items.includes(this.type))
		this.options = target ? target.called.exportOptions(this.type, option) : {}
	}
	// 获取makerLine Y 轴线
	getMarkLine(series, markLine = this.markLine) {
		let marker = []
		let level = -1
		markLine.map((e, index) => {
			level = e.level || -1
			marker.push({
				name: e.name,
				yAxis: e.value,
				// 文字样式
				label: {
					formatter: '{b}',
					color: e.fontColor || null,
					position: e.position || 'insideStartTop',
					distance: e.padding || [20, 8]
				},
				// 线条样式
				lineStyle: {
					type: e.type || 'solid',
					color: e.color || this.chartColor[index],
					width: e.width || 1
				}
			})
		})

		// 给序列添加
		series[0].markLine = {
			symbol: 'none',
			silent: true, // 是否不响应鼠标事件
			precision: 2, // 精度
			zlevel: level,
			data: marker
		}

		return series
	}
}
