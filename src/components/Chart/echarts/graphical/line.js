/**
    * @msg 折线图
    ----------------------------------------------------------------*/
import { getType } from '../../../../utils'
import defaultChartConfig, { yAxisConfig } from './default-chart-config'
import { merge } from 'lodash'

export default {
  line(params) {
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          }
        },
        textStyle: {
          fontSize: 12,
          color: '#666666'
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: yAxis,
      series
    }

    return merge({}, defaultChartConfig.line, option)
  },
  // --------------------- 平滑折线图
  smoothLine(params) {
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
      title: defaultChartConfig.title,
      legend: defaultChartConfig.legend,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: yAxis,
      series
    }

    return merge({}, defaultChartConfig.line, option)
  },
  // --------------------- 堆积折线图
  stackLine(params) {
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: yAxis,
      series
    }
    return merge({}, defaultChartConfig.line, option)
  },
  // --------------------- 堆积平滑折线图
  stackSmoothLine(params) {
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: yAxis,
      series
    }
    return merge({}, defaultChartConfig.line, options)
  },
  // --------------------- 面积折线
  areahLine(params) {
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        boundaryGap: false
      },
      yAxis: yAxis,
      series
    }
    return merge({}, defaultChartConfig.line, options)
  },
  // --------------------- 堆积面积线图
  stackAreaLine(params) {
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        boundaryGap: false
      },
      yAxis: yAxis,
      series
    }
    return merge({}, defaultChartConfig.line, options)
  },
  // --------------------- 多面积图
  manyAreaLine(params) {
    const { xAxisData, series, yAxisData } = params
    let yAxis = yAxisData
    if (!yAxisData || (getType(yAxisData) == 'array' && yAxisData.length == 0)) {
      yAxis = {
        type: 'value',
      }
    }
    //处理多y轴默认样式
    if (Array.isArray(yAxis) && yAxis.length > 0) {
      yAxis = yAxis.map(item => {
        return merge({}, yAxisConfig, item)
      })
    }
    //配置项
    const options = {
      xAxis: {
        type: 'category',
        data: xAxisData,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
        boundaryGap: false
      },
      yAxis: {
        ...yAxis,
        type: 'value',
        name: yAxisData[0].name,
        nameLocation: yAxisData[0].nameLocation,
        nameRotate: yAxisData[0].nameRotate,
        nameGap: yAxisData[0].nameGap,
        axisLine: {
          onZero: false
        }
      },
      legend: {
        data: []
      },
      series: []
    }

    //范围面积（多个）
    let rangeAreaDatas = series.filter(item => item.renderType && item.renderType == 'rangeArea')
    let allRangeData = rangeAreaDatas
      .map(item => item.data)
      .flat()
      .map((d, i) => {
        return {
          min: d[0],
          max: d[1]
        }
      })

    let base = -allRangeData.reduce(function (min, val) {
      return Math.floor(Math.min(min, val.min))
    }, Infinity)

    options.yAxis = {
      ...options.yAxis,
      axisLabel: {
        formatter: function (val) {
          return val - base
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return params.value - base
            }
          }
        }
      }
    }

    rangeAreaDatas.forEach((item, index) => {
      let rangeData = item.data.map((d, i) => {
        return {
          min: d[0],
          max: d[1]
        }
      })
      options.tooltip = {
        trigger: 'axis',
        formatter: function (params) {
          let seriesMap = {}
          params.forEach(target => {
            if (seriesMap[target.seriesName]) {
              seriesMap[target.seriesName] = [...seriesMap[target.seriesName], Number((target.value + seriesMap[target.seriesName][0]).toFixed(2))]
            } else {
              seriesMap[target.seriesName] = [Number((target.value - base).toFixed(2))]
            }
          })

          let text = ''
          const formatVal = (val) => {
            return [-99, '-99', null, '', NaN].includes(val) ? '-' : val
          }
          Object.keys(seriesMap).forEach(key => {
            let val = seriesMap[key]
            let min = formatVal(val[0])
            let max = formatVal(val[1])
            let color = params.find(s => s.seriesName == key).color
            const marker = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:8px;height:8px;background-color:${color};"></span>`
            const span = '<span style="margin-right:14px;display:inline-block;"></span>'
            if (typeof max === 'number' && typeof min === 'number') {
              text += `${marker}${key}<br>${span}最小：${min}<br>${span}最大：${max}<br>${Object.keys(seriesMap).length > 0 ? '<br>' : ''}`
            } else {
              text += `${marker}${key}：${formatVal(val[0])} \t\t`
            }
          })
          return text
        },
        axisPointer: {
          type: 'line',
          label: {
            show: true,
            backgroundColor: '#6a7985'
          }
        }
      }
      let color = item.color || 'rgb(157,200,241)'
      options.legend.data.push({
        name: item.name,
        itemStyle: {
          color: color
        }
      })
      options.series = [
        ...options.series,
        {
          name: item.name,
          type: 'line',
          data: rangeData.map(function (item) {
            const val = item.min !== null ? item.min + base : item.min
            return val
          }),
          lineStyle: {
            opacity: 1,
            color: color
          },
          stack: 'confidence-band' + index,
          symbol: 'none',
          zlevel: 1,
          markLine: {
            symbol: 'none',
            silent: true, // 是否不响应鼠标事件
            precision: 2, // 精度
            zlevel: -1,
            data: [
              {
                silent: true,
                lineStyle: {
                  type: 'solid',
                  color: 'rgb(224,230,241)'
                },
                label: {
                  position: 'start',
                  formatter: '0'
                },
                yAxis: 0 + base
              }
            ]
          }
        },
        {
          name: item.name,
          type: 'line',
          data: rangeData.map(function (item) {
            const val = item.max !== null ? item.max - item.min : item.max
            return val
          }),
          lineStyle: {
            opacity: 1,
            color: color
          },
          areaStyle: {
            color: color
          },
          stack: 'confidence-band' + index,
          symbol: 'none',
          zlevel: 1
        }
      ]
    })

    //其他基线
    let otherSeries = series.filter(item => !item.renderType || item.renderType !== 'rangeArea')
    otherSeries = otherSeries.map(item => {
      options.legend.data.push({
        name: item.name,
        itemStyle: {
          color: item.color || null
        }
      })
      item.value = item.value.map(ele => ele !== null ? ele + base : ele)
      item.data = item.value
      return item
    })

    options.series = [...options.series, ...otherSeries]

    return merge({}, defaultChartConfig.line, options)
  },

  exportOptions(type, params) {
    return this[type](params)
  }
}
