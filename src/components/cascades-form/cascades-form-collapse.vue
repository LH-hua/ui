<template>
  <a-collapse class="form-item" active-key="1" expand-icon-position="right" style="width:100%">
    <a-collapse-panel key="1" :header="title" style="width:100%">
      <slot></slot>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
export default {
  props:{
    title: {
      type: String,
      required: true
    }
  },
  data(){
    return {}
  }
}
</script>

<style lang="less" scoped>
.form-item{
  margin-bottom: 10px;
}
</style>
<style>
.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
   padding: 7px 5px !important;
   padding-left: 10px !important;
 }
 .ant-collapse-content > .ant-collapse-content-box{
   padding: 5px;
 }
</style>
