### 风场粒子图层-json 格式数据

::: demo

```html
<div>
  <div>
    <a-radio-group v-model="open" style="width: 300px" ref="select" @change="openChange">
      <a-radio-button value="yes"> 开启风场 </a-radio-button>
      <a-radio-button value="no"> 关闭风场 </a-radio-button>
    </a-radio-group>
  </div>
  <div style="height:626px">
    <s-map
      mapkey="map11"
      :map-options="mapOptions"
      :background-options="backgroudOptions"
      :wind-particle-options="windParticleOptions">
    </s-map>
  </div>
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
      open:'yes',
      windParticleOptions: {
        index: 9999,
        enableWind: true,
        data: require('./assets/wind-particle/wind.json'),
        option: {
          speed: 3
        }
      }
    }
  },
  methods:{
    openChange(){
      this.windParticleOptions = {
        ...this.windParticleOptions,
        enableWind: this.open == 'yes'
      }
    }
  }
}
</script>
```

:::

### windParticleOptions

| 参数       | 说明     | 类型    | 可选值 | 默认值              |
| ---------- | -------- | ------- | ------ | ------------------- |
| index      | 图层层级 | Number  |        | ------------------- |
| enableWind | 是否显示 | Boolean | -      | false               |
| data       | 风向数据 | Array   | -      | ------------------- |
| option | 粒子风场设置参数 | Object | | | 通过speed控制粒子尾羽长度，speed属于自定义属性，除此之外还兼容所有wind-layer组件的所有属性 |
