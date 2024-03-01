# echarts 文档配置

---

### 颜色规定

以下为图形展示规定颜色，项目应用时必需遵守以下规定。

空气质量等级统一按照以下颜色：

::: demo

```html
<div>
  <div class="item">优 <div class="color-item" style="background-color: #00ff00;">#00ff00</div></div>
  <div class="item">良 <div class="color-item" style="background-color: #ffff00;">#ffff00</div></div>
  <div class="item">轻度污染 <div class="color-item" style="background-color: #ff7e00;">#ff7e00</div></div>
  <div class="item">中度污染 <div class="color-item" style="background-color: #ff0000; color: #FFFFFF">#ff0000</div></div>
  <div class="item">严重污染 <div class="color-item" style="background-color: #9b004d; color: #FFFFFF">#9b004d</div></div>
  <div class="item">重度污染 <div class="color-item" style="background-color: #7e0023; color: #FFFFFF">#7e0023</div></div>
  <div class="item">无数据 <div class="color-item" style="background-color: #BEBEBE;">#BEBEBE</div></div>
</div>

<style lang="less" scoped>
  .item {
    margin: 10px;
    display: inline-block;
  }
  .color-item {
    width: 100px;
    height: 30px;
    vertical-align: middle;
    text-align: center;
    display: inline-block;
    line-height: 30px;
    margin-left: 20px;
  }
</style>

```

:::

污染物统一按照以下颜色：

::: demo

```html
<div>
  <div class="item">SO₂ <div class="color-item" style="background-color: #2b99fd; color: #FFFFFF">#2b99fd</div></div>
  <div class="item">NO <div class="color-item" style="background-color: #4bd9d9;">#4bd9d9</div></div>
  <div class="item">NO₂ <div class="color-item" style="background-color: #3dbfbf;">#3dbfbf</div></div>
  <div class="item">NOx <div class="color-item" style="background-color: #2fd82f;">#2fd82f</div></div>
  <div class="item">PM₁₀ <div class="color-item" style="background-color: #fcd600;">#fcd600</div></div>
  <div class="item">PM₂.₅ <div class="color-item" style="background-color: #fa6982;">#fa6982</div></div>
  <div class="item">CO <div class="color-item" style="background-color: #8a2be2; color: #FFFFFF">#8a2be2</div></div>
  <div class="item">O₃ <div class="color-item" style="background-color: #1967bc; color: #FFFFFF">#1967bc</div></div>
  <div class="item">AQI <div class="color-item" style="background-color: #f34ac2;">#f34ac2</div></div>
  <div class="item">其他监测项1 <div class="color-item" style="background-color: #094483; color: #FFFFFF">#094483</div></div>
  <div class="item">其他监测项2 <div class="color-item" style="background-color: #837971; color: #FFFFFF">#837971</div></div>
  <div class="item">其他监测项3 <div class="color-item" style="background-color: #614a4e; color: #FFFFFF">#614a4e</div></div>
  <div class="item">其他监测项4 <div class="color-item" style="background-color: #412e31; color: #FFFFFF">#412e31</div></div>
</div>

<style lang="less" scoped>
  .item {
    margin: 10px;
    display: inline-block;
  }
  .color-item {
    width: 100px;
    height: 30px;
    vertical-align: middle;
    text-align: center;
    display: inline-block;
    line-height: 30px;
    margin-left: 20px;
  }
</style>

```

:::

图形默认颜色如下：

::: demo

```html
<div>
  <div class="item"><div class="color-item" style="background-color: #8cc220;">#8cc220</div></div>
  <div class="item"><div class="color-item" style="background-color: #f0bd0c;">#f0bd0c</div></div>
  <div class="item"><div class="color-item" style="background-color: #c09453;">#c09453</div></div>
  <div class="item"><div class="color-item" style="background-color: #a7655b; color: #FFFFFF">#a7655b</div></div>
  <div class="item"><div class="color-item" style="background-color: #863c8c; color: #FFFFFF">#863c8c</div></div>
  <div class="item"><div class="color-item" style="background-color: #c83752; color: #FFFFFF">#c83752</div></div>
  <div class="item"><div class="color-item" style="background-color: #d30068; color: #FFFFFF">#d30068</div></div>
  <div class="item"><div class="color-item" style="background-color: #87c9ec;">#87c9ec</div></div>
  <div class="item"><div class="color-item" style="background-color: #0094d9; color: #FFFFFF">#0094d9</div></div>
  <div class="item"><div class="color-item" style="background-color: #98d1c0;">#98d1c0</div></div>
  <div class="item"><div class="color-item" style="background-color: #007a60; color: #FFFFFF">#007a60</div></div>
  <div class="item"><div class="color-item" style="background-color: #00ae9a;">#00ae9a</div></div>
</div>

<style lang="less" scoped>
  .item {
    margin: 10px;
    display: inline-block;
  }
  .color-item {
    width: 100px;
    height: 30px;
    vertical-align: middle;
    text-align: center;
    display: inline-block;
    line-height: 30px;
    margin-left: 20px;
  }
</style>

```

:::

### API 属性

| 参数        | 说明         | 类型     | 描述/可选值                          | 默认值   |
| ----------- | ------------ | -------- | ------------------------------------ | -------- | ----------------------------------------------------- | ---- | ---------- | --------- | --- | ---------- | -------- | --------- | ----- | ---------- | ---- | --- | --- |
| chartData   | 数据源       | `Array`  | —                                    | —        |
| chartAxis   | x 轴坐标名称 | `Array`  | —                                    | —        |
| chartYaxis  | y 轴坐标名称 | `Array`  | —                                    | —        |
| title       | 标题         | `String` | —                                    | —        |
| subtext     | 副标题       | `String` | —                                    | —        |
| chartType    | 图表类型     | `String` | `bar                                 | stripBar | stackBar                                              | line | smoothLine | stackLine | pie | annularPie | polarPie | nestedPie | gauge | scatterMap | many | visualMap | scatterVisualMap `   | bar |
| chartColor | 图表配色     | `Array | String`  | 可以直接传入颜色值 | 见上方图形默认颜色   |
| hotGraph    | 热力图配置   | `Array`  | 配置热力图的颜色范围，具体项目见下表 | []       |
| info        | 内置配置     | `Object` | 配置描述，具体项见下表               |          |
| extraOption | 自定义配置   | `Object` | 可以直接设置 echarts 配置修改        | 空对象   |
| mapOption | visualMap配置   | `Object` | visualMap 配置修改        | 空对象   |
| csvExport | 自定义csv导出函数 | `Function()` | - | |
| abilityApi | | | | |

### chartData 数据源

支持echart原生配置series属性，也可以用以下属性

| 参数   | 对于原生属性    | 说明         | 类型      | 适用图表类型                 | 描述/可选值                                                                    | 默认值 |
| ----------| ---- | ------------ | --------- | ---------------------------- | ------------------------------------------------------------------------------ | ------ |
| name    | name   | 名称         | `String`  | 通用                         | 数据集名称                                                                     | —      |
| value   | value/data  | 数据         | `Array`   | 通用                         | 数据集合                                                                       | []     |
| stack   |  stack  | 堆积集合     | `String`  | `stackBar`/`stackLine`       | stack 集合名称                                                                 | —      |
| siteName | stack | 堆积集合 | `String` | `graphicLinkage` | | |
| color   |  itemStyle.normal.color  | 颜色         | `String`  | 通用                         | 设置单系列的颜色                                                               | —      |
| symbol  | symbol   | 图案         | `String`  | 通用                         | `'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'` | —      |
| isSymbol  | showSymbol  | 是否显示图案 | `Boolean` | 通用                         |                                                                                | 'true' |
| symbolSize | symbolSize | 图案大小     | `Number`  | 通用                         |                                                                                | —      |
| type     | type  | 类型         | `String`  | 在 chartType 等于是 many 使用 | `bar`/`line`/`stackBar`/`stackLine`/`winy`/`followWiny`                        | —      |
| gridInex | gridInex | 对于坐标系的所有 | `Number` | 包含x、y坐标系的图形 | | 0 |
| yAxisIndex |  yAxisIndex | 对于的y轴索引 | `Number` | 包含x、y轴的图形 | | 0 |
| width | itemStyle.normal.lineStyle.width | 线条的粗细 | `Number` | 折线图 | | 2.5 |

### chartYaxis Y 轴

支持echart原生配置yAxis属性，也可以用以下属性

| 参数  | 对于原生属性    | 说明                       | 类型      | 适用图表类型 | 描述/可选值            | 默认值                  |
| -------- | ---- | -------------------------- | --------- | ------------ | ---------------------- | ----------------------- |
| name   | name   | 名称                       | `String`  |              | 数据集名称             | —                       |
| nameLocation | nameLocation | 名称位置                   | `String`  |              | `start` `middle` `end` | 'middle'                |
| nameGap  | nameGap | 坐标轴名称与轴线之间的距离 | `Number`  |              |                        | 50                      |
| color   | nameTextStyle.color/axisLine.lineStyle.color  | 坐标轴线、文字颜色               | `String`  |     `many`         |                        | 默认取 tricksColor 颜色 |
| show    | axisLine.show | 坐标轴线展示               | `Boolean` |  `many`            |                        | false                   |
| unit    | - | 坐标轴刻度单位                 | `String`  |  `many`        |                        | ''                      |
| max     | max  | 坐标轴的最大值             | `Number`  |              |                        | 300                     |
| min     | min  | 坐标轴的最小值             | `Number`  |              |                        | 0                       |

### markLine

| 参数      | 说明       | 类型     | 描述/可选值 | 默认值                    |
| --------- | ---------- | -------- | ----------- | ------------------------- | ------- | ----------- | -------------- | ----------------- | ------------ | --------------- | ------------------ | --------- | ------------ | ---------------- | ---------------- |
| name      | 名称       | `String` |             | —                         |
| type      | 线条类型   | `String` | `solid      | dotted`                   | 'solid' |
| color     | 线条颜色   | `String` |             | 默认跟着 tricksColor 配色 |
| fontColor | 字体颜色   | `Number` |             | null                      |
| width     | 线条粗细   | `String` |             | 1                         |
| position  | 位置       | `String` | `start      | middle                    | end     | insideStart | insideStartTop | insideStartBottom | insideMiddle | insideMiddleTop | insideMiddleBottom | insideEnd | insideEndTop | insideEndBottom` | 'insideStartTop' |
| padding   | 边距       | `Array`  |             | [20, 8]                   |
| level     | 优先级     | `String` |             | -1                        |
| value     | Y 轴对应值 | `Number` |             |                           |

### hotGraph

| 参数  | 说明                             | 类型     |
| ----- | -------------------------------- | -------- |
| lt    | 小于，little than                | `Number` |
| gt    | 大于，greater than               | `Number` |
| lte   | 小于等于 lettle than or equals   | `Number` |
| gte   | 大于等于，greater than or equals | `Number` |
| value | 指定值, 等于                           | `Number` |
| color | 颜色                             | `String` |

### mapOption(图标类型为visualMap、scatterVisualMap可用)

| 参数  | 说明                             | 类型     |
| ----- | -------------------------------- | -------- |
| name    | 地图名称 (必填)               | `String` |
| bgColor    | 地图底色（选填)               | `String` |
| tooltipFormatter   |  tooltip格式化工具（选填)  | `Function` |
| pieces   | 自定义范围标注解释颜色来表达边界（选填) | `Array` |
| geoData | 地图地理json数据(必填)                           | `Object` |

### info 内置配置

| 参数      | 说明         | 类型      | 描述/可选值 | 默认值 |
| --------- | ------------ | --------- | ----------- | ------ | ------ |
| renderer  | 渲染方式     | `String`  | `canvas     | svg`   | canvas |
| xUnit     | X 轴单位名称 | `String`  | 单系列使用  | null   |
| yUnit     | Y 轴单位名称 | `String`  | 单系列使用  | null   |
| isZoom    | 显示缩放     | `Boolean` | ------      | false  |
| isLegend  | 显示图例     | `Boolean` | ------      | true   |
| isTooltip | 显示提示框   | `Boolean` | ------      | true   |
| isToolbox | 显示工具栏   | `Boolean` | ------      | false  |
| isDownloadImg | 显示图片导出   | `Boolean` | ------      | true  |
| isDownloadCsv | 显示csv导出   | `Boolean` | ------      | true  |

### abilityApi 额外功能（交互/展示）

| 参数      | 说明         | 类型      | 描述/可选值 | 默认值 |
| --------- | ------------ | --------- | ----------- | ------ | ------ |
| name  | 对应功能的方法名     | `String`  | `hotPowerLabel  | hotPowerAddWind`   |  |
| params  | 传入方法的参数     | `Object`  |  非必传  |  |

### toolbox 在小尺寸下 显示不全的情况下

` tooltip: { trigger: 'axis', appendToBody: true },`

&nbsp;

### 支持自定义无数据插槽

```
<s-echarts>
  <template slot='empty'>暂无数据</template>
</s-echarts>
```
