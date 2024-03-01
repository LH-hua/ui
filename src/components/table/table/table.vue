<template>
  <div class="sun_env_table">
    <slot name="head" />
    <a-config-provider>
      <template #renderEmpty>
        <a-empty />
      </template>
      <a-table :columns="columnsed" :data-source="dataSource" :bordered="bordered" :pagination="false" :scroll="scroll"
        :row-selection="isSelection ? rowSelection : null" :rowKey="(r, i) => i.toString()" :loading="loading">
        <template v-for="column in columnsed" :slot="column.scopedSlots?column.scopedSlots.customRender:''"
          slot-scope="text,record">
          <slot :name="column.scopedSlots ? column.scopedSlots.customRender : ''" v-bind:scope="record"></slot>
        </template>
      </a-table>
    </a-config-provider>
    <div class="table_page" v-if="pagination">
      <slot name="page" />
      <div class="pagination">
        <Paginationer :pagination="pagination" @page-change="pageChange" @size-change="showSizeChange" />
      </div>
    </div>
  </div>
</template>
<script>
import Paginationer from '../paginationer/index.vue'
export default {
  components: { Paginationer },
  props: {
    // 合并规则 一维/二维
    colSpans: { type: Array, default: () => ([]) },
    // 表格数据
    dataSource: { type: Array, default: () => ([]) },
    // 表头数据
    columns: { type: Array, default: () => ([]) },
    // 是否显示边框
    bordered: { type: Boolean, default: true },
    // 分页
    pagination: { type: [Object, Boolean], default: () => ({}) },
    // 滚动
    scroll: { type: Object, default: () => ({}) },
    // 是否展示选项框
    isSelection: { type: Boolean, default: false },
    // 加载loading
    loading: { type: [Object, Boolean], default: () => false },

  },
  data() {
    return {
      columnsed: []
    }
  },
  watch: {
    colSpans() {
      this.restColumns()
    },
    columns() {
      this.initColumns()
    }
  },
  computed: {
    rowSelection() {
      const is = this.dataSource.some(item => item.disabled)
      return {
        columnTitle: is ? ' ' : '',
        onChange: (selectedRowKeys, selectedRows) => {
          const rows = {
            keys: selectedRowKeys,
            rows: selectedRows
          }
          this.$emit('row-select', rows)
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.disabled, // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  methods: {
    // 初始化表格
    initColumns() {

      this.columnsed = this.setColumns(this.columns)

      this.restColumns()
    },
    _getRowSpans(arr, key) {
      let sameValueLength = 0
      const rowSpans = []
      for (let i = arr.length - 1; i >= 0; i--) {
        if (i === 0) {
          rowSpans[i] = sameValueLength + 1
          continue
        }
        if (arr[i][key] === arr[i - 1][key]) {
          rowSpans[i] = 0
          sameValueLength++
        } else {
          rowSpans[i] = sameValueLength + 1
          sameValueLength = 0
        }
      }
      return rowSpans
    },
    // 行、列合并设置
    restColumns() {
      const colSpans = this.colSpans
      const columns = this.columnsed

      // 判断是一维还是二维 （一维：统一化合并；二维：定制化合并）
      const isDeep = colSpans.some(item => item instanceof Array)
      columns.forEach((item, i) => {
        /* 自动行合并 */
        const key = item.dataIndex || item.key
        const rowSpans = this._getRowSpans(this.dataSource, key)
        const rowIndex = item.merge ? i : false

        const customRender = (value, row, index) => {
          const obj = {
            children: item.html ? item.html(value, row, index) : value,
            attrs: {}
          }
          // 行合并
          if (i === rowIndex) {
            obj.attrs.rowSpan = rowSpans[index]
          }
          // 列和并
          if (this.colSpans.length > 0) {
            obj.attrs.colSpan = isDeep ? colSpans[index][i] : colSpans[i]
          }

          return obj
        }
        if (!item.scopedSlots) {
          item.customRender = item.customRender || customRender
        }
      })
    },
    // 触发分页
    pageChange(page) {
      this.$emit('page-change', page)
    },
    // pagesize改变触发
    showSizeChange(page, pageSize) {
      this.$emit('size-change', page, pageSize)
    },
    setColumns(data) {
      const deColumn = { align: 'center', ellipsis: true }
      let arr = []
      if (data && data.length) {
        arr = data.map(item => {
          if (item.children && item.children.length) {
            this.setColumns(item.children)
          }
          item.dataIndex = item.key
          return { ...deColumn, ...item }
        })
      }
      return arr
    }

  },
  created() {
    this.initColumns()
  }
}
</script>
<style lang="less" scoped>
.sun_env_table {
  width: 100%;
  height: 100%;

  .table_page {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;

    .pagination {
      position: absolute;
      right: 0;
    }
  }
}
</style>
