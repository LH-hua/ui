### 风场粒子图层-图片数据

::: demo

```html
<div style="height:626px">
  <s-map
    mapkey="map11"
    :map-options="mapOptions"
    :background-options="backgroudOptions"
    :data-layer-option="dataLayerOption"
    :layer-datas="layerDatas"
    :data-analysis-func="dataAnalysis">
  </s-map>
</div>
<script>
export default {
    data() {
      return {
        mapOptions: {
          center: [106.504962, 29.533155],
          zoom: 7
        },
        backgroudOptions: [
          {
            type: 'customImage',
            sourceUrl: 'http://10.10.204.111:8080/geoserver/wms',
            sourceLayer: 'StandardMapDark',
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
            index: 9999,
            type: 'windParticle',
            uv: true,
            url: [require('./assets/wind-barb/U_20220419160000_d01.png'), require('./assets/wind-barb/V_20220419160000_d01.png')],
            code: ['U', 'V'],
            dataAnalysisFunc: this.dataAnalysis,
            extent: [73.502355, 18.211691, 135.09567, 53.563269],
            option: {
              speed: 1,
              lineWidth: 2
            }
          }
        ]
      }
    },
    methods:{
      dataAnalysis(r, g, b, a, code) {
        const val = r * 256 + g
        return b === 0 ? val / 100 : -val / 100
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

### layerDatas

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| type | 图层类型 | String | windParticle | — | |
| name | 图层名 | String | | — | |
| index | 图片排序字段 | Number | | | 用于同时叠加多个图层时，图层间进行排序，数值小的在下面 |
| uv | uv还是风速风向 | Boolean | true/false | false | 标记url中的数据图片对应风速风向、还是分解后的横向纵向分量 |
| url | 数据图片地址 | Array | — | — | [U, V] 或者 [WS, WD] |
| code | 当前图片对应的指标编码，会在 dataAnalysisFunc 函数中回传 | Array | | | ['U', 'V'], ['WS', 'WD'] |
| width | 数据图片宽度 | Number | | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| height | 数据图片高度 | Number | | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| extent | 西南角和东北角 | Array | — | | 这里的设置优先，会覆盖dataLayerOption中的设置 |
| dataAnalysisFunc | 数据图片像素转换函数 | function(r, g, b, a, code) | | | 这里的解析函数优先于全局的解析函数 |
| option | 粒子风场设置参数 | Object | | | 通过speed控制粒子尾羽长度，speed属于自定义属性，除此之外还兼容所有wind-layer组件的所有属性 |