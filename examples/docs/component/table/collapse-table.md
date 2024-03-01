### 表格统一合并

::: demo

```html
<div>
	<s-table :data-source="source" :columns="columns" bordered :col-spans="colSpans"> </s-table>
</div>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '名称',
          key: 'name',
          merge: true
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
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ],
      colSpans: [1, 3, 0, 0]
    }
  }
}
</script>
```

:::

### 表格逐行自定义合并

::: demo

```html
<div>
	<s-table :data-source="source" :columns="columns" bordered :col-spans="colSpans"> </s-table>
</div>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '名称',
          key: 'name',
          merge: true
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
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ],
      colSpans: [
        [1, 3, 0, 0],
        [1, 1, 1, 1],
        [4, 0, 0, 0]
      ]
    }
  }
}
</script>
```

:::

### 属性

| 参数       | 说明           | 类型                                                 | 可选值                   | 默认值 |
| ---------- | -------------- | ---------------------------------------------------- | ------------------------ | ------ |
| dataSource | 数据配置       | Array                                                | 支持 antd-table 所有属性 | []     |
| columns    | 数据数组       | Array                                                | 支持 antd-table 所有属性 | []     |
| colSpans   | 定义列合并规则 | Array (一维数组整体统一合并；二维数组逐行自定义合并) |                          | []     |

### columns 合并属性

| 参数  | 说明                       | 类型    | 可选值       | 默认值 |
| ----- | -------------------------- | ------- | ------------ | ------ |
| merge | 添加该属性则该项自动行合并 | Boolean | ------------ | false  |
