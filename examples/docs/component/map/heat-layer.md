### 热力网格

::: demo

```html
<div style="height:626px">
  <s-map
    mapkey="map8"
    :map-options="mapOptions"
    :background-options="backgroudOptions"
    :layer-datas="layerDatas">
  </s-map>
</div>
<script>
export default {
  data() {
    return {
      mapOptions: {
        center: [106.504962, 29.533155],
        zoom: 6
      },
      backgroudOptions: [
        {
        type: 'customImage',
        sourceUrl: 'http://10.10.204.111:8080/geoserver/wms',
        sourceLayer: 'StandardMap',
        index: 0
      },
      {
        type: 'customImage',
        sourceUrl: 'http://10.10.204.111:8080/geoserver/wms',
        sourceLayer: 'StandardMapPoint',
        index: 999
      }
      ],
      gradient: [
        {
          value: 0.0,
          r: 0,
          g: 0,
          b: 255
        },
        {
          value: 16.667,
          r: 0,
          g: 0,
          b: 255
        },
        {
          value: 33.333,
          r: 0,
          g: 121,
          b: 135
        },
        {
          value: 50.0,
          r: 36,
          g: 255,
          b: 0
        },
        {
          value: 66.667,
          r: 206,
          g: 255,
          b: 0
        },
        {
          value: 83.333,
          r: 255,
          g: 14,
          b: 0
        },
        {
          value: 100.0,
          r: 255,
          g: 255,
          b: 255
        }
      ],
      layerDatas: []
    }
  },
  methods: {
    init() {
      let data = [
        {
          lon: 103.5,
          lat: 30.5,
          value: 100
        },
        {
          lon: 103.5,
          lat: 30.75,
          value: 50
        },
        {
          lon: 103.75,
          lat: 30.25,
          value: 20
        },
        {
          lon: 103.75,
          lat: 31.0,
          value: 60.0
        },
        {
          lon: 104.0,
          lat: 29.75,
          value: 70
        },
        {
          lon: 104.0,
          lat: 30.0,
          value: 60.0
        },
        {
          lon: 104.25,
          lat: 29.5,
          value: 60.0
        },
        {
          lon: 104.25,
          lat: 29.75,
          value: 60.0
        },
        {
          lon: 104.25,
          lat: 31.25,
          value: 60.0
        },
        {
          lon: 104.5,
          lat: 29.25,
          value: 0.0
        }
      ]

      const source = data.map(i => {
        return {
          lat: i.lat,
          lng: i.lon,
          value: i.value
        }
      })

      this.layerDatas.push({
        type: 'heatPower',
        gradient: this.gradient,
        source: source,
        coefficient: 0.2
      })
    }
  },
  created() {
    this.init()
  }
}
</script>
```

:::

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| dataLayerOption | 数据图层配置 | Object | — | |
| layerDatas | 图层数据 | Array | — | |

### layerDatas

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| type | 图层类型 | String | heatPower | — | |
| name | 图层名 | String | | — | |
| width | 栅格场横向格子数 | Number | | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| height | 栅格场纵向格子数 | Number | | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| gradient | 渲染根据 value 渲染的颜色组 | Array | — | — | |
| coefficient | 栅格系数 | Number | | 0.1 | |