<template>
  <div class="list-tab">
    <a-checkable-tag key="all" :checked="selectedTabs.length === renderTab.length" @change="toggleAll">全选</a-checkable-tag>
    <template v-for="tab in renderTab">
      <a-checkable-tag :key="tab.dictionaryItemCode" :checked="selectedTabs.indexOf(tab.dictionaryItemCode) > -1" @change="(checked) => handleChange(tab, checked)">
        {{ tab.dictionaryItemText }}
      </a-checkable-tag>
    </template>
    <div class="_list-search">搜索：<a-input-search placeholder="搜索站点" style="width: 150px" enter-button @search="onSearch" /></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: false,
      tabWidth: [],
      startTab: 0,
      renderTab: [],
      selectedTabs: [],
      last: false
    }
  },
  props: {
    tabs: {
      default: () => [],
      type: Array
    },
    selectedItem: {
      default: () => [],
      type: Array
    }
  },
  model: {
    event: 'tabchange',
    prop: 'selectedItem'
  },
  methods: {
    onSearch(value) {
      this.$emit('search', value)
    },
    toggleAll(checked) {
      checked
        ? (this.selectedTabs = this.renderTab.map((value) => {
          return value.dictionaryItemCode
        }))
        : (this.selectedTabs = [])
      this.$emit('tabchange', this.selectedTabs)
    },
    handleChange(tab, checked) {
      const { selectedTabs } = this
      const nextSelectedTabs = checked ? [...selectedTabs, tab.dictionaryItemCode] : selectedTabs.filter((t) => t !== tab.dictionaryItemCode)
      this.selectedTabs = nextSelectedTabs
      this.$emit('tabchange', this.selectedTabs)
    }
  },
  watch: {
    tabs() {
      this.renderTab = this.tabs
      this.selectedTabs = this.selectedItem
    },
    selectedItem() {
      this.selectedTabs = this.selectedItem
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.renderTab = this.tabs
      this.selectedTabs = this.selectedItem
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
  height: 36px;
  white-space: nowrap;
  ._list-search {
    float: right;
    color: #000;
    /deep/ .ant-input {
      border-color: #d5d5d5;
      line-height: 20px !important;
    }
    /deep/ .ant-btn {
      margin-left: 0 !important;
    }
  }
  .ant-tag {
    display: inline-block;
    vertical-align: top;
    min-width: 48px;
    height: 24px;
    line-height: 22px;
    margin-top: 3px;
    text-align: center;
    color: #000;
    cursor: pointer;
    &:hover {
      color: #1c84f0;
    }
  }
  .ant-tag-checkable-checked {
    color: #1c84f0;
    border: 1px solid #318ef1;
    background-color: #e6f1ff;
  }
}
</style>
