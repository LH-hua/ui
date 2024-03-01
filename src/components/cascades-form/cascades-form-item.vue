<template>
  <div class="_box">
    <a-row class="_form">
      <a-col v-if="title" :span="titleCol" class="_l">
        <div :title="title">{{ title }}</div>
      </a-col>
      <a-col :span="title ? 24 - titleCol : 24" class="_r">
        <slot></slot>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    titleCol: {
      type: Number,
      default: 7
    }
  }
}
</script>

<style lang="less">
.cascades-form-box {
  @borderColor: #dbddde;
  ._box {
    margin: 10px 0;
    ._form {
      border: 1px solid @borderColor;
      font-size: 12px !important;
      line-height: 30px;
      height: 30px;
      border-radius: 5px;
      overflow: hidden;
      margin: 0 0 !important;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      ._l {
        line-height: 30px;
        padding-left: 10px;
        background-color: #f8fafc;
        border-radius: 5px 0px 0px 5px;
        border-right: 1px solid @borderColor;
        border-top-right-radius: 0;
      }
      ._r {
        line-height: 30px;
        overflow: hidden;
        box-sizing: border-box;
        .ant-select-selection {
          border: none !important;
        }
        .ant-select,
        .ant-input,
        .ant-calendar-picker {
          width: 100% !important;
          border: none !important;
        }
        .ant-input-number{
          border: none !important;
        }
        .ant-input {
          border: none !important;
          width: 100%;
        }
      }
    }
  }
}
</style>
