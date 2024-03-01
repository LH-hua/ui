<template>
  <div style="height: 400px" class="simple">
    <div class="items">
      <a-row v-show="sourceList">
        <a-col span="6" v-for="(ele, i) in sourceList" :key="i">
          <a-checkbox :checked="ele.checked" @click="onItemCheck(ele, i)" v-if="multiple">
            <span :title="ele.title">{{ ele.title.length > 5 ? ele.title.substring(0, 4) + '...' : ele.title }}</span>
          </a-checkbox>
          <a-radio v-else :checked="ele.checked" @click="onItemCheck(ele, i)">
            <span :title="ele.title">{{ ele.title.length > 5 ? ele.title.substring(0, 4) + '...' : ele.title }}</span>
          </a-radio>
        </a-col>
      </a-row>
    </div>
    <div class="footer">
      <span>
        <a-checkbox @change="onAllChecked" :checked="allCheck" v-if="multiple"> 全选 </a-checkbox>
      </span>
      <div class="btn-box">
        <a-button type="primary" class="submit" @click="onConfim()">确定</a-button>
        <a-button @click="onCancel()">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  props: {
    dataSource: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: true },
    echo: { type: Boolean, default: false },
    // 默认选中回显回调
    onInit: { type: Function, default: () => () => { } },
    defaultCode: { type: Array, default: () => [] }
  },
  data() {
    return {
      sourceList: [],
    }
  },
  computed: {
    allCheck() {
      const isAllCheck = this.sourceList.length ? this.sourceList.every(item => item.checked) : false
      return isAllCheck
    }
  },
  methods: {
    initData() {
      if (!this.$utils.isNull(this.dataSource)) {
        this.sourceList = cloneDeep(this.dataSource)
        // 初始默认选中
        if (this.defaultCode && this.defaultCode.length) {
          //有默认参数
          const codes = this.defaultCode
          for (let i = 0; i < codes.length; i++) {
            this.sourceList.forEach(item => {
              if (item.value == codes[i]) {
                this.$set(item, 'checked', true)
              }
            })
          }
        } else {
          //无默认参数
          const selectedCount = this.multiple ? 3 : 1
          this.sourceList.forEach((item, index) => {
            if (index < selectedCount) {
              this.$set(item, 'checked', true)
            }
          })
        }

        // 数据回显到父组件
        const titleArr = []
        const keyArr = []
        const selectedItems = this.sourceList.filter(item => item.checked)
        selectedItems.forEach(item => {
          titleArr.push(item.title)
          item.value = item.value.replace(/[^\d]/g, '')
          keyArr.push(item.value)
        })
        this.activeName = titleArr
        this.selectedItems = keyArr
        if (this.echo) {
          this.onInit(selectedItems, keyArr)
        }
      }
    },
    onAllChecked(e) {
      this.sourceList.forEach(ele => {
        this.$set(ele, 'checked', e.target.checked)
      })
    },
    onItemCheck(target, index) {
      if (!this.multiple) {
        this.sourceList.forEach(ele => {
          this.$set(ele, 'checked', false)
        })
      }
      this.$set(target, 'checked', !target.checked)
    },
    onConfim() {
      const checkList = this.sourceList.filter(item => item.checked)
      const keyArr = checkList.map(item => item.value)
      this.$emit('onRegionClose', checkList, keyArr)
    },
    onCancel() {
      this.$emit('onRegionClose', 'close')
    }
  },
  watch: {
    multiple() {
      this.initData()
    },
    dataSource: {
      deep: true,
      handler() {
        this.initData()
      }
    },
    echo() {
      this.initData()
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.simple {
  width: 100%;
  border-top: 1px solid #ddd;
  position: relative;
  background-color: #fff;

  .items {
    padding: 10px 15px;
    height: calc(100% - 50px);
    overflow-y: auto;

    div {
      height: 35px;
      line-height: 35px;

      .ant-checkbox-wrapper {
        color: rgba(0, 0, 0, 0.75);
        font-size: 13px;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        display: flex;
        flex-wrap: wrap;
        min-width: 92px;
        min-height: 35px;
        align-items: center;
        // flex-grow: 1;
      }
    }
  }

  .footer {
    width: 100%;
    height: 50px;
    background: rgba(0, 0, 0, 0.02);
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .btn-box {
      position: absolute;
      right: 10px;

      .ant-btn {
        font-size: 12px;
      }

      .submit {
        margin-right: 10px;
      }
    }
  }
}
</style>
