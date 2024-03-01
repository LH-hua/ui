/**
    * @msg 饼图
    ----------------------------------------------------------------*/
import defaultChartConfig from './default-chart-config'
import { merge } from 'lodash'

export default {
	pie(params) {
		const { series } = params
		const options = {
			xAxis: null,
			yAxis: null,
			series: {
				type: 'pie',
				radius: '50%',
				data: series
			}
		}
		return merge({},defaultChartConfig.pie, options)
	},
	// 环形饼图
	annularPie(params) {
		const { series } = params
		const options = {
			xAxis: null,
			yAxis: null,
			series: [
				{
					type: 'pie',
					radius: ['45%', '55%'],
					center: ['50%', '50%'],
					clockwise: true,
					avoidLabelOverlap: true,
					hoverOffset: 15,
					zlevel: 2,

					labelLine: {
						normal: {
							length: 20,
							length2: 30,
							lineStyle: {
								width: 1,
								color: '#CDCDCD'
							}
						}
					},
					data: series
				},
				{
					type: 'pie',
					zlevel: 1,
					silent: true,
					hoverAnimation: false,
					radius: ['40%', '60%'],
					center: ['50%', '50%'],
					itemStyle: {
						normal: {
							color: '#F5F6FA'
						}
					},
					label: {
						normal: {
							show: false
						}
					},
					data: [
						{
							value: 1
						}
					]
				}
			]
		}
		return merge({},defaultChartConfig.pie, options)
	},
	// 极坐标饼图
	polarPie(params) {
		const { series, xAxisData } = params
		const options = {
			xAxis: null,
			yAxis: null,
			angleAxis: {
				type: 'category',
				data: xAxisData
			},
			radiusAxis: {
				//   name: "%",
				nameLocation: 'end',
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					formatter: '{value}',
					//   showMaxLabel: false,
					color: '#000'
				},
				z: 10,
				zlevel: 2
			},
			polar: {
				radius: '60%',
				center: ['50%', '50%']
			},
			series
		}
		return merge({},defaultChartConfig.pie, options)
	},
	// 嵌套饼图
	nestedPie(params) {
		const { series } = params

		const options = {
			xAxis: null,
			yAxis: null,
			series
		}
		return merge({},defaultChartConfig.pie, options)
	},

	exportOptions(type, params) {
		return this[type](params)
	}
}
