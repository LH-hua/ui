#  日期选择

结合表单项使用`<s-form-modal></s-form-modal>` `<s-form-grop></s-form-grop>`
::: demo

```html
<div>
  <s-form-modal :form-items="formItems" ref="form"> </s-form-modal>
<div>
  <a-button type="primary" @click="onGetForm">获取表单</a-button>
  <a-button type="primary" @click="onSetForm">设置表单</a-button>
  <a-button type="primary" @click="onResetForm">重置表单</a-button>
</div>
</div>

<script>
export default {
  // 计算属性
  computed: {
    // 搜索表单
    formItems() {
      return [
        {
          item:[
            {
              id: 'minute',
              label: '分钟',
              type: 'minute',
              // value: '2024-10-10 10:10',
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false
              }
            },
            {
              id: 'minute-disable',
              label: '禁用分钟',
              type: 'minute',
              // value: new Date(),//默认时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
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
              }
            },
          ],
        },
        {
          item: [
            {
              id: 'hour',
              label: '小时',
              type: 'hour',
              // value: new Date(),//默认时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false
              }
            },
            {
              id: 'hour-disable',
              label: '禁用小时',
              type: 'hour',
              // value: new Date(),//默认时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
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
              }
            },
          ]
        },
        
        {
          item:[
            {
              id: 'day',
              label: '天',
              type: 'day',
              // value: new Date(),//默认时间，表单重置事件会默认重置到这个时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false
              }
            },
            {
              id: 'day-disable',
              label: '禁用天',
              type: 'day',
              // value: new Date(),//默认时间，表单重置事件会默认重置到这个时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
                disabledDate: current => {
                  return current && current < this.$moment().startOf('day')
                }
              }
            }
          ]
        },
        
          {
          item:[
            {
              id: 'month',
              label: '月',
              type: 'month',
              // value: new Date(),//默认时间，表单重置事件会默认重置到这个时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
              }
            },
            {
              id: 'month-disable',
              label: '禁用月',
              type: 'month',
              // value: new Date(),//默认时间，表单重置事件会默认重置到这个时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
                disabledDate: current => {
                  return current && current < this.$moment('2022-04')
                }
              }
            }
          ]
        },
          {
          item:[
            {
              id: 'year',
              label: '年',
              type: 'year',
              // value: new Date(),//默认时间，表单重置事件会默认重置到这个时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false
              }
            },
            {
              id: 'year-disable',
              label: '禁用年',
              type: 'year',
              // value: new Date(),//默认时间，表单重置事件会默认重置到这个时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
                disabledDate: current => {
                  return current && current < this.$moment('2022')
                }
              }
            }
          ]
        },
        {
          item:[
            {
              id: 'week',
              label: '周',
              type: 'week',
              // value: new Date(),//默认时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
              }
            },
            {
              id: 'quarter',
              label: '季度',
              type: 'quarter',
              // value: '2023-09-10',//默认时间
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
              }
            },
          ]
        },
        {
          item: [
            {
              id: 'hourRange',
              label: '小时范围',
              type: 'hours',
              // value: {
              //   startTime:'2021-10-10 10:00:00',
              //   endTime:'2021-10-21 05:00:00'
              // },
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
              }
            },
            {
              id: 'dayRange',
              label: '天范围',
              type: 'days',
              // value: {
              //   startTime:'2022-03-10',
              //   endTime:'2022-04-21'
              // },
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
              }
            },
          ]
        },
        {
          item: [
            {
              id: 'monthRange',
              label: '月范围',
              type: 'months',
              // value: {
              //   startTime:'2021-10',
              //   endTime:'2021-12'
              // },
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
              }
            },
            {
              id: 'yearRange',
              label: '年范围',
              type: 'years',
              // value: {
              //   startTime:'2021',
              //   endTime:'2022'
              // },
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
              }
            },
          ]
        },
        {
          item: [
            {
              id: 'weekRange',
              label: '周范围',
              type: 'weeks',
              // value: {
              //   startTime:'2023-03-10',
              //   endTime:'2023-10-10'
              // },
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false,
              }
            },
            {
              id: 'quarterRange',
              label: '季度范围',
              type: 'quarters',
              // value: {
              //   startTime:'2023-03-10',
              //   endTime:'2023-09-10'
              // },
              pickerOptions:{
                isAllowClear: true,
                useDefaultTime: false
              }
            },
          ]
        },
      ]
    }
  },
  methods:{
    onGetForm(){
      console.table(this.$refs.form.getForm())
    },
    onSetForm(){
      this.$refs.form.setForm({
        minute: '2022-05-01 07:20:00',
        hour: '2022-04-01 07:00:00',
        hourRange: {
          startTime:'2023-10-10 10:00:00',
          endTime:'2023-10-21 05:00:00'
        },
        day: '2021-01-01',
        dayRange:{
          startTime:'2025-09-10',
          endTime:'2025-12-21'
        },
        monthRange:{
          startTime:'2025-09',
          endTime:'2025-12'
        },
        yearRange:{
          startTime:'2025',
          endTime:'2030'
        },
        weekRange:{
          startTime:'2025-02-10',
          endTime:'2025-12-20'
        },
        quarterRange:{
          startTime:'2025-09-10',
          endTime:'2025-12-20'
        },
        month: '2005-01-12',
        year: '2008',
        week: '2022-01-05',
        quarter: '2022-12-05'
      })
      console.log('设置成功！')
    },
    onResetForm() {
      this.$refs.form.resetForm()
      this.$nextTick(()=>{
        const msg = this.$refs.form.getForm()
        console.log('重置表单', msg)
      })
    
    }
  }
}
</script>
```

<br>
:::

时间选择组件单个使用`<s-date-picker></s-date-picker>`
::: demo

```html
<div>
  <a-radio-group v-model="mode"  style="margin-bottom:10px">
    <a-radio-button value="minute">分钟</a-radio-button>
    <a-radio-button value="hour">小时</a-radio-button>
    <a-radio-button value="day">天</a-radio-button>
    <a-radio-button value="month">月</a-radio-button>
    <a-radio-button value="year">年</a-radio-button>
    <a-radio-button value="week">周</a-radio-button>
    <a-radio-button value="quarter">季度</a-radio-button>
  </a-radio-group>
  <s-date-picker label="时间：" :mode="mode" v-model="time" @date-change="onDateChange"  :is-allow-clear="true"></s-date-picker>
</div>

<script>
export default {
  data(){
    return {
      mode:'minute',
      time:{
        startTime:'2025-05-10 10:00:00'
      }
    }
  },
  methods:{
    onDateChange(val){
      console.log(this.mode,'日期变化',this.time)
    }
  }
}
</script>
```
:::


时间范围组件单个使用`<s-date-range-picker></s-date-range-picker>`
::: demo

```html
<div>
  <a-radio-group v-model="mode"  style="margin-bottom:10px">
    <a-radio-button value="minute">分钟范围</a-radio-button>
    <a-radio-button value="hour">小时范围</a-radio-button>
    <a-radio-button value="day">天范围</a-radio-button>
    <a-radio-button value="month">月范围</a-radio-button>
    <a-radio-button value="year">年范围</a-radio-button>
    <a-radio-button value="week">周范围</a-radio-button>
    <a-radio-button value="quarter">季度范围</a-radio-button>
  </a-radio-group>
  <s-date-range-picker label="范围：" :mode="mode" v-model="timeRange" @date-change="onDateRangeChange" :is-allow-clear="false"></s-date-range-picker>
</div>

<script>
export default {
  data(){
    return {
      mode:'minute',
      timeRange:{
        startTime:'2026-01-10 10:00:00',
        endTime:'2026-05-09 10:59:59'
      }
    }
  },
  methods:{
    onDateRangeChange(val){
      // console.log('范围值变化',this.timeRange)
    }
  }
}
</script>
```
:::

### 属性

| 参数     | 说明                       | 类型    | 可选值      | 默认值 | 说明 |
| -------- | -------------------------- | ------- | ----------- | ------ | ------|
| mode    | 时间选择器模式                 | String  | —           | —      | 模式请看示例代码 |
| value/v-model    | 值                 | Object   | —           | —      |  —   |
| isAllowClear    | 是否允许清空                 | Boolean   | —           | —      | — |
| width    | 选择器宽度                 | String   | —           | —      | 单个默认`250px`,范围选择器默认 `300px` | 
| label    | label标签                 | String   | —           | —      | — |
| disabledTime | 禁止的时间    | Function   | —           | —      |  只有hour选择器有 |
| disabledDate | 禁止的日期     | Function   | —           | —      |  — |
| useDefaultTime | 是否使用默认时间     | Boolean   | —          | true     |  默认开启默认时间 | 

value传值形式
```
//单个选择
{
  startTime:'',
}

//范围选择
{
  startTime:'',
  endTime:''
}
```

### 事件

| 事件名称     | 说明         | 回调参数 |
| ------------ | ------------ | -------- |
| onDateChange     | 日期变化事件 | object  （startTime,endTime）     |
