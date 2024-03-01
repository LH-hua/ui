### 基础表格

::: demo

```html
<div>
	<s-table :data-source="source" :columns="columns" bordered :pagination="false"> </s-table>
</div>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '序号',
          width: 80,
          customRender: (text, record, index) => index + 1
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Tags',
          key: 'tags'
        }
      ],
      source: []
    }
  }
}
</script>
```

:::

### 属性

| 参数       | 说明     | 类型           | 可选值                   | 默认值 |
| ---------- | -------- | -------------- | ------------------------ | ------ |
| dataSource | 数据配置 | Array          | 支持 antd-table 所有属性 | []     |
| columns    | 数据数组 | Array          | 支持 antd-table 所有属性 | []     |
| bordered   | 表格边框 | Boolean        | —                        | false  |
| pagination | 分页展示 | Boolean/Object | 见 s-pagination 组件   | ---    |
| scroll     | 表格滚动 | Object         | { x:0,y:0 }              | {}     |
