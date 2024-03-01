# s-form-grop 表单

用于搜索表单 使用

---

### 基本用法

表单的基本用法。

::: demo

```html
<div style="display:flex">
	<s-form-grop :form-items="formItems" @on-search="onSearch">
	</s-form-grop>
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
        ],
        stationSelectData: [
          // 顶层菜单数据
                { regionName: '北京', regionCode: '110000', parentCode: '', regionType: null, rank: 1 },
                { regionName: '天津', regionCode: '120000', parentCode: '', regionType: null, rank: 2 },
                { regionName: '河北', regionCode: '130000', parentCode: '', regionType: null, rank: 3 },
                { regionName: '重庆', regionCode: '500000', parentCode: '', regionType: null,rank: 4 },
                // 二级菜单数据
                { regionName: '北京市', regionCode: '110000', parentCode: '110000', regionType: null },
                { regionName: '天津市', regionCode: '120000', parentCode: '120000', regionType: null },
                { regionName: '石家庄市', regionCode: '130100', parentCode: '130000', regionType: null },
                { regionName: '重庆市', regionCode: '500000', parentCode: '500000', regionType: null },
                // 三级菜单数据
                { regionCode: '54514', regionName: '丰台', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54419', regionName: '怀柔', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54499', regionName: '昌平', parentCode: '110000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54527', regionName: '西青', parentCode: '120000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '54622', regionName: '津南', parentCode: '120000', dictionaryItemText: '筛选条件1', regionType: 1 },
                { regionCode: '53693', regionName: '井陉', parentCode: '130100', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57516', regionName: '沙坪坝', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57348', regionName: '奉节', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
                { regionCode: '57522', regionName: '涪陵', parentCode: '500000', dictionaryItemText: '筛选条件2', regionType: 2 },
        ]
      }
    }
  },
  // 计算属性
  computed: {
    // 搜索表单
    formItems() {
      return [
        { id: 'fol1', type: 'text', label: '名称', maxlength: 32 },
        { id: 'fol2', type: 'select', label: '测试下拉框', data: this.downDataSource.selectData },
        { id: 'fol3', type: 'day', label: '日期选择',
          pickerOptions:{
            isAllowClear: true,
          }
        },
        { id: 'fol4', type: 'stationSelect', label: '站点选择器', data: this.downDataSource.stationSelectData }
      ]
    }
  },
  // 函数集，
  methods: {
    onSearch(val) {
      console.log(val)
    },

  }
}
</script>
```

:::

### 表单的联动

---

::: demo

```html
<div style="display:flex">
	<s-form-grop :value="formData" :form-items="formItems" @on-search="onSearch"></s-form-grop>
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
      },
      formData: {
        fol1: null,
        fol2: '2'
      }
    }
  },
  // 计算属性
  computed: {
    // 搜索表单
    formItems() {
      return [
        { id: 'fol1', type: 'text', label: '名称', maxlength: 32 },
        {
          id: 'fol2',
          type: 'select',
          label: '测试下拉框',
          data: this.downDataSource.selectData,
          onChange: val => this.onChange(val)
        }
      ]
    }
  },
  // 函数集，
  methods: {
    onSearch(val) {
      console.log(val)
    },
    onChange(val) {
      if (val == '1') {
        this.formData.fol1 = '123'
      } else {
        this.formData.fol1 = '测试'
      }
    }
  }
}
</script>
```

:::

### 表单的验证

---

::: demo

```html
<div style="display:flex">
	<s-form-grop :form-items="formItems" @on-search="onSearch"></s-form-grop>
</div>

<script>
export default {
  // 计算属性
  computed: {
    // 搜索表单
    formItems() {
      return [
        //基础校验
        { id: 'fol1', type: 'text', label: '基础校验', rules: 'required' },
        //内置校验
        { id: 'fol2', type: 'text', label: '内置校验', rules: 'phone' },
        //自定义正则校验
        { id: 'fol3', type: 'text', label: '自定义正则校验', rules: { pattern: /^[\u4e00-\u9fa5]+$/, message: '请输入中文' } },
        //自定义校验方法
        { id: 'fol4', type: 'text', label: '自定义校验数据方法', rules: [{ required: true, validator: this.checkReles }] }
      ]
    }
  },
  // 函数集，
  methods: {
    onSearch(val) {
      console.log(val)
    },
    // 自定义正则校验
    checkReles(rule, value, callback) {
      if (!value) {
        callback(new Error('数据不能为空'))
      } else if(value == '3') {
        callback(new Error('数据不等于3'))
      }else{
        callback()
      }

    }
  }
}
</script>
```

:::

### 表单的事件

---

::: demo

```html
<div>
	<div style="display:flex">
		<s-form-grop :form-items="formItems" ref="form" :info="{isShowBtn:false}"> </s-form-grop>
	</div>
	<div>
	  <a-button type="primary" @click="onGetForm">获取表单</a-button>
	  <a-button type="primary" @click="onSetForm">设置表单</a-button>
	  <a-button type="primary" @click="onResetForm">重置表单</a-button>
    <a-button type="primary" @click="onGetEncryptForm">获取加密表单</a-button>
	  <a-button type="primary" @click="onSetEncryptForm">设置加密表单</a-button>
	</div>
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
    // 搜索表单
    formItems() {
      return [
        { id: 'fol1', type: 'text', label: '名称', maxlength: 32 },
        { id: 'fol2', type: 'select', label: '测试下拉框', data: this.downDataSource.selectData },
        { id: 'fol3', type: 'day', label: '时间' },
        { id: 'fol4', type: 'days', label: '日期范围' },
        { id: 'fol5', type: 'weeks', label: '周' },
      ]
    }
  },
  // 函数集，
  methods: {
    onGetForm() {
      const msg = this.$refs.form.getForm()
      console.log('原表单',msg)
      this.$message.info('获取成功！')
    },
    onSetForm() {
      const obj = {
        fol1: '填充内容',
        fol2: '1',
        fol3: {
          startTime:'2021-10-01 00:00:00'
        },
        fol4: {
          startTime:'2021-10-01 00:00:00',
          endTime:'2021-12-01 00:00:00'
        },
        fol5: {
          startTime:'2021-10-01 00:00:00',
            endTime:'2021-12-01 00:00:00'
        }
      }
      this.$refs.form.setForm(obj)
      const msg = this.$message.info('填充表单信息成功')
    },
     onGetEncryptForm(){
      const encryptForm = this.$refs.form.getEncryptionForm({
        type: 'aes',
        aesKey:'abcsdfalkwetyqiedijsahdkjahsgdiyiuhoaeo', // 秘钥自己设置
        dataKeys:['fol1']
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
    onResetForm() {
      this.$refs.form.resetForm()
      this.$nextTick(()=>{
        const msg = this.$refs.form.getForm()
        this.$message.info('重置成功！')
        console.log('表单',msg)
      })

    }
  }
}
</script>
```

:::

### API

| 参数      | 说明     | 类型          | 可选值 | 默认值 |
| --------- | -------- | ------------- | ------ | ------ |
| formItems | 表单项   | Array<String> | -      | []     |
| info      | 表单配置 | Object        | -      | {}     |

### info 表单配置

| 名称         | 说明         | 类型    | 默认值 |
| ------------ | ------------ | ------- | ------ |
| isShowSearch | 显示搜索按钮 | Boolean | true   |
| isShowReset  | 显示重置按钮 | Boolean | true   |
| isShowBtn    | 显示按钮区域 | Boolean | true   |
| searchText   | 搜索按钮名称 | String  | '查询' |
| resetText    | 重置按钮名称 | String  | '重置' |

### 事件

| 名称   | 说明         | 参数      |
| ------ | ------------ | --------- |
| on-reset | 表单重置事件 | - |
| on-search | 搜索按钮点击事件 | - |

### $refs 绑定事件

| 名称        | 说明           | 类型                        |
| ----------- | -------------- | --------------------------- |
| getForm     | 获取表单所有值 | Function()                  |
| getEncryptionForm  | 获取加密的表单所有值 | Function(encryptOption)           |
| getFormById | 获取表单单值   | Function(fieldName: string) |
| setForm     | 设置表单值     | Function(fieldName: string) |
| setEncryptionForm     | 设置加密的表单值     | Function(content,encryptOption) |
| resetForm   | 重置表单       | Function()                  |

### 获取getEncryptionForm表单加密选项`encryptOption`
setEncryptionForm()函数可以用于由getEncryptionForm()得到的加密内容回显

| 名称         | 说明         | 类型    | 默认值 | 可选值 |
| ------------ | ------------ | ------- | ------ | ---- |
| type | 必填，加密类型（aes对称加密，md5为不可解密的加密） | String | aes   | `aes|md5` | 
| aesKey | 必填，aes加密秘钥 | String | 无   | 无 | 
| dataKeys | 非必填，可单独加密某个表单数据id的数据 | Array | []   | 无 | 

> 注意：使用setForm置空select类型下拉组件的时候要赋值为undefined，该组件的placeholder才能正常显示，设置为空字符串''或null都无法显示placeholder