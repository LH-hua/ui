import defaultChartConfig from './default-chart-config'
import { merge } from 'lodash'

export default {
	visualMap(params) {
		const { series, mapOption } = params
		const defaultTooltipFormatter = params => {
			const valueName = params.value ? params.value : '无数据'
			return params.name + '：' + valueName
		}
		const option = {
			title: {
				top: 30,
				left: 'center'
			},
			toolbox: {
				show: true,
				feature: {
					saveAsImage: {
						show: true
					}
				},
				right: 20
			},
			tooltip: {
				trigger: 'item',
				formatter: mapOption.tooltipFormatter || defaultTooltipFormatter
			},
			legend: {
				show: false
			},
			visualMap: [
				{
					type: 'piecewise',
					show: true,
					top: '100',
					left: '100',
					pieces: mapOption.pieces || []
				}
			],
			series: [
				{
					// 地图块的相关信息
					type: 'map',
					name: mapOption.name || '',
					silent: false, // 禁止鼠标hover事件
					map: mapOption.name || '',
					top: 100,
					roam: true,
					zoom: 1, //缩放比例
					itemStyle: {
						normal: {
							show: false,
							borderColor: '#389BB7',
							color: 'transparent',
							areaColor: mapOption.bgColor || '#ccc'
						}
					},
					label: {
						normal: {
							show: true,
							textStyle: {
								fontSize: 12,
								fontWeight: 500,
								color: '#333'
							}
						}
					},
					data: series
				}
			]
		}
		return merge({},defaultChartConfig.visualMap, option)
	},
	scatterVisualMap(params) {
		const { series, mapOption } = params
		let _series = series.map(item => {
			item.symbolSize = mapOption.symbolSize || 12
			return item
		})
		const defaultTooltipFormatter = params => {
			const valueName = params.value ? params.value : '无数据'
			return params.name + '：' + valueName
		}
		const option = {
			title: {
				top: 30,
				left: 'center'
			},
			toolbox: {
				show: true,
				feature: {
					saveAsImage: {
						show: true
					}
				},
				right: 20
			},
			tooltip: {
				trigger: 'item',
				formatter: mapOption.tooltipFormatter || defaultTooltipFormatter
			},
			legend: {
				show: false
			},
			visualMap: [
				{
					type: 'piecewise',
					show: true,
					top: '100',
					left: '100',
					inRange: {
						color: ['#2846b3', '#29d46d', '#d4570e', '#ef0c0c']
					},
					pieces: mapOption.pieces || []
				}
			],
			geo: {
				// 地理坐标系组件，地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集
				show: true,
				map: mapOption.name || '', // 中国地图，注意import引入中国地图
				roam: true, // 是否开启鼠标缩放和平移漫游
				label: {
					// 不显示地图上显示的各个地区的名称
					show: true
				},
				zlevel: 1,
				zoom: 1.2,
				scaleLimit: {
					min: 0.8,
					max: 4
				},
				itemStyle: {
					areaColor: mapOption.bgColor || '#f2f2f2'
				}
			},
			series: [
				{
					// 地图上的点，使用散点图配置
					type: 'scatter',
					coordinateSystem: 'geo', // 该系列使用的坐标系
					symbolSize: 12, // 标记大小
					zlevel: 2, // 这个要比地图的大，就是geo里面的zlevel
					label: {
						show: false
					},

					data: _series
				}
			]
		}
		return merge({},defaultChartConfig.visualMap, option)
	},

	exportOptions(type, params) {
		return this[type](params)
	}
}
