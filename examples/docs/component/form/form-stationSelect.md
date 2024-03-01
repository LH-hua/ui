#  站点选择器 stationSelect

基本表单项，`type:'stationSelect'` 站点选择器 基本使用

::: demo

```html
<div>
	<s-form-modal :form-items="formItems"> </s-form-modal>
</div>

<script>
export default {
  computed: {
    // 搜索表单
    formItems() {
      return [
        {
          item: [
            {
              id: 'fol1',
              type: 'stationSelect',
              label: '站点选择器',
              data: [
                // 顶层菜单数据
                { regionName: '北京', regionCode: '110000', parentCode: '', regionType: null, rank: 1 },
                { regionName: '天津', regionCode: '120000', parentCode: '', regionType: null, rank: 2 },
                { regionName: '河北', regionCode: '130000', parentCode: '', regionType: null, rank: 3 },
                { regionName: '重庆', regionCode: '500000', parentCode: '', regionType: null,rank: 4 },
                // 二级菜单数据
                { regionName: '北京市', regionCode: '110000', parentCode: '110000', regionType: null },
                { regionName: '天津市', regionCode: '120000', parentCode: '120000', regionType: null },
                { regionName: '石家庄市', regionCode: '130100', parentCode: '130000', regionType: null },
                { regionName: '重庆市', regionCode: '500000', parentCode: '500000', regionType: null },
                // 三级菜单数据
                { regionCode: '54514', regionName: '丰台', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54419', regionName: '怀柔', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54499', regionName: '昌平', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54527', regionName: '西青', parentCode: '120000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54622', regionName: '津南', parentCode: '120000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '53693', regionName: '井陉', parentCode: '130100', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57516', regionName: '沙坪坝', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57348', regionName: '奉节', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57522', regionName: '涪陵', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
```

:::

事件

::: demo

```html
<div>
	<s-form-modal :form-items="formItems"> </s-form-modal>
</div>

<script>
export default {
  // 计算属性
  computed: {
    // 搜索表单
    formItems() {
      return [
        {
          item: [
            {
              id: 'fol1',
              type: 'stationSelect',
              label: '站点选择器',
              data: [
                // 顶层菜单数据
                { regionName: '北京', regionCode: '110000', parentCode: '', regionType: null, rank: 1 },
                { regionName: '天津', regionCode: '120000', parentCode: '', regionType: null, rank: 2 },
                { regionName: '河北', regionCode: '130000', parentCode: '', regionType: null, rank: 3 },
                { regionName: '重庆', regionCode: '500000', parentCode: '', regionType: null,rank: 4 },
                // 二级菜单数据
                { regionName: '北京市', regionCode: '110000', parentCode: '110000', regionType: null },
                { regionName: '天津市', regionCode: '120000', parentCode: '120000', regionType: null },
                { regionName: '石家庄市', regionCode: '130100', parentCode: '130000', regionType: null },
                { regionName: '重庆市', regionCode: '500000', parentCode: '500000', regionType: null },
                // 三级菜单数据
                { regionCode: '54514', regionName: '丰台', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54419', regionName: '怀柔', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54499', regionName: '昌平', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54527', regionName: '西青', parentCode: '120000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54622', regionName: '津南', parentCode: '120000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '53693', regionName: '井陉', parentCode: '130100', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57516', regionName: '沙坪坝', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57348', regionName: '奉节', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57522', regionName: '涪陵', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
              ],
              field: ['regionName'],
              onGetFullData: value => {
                console.log(value)
              },
              onChange: value => {
                console.log(value)
              }
            }
          ]
        }
      ]
    }
  }
}
</script>
```

:::

### 属性

| 参数           | 说明                 | 类型   | 可选值              | 默认值                   |
| -------------- | -------------------- | ------ | ------------------- | ------------------------ |
| data           | 数据列表             | Array  | —                   | —                        |
| disableStation | 禁用站点列表         | Array  | —                   | —                        |
| mode           | 模式 单选、多选      | String | ` checkbox / radio` | checkbox                 |
| listSize       | 弹窗大小             | Object | —                   | `width: 650,height: 400` |
| tabsData       | 默认选中的 tabs 属性 | Array  | —                   | —                        |
| field          | 需要返回的字段       | Array  | —                   | —                        |
| styles         | 输入框样式           | String | —                   | —                        |
| maxTagCount   | tag数量显示限制             | Number  |               | ---    |

### data 数据列表

| 事件名称           | 说明     |
| ------------------ | -------- |
| regionName         | 项名称   |
| parentCode         | 父 id    |
| regionCode         | 子 id    |
| dictionaryItemText | tab 名称 |
| regionType         | tab 类型 |
| rank               | 排序     |

### 事件

| 事件名称      | 说明             | 回调参数 |
| ------------- | ---------------- | -------- |
| onChange      | 内容变化事件     | {}       |
| onGetFullData | 确认按钮触发事件 | {}       |
