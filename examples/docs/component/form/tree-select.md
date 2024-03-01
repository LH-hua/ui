# 树形站点组件

---

### 概述

基于 `antUI` 的 input 和 tree 组件封装

::: demo

```html
<div>
  <s-form-modal :form-items="formItems" ref="form"></s-form-modal>
  <a-button @click="getForm" type="primary">获取表单</a-button>
</div>

<script>
export default {
  methods:{
    getForm(){
      console.log('表单值',this.$refs.form.getForm())
    }
  },
  computed: {
    formItems() {
      return [
        {
          item: [
            {
              id: 'fol1',
              type: 'treestationselect',
              label: '树形站点选择器',
              maxTagCount: 2,
              value: {
                value: ['500110'],
                key: 'district'
              },
              data: {
                defaultKey: 'district',
                source: [
                  {
                    key: 'city',
                    name: '城市',
                    type: 'tree',
                    data: [
                      { parent: null, level: 15, title: '全国', value: '0' },
                      { parent: '0', level: 13, title: '北京', value: '110000' },
                      { parent: '0', level: 13, title: '重庆', value: '500000' },
                      { parent: '0', level: 13, title: '河北', value: '130000' },

                      { parent: '110000', level: 9, title: '北京市', value: '110000' },
                      { parent: '500000', level: 9, title: '重庆市', value: '500000' },
                      { parent: '130000', level: 9, title: '石家庄', value: '130100' },
                    ],
                    multiple: false,
                    defaultCode: ['110000'],
                    level: 9,
                  },
                  {
                    key: 'district',
                    name: '片区',
                    type: 'single',
                    data: [
                      {
                        title: "沙坪坝",
                        value: "57516"
                      },
                      {
                          title: "奉节",
                          value: "57348"
                      },
                      {
                          title: "涪陵",
                          value: "57522"
                      },
                      {
                          title: "黔江",
                          value: "57536"
                      },
                      {
                          title: "巴南",
                          value: "57518"
                      },
                      {
                          title: "北碚",
                          value: "57511"
                      },
                      {
                          title: "长寿",
                          value: "57520"
                      },
                      {
                          title: "城口",
                          value: "57333"
                      },
                      {
                          title: "大足",
                          value: "57502"
                      },
                    ],
                    defaultCode: ['57511']
                  },
                  {
                    key: 'site',
                    name: '站点',
                    type: 'tree',
                    data: [
                      { parent: null, level: 15, title: '全国', value: '0' },
                      { parent: '0', level: 13, title: '北京', value: '110000' },
                      { parent: '110000', level: 9, title: '北京市', value: '110000' },
                      { parent: '110000', level: 7, title: '丰台', value: '54514',groupType:'国控站点' },
                      { parent: '110000', level: 7, title: '怀柔', value: '54419',groupType:'国控站点' },
                      { parent: '110000', level: 7, title: '昌平', value: '54499',groupType:'国控站点' },

                      { parent: '0', level: 13, title: '天津', value: '120000' },
                      { parent: '120000', level: 9, title: '天津市', value: '120000' },
                      { parent: '120000', level: 7, title: '西青', value: '54527',groupType:'国控站点' },

                      { parent: '0', level: 13, title: '河北', value: '130000' },
                      { parent: '130000', level: 9, title: '石家庄市', value: '130100' },
                      { parent: '130100', level: 7, title: '井陉', value: '53693',groupType:'国控站点' },

                      { parent: '0', level: 13, title: '重庆', value: '500000' },
                      { parent: '500000', level: 9, title: '重庆市', value: '500000' },
                      { parent: '500000', level: 7, title: '沙坪坝', value: '57516',groupType:'省控站点' },
                      { parent: '500000', level: 7, title: '奉节', value: '57348' ,groupType:'国控站点'},
                      { parent: '500000', level: 7, title: '涪陵', value: '57522' ,groupType:'省控站点'},
                    ],
                    level: 7
                  }
                ]
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

### 事件使用示例

::: demo

```html
<div>
	<s-tree-select :data="treeData" @change="onVisible" @dos-change="dosChange" :tooltip-visible="false"></s-tree-select>
</div>
<script>
export default {
  data() {
    return {
      treeData: {
        source: [
          {
            key: 'site',
            name: '站点',
            type: 'tree',
            data: [
              { parent: null, level: 15, title: '全国', value: '0' },
              { parent: '0', level: 13, title: '北京', value: '110000' },
              { parent: '110000', level: 9, title: '北京市', value: '110000' },
              { parent: '110000', level: 7, title: '丰台', value: '54514' },
              { parent: '110000', level: 7, title: '怀柔', value: '54419' },
              { parent: '110000', level: 7, title: '昌平', value: '54499' },

              { parent: '0', level: 13, title: '天津', value: '120000' },
              { parent: '120000', level: 9, title: '天津市', value: '120000' },
              { parent: '120000', level: 7, title: '西青', value: '54527' },

              { parent: '0', level: 13, title: '河北', value: '130000' },
              { parent: '130000', level: 9, title: '石家庄市', value: '130100' },
              { parent: '130100', level: 7, title: '井陉', value: '53693' },

              { parent: '0', level: 13, title: '重庆', value: '500000' },
              { parent: '500000', level: 9, title: '重庆市', value: '500000' },
              { parent: '500000', level: 7, title: '沙坪坝', value: '57516' },
              { parent: '500000', level: 7, title: '奉节', value: '57348' },
              { parent: '500000', level: 7, title: '涪陵', value: '57522' },
            ],
            level: 7,
            defaultCode: ['54514','54527']
          }
        ]
      }
    }
  },
  methods: {
    onVisible(obj) {
      console.log(obj)
    },
    dosChange(target, index) {
      console.log(target, index)
    }
  }
}
</script>
```

:::

### 组件属性

| 参数        | 说明             | 类型   | 可选值 | 默认值       |
| ----------- | ---------------- | ------ | ------ | ------------ |
| tooltipVisible      | tooltip显隐       | Boolean  | ------ | true           |
| maxTagCount   | tag数量显示限制             | Number  |               | ---    |
| data   | 数据             | Object  |               | ---    |
| panelWidth   | 选择面板宽度     | String  |               | 600px    |

### data 主要数据源 (object)

| 参数        | 说明             | 类型   | 可选值 | 默认值       |
| ----------- | ---------------- | ------ | ------ | ------------ |
| defaultKey  | 默认展示的站点   | string | ------ | 第 1 项      |
| inputWidth  | 选择框宽度       | string |        | '180px'      |
| placeholder | 选择框的提示信息 | string | ------ | '--请选择--' |
| source      | 主要数据源       | Array  | ------ | []           |

### data.source 主要配置 (array)

| 参数        | 说明                               | 类型    | 可选值        | 默认值 |
| ----------- | ---------------------------------- | ------- | ------------- | ------ |
| key         | 用于绑定展示/切换                  | string  | ------        | 必填   |
| name        | 站点名；用于顶部切换栏显示         | string  | ------        | 必填   |
| type        | 数据的展示类型                     | string  | tree / single | 必填   |
| multiple    | 是否多选                           | boolean | ---           | true   |
| data        | 展示的数据                         | array   | ---           | ------ |
| defaultCode | 默认选中的项(key)                  | array   | ---           | ------ |
| level       | 设置右侧展示项；取 data 项的 level | number  | ---           | 9      |
| expandCode  | 右侧默认展示的父级站点             | string  |               | ---    |
| groupType   | 右侧站点分组             | string  |               | ---    |
| leftWidth   | tree展示类型左侧宽度             | string  |               | 35%    | 
| rightWidth   | tree展示类型右侧宽度             | string  |               | 65%    | 


### data.source.data 主要配置 (array)

| 参数   | 说明              | 类型   | 可选值 | 默认值              |
| ------ | ----------------- | ------ | ------ | ------------------- |
| parent | 父级              | string | ------ | type 为 tree 时必填 |
| level  | 该项等级          | number | ------ | type 为 tree 时必填 |
| title  | 显示名称          | string | ------ | 必填                |
| value  | 绑定该项的 key 值 | string | ------ | 必填                |

### 事件

| 事件名称   | 说明               | 回调参数                         |
| ---------- | ------------------ | -------------------------------- |
| change | 点击确定/取消 触发 | function(obj) |
| dos-change | 当前/已选 切换触发 | function(item)                   |
