### 圆、线图层

::: demo

```html
<div>
  <div>
    <a-radio-group v-model="draw" style="width: 320px" ref="select" @change="change">
      <a-radio-button value="circular"> 绘制圆形 </a-radio-button>
      <a-radio-button value="auto"> 自动绘制线条 </a-radio-button>
      <a-radio-button value="manual"> 手动绘制线条 </a-radio-button>
    </a-radio-group>
  </div>
  <div style="height:626px">
    <s-map mapkey="map10" :map-options="mapOptions" :background-options="backgroudOptions" ref="drawLayer"> </s-map>
  </div>
</div>
<script>
export default {
  data() {
    return {
      mapOptions: {
        center: [106.504962, 29.533155],
        zoom: 5
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
      draw: 'auto'
    }
  },
  methods: {
    // 绘制点位某半径范围内的圆形
    drawCircular() {
      let map = this.$refs['drawLayer'].map
      // 获取构建圆形的实例对象
      let layer = this.$refs['drawLayer'].circularLayer
      // 绘制圆
      let center = [113, 28]
      let radius = 200000
      layer.render(map, center, radius)

      //判断坐标是否在圆形范围内
      let is = layer.isIntersects([113, 25])

      // 获取点位之间的距离 (米)
      let distance = layer.calcDistance([113, 28], [113, 25])

      console.log(is, distance / 1000 + 'km')
    },
    // 绘制线条
    drawLine() {
      let map = this.$refs['drawLayer'].map
      // 获取构建线条的实例对象
      let layer = this.$refs['drawLayer'].lineLayer

      // 用户手动绘制
      let manual = () => {
        layer.render(map, coord => {
          // 绘制结束的回调
          console.log(coord)
        })
      }

      // 根据坐标自动绘制
      let coords = [
        [105, 25],
        [116, 35]
      ]
      let auto = () => {
        layer.coordinateToLine(map, coords)
      }

      return {
        auto,
        manual
      }
    },
    change(e) {
      let val = e.target.value
      if (val === 'circular') {
        this.drawCircular()
      } else if (val == 'auto') {
        this.drawLine().auto()
      } else if (val === 'manual') {
        this.drawLine().manual()
      }
    }
  },
  mounted() {
    this.drawLine().auto()
  }
}
</script>
```
