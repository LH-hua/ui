# 日历 s-calendar

用于日历展示 污染日历类型

::: demo

```html
<div>
  <!-- 根据开始时间 和结束时间 绘制日历 -->
  <s-calendar :range="dataSource.range" :data-source="dataSource.calendar" @on-click="onClick"></s-calendar>
</div>

<script>
export default {
  data() {
    return {
      // 静态数据
      dataSource: {
        range: [this.$moment('2022-01-01').format('YYYY-MM-DD'), this.$moment().format('YYYY-MM-DD')],
        calendar: {
          '2022-01-01': { value: 10, color: '#ffffff',backgroundColor:'#3390f1' },
          '2022-02-11': { value: 10, color: '#ffffff',backgroundColor:'#3390f1' },
          '2022-03-12': { value: 10, color: '#ffffff',backgroundColor:'#3390f1' }
        }
      }
    }
  },
  // 函数集，
  methods: {
    onClick(val) {
      const msg = JSON.stringify(val)
      this.$message.info(`${msg}`)
    }
  }
}
</script>
```

:::

### 属性

| 参数       | 说明 | 类型        | 可选值 | 默认值 |
| ---------- | ---- | ----------- | ------ | ------ |
| range      | 日期范围，数组，按照`YYYY-MM-DD`格式 | Array<string> | -      | 当月   |
| dataSource | 数据 | Object      | -      | {}     |

#### dataSource 日历数据

| 参数  | 类型   | 默认值    |
| ----- | ------ | --------- |
| value | Number | Null      |
| color | String | '#d5d3d6' |
| backgroundColor | String |  |

#### 事件

| 名称    | 说明     | 类型                        |
| ------- | -------- | --------------------------- |
| onClick | 点击事件 | Function() 返回当前选中对象 |
