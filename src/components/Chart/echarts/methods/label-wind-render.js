import { merge } from 'lodash'
class LabelWindRender {
	constructor(chart, type, option, params = {}) {
		this.chart = chart // 图表对象
		this.type = type // 图表类型 预留参数
		this.option = option // 图表配置
		const defaultParams = { width: 21, height: 43 } // 展示或隐藏的判断条件
		this.params = merge(defaultParams, params)
		this.hotPowerAddWind()

		this.debounce = true
	}
	// 热力图网格添加风向标识
	hotPowerAddWind() {
		const opt = this.option
		const { series, yAxis, xAxis } = opt
		if (series[0].type !== 'heatmap') {
			return opt
		}

		const width = this.chart._dom.clientWidth / xAxis.data.length
		const height = this.chart._dom.clientHeight / yAxis.data.length
		const visible = height > this.params.height && width > this.params.width

		const scatter = {
			type: 'scatter',
			symbol: p => {
				const type = p[2] == '-' ? 'none' : this.getSymbol(p)
				return type
			},
			// symbolOffset: [0, 15],
			symbolRotate: p => {
				return -p[2] - 180
			},
			label: {
				show: false
			},
			symbolSize: visible ? 12 : 0,
			silent: true,
			data: series[0].data || []
		}
		opt.visualMap.seriesIndex = [0]
		series.push(scatter)
		if (height > this.params.height) {
			if (!this.params.data) {
				series[0].label.show = visible
			}
			this.showLabelAndWind(opt, xAxis.data.length)
		}
		return opt
	}
	// 缩放组件对label和风向控制显示/隐藏
	showLabelAndWind(fullOption, xAxis) {
		if (!this.chart) {
			return
		}

		// 事件监听
		this.chart.on('dataZoom', p => {
			const { start, end } = p
			const share = end - start
			const width = this.chart._dom.clientWidth / (xAxis * (share / 100))
			const visible = width >= this.params.width ? 'block' : 'none'
			const label = this.params.data ? {} : { label: { show: visible == 'block' } }
			const opt = {
				dataZoom: [
					{ type: 'inside', start, end },
					{ show: true, type: 'slider', bottom: 10, start, end }
				],
				series: [
					label,
					{
						symbolSize: visible ? [10, 12] : 0
					}
				]
			}
			const option = merge(fullOption, opt)
			if (this.debounce) {
				this.resizeChart(option)
			}
		})
	}
	// 重新渲染图表
	resizeChart(option) {
		this.debounce = false
		setTimeout(() => {
			this.chart.setOption(option, true)
			this.debounce = true
		}, 1000)
	}
	getSymbol(val) {
		const data = this.params.data
		if (!data) {
			return 'none'
		}
		const ws = data.find(item => item[0] == val[0] && item[1] == val[1])
		const value = ws ? ws[2] : null
		let level = ''
		if (value >= 0 && value <= 0.2) {
			level = 1
		} else if (value >= 0.3 && value <= 1.5) {
			level = 2
		} else if (value >= 1.6 && value <= 3.3) {
			level = 3
		} else if (value >= 3.4 && value <= 5.4) {
			level = 4
		} else if (value >= 5.5 && value <= 7.9) {
			level = 5
		} else if (value >= 8 && value <= 10.7) {
			level = 6
		} else if (value > 10.8) {
			level = 7
		}
		const img = level ? require('../image/arrow-' + level + '.png') : null
		const symbol = img ? 'image://' + img : 'none'
		return symbol
	}
}
export default LabelWindRender
