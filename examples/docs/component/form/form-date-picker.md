#  日期选择 time、 hour、 day、 month、 quarter、 year

基本表单项，日期选择 基本使用

::: demo

```html
<div>
	<s-form-modal :form-items="formItems" ref="form"> </s-form-modal>
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
              label: '小时',
              type: 'hour',
              value: { startTime:'2020-01-02' },

            },
            {
              id: 'fol2',
              label: '天',
              type: 'day',
              value: { startTime:'2019-11-03' }
            },
            {
              id: 'fol3',
              label: '周',
              type: 'week',
              value: { startTime:'2020-1-01' }
            }
          ]
        },
        {
          item: [
            {
              id: 'fol4',
              label: '月',
              type: 'month',
              value: { startTime:'2019-10' }
            },
            {
              id: 'fol5',
              label: '季度',
              type: 'quarter',
              value: { startTime:'2022-6-01' }
            },
            {
              id: 'fol6',
              label: '年',
              type: 'year',
              value:{ startTime:'2019' }
            },
          ]
        }
      ]
    }
  },
  methods:{
    getForm(){
      console.log('表单',this.$refs.form.getForm())
    },
  }
}
</script>
```

:::

禁止时间状态 `this.$moment 通过挂载全局对象获取`

::: demo

```html
<div>
	<s-form-modal :form-items="formItems"> </s-form-modal>
</div>

<script>
export default {
  data() {
    return {
      form: {
        start: null,
        end: null
      }
    }
  },
  // 计算属性
  computed: {
    // 搜索表单
    formItems() {
      return [
        {
          item: [
            {
              id: 'fol1',
              label: '禁止选择部分日期和时间',
              type: 'hour',
              disabledTime: () => {
                return {
                  // // 小时
                  disabledHours: () => [1, 2],
                  // // 分钟
                  disabledMinutes: () => [1, 2, 3, 4, 5, 6, 7, 8, 9],
                  // // 秒
                  disabledSeconds: () => [55, 56]
                }
              },
              disabledDate: current => {
                return current && current < this.$moment().endOf('day')
              }
            },
            {
              id: 'fol21',
              label: '禁止选择今日之前的日期',
              type: 'day',
              disabledDate: current => {
                return current && current < this.$moment().startOf('day')
              }
            },
            {
              id: 'fol21',
              label: '禁止选择今日之后的日期',
              type: 'day',
              disabledDate: current => {
                return current && current > this.$moment().endOf('day')
              }
            },
          ]
        },
        {
          item: [
            {
              id: 'fol5',
              label: '月份时间限制',
              type: 'month',
              disabledDate: current => {
                return current && current < this.$moment('2022-04')
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
范围日期选择器

::: demo

```html
<div>
	<s-form-modal :form-items="formItems"> </s-form-modal>
</div>

<script>
export default {
  data() {
    return {
      form: {
        start: null,
        end: null
      }
    }
  },
  // 计算属性
  computed: {
    // 搜索表单
    formItems() {
      return [
        {
          item: [
            {
              id: 'fol6',
              label: '小时范围',
              type: 'hours',
              value: { startTime:'2019-10-1 6:00:00',endTime:'2021-11-1 18:00:00' }
            },
            {
              id: 'fol7',
              label: '日范围',
              type: 'days',
              value: { startTime:'2019-10-01',endTime:'2021-11-01' }
            },
            {
              id: 'fol10',
              label: '月份范围',
              type: 'months',
              value: { startTime:'2019-10',endTime:'2021-11' }
            },
            {
              id: 'fol11',
              label: '年份范围',
              type: 'years',
              value: { startTime:'2019',endTime:'2021' },
              
            },
          ],
        },
        {
          item: [
            {
              id: 'fol8',
              label: '周范围',
              type: 'weeks',
              value: { startTime:'2021-02-01',endTime:'2021-05-03' },
              rangeLimit:false//选择范围限制
            },
            {
              id: 'fol9',
              label: '季度范围',
              type: 'quarters',
              value: { startTime:'2021-01-01',endTime:'2021-12-12' }
            },
          ],
        }
      ]
    }
  },
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

| 事件名称     | 说明         | 回调参数 |
| ------------ | ------------ | -------- |
| onChange     | 内容变化事件 | {}       |
| disabledTime | 禁止的时间   | {}       |
| disabledDate | 禁止的日期   | {}       |
