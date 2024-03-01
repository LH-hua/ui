import { getType } from '../../../../utils'
import { merge } from 'lodash'
import defaultChartConfig, { yAxisConfig } from './default-chart-config'

export default {
  // 风向
  wind(params) {
    const { xAxisData, series, yAxisData } = params
    let yAxis = yAxisData
    if (!yAxisData || (getType(yAxisData) == 'array' && yAxisData.length == 0)) {
      yAxis = { type: 'value' }
    }
    //处理多y轴默认样式
    if (Array.isArray(yAxis) && yAxis.length > 0) {
      yAxis = yAxis.map(item => {
        return merge({}, yAxisConfig, item)
      })
    }
    const options = {
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: yAxis,
      series
    }

    return merge({}, defaultChartConfig.line, options)
  },

  // 跟随风向
  followWind(params) {
    return this.wind(params)
  },

  // 风箭头
  arrowWind(params) {
    return this.wind(params)
  },

  exportOptions(type, params) {
    return this[type](params)
  }
}
