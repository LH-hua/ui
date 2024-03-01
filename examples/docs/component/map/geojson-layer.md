### 自定义底图

::: demo

```html
<div>
  <div style="height:626px">
    <s-map mapkey="map1" :map-options="mapOptions" :background-options="backgroudOptions" :geo-json-options="geoJsonOptions"></s-map>
  </div>
</div>
<script>

export default {
  data() {
    return {
      mapOptions: {
        center: [108.504962, 36.533155],
        zoom: 4.5,
        minZoom: 4,
        maxZoom: 11
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
      geoJsonOptions:[{
        index:999,
        geoJson: require('./assets/d02.json').features,
        hoverHighlight: true
      },
      {
         index:1000,
        geoJson: require('../../../assets/json/xining.json').features,
        hoverHighlight: true
      }
      ] 
    }
  }
}
</script>
```

:::

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| ---- | ----| ---- | ---- | ---- | ---- |
| geoJsonOptions | 外部视图 | Object|Array | | | 实现多地图联动功能时，需要设置统一的视图，由外部传入 |

### geoJsonOptions

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| index | 图层排序 | Number | — | 1 |
| geoJson | 地理轮廓数据 | Array  | — | |
| geoJsonStyle | 样式渲染 | function(feature) | — | geojson-style.js |
| hoverHighlight | 是否开启hover高亮 | Boolean | — | false |
| hoverHighlightStyle | 自定义hover高亮样式 | Array | — | 默认高亮样式如下 | 
```
//自定义hoverHighlightStyle高亮样式
//需要从openlayer引入 import { Fill, Stroke, Style } from "ol/style" 

const hoverHighlightStyle = [
  new Style({
    stroke: new Stroke({
      color: "#6e88b9",
      width: 3
    }),
    fill: new Fill({
      color: "rgba(24, 144, 255, 0.5)"
    })
  })
]
```
