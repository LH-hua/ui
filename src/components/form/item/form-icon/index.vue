<template>
  <div class="_selecterBox">
    <a-tooltip placement="bottomLeft" overlayClassName="_tooltip_box" v-model="boxVisible"
      :get-popup-container="getPopupContainer" destroyTooltipOnHide trigger="click">
      <div class="box" slot="title">
        <div :class="prefixCls">
          <a-tabs v-model="currentTab" @change="handleTabChange">
            <a-tab-pane v-for="v in icons" :tab="v.title" :key="v.key">
              <ul>
                <li v-for="(icon, key) in v.icons" :key="`${v.key}-${key}`" :class="{ active: selectedIcon == icon }"
                  @click="handleSelectedIcon(icon)">
                  <a-icon :type="icon" :style="{ fontSize: '16px' }" />
                </li>
              </ul>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <a-input ref="dom" class="_input icon-selecter" v-model="selectedIcon" disabled :data-id="selectedIcon" placeholder="请选择">
        <a-icon slot="suffix" type="down" />
      </a-input>
    </a-tooltip>
  </div>
</template>

<script>
import icons from './icons'

export default {
  name: 'IconSelect',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-icon-selector'
    },
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  data() {
    return {
      selectedIcon: this.value || '',
      currentTab: 'directional',
      boxVisible: false, // ------------------当前窗口 展示隐藏
      icons
    }
  },
  watch: {
    value(val) {
      this.selectedIcon = val
      this.autoSwitchTab()
    }
  },
  created() {
    if (this.value) {
      this.autoSwitchTab()
    }
  },
  methods: {
    handleSelectedIcon(icon) {
      this.selectedIcon = icon
      this.$emit('change', icon)
      this.boxVisible = false
    },
    handleTabChange(activeKey) {
      this.currentTab = activeKey
    },
    autoSwitchTab() {
      icons.some(item => item.icons.some(icon => icon === this.value) && (this.currentTab = item.key))
    },
    getPopupContainer(trigger) {
      return document.body
    },
    onClick() {
      this.boxVisible = !this.boxVisible
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/index';

// The prefix to use on all css classes from ant-pro.
@ant-pro-prefix: ant-pro;
@ant-global-sider-zindex: 106;
@ant-global-header-zindex: 105;

.box {
  background-color: #fff;
  font-size: 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  height: 250px;
  background-color: #fff;

  li {
    display: inline-block;
    padding: @padding-sm;
    margin: 3px 0;
    border-radius: @border-radius-base;


    &:hover,
    &.active {
      // box-shadow: 0px 0px 5px 2px @primary-color;
      cursor: pointer;
      color: @white;
      background-color: @primary-color;
    }
  }
}
</style>

<style lang="less" >
@active-color: #3390f1;

._dropSelecterBox {
  width: auto;
}

._tooltip_box {
  * {
    font-size: 12px;
  }

  .ant-tooltip-arrow::before {
    background-color: white;
  }

  .ant-tooltip-inner {
    width: 600px;
    background-color: white;
    position: relative;
    padding: 0;
  }
}

._input {

  .ant-input[disabled] {
    color: black;
    background-color: #ffffff;
    cursor: pointer;
    opacity: 1;

    &:hover,
    &:focus {
      border-color: @active-color;
    }
  }

  .ant-input-suffix .anticon {
    cursor: pointer;
  }


}
.icon-selecter.ant-input-affix-wrapper .ant-input-disabled ~ .ant-input-suffix .anticon{
    cursor: pointer !important;
  }

</style>
