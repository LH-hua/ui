import moment from 'moment'
import defaultChartConfig from './default-chart-config'
import { merge } from 'lodash'

export default {
	/**
				* @msg 月份图
				----------------------------------------------------------------*/
	monthMap(params) {
		const { series, hotGraph } = params
		let range = ''
		series.forEach(item => {
			range = moment(item.value[0]).format('YYYY-MM')
		})
		const options = {
			tooltip: {
				trigger: 'item',
				axisPointer: {
					type: 'shadow'
				},
				formatter: function (params) {
					return params.value[0] + '\n ：' + params.value[1]
				}
			},
			visualMap: {
				show: false,
				// lt（小于，little than），gt（大于，greater than），lte（小于等于 lettle than or equals），gte（大于等于，greater than or equals）来表达边界：
				pieces: hotGraph
			},
			calendar: [
				{
					orient: 'vertical',
					left: 'center',
					top: 'middle',
					cellSize: [40, 40],
					yearLabel: {
						show: false
						// margin: 40
					},
					dayLabel: {
						firstDay: 1,
						nameMap: ['日', '一', '二', '三', '四', '五', '六']
					},
					monthLabel: {
						nameMap: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
						margin: 20
					},
					range: range
				}
			],
			series: [
				{
					type: 'heatmap',
					coordinateSystem: 'calendar',
					label: {
						show: true,
						formatter: function (params) {
							return params.value[1]
							// return d.getDate() + '\n\n' + params.value[2] + '\n\n';
						},
						color: '#000'
					},
					data: series
				}
			]
		}
		return merge({},defaultChartConfig.monthMap, options)
	},
	/**
				* @msg 日历图
				----------------------------------------------------------------*/
	calendar(params) {
		const { series, xAxisData, yAxisData, hotGraph } = params
		const options = {
			tooltip: {
				trigger: 'item',
				axisPointer: {
					type: 'shadow'
				}
			},
			xAxis: {
				type: 'category',
				position: 'top',
				data: xAxisData,
				axisLabel: {
					interval: 0
					// rotate: 30
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				}
			},
			yAxis: {
				type: 'category',
				data: yAxisData,
				axisLabel: {
					interval: 0
					// rotate: 30
				},
				axisTick: {
					show: false
				}
			},
			series: {
				type: 'heatmap',
				label: {
					show: true
				},
				data: series,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					},
					borderWidth: 1,
					borderColor: '#fff'
				}
			},
			visualMap: {
				type: 'piecewise',
				show: false,
				// lt（小于，little than），gt（大于，greater than），lte（小于等于 lettle than or equals），gte（大于等于，greater than or equals）来表达边界：
				pieces: hotGraph
			}
		}
		return merge({},defaultChartConfig.monthMap, options)
	},
	exportOptions(type, params) {
		return this[type](params)
	}
}
