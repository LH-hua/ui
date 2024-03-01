#  数字输入框 number

基本表单项，`type:'number'` input 基本使用

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
          item: [{ id: 'fol1', type: 'number', label: '基本使用', value: '' }]
        }
      ]
    }
  }
}
</script>
```

输入框的基础参数

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
            { id: 'fol1', type: 'number', label: '输入最大长度', value: '设置最多可输入10', maxLength: 10 },
            { id: 'fol2', type: 'number', label: '禁用', disabled: true },
            { id: 'fol3', type: 'number', label: '清除图标', allowClear: false },
            { id: 'fol5', type: 'number', label: 'style样式', value: '添加style配置 修改样式', style: 'color:red' }
          ]
        }
      ]
    }
  }
}
</script>
```

:::

输入框的基础参数

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
            { id: 'fol1', type: 'number', label: '最大值10', value: '', max: 10 },
            { id: 'fol2', type: 'number', label: '最小值10', min: 10 },
            { id: 'fol3', type: 'number', label: '禁用', disabled: true },
            { id: 'fol4', type: 'number', label: 'style样式', value: '12', style: 'color:red' }
          ]
        },
        {
          item: [
            {
              id: 'fol5',
              type: 'number',
              label: '格式化展示',
              value: '1000',
              formatter: value => {
                return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              },
              parser: value => {
                return value.replace(/\$\s?|(,*)/g, '')
              }
            },
            {
              id: 'fol6',
              type: 'number',
              label: '格式化展示',
              min: 0,
              max: 100,
              formatter: value => {
                return `${value}%`
              },
              parser: value => {
                return value.replace('%', '')
              }
            }
          ]
        },
        {
          item: [
            {
              id: 'fol7',
              type: 'number',
              label: '数值精度',
              precision: 2,
              value: '0'
            },
            {
              id: 'fol8',
              type: 'number',
              label: '步长',
              min: 0,
              max: 10,
              step: 0.1,
              value: '0'
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

输入框的事件

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
              type: 'number',
              label: '内容变化事件',
              max:1000000,
              onChange: () => {
                console.log('内容变化事件')
              }
            },
            {
              id: 'fol2',
              type: 'number',
              label: '失去焦点事件',
              onBlur: () => {
                console.log('失去焦点事件')
              }
            },
            {
              id: 'fol3',
              type: 'number',
              label: '获取焦点事件',
              onFocus: () => {
                console.log('获取焦点事件')
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

`图标 Icon https://www.antdv.com/components/icon-cn/`

| 参数             | 说明                                                       | 类型     | 可选值      | 默认值 |
| ---------------- | ---------------------------------------------------------- | -------- | ----------- | ------ | --- |
| label            | 输入框标题                                                 | String   | —           | —      |
| value            | 输入框内容                                                 | String   | —           | —      |
| placeholder      | 输入字段的提示，默认为 `请输入 + label`                    | String   | —           | —      |
| disabled         | 是否禁用状态，默认为 false                                 | boolean  | true /false | false  |
| max              | 最大值                                                     | Number   | —           | —      |
| min              | 最小值                                                     | Number   | —           | —      |
| formatter        | 指定输入框展示值的格式                                     | Function | —           | —      |
| parser           | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | Function | —           | —      |
| precision        | 数值精度                                                   | Number   | —           | —      |
| decimalSeparator | 小数点                                                     | String   | —           | —      |
| step             | 每次改变步数，可以为小数                                   | number   | string      | —      | —   |

### 事件

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| onChange | 内容变化事件 | {}       |
| onBlur   | 失去焦点事件 | {}       |
| onFocus  | 获取焦点事件 | {}       |
