### 风矢风场-扇形场

::: demo

```html
<div>
  <div>
    区域切换：
    <a-radio-group v-model="region" style="width: 180px" @change="regionChange">
      <a-radio-button value="d01"> d01 </a-radio-button>
      <a-radio-button value="d02"> d02 </a-radio-button>
      <a-radio-button value="d03"> d03 </a-radio-button>
    </a-radio-group>
    掩膜：
    <a-radio-group v-model="clip" style="width: 100px" @change="clipChange">
      <a-radio-button value="yes"> 开 </a-radio-button>
      <a-radio-button value="no"> 关 </a-radio-button>
    </a-radio-group>
  </div>
  <div style="height:626px">
    <s-map
      mapkey="map3"
      :map-options="mapOptions"
      :background-options="backgroudOptions"
      :data-layer-option="dataLayerOption"
      :layer-datas="layerDatas"
      :data-analysis-func="dataAnalysis"
    ></s-map>
  </div>
</div>
<script>
export default {
  data() {
    const settings = {
      d01: {
        extent: [73.502355, 18.211691, 135.09567, 53.563269],
        bound: require('./assets/d01.json'),
        center: [105.057161, 37.968493],
        zoom: 4.7,
        maxZoom: 11,
        minZoom: 4
      },
      d02: {
        //川渝
        extent: [96.969824, 25.828985, 110.289467, 34.480908],
        bound: require('./assets/d02.json'),
        center: [103.997592, 30.554068],
        zoom: 6,
        maxZoom: 11,
        minZoom: 4
      },
      d03: {
        extent: [105.289759, 28.161339, 110.198876, 32.201187],
        bound: require('./assets/d03.json'),
        center: [108.184701, 30.267528],
        zoom: 8,
        maxZoom: 11,
        minZoom: 4
      }
    }
    const models = [
      {
        model: 'WRF',
        region: 'd01',
        width: 281,
        height: 204,
        lon: require('./assets/turf-irregular-contourf/WRF_d01_lon.json'),
        lat: require('./assets/turf-irregular-contourf/WRF_d01_lat.json'),
        windRenderFactor: 8,
      },
      {
        model: 'WRF',
        region: 'd02',
        width: 189,
        height: 210,
        lon: require('./assets/turf-irregular-contourf/WRF_d02_lon.json'),
        lat: require('./assets/turf-irregular-contourf/WRF_d02_lat.json'),
        windRenderFactor: 20,
      },
      {
        model: 'WRF',
        region: 'd03',
        width: 294,
        height: 276,
        lon: require('./assets/turf-irregular-contourf/WRF_d03_lon.json'),
        lat: require('./assets/turf-irregular-contourf/WRF_d03_lat.json'),
        windRenderFactor: 60,
      },
    ]
    return {
      settings: settings,
      models: models,
      mapOptions: {
        center: settings.d01.center,
        zoom: settings.d01.zoom
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
      dataLayerOption: {
        // 图片对应的像素
        width: 720,
        height: 360,
        // 边界
        extent: settings.d01.extent,
        bound: ''
      },
      layerDatas: [
        {
          type: 'windBarbRender',
          url: [require('./assets/wind-barb-render/WS_hourly_d01_2022-04-20_000000_i.png'), require('./assets/wind-barb-render/WD_hourly_d01_2022-04-20_000000_i.png')],
          code: ['WS', 'WD'],
          lons: models[0].lon,
          lats: models[0].lat,
          width: models[0].width,
          height: models[0].height,
          renderFactor: models[0].windRenderFactor,
          // 值 对应的颜色
          isClip: true,
          bound: settings.d01.bound
        }
      ],
      region: 'd01',
      clip: 'yes',
      gradient: 'yes',
      transparency: 100
    }
  },
  methods: {
    regionChange() {
      this.mapOptions = {
        center: this.settings[this.region].center,
        zoom: this.settings[this.region].zoom
      }
      this.dataLayerOption = {
        ...this.dataLayerOption,
        extent: this.settings[this.region].extent
      }
      const model = this.models.find(m => m.model === 'WRF' && m.region === this.region)
      this.layerDatas = [{
        ...this.layerDatas[0],
        url: [require('./assets/wind-barb-render/WS_hourly_' + this.region + '_2022-04-20_000000_i.png'), require('./assets/wind-barb-render/WD_hourly_' + this.region + '_2022-04-20_000000_i.png')],
        bound: this.settings[this.region].bound,
        lons: model.lon,
        lats: model.lat,
        width: model.width,
        height: model.height,
        renderFactor: model.windRenderFactor
      }]
    },
    clipChange(){
      this.layerDatas = [{
        ...this.layerDatas[0],
        isClip: this.clip == 'yes'
      }]
    },
    dataAnalysis(r, g, b, a, code) {
      const multiple = code == 'WS' ? 10 : 1
      const val = r * 256 + g
      return b === 0 ? val / multiple : -val / multiple
    }
  }
}
</script>
```

:::

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| dataLayerOption | 图层全局配置 | Object | — | |
| layerDatas | 图层数据 | Array | — | |
| dataAnalysisFunc | 数据图片像素解析函数 | function(r, g, b, a, code) | | 全局解析函数 |

### dataLayerOption

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| width    | 数据图片宽度 | Number | — | 720 |
| height   | 数据图片高度 | Number | — | 360 |
| extent   | 西南角和东北角 | Array | — | [105.289759, 28.161339, 110.198876, 32.201187] |
| bound    | 掩膜裁剪范围 | Object  | — | - |
| gradient | 渲染根据 value 渲染的颜色组 | Array | — | — |

### layerDatas

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| type | 图层类型 | String | windBarbRender | — | |
| name | 图层名 | String | | — | |
| index | 图片排序字段 | Number | | | 用于同时叠加多个图层时，图层间进行排序，数值小的在下面 |
| uv | uv还是风速风向 | Boolean | true/false | false | 标记url中的数据图片对应风速风向、还是分解后的横向纵向分量 |
| url | 数据图片地址 | Array | — | — | [U, V] 或者 [WS, WD] |
| code | 当前图片对应的指标编码，会在 dataAnalysisFunc 函数中回传 | Array | | | ['U', 'V'], ['WS', 'WD'] |
| lon | 栅格场经度坐标一维数组 | Array | | | |
| lat | 栅格场纬度坐标一维数组 | Array | | | |
| width | 数据图片宽度 | Number | | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| height | 数据图片高度 | Number | | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| renderFactor | 风羽间隔系数，会与地图缩放级别结合计算风羽间隔 | Number | | | 需要根据不同的模型，手动调整一个比较合适的数值 |
| extent | 西南角和东北角 | Array | — | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| bound | 掩膜裁剪范围 | Object | — | - | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| isClip | 是否裁剪 | Boolean | false/true | false  | |
| dataAnalysisFunc | 数据图片像素转换函数 | function(r, g, b, a, code) | | | 这里的解析函数优先于全局的解析函数 |
| pressure | 高低压标记 | object | | | |