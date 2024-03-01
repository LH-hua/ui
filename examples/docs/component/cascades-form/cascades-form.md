### 根据配置自动构建查询表单

::: demo

```html
<div>
  <s-cascades-form :height="height" :width="width" :form-items="config" :title="title" @change="handelSearch" />
</div>

<script>
export default {
  data() {
    return {
      width: 308,
      height: 600,
      title: '中央气象台气象预报',
      config: [
        {
          key: 'type_code',
          name: '类别',
          values: [
            {
              name: '降水量',
              key: 'precipitation',
              cascades: [
                {
                  key: 'duration',
                  name: '类型',
                  show: false,
                  values: [
                    { name: '一小时', key: 'hourly', width: '80px' },
                    { name: '6小时', key: '6hour', width: '80px' },
                    { name: '24小时', key: '24hour', width: '80px' },
                    {
                      name: '30天降水量',
                      key: '30day',
                      width: '150px',
                      cascades: [
                        {
                          key: 'type',
                          name: '时长',
                          values: [
                            { name: '近10天降水量', key: '10day' },
                            { name: '近20天降水量', key: '20day' },
                            { name: '近30天降水量', key: '30day' }
                          ]
                        }
                      ]
                    },
                    {
                      name: '近30天降水量距平',
                      key: '30dayAnomaly',
                      cascades: [
                        {
                          key: 'type',
                          name: '时长',
                          values: [
                            { name: '近10天降水距平百分率', key: '10pa' },
                            { name: '近20天降水距平百分率', key: '20pa' },
                            { name: '近30天降水距平百分率', key: '30pa' }
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
      ]
    }
  },
  methods: {
    // 点击按钮之后，通过handelSearch事件，获取表单返回的参数
    handelSearch(search) {
      const param = {
        ...search
      }
    }
  }
}
</script>
```

:::

### 通过 slot 插入查询条件和按钮

::: demo

```html
<div>
  <s-cascades-form :height="height" :width="width" :form-items="config" :title="title" @change="handelSearch">
    <template v-slot:top>
      <s-cascades-form-item :title="'日期选择'">
        <s-date-picker :width="'210px'" :mode="'day'" @change="onChange" />
      </s-cascades-form-item>
      <s-cascades-form-collapse :title="'类型选择'">
        <a-radio-group default-value="a" button-style="solid" style="width:100%">
          <a-radio-button style="width:33.33%;text-align:center" value="a">
            原始
          </a-radio-button>
          <a-radio-button style="width:33.33%;text-align:center" value="b">
            审核
          </a-radio-button>
          <a-radio-button style="width:33.33%;text-align:center" value="c">
            发布
          </a-radio-button>
        </a-radio-group>
      </s-cascades-form-collapse>
    </template>
    <template v-slot:foot>
      <a-button style="width:100%;" type="primary">查 询</a-button>
    </template>
  </s-cascades-form>
</div>

<script>
export default {
  data() {
    return {
      width: 308,
      height: 600,
      date: '',
      title: '中央气象台气象预报',
      config: [
        {
          key: 'type_code',
          name: '类别',
          values: [
            {
              name: '降水量',
              key: 'precipitation',
              cascades: [
                {
                  key: 'duration',
                  name: '类型',
                  values: [
                    { name: '一小时', key: 'hourly' },
                    { name: '6小时', key: '6hour' },
                    { name: '24小时', key: '24hour' },
                    {
                      name: '30天降水量',
                      key: '30day',
                      cascades: [
                        {
                          key: 'type',
                          name: '时长',
                          values: [
                            { name: '近10天降水量', key: '10day' },
                            { name: '近20天降水量', key: '20day' },
                            { name: '近30天降水量', key: '30day' }
                          ]
                        }
                      ]
                    },
                    {
                      name: '近30天降水量距平',
                      key: '30dayAnomaly',
                      cascades: [
                        {
                          key: 'type',
                          name: '时长',
                          values: [
                            { name: '近10天降水距平百分率', key: '10pa' },
                            { name: '近20天降水距平百分率', key: '20pa' },
                            { name: '近30天降水距平百分率', key: '30pa' }
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
      ]
    }
  },
  methods: {
    // 点击按钮之后，通过handelSearch事件，获取表单返回的参数
    handelSearch(search) {
      const param = {
        ...search,
        date: this.date
      }
    },
    onChange(date) {
      this.date = date
    }
  }
}
</script>

```

:::

### Attributes

| 参数           | 说明                                                      | 类型          | 可选值 | 默认值 |
| -------------- | --------------------------------------------------------- | ------------- | ------ | ------ |
| formItems      | 自动级联表单的各项查询条件配置, 配置信息结构,请看示例代码 | Array<object> | —      | []     |
| title          | 表单标题                                                  | String        | —      | ''     |
| activeCollapse | 需要展开的项                                              | String        | —      | '1'    |
| height         | 高度                                                      | Number        | —      |        |
| width          | 宽度                                                      | Number        | —      |        |

### formItems 表单配置

| 名称     | 说明    | 类型    | 默认值 |
| ------- | ------- | ------- | ------ | ---- |
| key | 表单查询条件的key，会在表单触发change事件时，作为json中的属性 | String | - |
| name | 表单查询条件名称 | String | -  |
| values | 表单查询条件的选项 | Array<String> | -  |

### values 表单查询条件的选项

| 名称     | 说明    | 类型    | 默认值 |
| ------- | ------- | ------- | ------ | ---- |
| key | 选项的key，会在表单触发change事件时，作为json中的值 | String | - |
| name | 选项名称 | String | -  |
| cascades | 级联查询条件，点击这个选项时会出现的查询条件 | Array<Object> | -  |

### slot

| 名称 | 说明                         |
| ---- | ---------------------------- |
| top  | 自动生成的查询条件上面的内容 |
| foot | 自动生成的查询条件下面的内容 |

### 事件

| 事件名称 | 说明                                                                | 回调参数 |
| -------- | ------------------------------------------------------------------- | -------- |
| change   | 自动表单中的按钮点击之后触发的事件,返回表单中当前所有选择的选项的值 | {}       |
