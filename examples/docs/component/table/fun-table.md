### 复选框选择和分页功能

::: demo

```html
<div>
  <a-button @click="onLoading">onLoading</a-button>
	<s-table :data-source="source" :columns="columns" bordered is-selection @row-select="rowSelect" :pagination="pagination" @size-change="sizeChange" @page-change="pageChange"
  :loading="loading"
  >
	</s-table>
</div>

<script>
export default {
  data() {
    return {
      columns: [
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
      source: [
        {
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          name: 'John Brown（此行演示配置禁用选择）',
          age: 32,
          address: 'London No. 1',
          tags: ['loser'],
          disabled: true
        },
        {
          name: 'Brown',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ],
      loading:false,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50,
        showQuickJumper: false,
        showSizeChanger: true
      }
    }
  },
  methods: {
    rowSelect(rows) {
      console.log(rows)
    },
    sizeChange(page, size) {
      console.log(page, size)
      this.pagination.current = page
      this.pagination.pageSize = size
    },
    pageChange(page) {
      // console.log(page)
      this.pagination.current = page
    },
    onLoading(){
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000);
    }
  }
}
</script>
```

:::

### 属性

| 参数        | 说明           | 类型           | 可选值                   | 默认值 |
| ----------- | -------------- | -------------- | ------------------------ | ------ |
| dataSource  | 数据配置       | Array          | 支持 antd-table 所有属性 | []     |
| columns     | 数据数组       | Array          | 支持 antd-table 所有属性 | []     |
| bordered    | 表格边框       | Boolean        | —                        | false  |
| isSelection | 支持复选框选择 | Boolean        | ----                     | false  |
| pagination  | 分页配置       | Boolean/Object | ----                     | {}     |
| loading    | loading 加载    | Boolean/Object | ----                     | false  |

### dataSource 属性

| 参数     | 说明       | 类型    | 可选值                      | 默认值 |
| -------- | ---------- | ------- | --------------------------- | ------ |
| disabled | 该项被禁选 | Boolean | --------------------------- | false  |

### 事件

| 参数         | 说明              | 类型                | 可选值       | 默认值              |
| ------------ | ----------------- | ------------------- | ------------ | ------------------- |
| @row-select  | 复选框改变触发    | Function(arr)       | ------------ | ------------------- |
| @page-change | 分页改变触发      | Function(page)      | ------------ | ------------------- |
| @size-change | pagesize 改变触发 | Function(page,size) | ------------ | ------------------- |
