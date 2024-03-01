#  单选框 radio

基本表单项，`type:'radio'` 单选框 基本使用

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
              type: 'radio',
              label: '基本使用',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              value: '1'
            },
            {
              id: 'fol2',
              type: 'radio',
              label: 'radioButton样式',
              buttonStyle: 'outline',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              value: '1'
            },
            {
              id: 'fol3',
              type: 'radio',
              label: 'radio样式',
              radio: true,
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              value: '1'
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
              type: 'radio',
              label: '不可点击',
              disabled: true,
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              value: '1'
            },

            {
              id: 'fol3',
              type: 'radio',
              label: '选项不可点击',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2', disabled: true },
                { label: '测试数据2', value: '3' }
              ],
              value: '1'
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
              type: 'radio',
              label: '内容变化事件',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' },
                { label: '测试数据3', value: '3' }
              ],
              onChange: () => {
                console.log('内容变化事件')
              }
            },
            {
              id: 'fol2',
              type: 'radio',
              label: '获取焦点事件',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              onFocus: () => {
                console.log('获取焦点事件')
              }
            },
            {
              id: 'fol3',
              type: 'radio',
              label: '失去焦点事件',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
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

| 参数        | 说明                                             | 类型    | 可选值      | 默认值  |
| ----------- | ------------------------------------------------ | ------- | ----------- | ------- | ----- |
| label       | 输入框标题                                       | String  | —           | —       |
| value       | 输入框内容                                       | String  | —           | —       |
| disabled    | 是否禁用状态，默认为 false                       | boolean | true /false | false   |
| style       | style 样式                                       | String  | —           | —       |
| buttonStyle | RadioButton 的风格样式，目前有描边和填色两种风格 | String  | `outline    | solid ` | solid |
| radio       | 是否显示 radio 样式                              | Boolean | —           | false   |

### 事件

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| onChange | 内容变化事件 | {}       |
| onBlur   | 失去焦点事件 | {}       |
| onFocus  | 获取焦点事件 | {}       |
