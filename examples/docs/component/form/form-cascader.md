#  级联选择器 cascader

基本表单项，`type:'cascader'` 级联选择器 基本使用

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
              type: 'cascader',
              label: '基本使用',
              data: [
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                      children: [
                        {
                          value: 'xihu',
                          label: 'West Lake'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'jiangsu',
                  label: 'Jiangsu',
                  children: [
                    {
                      value: 'nanjing',
                      label: 'Nanjing',
                      children: [
                        {
                          value: 'zhonghuamen',
                          label: 'Zhong Hua Men'
                        }
                      ]
                    }
                  ]
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
              type: 'cascader',
              label: '基本使用',
              data: [
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                      children: [
                        {
                          value: 'xihu',
                          label: 'West Lake'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'jiangsu',
                  label: 'Jiangsu',
                  children: [
                    {
                      value: 'nanjing',
                      label: 'Nanjing',
                      children: [
                        {
                          value: 'zhonghuamen',
                          label: 'Zhong Hua Men'
                        }
                      ]
                    }
                  ]
                }
              ],
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
