### 污染分布图-模型扇形场

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
    透明度：
    <a-input-number style="width: 200px;" :min="0" :max="100" v-model="transparency" @blur="transparencyChange" />
  </div>
  <div class="turf-irregular-contourf" style="height:626px">
    <s-map
      mapkey="map3"
      :map-options="mapOptions"
      :background-options="backgroudOptions"
      :data-layer-option="dataLayerOption"
      :layer-datas="layerDatas"
    ></s-map>
  <s-legend :legend-id="'demo1'" :gradient="false" :legend="legend"></s-legend>
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
    const colors = {
      gradient: [
        {
          value: -60,
          r: 40,
          g: 9,
          b: 113
        },
        {
          value: -46,
          r: 140,
          g: 38,
          b: 98
        },
        {
          value: -23,
          r: 53,
          g: 170,
          b: 209
        },
        {
          value: -1,
          r: 23,
          g: 127,
          b: 29
        },
        {
          value: 21,
          r: 243,
          g: 248,
          b: 57
        },
        {
          value: 45,
          r: 180,
          g: 53,
          b: 49
        }
      ],
      levels:[
        {
          value: -273.15,
          r: 126,
          g: 2,
          b: 64,
          a: 255
        },
        {
          value: -32,
          r: 0,
          g: 47,
          b: 134,
          a: 255
        },
        {
          value: -28,
          r: 26,
          g: 92,
          b: 166,
          a: 255
        },
        {
          value: -24,
          r: 32,
          g: 117,
          b: 210,
          a: 255
        },
        {
          value: -20,
          r: 60,
          g: 160,
          b: 240,
          a: 255
        },
        {
          value: -16,
          r: 117,
          g: 207,
          b: 255,
          a: 255
        },
        {
          value: -12,
          r: 151,
          g: 225,
          b: 244,
          a: 255
        },
        {
          value: -8,
          r: 189,
          g: 249,
          b: 255,
          a: 255
        },
        {
          value: -4,
          r: 242,
          g: 255,
          b: 255,
          a: 255
        },
        {
          value: 0,
          r: 223,
          g: 255,
          b: 217,
          a: 255
        },
        {
          value: 4,
          r: 196,
          g: 255,
          b: 183,
          a: 255
        },
        {
          value: 8,
          r: 186,
          g: 254,
          b: 131,
          a: 255
        },
        {
          value: 12,
          r: 252,
          g: 254,
          b: 156,
          a: 255
        },
        {
          value: 16,
          r: 255,
          g: 243,
          b: 196,
          a: 255
        },
        {
          value: 20,
          r: 255,
          g: 220,
          b: 168,
          a: 255
        },
        {
          value: 24,
          r: 255,
          g: 175,
          b: 117,
          a: 255
        },
        {
          value: 28,
          r: 253,
          g: 135,
          b: 132,
          a: 255
        },
        {
          value: 32,
          r: 236,
          g: 91,
          b: 95,
          a: 255
        }
      ]
    }
    const models = [
      {
        model: 'WRF',
        region: 'd01',
        width: 281,
        height: 204,
        lon: require('./assets/turf-irregular-contourf/WRF_d01_lon.json'),
        lat: require('./assets/turf-irregular-contourf/WRF_d01_lat.json'),
      },
      {
        model: 'WRF',
        region: 'd02',
        width: 189,
        height: 210,
        lon: require('./assets/turf-irregular-contourf/WRF_d02_lon.json'),
        lat: require('./assets/turf-irregular-contourf/WRF_d02_lat.json'),
      },
      {
        model: 'WRF',
        region: 'd03',
        width: 294,
        height: 276,
        lon: require('./assets/turf-irregular-contourf/WRF_d03_lon.json'),
        lat: require('./assets/turf-irregular-contourf/WRF_d03_lat.json'),
      },
    ]
    return {
      settings: settings,
      colors: colors,
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
        height: 360
      },
      layerDatas: [
        {
          type: 'turfIrregularContourf',
          url: require('./assets/turf-irregular-contourf/TA_hourly_d01_2022-04-20_100000_i.png'),
          lons: models[0].lon,
          lats: models[0].lat,
          width: models[0].width,
          height: models[0].height,
          // 值 对应的颜色
          gradient: colors.levels,
          isClip: true,
          bound: settings.d01.bound,
          dataAnalysisFunc: this.forecastDataAnalysis
        }
      ],
      region: 'd01',
      clip: 'yes',
      transparency: 100,
      legend: {
           name: '温度',
           unit: '℃',
           legends: [
             {
               labelId: -1,
               labelName: '',
               skip: true
             },
             {
               labelId: 0,
               labelName: '',
               colorLevel: 'rgba(126,2,64,255)',
               width: 23
             },
             {
               labelId: 1,
               labelName: '-32',
               colorLevel: 'rgba(0,47,134,255)',
               width: 23
             },
             {
               labelId: 2,
               labelName: '-28',
               colorLevel: 'rgba(26,92,166,255)',
               width: 23
             },
             {
               labelId: 3,
               labelName: '-24',
               colorLevel: 'rgba(32,117,210,255)',
               width: 23
             },
             {
               labelId: 4,
               labelName: '-20',
               colorLevel: 'rgba(60,160,240,255)',
               width: 23
             },
             {
               labelId: 5,
               labelName: '-16',
               colorLevel: 'rgba(117,207,255,255)',
               width: 23
             },
             {
               labelId: 6,
               labelName: '-12',
               colorLevel: 'rgba(151,225,244,255)',
               width: 23
             },
             {
               labelId: 7,
               labelName: '-8',
               colorLevel: 'rgba(189,249,255,255)',
               width: 23
             },
             {
               labelId: 8,
               labelName: '-4',
               colorLevel: 'rgba(242,255,255,255)',
               width: 23
             },
             {
               labelId: 9,
               labelName: '0',
               colorLevel: 'rgba(223,255,217,255)',
               width: 23
             },
             {
               labelId: 10,
               labelName: '4',
               colorLevel: 'rgba(196,255,183,255)',
               width: 23
             },
             {
               labelId: 11,
               labelName: '8',
               colorLevel: 'rgba(186,254,131,255)',
               width: 23
             },
             {
               labelId: 12,
               labelName: '12',
               colorLevel: 'rgba(252,254,156,255)',
               width: 23
             },
             {
               labelId: 13,
               labelName: '16',
               colorLevel: 'rgba(255,243,196,255)',
               width: 23
             },
             {
               labelId: 14,
               labelName: '20',
               colorLevel: 'rgba(255,220,168,255)',
               width: 23
             },
             {
               labelId: 15,
               labelName: '24',
               colorLevel: 'rgba(255,175,117,255)',
               width: 23
             },
             {
               labelId: 16,
               labelName: '28',
               colorLevel: 'rgba(253,135,132,255)',
               width: 23
             },
             {
               labelId: 17,
               labelName: '32',
               colorLevel: 'rgba(236,91,95,255)',
               width: 23
             }
           ]
         }
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
        url: require('./assets/turf-irregular-contourf/TA_hourly_' + this.region + '_2022-04-20_100000_i.png'),
        bound: this.settings[this.region].bound,
        lons: model.lon,
        lats: model.lat,
        width: model.width,
        height: model.height,
      }]
    },
    clipChange(){
      this.layerDatas = [{
        ...this.layerDatas[0],
        isClip: this.clip == 'yes'
      }]
    },
    transparencyChange(){
      this.layerDatas = [{
        ...this.layerDatas[0],
        canvasAlpha: this.transparency / 100
      }]
    },
    forecastDataAnalysis(r, g, b, a, code) {
      if(r === 2) return -99999
      let val = (b * 256 + g) / 10
      val = r === 0 ? val : -val
      return val
    }
  }
}
</script>

<style lang="less" scoped>
.turf-irregular-contourf {
  position: relative;
  .legendRegion {
    .legend {
      right: 15px;
      bottom: 15px;
    }
  }
}
</style>
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
| type | 图层类型 | String | turfIrregularContourf | — | |
| url | 数据图片地址 | String | — | — | |
| name | 图层名 | String | | — | |
| code | 当前图片对应的指标编码，会在 dataAnalysisFunc 函数中回传 | String | | | |
| lon | 栅格场经度坐标一维数组 | Array | | | |
| lat | 栅格场纬度坐标一维数组 | Array | | | |
| width | 数据图片宽度 | Number | | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| height | 数据图片高度 | Number | | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| extent | 西南角和东北角 | Array | — | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| bound | 掩膜裁剪范围 | Object | — | - | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| canvasAlpha | 图层透明度 | Number | 0-1 | 1 |  |
| gradient | 渲染根据 value 渲染的颜色组 | Array | — | — | |
| isClip | 是否裁剪 | Boolean | false/true | false  | |
| isGradient | 是否渐变 | Boolean | false/true | | |
| step | 渐变值步长 | Number | | | 颜色渐变时必须设置渐变步长，表示几个浓度一个颜色 |
| dataAnalysisFunc | 数据图片像素转换函数 | function(r, g, b, a, code) | | | 这里的解析函数优先于全局的解析函数 |
| pressure | 高低压标记 | object | | | |