# 时间轴s-time-axis

::: demo 测试

```html
<div>
  <s-time-axis :range="range" @change="onTimeAxisChange" :is-scale="false" :is-switch="true"></s-time-axis>
</div>

<script>
export default {
  data() {
    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(startDate.getDate())
    endDate.setDate(endDate.getDate() + 7)
    return {
      range: [startDate, endDate]
    }
  },
  methods: {
    onTimeAxisChange(time) {
      const date = new Date()
      console.log(time)
    }
  }
}
</script>
```

:::

### 属性

| 参数            | 说明     | 类型        | 可选值    | 默认值 |
| --------------- | -------- | ----------- | --------- | ------ |
| range           | 范围     | Array<Date> | -         | 七日前 |
| unit            | 单位类型 | String      | day、hour | day    |
| speed           | 播放速度 | Number      | -         | 2000   |
| initialDate     | 初始时间 | Date        | -         | 当前值 |
| initialHourDate | 初始时间 | Date        | -         | 当前值 |
| isSwitch | 是否显示切换按钮 | Boolean        | -         | true |
| isScale | 是否显示刻度 | Boolean        | -         | false |
| scaleInterval | 刻度间隔 | Number        | -         | 4 |
| height | 高度 | String        | -         |  无刻度40px，有刻度是60px

### 事件

| 名称   | 说明         | 参数      | 默认值 |
| ------ | ------------ | --------- | ------ |
| change | 时间选择事件 | type,date |        |
