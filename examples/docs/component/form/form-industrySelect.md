#  行业选择器 industrySelect

基本表单项，`type:'industrySelect'` 行业选择器 基本使用


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
              type: 'industrySelect',
              label: '行业选择器',
              data: [
                {
                  label: '涉VOCs产污环节',
                  value: '涉VOCs产污环节',
                  parentId: '0'
                },
                {
                  label: '锅炉类行业',
                  value: '锅炉类行业',
                  parentId: '0'
                },
                {
                  label: '印刷和记录媒介复制业+造纸和纸制品业',
                  value: '10000A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '家具制造业',
                  value: '10001A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '化学原料和化学制品制造业',
                  value: '10002A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '金属表面喷涂',
                  value: '10003A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '铝型材',
                  value: '10004A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '橡胶和塑料制品业',
                  value: '10005A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '制鞋',
                  value: '10006A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '汽修',
                  value: '10007A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '人造石',
                  value: '10008A',
                  parentId: '涉VOCs产污环节'
                },
                {
                  label: '钢铁行业',
                  value: '10009A',
                  parentId: '锅炉类行业'
                },
                {
                  label: '金属铸造行业',
                  value: '10010A',
                  parentId: '锅炉类行业'
                },
                {
                  label: '铝压延加工行业',
                  value: '10011A',
                  parentId: '锅炉类行业'
                },
                {
                  label: '陶瓷行业',
                  value: '10012A',
                  parentId: '锅炉类行业'
                },
                {
                  label: '砖瓦行业',
                  value: '10013A',
                  parentId: '锅炉类行业'
                }
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

### 属性

| 参数     | 说明                 | 类型   | 可选值 | 默认值                   |
| -------- | -------------------- | ------ | ------ | ------------------------ |
| data     | 数据列表             | Array  | —      | —                        |
| listSize | 弹窗大小             | Object | —      | `width: 650,height: 400` |
| tabsData | 默认选中的 tabs 属性 | Array  | —      | —                        |
| field    | 需要返回的字段       | Array  | —      | —                        |
| styles   | 输入框样式           | String | —      | —                        |

### data 数据列表

| 事件名称 | 说明   |
| -------- | ------ |
| label    | 项名称 |
| parentId | 父 id  |
| value    | 子 id  |
| rank     | 排序   |
