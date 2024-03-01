#  输入框 text

基本表单项，`type:'text'` input 基本使用

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
          item: [{ id: 'fol1', type: 'text', label: '基本使用', value: '测试数据',maxLength: 30 }]
        }
      ]
    }
  }
}
</script>
```

:::

在输入框上添加后缀图标

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
            { id: 'fol2', type: 'text', label: '后缀文字', suffixText: 'RMB' },
            { id: 'fol8', type: 'text', label: '后缀图标提示', suffixTooltip: { label: '提示信息2', icon: 'info-circle' } },
            { id: 'fol5', type: 'text', label: '后缀图标', suffixIcon: 'info-circle' },
          ]
        },
        {
          item: [
            { id: 'fol11', type: 'text', label: '后缀标签', suffixNote: '.com' }
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
            { id: 'fol1', type: 'text', label: '输入最大长度', value: '设置最多可输入10', maxLength: 10 },
            { id: 'fol2', type: 'text', label: '禁用', disabled: true },
            { id: 'fol3', type: 'text', label: '清除图标', allowClear: false },
            { id: 'fol5', type: 'text', label: 'style样式', value: '添加style配置 修改样式', style: 'color:red' }
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
              type: 'text',
              label: '内容变化事件',
              onChange: () => {
                console.log('内容变化事件')
              }
            },

            {
              id: 'fol2',
              type: 'text',
              label: '失去焦点事件',
              onBlur: () => {
                console.log('失去焦点事件')
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

| 参数          | 说明                                    | 类型    | 可选值                             | 默认值 |
| ------------- | --------------------------------------- | ------- | ---------------------------------- | ------ |
| label         | 输入框标题                              | String  | —                                  | —      |
| value         | 输入框内容                              | String  | —                                  | —      |
| placeholder   | 输入字段的提示，默认为 `请输入 + label` | String  | —                                  | —      |
| disabled      | 是否禁用状态，默认为 false              | boolean | true /false                        | false  |
| maxLength     | 最大长度                                | Number  | —                                  | —      |
| style         | style 样式                              | String  | —                                  | —      |
| prefixText    | 前缀文字                                | String  | —                                  | —      |
| suffixText    | 后缀文字                                | String  | —                                  | —      |
| prefixIcon    | 前缀图标                                | String  | —                                  | —      |
| suffixIcon    | 后缀图标                                | String  | —                                  | —      |
| prefixNote    | 前缀标签                                | String  | —                                  | —      |
| suffixNote    | 后缀标签                                | String  | —                                  | —      |
| prefixTooltip | 前缀图标提示                            | Object  | {label:'显示文字信息',icon:'图标'} | —      |
| suffixTooltip | 后缀图标提示                            | Object  | {label:'显示文字信息',icon:'图标'} | —      |

### 事件

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| onChange | 内容变化事件 | {}       |
| onBlur   | 失去焦点事件 | {}       |
| onFocus  | 获取焦点事件 | {}       |
