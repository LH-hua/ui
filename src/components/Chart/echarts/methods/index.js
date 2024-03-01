//  复用方法的集合
import { merge } from 'lodash'
import LabelWindRender from './label-wind-render'

export default {
	chart: null,
	type: null,
	defaultPrams: {},

	/*----------------------------------------------------------------------
    | 热力图
    |-----------------------------------------------------------------------
    */

	hotPowerLabel(type, opt) {
		const width = this.chart._dom.clientWidth
		const { xAxis, series } = opt
		const x = xAxis instanceof Array ? xAxis[0].data : xAxis.data
		const coords = width / x.length
		const visible = coords > 50
		return this.showSeriesLabel(opt, series, visible)
	},
	// 热力图网格添加风向标识并监听缩放组件事件进行重新渲染
	hotPowerAddWind(type, opt, parmas) {
		const lw = new LabelWindRender(this.chart, type, opt, parmas)
		const option = lw.option
		return option
	},

	/*----------------------------------------------------------------------
    |  公共方法
    |-----------------------------------------------------------------------
    */

	showSeriesLabel(opt, series, state) {
		series.forEach(item => {
			item.label = { show: state }
		})

		const options = merge(opt, { series })
		return options
	},

	setOption(opt, type, methodsName, parmas = {}) {
		const option = merge(opt, this.defaultPrams, parmas)
		let options = methodsName ? this[methodsName](type, option, parmas) : option

		return options
	}
}
