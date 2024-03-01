<template>
  <ul ref="ul" class="list-tab" :class="{ hasPagination: pagination }">
    <!-- 左侧滑动 -->
    <li v-if="pagination" class="pagination" @click="prev" :class="{ disabled: startTab === 0 }">
      <img
        class="normal"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABs0lEQVRIS+WVMYsUQRCF31s2MdLgDETQ3NjkTETBwECmq3bXgwtERE0NFAT/gAYeGCuCBqK4bFePgR6IYGKigoEgiCAYCxqJyTIlAzvH2Oy5s8IlOuGbel8Xr6toYoc+7hAX/yhYVfe5+6qZxTy6EMLZlNK9XO8UhYh8B7DHzH6rF5GvAFZyvT5kIVhEJgCU5PkY492mMxG5DeACyY0Y45WlOg4hXCJ5i+T1GOO1xqyq6+7+AMBDM1ufN1nbdqyqa+7+CMBjM1trzEVRHOn1eq8AvOz3+4PxePytM1hEjtZGkm8BDGOMX2rz7BKfAdhVVdWwLMv32+3B3I5F5COAve4+Sim9aOVa530CwGkz2/zTcs0Fq+ond1+ZAZ5n4OO53jmKwWBwqqqqJyTfkRxOJpPPsygOuvsmyZ9tvTO4LhSRqwBuADAz08YcQjhJ8mmuLzVuInIfwBl330gpbc2qql5295u53oYvXJAQwhuShwFcNLM7rbzrZTmX683/heBZLD8AvDazY41xNBrtnk6n9WQcMLP9S0XRLi6K4lBZlh9yjeRqSmlr1Zfq+G8eg05R/B/gX5f+sBfHOoLGAAAAAElFTkSuQmCC"
      />
      <img
        class="hover"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABtUlEQVRIS+WVwYtNcRzFP2caYYV6vPso9tY2YyPKwsJmPDM1C0lYybvvUco/YBa4901WNMVCpFAWTEnNxgZloZSUUureR7GSlXt0693pub1n7lOz4S7P/Z7zO53f9/QTa/RpjXT5R4VrkRvrYCpp60E5uiDy8bStm2W8UhT12N8Em9NQv80Hsb8AtTKeH7KqcBD7PjBtONkLtVg4a8S+bjgFXElDnR/Lcb3rlkwscSlp6WJB3t71XGZuC+4koeaGbdZIx/XYs4K7mHtpW7MFeVvXeyfMc2B5MuPIp46+VhYOrnofEywDrzRJMzmjjzm5f4lPDBttmr2O3ozqwVDHQeR3iK0WR3stPSvI/bwPKmMm6WjpT+UaLhz7vaFmmPkc6umgsOFAGa8cRX3Bh5XxCPHaGc1eWx9ycuOad/knudMfg3hl4XwwiH0BmDc87IWaXnEd+RDicRkfa92C2LeAY+VdDWKfAy6P2uFqBYn8ErFHcDoJdWPFedeLmBNlvPi/avP6sXwHXqSh9hfELfPetH4DS4idaUs7xopicDhY8O70rN6WMWdMDVZ9LMd/8xhUiuL/EP4FtwWmFw+QTLUAAAAASUVORK5CYII="
      />
    </li>
    <!-- tab 类型 -->
    <li ref="li" v-for="(tab, index) in renderTab" :key="index" :class="{ active: tabIndex - startTab === index }" @click="tabCange(index + startTab)">
      <span>{{ tab.name }}</span>
    </li>

    <!-- 右侧滑动 -->
    <li v-if="pagination" class="pagination" @click="next" :class="{ disabled: last }">
      <img
        class="normal"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABs0lEQVRIS92TMWtUURCFzzweNkpA/AGCIClNUEtBkUC0kDt3MQQbA0GwVEyhf0AQjGArImIT3Je9ZxaLFCmS9NoKSRPsBEUQwW4ZecGFS0x29y1s41SXczkfc8+dEUyoZEJc/CfgGKP2er3dbrf7OY8qhHDRzD6NEt+RUajqPoCvZVnOV1X1sw9S1S0AMyRPD4MfCY4xLrv7awBvSC73IZmeSLYGwY/9vBjjU3d/IiIrKaXVDH6gu/sDM3t5HHzgVKjqewAL7n7TzDaySA50EVlMKdXnf2ogOMZ4FsC6u58SkfmU0peakOmXAFwluXOYPHSOQwjXRaQCsJXnmunfSE6PA74hIm0AmyRjFsccgLaIfE8pnW8EVtUL7r5eFMUJd58juVcDWq3WuVp399miKG51Op0PI4NV9QwAArji7nfMbC3rNgFQAI9JPmv0eapaP/+2iKymlFb65hDCcxF5BOAdybuNxk1VXwB4CGCb5LWs03sAXrn7RzO73HhBVNUB/CI5lZv/6r9JnhxrpUMIS2b29rBZVe+XZdmuqurHWOBhplHuhy7IKJBGUzEusO+bWMd/ALSVtxeO/fazAAAAAElFTkSuQmCC"
      />
      <img
        class="hover"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABwklEQVRIS93TsWvUcBjG8e9zJy6KIIVegoMgiKMWdRQUKVQHoRZFXBSK4FB6v9QO9R8QBOsl0klExEV6lnZwcHCo7roKuoig9BcURQRR8Hyl0oRQrneXg1vM+Ib3Q3jyvGJAjwbk8p/AYWLjJt74ab0uRhUmdnitrle9xNc2iiC2d4D/9ZOxr3P6lkFBbKsGh1Kn3d3wtnAttknBPcR9X9dkhuRzWPZOE53wLX9emNgNM64Ds95pPkOyuQmX1pVshXdsRdCwRcR5jNM+0tM8ko25wYXUabEd3hEOF2yv/WYJsVNVxtam9H4dyedwhD8c9zN6sRnv2uNaYidlPAZWi7nmc+OTj3SgNBw07BSiafAsdTqbAcOxjQqags/eaX8pePiOHay0/kWxvbqN0Y9TersO1Bq2TxWWMEaswpl0Wk96hvcs2FCrxQrGMTMuppEeFWq3LBgH5rzTzVI/L4itCZwD5r3TbOFIbgHXgIfe6VKputViuy2IgOfe6UTe4diuGNzFeOkjHS19IEFsBnz3TruKyxvzH95pR18nHTTsso/0YPNymNjVaovmhxl96QvuttTL+64H0gtSqhX9gtnewL74LzBJqRdzTK+oAAAAAElFTkSuQmCC"
      />
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      pagination: false,
      tabWidth: [],
      startTab: 0,
      renderTab: this.tabs,
      last: false
    }
  },
  props: {
    tabs: {
      default: () => [],
      type: Array
    },
    tabIndex: {
      default: 0,
      type: Number
    }
  },
  model: {
    event: 'tabchange',
    prop: 'tabIndex'
  },
  watch: {
    startTab(index) {
      this.tabPagination(index)
    }
  },
  methods: {
    // tab切换事件
    tabCange(index) {
      this.$emit('tabchange', index)
    },
    tabPagination(index) {
      if (!this.pagination) {
        return false
      }
      let w = 0
      const list = this.tabs
      this.renderTab = []
      for (let i = index; i < list.length; i++) {
        w += this.tabWidth[i] + 2
        if (i === list.length - 1) {
          this.last = true
        }
        if (w >= this.contentWidth - 68) {
          return false
        }
        this.renderTab.push(list[i])
      }
    },
    next() {
      if (this.last) {
        return
      }
      this.startTab = this.startTab + 1
    },
    prev() {
      this.last = false
      if (this.startTab === 0) {
        return
      }
      this.startTab = this.startTab - 1
    },
    init() {
      // console.log(this.tabs)
      const tabs = this.$refs.li
      this.contentWidth = this.$refs.ul.offsetWidth

      let listWidth = 0
      for (let i = 0; i < tabs.length; i++) {
        listWidth += tabs[i].offsetWidth
        this.tabWidth.push(tabs[i].offsetWidth)
      }
      listWidth += tabs.length * 2 - 2

      // tab页是否超过容器
      if (listWidth > this.contentWidth) {
        this.pagination = true
        this.tabPagination(0)
      }
      this.renderTab = this.tabs
    }
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.init()
      })
    })
  }
}
</script>

<style lang="less" scoped>
.list-tab {
  margin-top: 5px;
  list-style: none;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  height: 32px;
  white-space: nowrap;
  // overflow: hidden;
  &.hasPagination {
    text-align: center;
  }
  li {
    display: inline-block;
    vertical-align: top;
    padding: 0 10px;
    font-size: 13px;
    line-height: 30px;
    min-width: 60px;
    cursor: pointer;
    background: #f1f1f1;
    margin-right: 2px;
    border: 1px solid #ddd;
    border-radius: 2px 2px 0 0;
    box-sizing: border-box;
    text-align: center;
    -webkit-user-select: none;
    &.pagination {
      background: none;
      width: 30px;
      height: 32px;
      line-height: 22px;
      border: none;
      padding: 6px 0;
      min-width: auto;
      color: #ddd;
      box-sizing: border-box;
      &.disabled {
        opacity: 0;
        pointer-events: none;
      }
      &:hover {
        .hover {
          display: inline-block;
        }
        .normal {
          display: none;
        }
      }
      .hover {
        display: none;
      }
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
    span {
      display: inline-block;
      vertical-align: top;
      position: relative;
      z-index: 5;
    }
    &:last-child {
      margin-right: 0;
    }
    &.active {
      font-weight: bold;
      color: #1890ff;
      background: #fff;
      border-bottom-color: #fff;
    }
  }
}
</style>
