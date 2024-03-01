/**
		* @msg 多系列图
		----------------------------------------------------------------*/
import defaultChartConfig from './default-chart-config'
import { merge } from 'lodash'
function getYaxis(yAxis) {
	let yAxisArr = []

	// 多系列的 Y轴遍历
	yAxis.map((e, index) => {
		let list = {
			type: 'value',
			name: e.name,
			nameLocation: e.nameLocation || 'middle', // 名称的位置
			nameGap: e.nameGap || 50, // 坐标轴名称与轴线之间的距离。
			// 名称样式
			nameTextStyle: {
				color: e.color || '#333'
			},
			// 坐标轴位置
			position: index % 2 == 0 ? 'left' : 'right',
			// 线条样式
			axisLine: {
				show: e.show || false,
				lineStyle: {
					color: e.color || '#333'
				}
			},
			// 线条单位
			axisLabel: {
				formatter: `{value}${e.unit || ''}`
			},
			// 偏移
			offset: e.offset || index % 2 == 0 ? index * 40 : index * 40 - 40,
			data: e.value || [],
			min: e.min || 0,
			max: e.max
		}
		yAxisArr.push(list)
	})

	return yAxisArr
}
export default {
	many(params) {
		const { xAxisData, yAxisData, series } = params
		const options = {
			// grid: {
			// 	left: '5%',
			// 	right: '5%',
			// 	bottom: '10%',
			// 	containLabel: true
			// },
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},
			xAxis: [
				{
					type: 'category',
					data: xAxisData,
					// 刻度标签与轴线之间的距离。
					axisLabel: {
						inside: false,
						margin: 35
					}
				}
			],
			yAxis: getYaxis(yAxisData),
			series: series
		}
		return merge({}, defaultChartConfig.many, options)
	},

	exportOptions(type, params) {
		return this[type](params)
	}
}
