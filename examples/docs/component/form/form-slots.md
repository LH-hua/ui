#  自定义插槽 slot

基本表单项，`type:'slot'` 自定插槽 基本使用

::: demo

```html
<div style="display:flex">
  <s-form-grop :form-items="formItems" @on-search="onSearch" ref="searchForm">
    <span> 123123123 </span>

    <template slot="action">
      <a-button @click="onPreDay">前一天</a-button>
      <a-button @click="onNextDay">后一天</a-button>
    </template>

    <template slot="inputSlot" slot-scope="obj">
      <span>123123 {{ obj.value }}</span>
    </template>
  </s-form-grop>
</div>

<script>
export default {
  data() {
    return {
      // 下拉 多选 数据源
      downDataSource: {
        stationSelectData: [
          // 顶层菜单数据
          { regionName: '测试数据', regionCode: '0001', parentCode: '', regionType: null, rank: 2 },
          { regionName: '测试数据22', regionCode: '0002', parentCode: '', regionType: null, rank: 1 },
          // 二级菜单数据
          { regionName: '二级数据', regionCode: '1001', parentCode: '0001', regionType: null },
          { regionName: '二级数据222', regionCode: '3001', parentCode: '0002', regionType: null },
          // 三级菜单数据
          { regionCode: '2001', regionName: '测试123', parentCode: '1001', dictionaryItemText: '测试tab', regionType: 2 },
          { regionCode: '2002', regionName: '测色', parentCode: '1001', dictionaryItemText: '123', regionType: 3 },
          { regionCode: '2003', regionName: '测色', parentCode: '3001', dictionaryItemText: '', regionType: 3 }
        ]
      }
    }
  },
  // 计算属性
  computed: {
    // 搜索表单
    formItems() {
      return [
        {
          id: 'demo',
          type: 'slot',
          label: '自定义选择器',
          value: '测试',
          slot: 'action'
        },
        { id: 'fol3', type: 'day', label: '时间' },
        {
          id: 'demo2',
          type: 'slot',
          label: '自定义选择器2',
          value: '测试222',
          itemRender: {
            slot: 'inputSlot'
          }
        },
        { id: 'fol4', type: 'stationSelect', label: '站点选择器', data: this.downDataSource.stationSelectData }
      ]
    }
  },
  // 函数集，
  methods: {
    onSearch(val) {
      console.log(val)
    },
    // 前一天
    onPreDay() {
      const date = this.$refs.searchForm.getFormById('day')
      const day = this.$moment(date).add('day', -1).format('YYYY-MM-DD')
      this.$refs.searchForm.setForm({ day: day })
    },
    // 后一天
    onNextDay() {
      const date = this.$refs.searchForm.getFormById('day')
      const day = this.$moment(date)
        .add('day', +1)
        .format('YYYY-MM-DD')
      this.$refs.searchForm.setForm({ day: day })
    }
  }
}
</script>
```

:::
