# 表格自定义渲染

若是重写 customRender 函数会导致合并功能失效，若想保留合并功能的情况下渲染特定样式的 dom 结构可在 columns 属性内定义 html 函数，绑定事件时需注意 this 指向

::: demo

```html
<div>
	<s-table :data-source="source" :columns="columns" bordered> </s-table>
</div>

<script>
export default {
  data() {
    const _this = this
    return {
      columns: [
        {
          title: '名称',
          key: 'name',
          merge: true
        },
        {
          title: 'Age',
          key: 'age',
          merge: true,
          html: function (val, row) {
            let color = val > 30 ? '#FC5531' : '#58bb8c'
            const style = `color:#fff;background:${color};border-radius:3px;`

            return (
              <div style={style} onClick={() => _this.onText(row)}>
                {val}
              </div>
            )
          }
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
          age: '点击这里',
          address: 'London No. 1',
          tags: ['loser']
        },
        {
          name: 'Brown',
          age: 25,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ]
    }
  },
  methods: {
    onText(row) {
      console.log(row, 'row')
      alert(row.age)
    }
  }
}
</script>
```

:::

## columns 属性

| 参数 | 说明                   | 类型                                       | 可选值       | 默认值 |
| ---- | ---------------------- | ------------------------------------------ | ------------ | ------ |
| html | 使用 html 标签渲染结构 | function(val,row,index) return <a>html</a> | ------------ |        |
