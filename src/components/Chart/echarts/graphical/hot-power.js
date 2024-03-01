// 热力图

import defaultChartConfig from './default-chart-config'
import { merge } from 'lodash'

export default {
	hotPower(params) {
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
				data: xAxisData
			},
			yAxis: {
				type: 'category',
				data: yAxisData
			},
			visualMap: {
				orient: 'horizontal',
				left: 'center',
				bottom: '1%',
				calculable: false,
				itemWidth: 26,
				itemHeight: 200,
				pieces: hotGraph,
				inRange: {
					color: defaultChartConfig.hotPower.color
				}
			},
			series: [
				{
					type: 'heatmap',
					data: series,
					emphasis: {
						itemStyle: {
							borderColor: '#333',
							borderWidth: 1
						}
					},
					progressive: 1000,
					animation: false
				}
			]
		}
		return merge({},defaultChartConfig.hotPower, options)
	},
	exportOptions(type, params) {
		return this[type](params)
	}
}
