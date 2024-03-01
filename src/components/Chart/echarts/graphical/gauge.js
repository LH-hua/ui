/**
		* @msg 仪表图
		----------------------------------------------------------------*/
import defaultChartConfig from './default-chart-config'
import { merge } from 'lodash'
export default {
	gauge(params) {
		const { series } = params
		const options = {
			tooltip: {
				formatter: '{b}{c}'
			},
			series: [
				{
					type: 'gauge',
					detail: {
						formatter: '{value} %',
						fontSize: 20,
						fontWeight: 'bold'
					},
					title: {
						offsetCenter: [0, '80%'],
						fontSize: 15,
						color: '#464646'
					},
					axisLine: {
						lineStyle: {
							color: [[1, '#38bb51']],
							width: 15,
							opacity: 0.9
						}
					},
					// 仪表盘文字
					axisLabel: {
						show: true,
						distance: -45,
						fontSize: 15,
						color: '#464646'
					},
					//   仪表盘指标
					pointer: {
						width: 10,
						length: '100%'
					},
					axisTick: {
						show: false
					},

					splitNumber: 5,
					min: 0,
					max: 100,
					data: series
				}
			]
		}
		return merge({}, defaultChartConfig.gauge, options)
	},
	exportOptions(type, params) {
		return this[type](params)
	}
}
