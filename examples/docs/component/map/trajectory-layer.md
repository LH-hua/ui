### 向前轨迹线图

::: demo

```html
<div style="height:626px">
  <s-map
    mapkey="map6"
    :map-options="mapOptions"
    :background-options="backgroudOptions"
    :layer-datas="layerDatas"
    :trajectory-configure="trajectoryConfigure">
  </s-map>
</div>
<script>
export default {
  data() {
    return {
      mapOptions: {
        center: [106.504962, 29.533155],
        zoom: 5,
        projection: 'EPSG:3857'
      },
      layerDatas: [
        {
          type: 'flowLineRender',
          lineData: [
            [113.38, 22.25],
            [115.37402, 22.815887],
            [117.342531, 23.7676],
            [118.685534, 24.897055],
            [120.13892, 30.302955],
            [120.157317, 33.39601],
            [119.495015, 35.484064],
            [117.176955, 39.027086],
            [117.232147, 39.041435],
            [116.349077, 39.939502]
          ],
          speedIntervel: 30,
          lineWidth: 5,
          lineColor: '#ffd17a',
          flowLineWidth: 5,
          flowLineColor: "#ffffda",
          flowLineTrail: 0.98 ,
          isCut: true,
          index: 1,
          tooltip:{
            fontSize: 14,
            fontColor: "#fff",
            text: '河流3',
            backgroundColor: "rgba(0,0,0,0.5)",
            visible: (zoom) => zoom > 5
          }
        },
        // {
        //   type: 'flowLineRender',
        //   lineData: [
        //     [113.38, 22.25],
        //     [110.927049, 21.704353],
        //     [109.843908, 21.504338],
        //     [109.105716, 21.536617],
        //     [108.664181, 22.030654],
        //     [108.369824, 22.872906],
        //     [108.894147, 23.815744],
        //     [109.933595, 24.364677],
        //     [111.566355, 24.423651],
        //     [112.449425, 24.196028],
        //     [113.061135, 23.722613],
        //     [113.38, 22.25],
        //     [113.468175, 21.882624],
        //     [113.60734, 21.672111],
        //     [114.201767, 21.036555],
        //     [114.56407, 20.950164],
        //     [114.86407, 20.950164],
        //     [115.986305, 21.019281]
        //   ],
        //   speedIntervel: 30,
        //   lineWidth: 5,
        //   lineColor: '#ffd17a',
        //   flowLineWidth: 5,
        //   flowLineColor: "#ffffda",
        //   flowLineTrail: 0.98 ,
        //   isCut: true,
        //   tooltip:{
        //     fontSize: 14,
        //     fontColor: "#fff",
        //     text: '河流1',
        //     backgroundColor: "rgba(0,0,0,0.5)",
        //     visible: (zoom) => zoom > 5
        //   }
        // },
      ],
      trajectoryConfigure: [
        // {
        //   lineData: [
        //     [113.38, 22.25],
        //     [115.37402, 22.815887],
        //     [117.342531, 23.7676],
        //     [118.685534, 24.897055],
        //     [120.13892, 30.302955],
        //     [120.157317, 33.39601],
        //     [119.495015, 35.484064],
        //     [117.176955, 39.027086],
        //     [117.232147, 39.041435],
        //     [116.349077, 39.939502]
        //   ],
        //   pointData: [
        //     [113.38, 22.25],
        //     [115.37402, 22.815887],
        //     [117.342531, 23.7676],
        //     [118.685534, 24.897055],
        //     [120.13892, 30.302955],
        //     [120.157317, 33.39601],
        //     [119.495015, 35.484064],
        //     [117.176955, 39.027086],
        //     [117.232147, 39.041435],
        //     [116.349077, 39.939502]
        //   ],
        //   styles: { pointColor: 'pink' },
        //   highAltitude: { text: 100, position: 0 },
        //   animationType: 'streamer',
        //   setLineOverlayHtml: e => {
        //     return `<div style="color:skyblue;background:rgba(0,0,0,.5);padding:5px">线段1（${e}）</div>`
        //   },
        //   setPointOverlayHtml:e=>{
        //     return `<div style="color:skyblue;background:rgba(0,0,0,.5);padding:5px">线段1的点（${e}）</div>`
        //   }
        // },
        {
          lineData: [
            [113.38, 22.25],
            [110.927049, 21.704353],
            [109.843908, 21.504338],
            [109.105716, 21.536617],
            [108.664181, 22.030654],
            [108.369824, 22.872906],
            [108.894147, 23.815744],
            [109.933595, 24.364677],
            [111.566355, 24.423651],
            [112.449425, 24.196028],
            [113.061135, 23.722613],
            [113.38, 22.25],
            [113.468175, 21.882624],
            [113.60734, 21.672111],
            [114.201767, 21.036555],
            [114.56407, 20.950164],
            [114.86407, 20.950164],
            [115.986305, 21.019281]
          ],
          pointData: [
            [113.38, 22.25],
            [110.927049, 21.704353],
            [109.843908, 21.504338],
            [109.105716, 21.536617],
            [108.664181, 22.030654],
            [108.369824, 22.872906],
            [108.894147, 23.815744],
            [109.933595, 24.364677],
            [111.566355, 24.423651],
            [112.449425, 24.196028],
            [113.061135, 23.722613],
            [113.38, 22.25],
            [113.468175, 21.882624],
            [113.60734, 21.672111],
            [114.201767, 21.036555],
            [114.56407, 20.950164],
            [114.86407, 20.950164],
            [115.986305, 21.019281]
          ],
          setLineOverlayHtml: e => {
            return `<div style="color:skyblue;background:rgba(0,0,0,.5);padding:5px">线段2（${e}）</div>`
          },
          setPointOverlayHtml:e=>{
            return `<div style="color:skyblue;background:rgba(0,0,0,.5);padding:5px">线段2的点（${e}）</div>`
          }
        }
      ],
      backgroudOptions: [
        {
          type: 'thirdPart',
          sourceUrl: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=f11b79a9c885650002c93f600013e969'
        },
        {
          type: 'thirdPart',
          sourceUrl: 'https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=f11b79a9c885650002c93f600013e969'
        }
      ]
    }
  }
}
</script>
```

:::

&nbsp;

## 轨迹线有两种形式

&nbsp;
### 1、通过trajectoryConfigure属性传数据（地图左侧带箭头的线）

### trajectoryConfigure 属性

| 参数           | 说明                   | 类型                      | 可选值 | 默认值 |
| -------------- | ---------------------- | ------------------------- | ------ | ------ |
| lineData       | 线条数据配置           | Array                     |        | —      |
| pointData      | 圆点数据配置           | Array                     | —      | —      |
| styles         | 点位/线条样式          | Object                    | —      | —      |
| highAltitude   | 展示线条文本           | Object                    | —      | —      |
| setPointOverlayHtml | 鼠标移入点位展示的信息，参数为坐标数据 | Function(需返回 dom 元素) | —      | —      |
| setLineOverlayHtml | 鼠标移入线展示的信息，参数为坐标数据 | Function(需返回 dom 元素) | —      | —      |
| animationType | 轨迹上上的动画效果类型 | String | `arrow`, `streamer` | `arrow` |
| radio | 线上动画的个数，即箭头或圆点的个数 | Number | — | 动画类型为`arrow`自动计算， 为`streamer`时为1 |
| arrowOption | 动画类型为`arrow`用于配置动画效果的相关参数 | Object | — | — |
| streamerOption | 动画类型为`arrow`用于配置动画效果的相关参数 | Object | — | — |

### styles 属性

| 参数       | 说明     | 类型   | 可选值                 | 默认值  |
| ---------- | -------- | ------ | ---------------------- | ------- |
| lineColor  | 线条颜色 | String | ---------------------- | #1296DB |
| lineWidth  | 线条宽度 | Number | ---------------------- | 6       |
| pointColor | 圆点颜色 | String | ---------------------- | #fff    |
| pointSize  | 圆点大小 | Number | ---------------------- | 2       |

### highAltitude 属性

| 参数     | 说明                     | 类型   | 可选值      | 默认值         |
| -------- | ------------------------ | ------ | ----------- | -------------- |
| text     | 线条的尾部/首 展示的文本 | String | ----------- | -------------- |
| position | 位置(首/尾)              | Number | 0/1         | 0              |

### arrowOption 属性

| 参数     | 说明                     | 类型   | 可选值      | 默认值         |
| -------- | ------------------------ | ------ | ----------- | -------------- |
| icon     | 动画图标路径，图片为svg格式 | String | ----------- | 箭头图标 |
| scale | 缩放              | Number | —         | 0.04            |
| color | 图标颜色              | String | —       |     '#fff'      |

### streamerOption 属性

| 参数     | 说明                     | 类型   | 可选值      | 默认值         |
| -------- | ------------------------ | ------ | ----------- | -------------- |
| fillStyle  | 流光动画圆点填充色 | String | ----------- | 'rgba(255,255,255,0.8)' |
| shadowColor | 流光动画圆点阴影颜色     | String | —         | 'rgba(255,255,255,0.8)'    |
| shadowBlur | 流光动画圆点阴影大小 | Number | — | 6 |


### 2、通过layerDatas属性传输数据（地图右侧金色的线）

### layerDatas 属性

| 参数           | 说明                   | 类型                      | 可选值 | 默认值 |
| -------------- | ---------------------- | ------------------------- | ------ | ------ |
| type       | 类型           | String                     |     flowLineRender   | —      |
| lineData      | 线圆点数据配置           | Array                     | —      | —      |
| speedIntervel   | 速度间隔（值越小，速度越快）          | Number       | —      | 16     |
| lineWidth   | 线宽           | Number                    | —      | 5     |
| lineColor   | 线颜色           | Number                    | —      | #ffd17a      |
| flowLineWidth   | 流动线宽           | Number                    | —      | 5      |
| flowLineColor   | 流动线颜色           | String                    | —      | #ffffda     |
| flowLineTrail   | 流动线拖尾长度（值越大拖尾越长）      | Number       | 范围0-1     | 0.98      |
| isCut   | 是否在lineData基础下再切分线           | Boolean                    | —      |  false     |
| index   | 层级           | Number                    | —      | 1     |
| tooltip   | 标签           | Object                    | —      |  看下方      |

### tooltip 标签属性

| 参数           | 说明                   | 类型                      | 可选值 | 默认值 |
| -------------- | ---------------------- | ------------------------- | ------ | ------ |
| fontSize       | 字体大小，如果设置函数，函数会以当前地图的zoom作为参数，可以根据zoom层级动态设置字体大小  | Number或Function           |    —    | 14     |
| fontColor       | 类型      | String           |    —    | #fff     |
| text       | 文字内容     | String          |    —    | —      |
| backgroundColor  | 文字背景    | String           |     —   | rgba(0,0,0,0.5)      |
| visible  | 是否显示文字标签；如果设置函数，函数会以当前地图的zoom作为参数，可以根据zoom层级设置是否显示     | Boolean或Function        |  —      | (zoom) => zoom > 5（表示地图缩放zoom大于5就显示）     |