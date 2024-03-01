### **`v-copy`**

通过给标签添加 v-copy 指令，通过点击 v-copy 的标签实现一键复制文本内容

::: demo

```html
<div style="pading:10px">
	<div style="width: 30%;padding: 10px;">
		<a-button v-copy="demo" @click="onClick">复制文字</a-button>
		<a-input v-model="demo" />
	</div>
</div>
<script>
export default {
  data() {
    return {
      demo: '测试文字'
    }
  },
  methods: {
    onClick() {
      this.$message.success(`复制成功！`)
    }
  }
}
</script>
```

:::

&nbsp;

### **`v-debounce`**


防止按钮在短时间内被多次点击，使用防抖函数在多次调用时不触发，直到最后一次调用 1000 毫秒后才触发

::: demo

```html
<div style="pading:10px">
	<div style="width: 30%;padding: 10px;">
		<a-button v-debounce="onClick"> 防抖</a-button>
	</div>
</div>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    onClick(num) {
      this.$message.success(`触发点击事件`)
    }
  }
}
</script>
```

:::

&nbsp;

### **`v-waterMarker`**


给整个页面添加背景水印

::: demo

```html
<div style="pading:10px;height: 200px;width: 100%;" v-watermarker="{ textColor:'red' ,text:'水印' }"></div>
```

:::

v-watermarker 指令赋值自定义水印

| 参数      | 说明     | 类型     | 默认值                   |
| --------- | -------- | -------- | ------------------------ |
| text      | 文字     | `String` | 水印                     |
| fontColor | 文字颜色 | `String` | rgba(180, 180, 180, 0.3) |
| font      | 文字属性 | `String` | 16px Microsoft JhengHei  |
| width     | 宽度     | `Number` | 200                      |
| height    | 高度     | `Number` | 150                      |
| angle     | 角度     | `Number` | -30（度）                |
&nbsp;

### **`v-loading`**

::: demo

```html
<div style="height:500px;width: 100%;" v-loading="true" loading-text="内容加载中..."></div>
<script>
		export default {
			data() {
				return {
					loading:true
				}
			},
		}
</script>
```

:::

在绑定了 v-loading 指令的元素上添加 属性名称

| 参数               | 说明     | 类型     | 默认值    |
| ------------------ | -------- | -------- | --------- |
| loading-background | 背景色   | `String` | `#ffffff` |
| loading-color      | 文字颜色 | `String` | `null`    |
| loading-text       | 文字信息 | `Number` | `加载中…` |
| loading-font-size   | 文字大小 | `Number` | `15`      |
| loading-z-index   | 蒙层zIndex | `Number` | 10      |
