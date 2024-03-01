### 自定义底图

::: demo

```html
<div>
  <div>
    <a-radio-group v-model="theme" style="width: 600px" ref="select" @change="themeChange">
      <a-radio-button value="normal"> 自定义地图(默认) </a-radio-button>
      <a-radio-button value="dark"> 自定义地图(暗黑) </a-radio-button>
      <a-radio-button value="satellite"> 第三方地图(卫星) </a-radio-button>
      <a-radio-button value="terrain"> 第三方地图(地形) </a-radio-button>
    </a-radio-group>
  </div>
  <div style="height:626px">
    <s-map mapkey="map1" :map-options="mapOptions" :background-options="backgroudOptions"></s-map>
  </div>
</div>
<script>

export default {
  data() {
    // 正式使用时，地图可切换选项一般在全局配置文件中配置，这里只是为了演示
    const backgroudOverlayers = {
      normal: [
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
      dark: [
        {
          type: 'customImage',
          sourceUrl: 'http://10.10.204.111:8080/geoserver/wms',
          sourceLayer: 'StandardMapDark',
          index: 0
        },
        {
          type: 'customImage',
          sourceUrl: 'http://10.10.204.111:8080/geoserver/wms',
          sourceLayer: 'StandardMapDarkPoint',
          index: 999
        }
      ],
      satellite: [
        {
          type: 'thirdPart',
          sourceUrl:
            'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=f11b79a9c885650002c93f600013e969'
        },
        {
          type: 'thirdPart',
          sourceUrl: 'https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=f11b79a9c885650002c93f600013e969'
        }
      ],
      terrain:[
        {
          type: 'thirdPart',
          sourceUrl:
            'http://t5.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=f11b79a9c885650002c93f600013e969'
        },
        {
          type: 'thirdPart',
          sourceUrl: 'https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=f11b79a9c885650002c93f600013e969'
        }
      ]
    }
    return {
      mapOptions: {
        center: [108.504962, 36.533155],
        zoom: 4.5,
        minZoom: 4,
        maxZoom: 11,
      },
      theme: 'normal',
      backgroudOverlayers: backgroudOverlayers,
      backgroudOptions: backgroudOverlayers.normal
    }
  },
  methods: {
    themeChange(e) {
      this.backgroudOptions = this.backgroudOverlayers[e.target.value]
    }
  }
}
</script>
```

:::

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| ---- | ----| ---- | ---- | ---- | ---- |
| mapOptions | 地图基础配置 | Object | — | | |
| backgroudOptions | 底图配置 | Array | — | | |
| externalView | 外部视图 | View | | | 实现多地图联动功能时，需要设置统一的视图，由外部传入 |

### mapOptions

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| zoom | 缩放 | Number | — | 4 |
| center | 中心 | Array  | — | [116.3683244, 39.915085] |
| minZoom | 最小缩放 | Number | — | 2 |
| maxZoom | 最大缩放 | Number | — | 18 |
| showZoom | 是否显示缩放工具 | Boolean | — | true |

### backgroudOptions

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| type | 底图类型 | string | customImage、thirdPart | | |
| sourceUrl  | 图层地址 | string  | — | | |
| sourceLayer | 图层类型 | string | — | | type为customImage时,使用公司自定义geoserve图层，需要配置图层类型 |
| index | 图片排序 | Number | — | 1 | |
| className | 图层瓦片外置样式名 | Number | — | 1 | |

### 事件

| 事件名称 | 说明 | 回调函数 |
| ---- | ---- | ---- |
| mapMoveend | 地图移动、缩放事件 | function(zoom, center) |

### 地图实例方法

`this.$refs.map.addPopup(option)`添加popup方法
| 参数  | 说明 | 类型   | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| el | popup的dom元素 | String | — | — | （必填）|
| coord | 坐标 | Array | | — |（必填） |
| positioning | 位置 | String |'bottom-center' | — |（非必填） |
| offset | popup偏移 | Array |[0, -10]| — | （非必填）|
| zIndex | popup层级 | Number |999 | — | （非必填）|

`this.$refs.map.removePopup()`移除popup方法

`this.$refs.map.moveTo(option)`地图视角移动方法
| 参数  | 说明 | 类型   | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| center | 视角中心坐标 | Array | — | — ||
| duration | 过渡时间 | Number |500 | — | |
| zoom | 缩放 | Number |5 | — ||