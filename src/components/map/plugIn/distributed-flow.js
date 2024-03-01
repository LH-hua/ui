/* 分布式流向图 */
import ADLayer from "./ADLayer.js";
import { transform } from "ol/proj";
import * as echarts from "echarts";
import { merge } from 'lodash'

export default class DistributedFlow {
  constructor(map, datas, geoCoordMap, option) {
    this.map = map
    this.datas = datas
    this.geoCoordMap = geoCoordMap
    this.option = option || {}

    this.projection = ['EPSG:4326', 'EPSG:3857']

    this.series = []
    this.ADLayer = null
    this.configure()

    window.addEventListener('resize', () => {
      this.configure()
    })

  }
  //配置图表
  configure() {
    let that = this
    let series = [];
    let data = [['杭州', this.datas]]
    data.forEach(function (item, i) {
      series.push(
        {
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.02,
            symbol: 'arrow',
            symbolSize: 5,
            // color:'#fff'
          },
          lineStyle: {
            width: 2,
            opacity: 0.6,
            curveness: 0.2,
          },
          data: that.convertData(item[1]),
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4,
          },
          label: {
            show: true,
            position: 'right',
            offset: [5, 0],
            formatter: '{b}',
          },
          symbol: 'circle',
          symbolSize: function (val) {
            return 4 + val[2] / 10;
          },
          itemStyle: {
            show: false,
            color: '#f00',
          },
          data: item[1].map(function (dataItem) {
            return {
              name: dataItem[0].name,
              value: transform(
                that.geoCoordMap[dataItem[0].name],
                that.projection[0],
                that.projection[1]
              ).concat([dataItem[0].value]),
              raw: dataItem[0]
            };
          }),
        },
      );
    });
    const extraSeries = this.option.series || {}
    this.series = merge(series, extraSeries)
    this.render()
  }
  //渲染图表
  render() {
    this.clearLayer()
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: (params => {
          let value = params.value[2] ? '：' + params.value[2] : ''
          return `${params.name}${value}`
        })
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: false,
        type: 'piecewise',
        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
        textStyle: {
          color: this.option.legendLabelColor || '#555',
        },
        right: 10,
        pieces: this.option.pieces || []
      },
      series: this.series,
    };
    this.ADLayer = new ADLayer(option, this.map, echarts, this.option.events || []);
    this.ADLayer.render();
    this.ADLayer._render();
  }
  //清除图表
  clearLayer() {
    this.ADLayer && this.ADLayer.clear();
  }
  //数据转化格式
  convertData(data) {
    if (!Array.isArray(data)) return
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i];
      let fromCoord = transform(
        this.geoCoordMap[dataItem[0].name],
        this.projection[0],
        this.projection[1]
      );
      let toCoord = transform(
        this.geoCoordMap[dataItem[1].name],
        this.projection[0],
        this.projection[1]
      );
      if (fromCoord && toCoord) {
        res.push(
          {
            coords: [fromCoord, toCoord],
            value: dataItem[0].value,
          },
        );
      }
    }
    return res;
  }

}