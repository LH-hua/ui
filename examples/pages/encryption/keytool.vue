<template>
  <div slot="form">
    <s-form-modal :form-items="formItems" ref="form"> </s-form-modal>
    <!-- <s-form-modal :form-items="keyformItems"> </s-form-modal>
     <s-form-modal :form-items="rstformItems"> </s-form-modal> -->
     <div style="text-align: center;">
    <a-button @click="onGetForm" type="primary" style="width: 300px;">加密</a-button>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a-button @click="onSetForm" type="primary" style="width: 300px;">解密</a-button>
  </div>

  </div>
</template>

<script>

import { encryptSM4,decryptSM4 } from '../../../src/utils/SM4'
export default {
  // 计算属性
  methods: {
    onGetForm() {

      var object = this.$refs.form.getForm()
   
      if( object.fol1=="")
      {
        return
      }
      const sign = object.fol1

      const encryptkey = encryptSM4(sign)

      const obj = {
        fol3: encryptkey!=null? encryptkey : ''
      }
      this.$refs.form.setForm(obj)
    }
    ,
    onSetForm()
    {
      const object = this.$refs.form.getForm()
      if( object.fol3=="")
      {
        return
      }
      const sign = object.fol3

      const decryptkey = decryptSM4(sign)

      const obj = {
        fol1: decryptkey
      }
      this.$refs.form.setForm(obj)
    }
    
  },
  computed: {

    formItems() {
      return [
        {
          item: [{ id: 'fol1', type: 'textarea', label: '明文', value: '' }]
        },
        // {
        //   item: [{ id: 'fol2', type: 'textarea', label: '密钥', value: '' }]
        // },
        {
          item: [{ id: 'fol3', type: 'textarea', label: '密文', value: '' }]
        }

      ]
    }

  }
}
</script>