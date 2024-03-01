import { saveImg, exportCsv } from './echarts-event'
import { merge, cloneDeep } from 'lodash'
function isNull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) {
      return true
    }
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') {
      return true
    }
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') {
      return true
    }
    return false
  }
  return false
}

export default class tooBox {
  constructor(chart, defaultOptions, firstLoad, infoData, csvExport = {}) {
    this.chart = chart
    this.defaultOptions = defaultOptions
    this.firstLoad = firstLoad
    this.infoData = infoData
    this.csvExport = csvExport
  }
  /* 平滑 */
  addSmoothLineBtn(option) {
    const _this = this
    const obj = {
      // 转平滑折线图
      mySmoothLine: {
        show: true,
        title: '平滑折线图',
        icon: 'path://M25.6 537.1392a25.6 25.6 0 1 1 0-51.2h141.1072a25.6 25.6 0 0 0 24.5248-18.2272l118.1184-393.7792a51.2 51.2 0 0 1 98.0992 0L665.6 934.4l118.1184-393.728a76.8 76.8 0 0 1 73.5744-54.784H998.4a25.6 25.6 0 1 1 0 51.2h-141.1072a25.6 25.6 0 0 0-24.5248 18.2272l-118.1184 393.7792a51.2 51.2 0 0 1-98.0992 0L358.4 88.6272 240.2816 482.4064a76.8 76.8 0 0 1-73.5744 54.784H25.6z',
        // icon: 'image://add.png', //按钮图片的位置
        onclick: function () {
          // 获取当前图形的配置项option
          if (_this.firstLoad) {
            // 判断是否 首次点击 保存原始数据 用于重置图形
            _this.defaultOptions = _this.chart.getOption()
            _this.firstLoad = false
          }
          const options = cloneDeep(_this.defaultOptions)
          // 清空画布
          _this.chart.clear()
          // 设置样式
          _this.chart.setOption(_this.changeSmoothLine(options))
        }
      }
    }
    if (this.judgeExistLine(option)) {
      merge(option.toolbox.feature, obj)
    }

    return option
  }
  /* 虚线 */
  addDottedLineBtn(option) {
    const _this = this
    const obj = {
      // 转虚线折线图
      myDottedLine: {
        show: true,
        title: '虚线折线图',
        icon: 'M127.99 127.99V319.996h64.047V191.784h128.025V127.99zM128.025 895.922H320.031v-64.047H191.819V703.85h-63.794zM896.174 895.51V703.503h-64.047v128.213H704.102v63.794zM896.143 127.957H704.137v64.047h128.212v128.025h63.794zM448.087 127.99h128.025v63.794H448.087zM127.99 448.209h64.047v127.837H127.99zM832.162 448.209h63.981v127.837h-63.981zM448.087 831.591h128.025v64.202H448.087z',
        // icon: 'image://add.png', //按钮图片的位置
        onclick: function () {
          // 获取当前图形的配置项option
          if (_this.firstLoad) {
            // 判断是否 首次点击 保存原始数据 用于重置图形
            _this.defaultOptions = _this.chart.getOption()
            _this.firstLoad = false
          }
          const options = cloneDeep(_this.defaultOptions)

          // 清空画布
          _this.chart.clear()
          // 设置样式
          _this.chart.setOption(_this.changeDottedLine(options))
        }
      }
    }
    if (this.judgeExistLine(option)) {
      merge(option.toolbox.feature, obj)
    }
    return option
  }
  /* 重置 */
  addRestoreBtn(option) {
    const _this = this
    const obj = {
      // 重置
      myRestore: {
        show: true,
        title: '重置',
        icon: 'path://M197.7088 478.72l39.68-39.168a19.2 19.2 0 1 1 26.9824 27.2896l-73.344 72.448a19.2 19.2 0 0 1-26.9824 0l-75.136-74.24A19.2 19.2 0 1 1 115.8912 437.76l43.0592 42.5472C175.616 300.6464 326.7328 160 510.72 160c195.1232 0 353.28 158.1568 353.28 353.28 0 195.1232-158.1568 353.28-353.28 353.28a352.0512 352.0512 0 0 1-242.0224-95.9232 19.2 19.2 0 1 1 26.2912-27.9808 313.6768 313.6768 0 0 0 215.7312 85.504c173.9008 0 314.88-140.9792 314.88-314.88 0-173.9008-140.9792-314.88-314.88-314.88-162.2272 0-295.808 122.6752-313.0112 280.32z',
        onclick: function () {
          if (!_this.defaultOptions) return
          // 清空画布
          _this.chart.clear()

          _this.chart.setOption(_this.defaultOptions)
          _this.firstLoad = true
          _this.defaultOptions = null
        }
      }
    }
    if (this.judgeExistLine(option)) {
      merge(option.toolbox.feature, obj)
    }
    return option
  }
  /* 导出 */
  addTool(option) {
    // 导出dom元素的id
    const RandomId = len => Math.random().toString(36).substr(3, len)
    const picId = 'myTool_pic' + RandomId(10)
    const csvId = 'myTool_csv' + RandomId(10)
    const obj = {
      myTool: {
        show: true,
        title: '工具',
        icon: 'path://M898.831744 900.517641 103.816972 900.517641c-36.002982 0-65.363683-29.286-65.363683-65.313541l0-554.949184c0-36.041868 29.361725-65.326844 65.363683-65.326844l795.015795 0c36.002982 0 65.198931 29.284977 65.198931 65.326844l0 554.949184C964.030675 871.231641 934.834726 900.517641 898.831744 900.517641L898.831744 900.517641zM103.816972 255.593236c-13.576203 0-24.711821 11.085476-24.711821 24.662703l0 554.949184c0 13.576203 11.136641 24.662703 24.711821 24.662703l795.015795 0c13.577227 0 24.547069-11.086499 24.547069-24.662703l0-554.949184c0-13.577227-10.970866-24.662703-24.547069-24.662703L103.816972 255.593236 103.816972 255.593236zM664.346245 251.774257c-11.161201 0-20.332071-9.080819-20.332071-20.332071l0-101.278661c0-13.576203-11.047614-24.623817-24.699542-24.623817L383.181611 105.539708c-13.576203 0-24.712845 11.04659-24.712845 24.623817l0 101.278661c0 11.252275-9.041934 20.332071-20.332071 20.332071-11.20111 0-20.319791-9.080819-20.319791-20.332071l0-101.278661c0-35.989679 29.323862-65.275679 65.364707-65.275679l236.133022 0c36.06745 0 65.402569 29.284977 65.402569 65.275679l0 101.278661C684.717202 242.694461 675.636383 251.774257 664.346245 251.774257L664.346245 251.774257zM413.233044 521.725502 75.694471 521.725502c-11.163247 0-20.333094-9.117658-20.333094-20.35663 0-11.252275 9.169847-20.332071 20.333094-20.332071l337.538573 0c11.277858 0 20.319791 9.080819 20.319791 20.332071C433.552835 512.607844 424.510902 521.725502 413.233044 521.725502L413.233044 521.725502zM912.894018 521.725502 575.367725 521.725502c-11.213389 0-20.332071-9.117658-20.332071-20.35663 0-11.252275 9.118682-20.332071 20.332071-20.332071l337.526293 0c11.290137 0 20.332071 9.080819 20.332071 20.332071C933.226089 512.607844 924.184155 521.725502 912.894018 521.725502L912.894018 521.725502zM557.56322 634.217552 445.085496 634.217552c-11.213389 0-20.332071-9.079796-20.332071-20.331048l0-168.763658c0-11.251252 9.118682-20.332071 20.332071-20.332071l112.478747 0c11.290137 0 20.370956 9.080819 20.370956 20.332071l0 168.763658C577.934177 625.137757 568.853357 634.217552 557.56322 634.217552L557.56322 634.217552zM465.417567 593.514525l71.827909 0L537.245476 465.454918l-71.827909 0L465.417567 593.514525 465.417567 593.514525z',
        onclick: (e, v) => {
          let parent = v.getDom()
          if (!this.downloadDom) {
            this.downloadDom = document.createElement('div')
          }
          let div = this.downloadDom
          div.setAttribute('class', 'echarts_download')

          let innerHtml = ''
          if (this.infoData.isDownloadImg) {
            innerHtml += `<div id=${picId}>下载图片</div>`
          }
          if (this.infoData.isDownloadCsv) {
            innerHtml += `<div id=${csvId}>下载CSV文件</div>`
          }
          div.innerHTML = innerHtml

          parent.appendChild(div)
          if (div.style.display == 'block') {
            div.style.display = 'none'
          } else {
            div.style.display = 'block'
          }
          const fileName = e.option.title[0].text || e.option.title[0].subtext || '文件' + new Date().getTime()
          // 下载图片
          if (this.infoData.isDownloadImg) {
            const params = { chart: this.chart, fileName }
            document.getElementById(picId).addEventListener('click', () => {
              saveImg(params)
              div.style.display = 'none'
            })
          }
          // 下载csv文件
          if (this.infoData.isDownloadCsv) {
            const csvExportData = this.csvExport // 获取外部传递的csv数据
            const csvParams = { chart: this.chart, fileName, csvExportData, type: option.type }
            // console.log(csvParams, 'csvParams');
            document.getElementById(csvId).addEventListener('click', () => {
              exportCsv(csvParams)
              div.style.display = 'none'
            })
          }
        }
      }
    }
    merge(option.toolbox.feature, obj)
    return option
  }

  // 判断是否有 line 类型
  judgeExistLine(option) {
    const arr = []
    let status = false

    // 判断 系列值 是否有 折线图
    if (isNull(option.series)) {
      const data = option.series
      if (data) {
        if (data.data) {
          data.data.map(e => {
            if (e.type == 'line') {
              arr.push(e.type)
            }
          })
        } else {
          data.map(e => {
            if (e.type == 'line') {
              arr.push(e.type)
            }
          })
        }
      }
    }
    // 判断 里面 有没有折线图
    if (!isNull(arr)) {
      status = true
    }

    return status
  }
  /*----------------------------------------------------------------------
        | 图形转换方法
        |-----------------------------------------------------------------------
        */
  // 将系列图形转换成 平滑折线图
  changeSmoothLine(option) {
    const line = {
      type: 'line',
      smooth: true,
      showAllSymbol: false, // false，随主轴标签间隔隐藏策略。
      showSymbol: true, // 显示图案
      symbolSize: 6, // 图案的大小
      symbol: 'circle' // 图案的类型
    }
    option = this.makeGrid(option)
    option = this.makeXAxis(option)
    option = this.makeYAxis(option)

    option.series.map((item, index) => {
      if (item.type == 'line') {
        item = merge(item, line)
      }
    })

    return option
  }
  // 将系列图形转换成 虚线折线图
  changeDottedLine(option) {
    const line = {
      type: 'line',
      smooth: false,
      showAllSymbol: false, // false，随主轴标签间隔隐藏策略。
      showSymbol: true, // 显示图案
      symbolSize: 6, // 图案的大小
      symbol: 'circle', // 图案的类型
      itemStyle: {
        normal: {
          lineStyle: {
            width: 2,
            type: 'dotted' //'dotted'虚线 'solid'实线
          }
        }
      }
    }
    option = this.makeGrid(option)
    option = this.makeXAxis(option)
    option = this.makeYAxis(option)

    option.series.map((item, index) => {
      if (item.type == 'line') {
        item = merge(item, line)
      }
    })
    return option
  }
  makeGrid(option) {
    merge(option.grid, { show: true, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 1)' })
    return option
  }

  makeXAxis(option) {
    const xAxisOption = {
      // boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#000'
        }
      },
      axisTick: {
        show: true
      }
    }
    // 判断 x 轴
    if (option.xAxis.length > 1) {
      option.xAxis.map((item, index) => {
        item = merge(item, xAxisOption)
      })
    } else {
      option.xAxis = merge(option.xAxis[0] || option.xAxis, xAxisOption)
    }

    return option
  }

  makeYAxis(option) {
    const yAxisOption = {
      axisTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#000'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#000'
        }
      },
      splitLine: {
        show: false
      }
    }

    // 判断 Y 轴
    if (option.yAxis.length > 1) {
      option.yAxis.map((item, index) => {
        item = merge(item, yAxisOption)
      })
    } else {
      option.yAxis = merge(option.yAxis[0] || option.yAxis, yAxisOption)
    }

    return option
  }
}
