# s-form-modal 表单

用于新增表单 表格表单使用 通过使用栅格布局封装

---

### 基本用法

表单的基本用法。

::: demo

```html
<div>
	<s-form-modal :form-items="formItems" ref="form">
		<template slot="name">1111</template>
	</s-form-modal>
	<a-button type="primary" @click="onSubmit"> 提交表单 </a-button>
  <a-button type="primary" @click="onGetForm">获取表单</a-button>
	<a-button type="primary" @click="onSetForm">设置表单</a-button>
  <a-button type="primary" @click="onGetEncryptForm">获取加密表单</a-button>
	<a-button type="primary" @click="onSetEncryptForm">设置加密表单</a-button>
</div>

<script>
export default {
  data() {
    return {
      // 下拉 多选 数据源
      downDataSource: {
        selectData: [
          { label: '测试1', value: '1' },
          { label: '测试2', value: '2' },
          { label: '测试3', value: '3' }
        ]
      }
    }
  },
  // 计算属性
  computed: {
    // 表单
    formItems() {
      return [
        {
          item: [
            { id: 'fol1', type: 'text', label: '名称', maxlength: 32, rules: 'required' },
            { id: 'fol2', type: 'select', label: '测试下拉框', data: this.downDataSource.selectData, rules: 'required' },
          ]
        },
        {
          item: [
            { id: 'fol3', type: 'text', label: '名称', maxlength: 32, rules: 'required' },
            { id: 'fol4', type: 'select', label: '测试下拉框', data: this.downDataSource.selectData, rules: 'required' },
            { id: 'fol5', type: 'days', label: '时间', rules: 'required' }
          ]
        },
        {
          item: [
            { id: 'fol26', type: 'slot', label: '插槽', slot:'name' },
          ]
        }
      ]
    }
  },
  // 函数集，
  methods: {
    onSubmit() {
      this.$refs.form.checkForm()
    },
    onGetForm() {
      const msg = this.$refs.form.getForm()
      console.log('原表单',msg)

      this.$message.info('获取成功！')
    },
    onGetEncryptForm(){
      const encryptForm = this.$refs.form.getEncryptionForm({
        type: 'aes',
        aesKey:'abcsdfalkwetyqiedijsahdkjahsgdiyiuhoaeo', // 秘钥自己设置
        // dataKeys:['fol1','fol18']
      })
      console.log('加密后表单',encryptForm)
    },
    onSetEncryptForm(){
      let encryptContent = ''// 用getEncryptionForm函数加密后的内容
      this.$refs.form.getEncryptionForm(encryptContent,{
        type: 'aes',
        aesKey:'abcsdfalkwetyqiedijsahdkjahsgdiyiuhoaeo', // 秘钥自己设置
        // dataKeys:['fol1','fol18']
      })
    },
    onSetForm() {
      const obj = {
        fol1: '填充内容',
        fol2: '1',
        fol5: {
          startTime:'2021-10-01 00:00:00',
          endTime:'2021-12-01 00:00:00'
        }
      }
      this.$refs.form.setForm(obj)
      const msg = this.$message.info('填充表单信息成功')
    },
  }
}
</script>
```

:::

### 场景的使用 和 表单的事件

---

::: demo

```html
<div>
	<a-button type="primary" @click="onAdd">新增</a-button>
	<a-button type="primary" @click="onEdit">编辑</a-button>

	<s-modal :visible="visible" :title="title" :width="1000" @on-cancel="onCancel" @on-submit="onSubmit">
		<s-form-modal :form-items="formItems" ref="form"></s-form-modal>
	</s-modal>
</div>

<script>
export default {
  data() {
    return {
      visible: false,
      title: '新增',
      // 下拉 多选 数据源
      downDataSource: {
        selectData: [
          { label: '测试1', value: '1' },
          { label: '测试2', value: '2' },
          { label: '测试3', value: '3' }
        ]
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
            { id: 'fol1', type: 'text', label: '名称', maxlength: 32, rules: 'required' },
            { id: 'fol2', type: 'select', label: '测试下拉框', data: this.downDataSource.selectData, rules: 'required' },
            { id: 'fol3', type: 'day', label: '时间', rules: 'required' }
          ]
        },
        {
          item: [
            { id: 'fol4', type: 'text', label: '名称', maxlength: 32, rules: 'required' },
            { id: 'fol5', type: 'select', label: '测试下拉框', data: this.downDataSource.selectData, rules: 'required' },
            { id: 'fol6', type: 'day', label: '时间', rules: 'required' }
          ]
        }
      ]
    }
  },
  // 函数集，
  methods: {
    // 新增表单
    onAdd() {
      this.title = '新增'
      this.visible = true
    },
    // 编辑表单
    onEdit() {
      this.title = '编辑'
      this.visible = true

      this.$nextTick(() => {
        this.onSetForm()
      })
    },
    // 提交表单
    onSubmit() {
      if (this.$refs.form.checkForm()) {
        const msg = JSON.stringify(this.$refs.form.getForm())
        this.$message.info(`${msg}`)
        this.onCancel()
      }
    },
    // 关闭弹出框
    onCancel() {
      this.visible = false
    },

    onSetForm() {
      const obj = {
        fol1: '填充内容',
        fol2: '1',
        fol3: '2021-10-1',
        fol4: '填充内容',
        fol5: '1',
        fol6: '2021-10-1'
      }
      this.$refs.form.setForm(obj)
    }
  }
}
</script>
```

:::

### API

| 参数      | 说明   | 类型          | 可选值 | 默认值 |
| --------- | ------ | ------------- | ------ | ------ |
| formItems | 表单项 | Array<String> | -      | []     |
| info | 表单配置信息 | Object | - | { layout: 'inline' } |
| rowClass  | 行样式名 | String | - | - |
| formClass | 表单样式名 | String | - | - |

### info 表单配置

| 名称         | 说明         | 类型    | 默认值 | 可选值 |
| ------------ | ------------ | ------- | ------ | ---- |
| layout | 表单布局 | String | inline   | `horizontal'|'vertical'|'inline'` |

### $refs 绑定事件

| 名称        | 说明           | 类型                        |
| ----------- | -------------- | --------------------------- |
| getForm     | 获取表单所有值 | Function()                  |
| getEncryptionForm  | 获取加密的表单所有值 | Function(encryptOption)           |
| getFormById | 获取表单单值   | Function(fieldName: string) |
| setForm     | 设置表单值     | Function(fieldName: string) |
| setEncryptionForm     | 设置加密的表单值     | Function(content,encryptOption) |
| resetForm   | 重置表单       | Function()                  |
| checkForm   | 验证表单       | Function()                  |

### 获取getEncryptionForm表单加密参数选项`encryptOption`
setEncryptionForm()函数可以用于由getEncryptionForm()得到的加密内容回显，加解密秘钥需要一致

| 名称         | 说明         | 类型    | 默认值 | 可选值 |
| ------------ | ------------ | ------- | ------ | ---- |
| type | 必填，加密类型（aes对称加密，md5为不可解密的加密） | String | aes   | `aes|md5` | 
| aesKey | 必填，aes加密秘钥 | String | 无   | 无 | 
| dataKeys | 非必填，可单独加密某个表单数据id的数据 | Array | []   | 无 | 

> 注意：使用setForm置空select类型下拉组件的时候要赋值为undefined，该组件的placeholder才能正常显示，设置为空字符串''或null都无法显示placeholder


