//----------------------------------箱线图
import { getType } from '../../../../utils'
import defaultChartConfig, { yAxisConfig } from './default-chart-config'
import { merge } from 'lodash'

export default {
  boxplot(params) {
    const { xAxisData, yAxisData, series } = params
    let yAxis = yAxisData
    if (!yAxisData || (getType(yAxisData) == 'array' && yAxisData.length == 0)) {
      yAxis = {
        type: 'value',
        splitArea: {
          show: true
        }
      }
    }
    //处理多y轴默认样式
    if (Array.isArray(yAxis) && yAxis.length > 0) {
      yAxis = yAxis.map(item => {
        return merge({}, yAxisConfig, item)
      })
    }
    const options = {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params) => {
          const names = ['最小值', '第一四分位数', '中位数', '第三四分位数', '最大值']
          let str = ''
          str += `<div style="font-size:14px;magin:5px 0">${params.seriesName}</div>`
          str += params.marker + params.name
          names.forEach((item, i) => {
            const marker = `<span style="display:inline-block;background:${params.color};height:4px;width:4px;border-radius:50%;margin:0 0 3px 2px"></span>`
            str += `<div style="line-height:20px">${marker}<span style="padding-left:10px">${item}</span>：<span style="font-weight:600">${params.data[i + 1]}</span></div>`
          })
          return str
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: yAxis,
      series
    }
    return merge({}, defaultChartConfig.boxplot, options)
  },

  exportOptions(type, params) {
    return this[type](params)
  }
}
