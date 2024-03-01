#  多选框 checkbox

基本表单项，`type:'checkbox'` 单选框 基本使用

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
              type: 'checkbox',
              label: '基本使用',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              onChange: () => {
                console.log('内容变化事件')
              },
              value: ['1']
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

按钮状态

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
              id: 'fol2',
              type: 'checkbox',
              label: '不可点击',
              disabled: true,
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              onChange: () => {
                console.log('内容变化事件')
              },
              value: ['1']
            },

            {
              id: 'fol3',
              type: 'checkbox',
              label: '选项不可点击',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '不可点击', value: '2', disabled: true },
                { label: '测试数据2', value: '3' }
              ],
              onChange: () => {
                console.log('内容变化事件')
              },
              value: ['1']
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
              type: 'checkbox',
              label: '内容变化事件',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              onChange: () => {
                console.log('内容变化事件')
              }
            },
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

| 参数        | 说明                                             | 类型    | 可选值      | 默认值  |
| ----------- | ------------------------------------------------ | ------- | ----------- | ------- | ----- |
| label       | 输入框标题                                       | String  | —           | —       |
| value       | 输入框内容                                       | Array   | —           | —       |
| disabled    | 是否禁用状态，默认为 false                       | boolean | true /false | false   |
| style       | style 样式                                       | String  | —           | —       |
| buttonStyle | RadioButton 的风格样式，目前有描边和填色两种风格 | String  | `outline    | solid ` | solid |
| radio       | 是否显示 radio 样式                              | Boolean | —           | false   |

### 事件

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| onChange | 内容变化事件 | {}       |
