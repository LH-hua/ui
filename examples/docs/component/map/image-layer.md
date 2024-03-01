### 图片图层

::: demo

```html
<div style="height:626px">
  <s-map
    mapkey="map9"
    :map-options="mapOptions"
    :background-options="backgroudOptions"
    :image-options="imageOptions">
  </s-map>
  <a-button @click="update">更新图片</a-button>
</div>
<script>
export default {
  data() {
    return {
      mapOptions: {
        center: [108.184701, 30.267528],
        zoom: 7
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
      imageOptions:{
        imageUrl: require('./assets/image-layer/MOVE_TRANSPORT_SO2.png'),
        imageBound: [105.289759, 28.161339, 110.198876, 32.201187]
      },
      images:[require('./assets/image-layer/MOVE_TRANSPORT_SO2.png'), require('./assets/image-layer/bcs_NOx_01.png'), require('./assets/image-layer/shengwuyuan3.png')],
      index: 0
    }
  },
  methods: {
    update() {
      this.index++;
      if(this.index >= this.images.length){
        this.index = 0
      }
      this.imageOptions = {
        ...this.imageOptions,
        imageUrl: this.images[this.index]
      }
    }
  }
}
</script>
```
:::

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| imageOptions | 图片图层配置 | Object | — | |

### imageOptions
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| index | 图片排序字段 | Number | | | 用于同时叠加多个图层时，图层间进行排序，数值小的在下面 |
| imageUrl | 图片地址 | String | | |
| imageBound | 对应经纬度范围 | Array | | |
