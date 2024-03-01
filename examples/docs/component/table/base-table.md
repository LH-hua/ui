### 基础表格

::: demo

```html
<div>
	<s-table :data-source="source" :columns="columns" :pagination="false"> </s-table>
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
          key: 'tags',
          // children:[
          //   {
          //     title: 'Age',
          //     key: 'age1'
          //   },
          //   {
          //     title: 'Address',
          //     key: 'address2'
          //   },
          // ]
        }
      ],
      source: [
        {
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          name: 'John Brown',
          age: 32,
          address: 'London No. 1',
          tags: ['loser']
        },
        {
          name: 'Brown',
          age1: 32,
          address2: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ]
    }
  }
}
</script>
```

:::


### 多级表头

::: demo

```html
<div>
	<s-table :data-source="source" :columns="columns" :pagination="false"> </s-table>
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
          key: 'tags',
          children:[
            {
              title: 'Age1',
              key: 'age1'
            },
            {
              title: 'Address2',
              key: 'address2'
            },
          ]
        }
      ],
      source: [
        {
          name: 'John Brown',
          address: 'New York No. 1 Lake Park',
          age: 32,
          age1: 32,
          address2: 'New York No. 1 Lake Park',
        },
        {
          name: 'John Brown',
          address: 'New York No. 1 Lake Park',
          age: 32,
          age1: 32,
          address2: 'London No. 1',
        },
        {
          name: 'Brown',
          address: 'New York No. 1 Lake Park',
          age: 32,
          age1: 32,
          address2: 'Sidney No. 1 Lake Park',
        }
      ]
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
| bordered   | 表格边框 | Boolean        | —                        | true  |
| pagination | 分页展示 | Boolean/Object | 见 s-pagination 组件   | ---    |
| scroll     | 表格滚动 | Object         | { x:0,y:0 }              | {}     |
| loading     | 页面是否加载中 | boolean/object         |          | false     |


### 属性

| 参数       | 说明     | 类型           | 可选值                   | 默认值 |
| ---------- | -------- | -------------- | ------------------------ | ------ |
| dataSource | 数据配置 | Array          | 支持 antd-table 所有属性 | []     |
| columns    | 数据数组 | Array          | 支持 antd-table 所有属性 | []     |
| bordered   | 表格边框 | Boolean        | —                        | true  |
| pagination | 分页展示 | Boolean/Object | 见 s-pagination 组件   | ---    |
| scroll     | 表格滚动 | Object         | { x:0,y:0 }              | {}     |
