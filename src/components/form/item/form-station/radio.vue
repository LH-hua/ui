<template>
  <label class="radio" :class="{ checked: checked }">
    <span class="icon">
      <input type="radio" name="radio" v-model="checked" @click.stop.prevent="change" />
    </span>
    <span class="name" :title="param.name">{{ param.name }}</span>
  </label>
</template>

<script>
export default {
  data() {
    return {
      loaded: false
    }
  },
  props: {
    param: {
      default: () => {},
      type: Object
    },
    index: {
      default: -1,
      type: Number
    },
    pIndex: {
      default: -1,
      type: Number
    },
    checked: {
      default: false,
      type: Boolean
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  methods: {
    change() {
      this.$emit('change', true, this.index, this.pIndex)
    }
  },
  watch: {
    checked(bol) {
      this.check = this.checked
    }
  },
  mounted() {
    this.check = this.checked
  },
  updated() {
    this.loaded = true
  }
}
</script>

<style lang="less">
.radio {
  display: inline-block;
  width: 100%;
  height: 30px;
  padding: 7px 2px;
  line-height: 16px;
  box-sizing: border-box;
  -webkit-user-select: none;
  font-size: 0;
  &.checked {
    .icon {
      background: #fff;
      border-color: #1890ff;
      &::after {
        display: inline-block;
        vertical-align: top;
        content: '';
        height: 8px;
        width: 8px;
        margin: 3px;
        background: #1890ff;
        border-radius: 50%;
      }
    }
  }
  .icon {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    input[type='radio'] {
      position: absolute;
      opacity: 0;
    }
  }
  .name {
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    padding-right: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(~'100% - 21px');
    box-sizing: border-box;
  }
}
</style>
