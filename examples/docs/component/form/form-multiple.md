#  下拉框 select

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
              type: 'multiple',
              label: '基本使用',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              value: ['1']
            },
            {
              id: 'fol2',
              type: 'multiple',
              label: 'alias数据别名',
              extra: '更改 显示数据源标题的 别名',
              data: [
                { alias: '数据源的别名1', label: '测试数据1', value: '1' },
                { alias: '数据源的别名2', label: '测试数据2', value: '2' }
              ],
              value: ['1', '2']
            }
          ]
        },
        {
          item: [
            {
              id: 'fol3',
              type: 'multiple',
              label: 'maxTagLenth 配置',
              extra: '显示选项最多显示文字长度',
              maxTagLenth: 2,
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              value: ['1']
            },
            {
              id: 'fol4',
              type: 'multiple',
              label: 'maxTag 配置',
              extra: '配置显示最多展示的选项',
              maxTag: 1,
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' },
                { label: '测试数据3', value: '3' }
              ],
              value: ['1', '2', '3']
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
              type: 'multiple',
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
              type: 'multiple',
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
              type: 'multiple',
              label: '内容变化事件',
              data: [
                { label: '测试数据1', value: '1' },
                { label: '测试数据2', value: '2' }
              ],
              onChange: () => {
                console.log('内容变化事件')
              }
            },
            {
              id: 'fol2',
              type: 'multiple',
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
              type: 'multiple',
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

| 参数     | 说明                       | 类型    | 可选值      | 默认值 |
| -------- | -------------------------- | ------- | ----------- | ------ |
| label    | 输入框标题                 | String  | —           | —      |
| value    | 输入框内容                 | Array   | —           | —      |
| disabled | 是否禁用状态，默认为 false | boolean | true /false | false  |
| style    | style 样式                 | String  | —           | —      |

### 事件

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| onChange | 内容变化事件 | {}       |
| onBlur   | 失去焦点事件 | {}       |
| onFocus  | 获取焦点事件 | {}       |
