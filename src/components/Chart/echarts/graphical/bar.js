/**
    * @msg 柱状图
    ----------------------------------------------------------------*/
import { getType } from '../../../../utils'
import { merge } from 'lodash'
import defaultChartConfig, { yAxisConfig } from './default-chart-config'

export default {
  bar(params) {
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
        boundaryGap: true,
        data: xAxisData
      },
      yAxis: yAxis,
      series
    }

    return merge({}, defaultChartConfig.bar, options)
  },
  // 堆积柱状图
  stackBar(params) {
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
    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: xAxisData
      },
      yAxis: yAxis,
      series
    }
    return merge({}, defaultChartConfig.bar, option)
  },
  // 条形图
  stripBar(params) {
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
    const option = {
      xAxis: yAxis,
      yAxis: {
        type: 'category',
        boundaryGap: true,
        data: xAxisData
      },
      series
    }
    return merge({}, defaultChartConfig.bar, option)
  },
  // 堆积条形图
  stackstripBar(params) {
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
    const option = {
      xAxis: yAxis,
      yAxis: {
        type: 'category',
        data: xAxisData
      },
      series
    }
    return merge({}, defaultChartConfig.bar, option)
  },

  exportOptions(type, params) {
    return this[type](params)
  }
}
