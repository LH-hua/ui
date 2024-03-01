### 污染分布图-矩形场

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
    渐变：
    <a-radio-group v-model="gradient" style="width: 100px" @change="gradientChange">
      <a-radio-button value="yes"> 是 </a-radio-button>
      <a-radio-button value="no"> 否 </a-radio-button>
    </a-radio-group>
    透明度：
    <a-input-number style="width:200px" :min="0" :max="100" v-model="transparency" @change="transparencyChange" />
  </div>
  <div class="turf-regulation-contourf" style="height:626px">
    <s-map
      mapkey="map3"
      :map-options="mapOptions"
      :background-options="backgroudOptions"
      :data-layer-option="dataLayerOption"
      :layer-datas="layerDatas"
      :data-analysis-func="dataAnalysis"
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
          value: 0,
          r: 125,
          g: 228,
          b: 125
        },
        {
          value: 25,
          r: 0,
          g: 228,
          b: 0
        },
        {
          value: 75,
          r: 255,
          g: 255,
          b: 0
        },
        {
          value: 125,
          r: 255,
          g: 126,
          b: 0
        },
        {
          value: 175,
          r: 255,
          g: 0,
          b: 0
        },
        {
          value: 250,
          r: 153,
          g: 0,
          b: 76
        },
        {
          value: 400,
          r: 126,
          g: 0,
          b: 35
        },
        {
          value: 500,
          r: 108,
          g: 0,
          b: 8
        }
      ],
      levels:[
        {
          value: 0,
          r: 0,
          g: 228,
          b: 0
        },
        {
          value: 50,
          r: 255,
          g: 255,
          b: 0
        },
        {
          value: 100,
          r: 255,
          g: 126,
          b: 0
        },
        {
          value: 150,
          r: 255,
          g: 0,
          b: 0
        },
        {
          value: 200,
          r: 153,
          g: 0,
          b: 76
        },
        {
          value: 300,
          r: 126,
          g: 0,
          b: 35
        }
      ]
    }
    return {
      settings: settings,
      colors: colors,
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
          type: 'turfRegulationContourf',
          url: require('./assets/turf-regulation-contourf/aqi_20220418080000_d01.png'),
          step: 2,
          // 值 对应的颜色
          gradient: colors.gradient,
          isClip: true,
          isGradient: true,
          bound: settings.d01.bound
        }
      ],
      region: 'd01',
      clip: 'yes',
      gradient: 'yes',
      transparency: 100,
      legend: {
          name: 'AQI',
          legends: [
            {
              labelId: 1,
              labelName: '优',
              colorLevel: 'rgb(0, 228, 0)'
            },
            {
              labelId: 2,
              labelName: '良',
              colorLevel: 'rgb(255, 225, 0)'
            },
            {
              labelId: 3,
              labelName: '轻度',
              colorLevel: 'rgb(255, 126, 0)'
            },
            {
              labelId: 4,
              labelName: '中度',
              colorLevel: 'rgb(255, 0, 0)'
            },
            {
              labelId: 5,
              labelName: '重度',
              colorLevel: 'rgb(153, 0, 76)'
            },
            {
              labelId: 6,
              labelName: '严重',
              colorLevel: 'rgb(126, 0, 35)'
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
      this.layerDatas = [{
        ...this.layerDatas[0],
        url: require('./assets/turf-regulation-contourf/aqi_20220418080000_' + this.region + '.png'),
        bound: this.settings[this.region].bound
      }]
    },
    clipChange(){
      this.layerDatas = [{
        ...this.layerDatas[0],
        isClip: this.clip == 'yes'
      }]
    },
    gradientChange(){
      this.layerDatas = [{
        ...this.layerDatas[0],
        gradient: this.gradient == 'yes' ? this.colors.gradient : this.colors.levels,
        isGradient: this.gradient == 'yes'
      }]
    },
    transparencyChange(){
      this.layerDatas = [{
        ...this.layerDatas[0],
        canvasAlpha: this.transparency / 100
      }]
    },
    dataAnalysis(r, g, b) {
      return r * 256 + g
    }
  }
}
</script>

<style lang="less" scoped>
.turf-regulation-contourf{
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
| type | 图层类型 | String | turfRegulationContourf | — | |
| url | 数据图片地址 | String | — | — | |
| name | 图层名 | String | | — | |
| index | 图片排序字段 | Number | | | 用于同时叠加多个图层时，图层间进行排序，数值小的在下面 |
| code | 当前图片对应的指标编码，会在 dataAnalysisFunc 函数中回传 | String | | | |
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