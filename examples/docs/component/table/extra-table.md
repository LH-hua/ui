### 表格顶部和底部的额外插槽

::: demo

```html
<div>
	<s-table :data-source="source" :columns="columns" >
		<template slot="head">
			<div style="text-align:center;height:35px;line-height:35px;font-size:20px">表格标题</div>
		</template>
		<template slot="page">
			<div>此处可添加额外的表格描述或其他</div>
		</template>
	</s-table>
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
      ]
    }
  }
}
</script>
```

:::

### slot

| 名称 | 说明                         |
| ---- | ---------------------------- |
| head  | 表格头部插槽，可用于插入表格标题等 |
| page | 表格底部插槽，与分页功能并存，可添加额外的表格描述或其他 |

### 若 pagination 为 false 则底部的插槽无效
