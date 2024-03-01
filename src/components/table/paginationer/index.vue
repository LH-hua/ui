<template>
  <div class="env_pagination">
    <a-pagination
      v-model="page.current"
      :show-quick-jumper="page.showQuickJumper"
      :total="page.total"
      :page-size="page.pageSize"
      :show-size-changer="page.showSizeChanger"
      :page-size-options="page.pageSizeOptions"
      @change="onPageChange"
      @showSizeChange="onSizeChange"
      :show-total="total => `总共 ${total} 条`" />
  </div>
</template>

<script>
export default {
  name: 'paginationer',
  props: {
    pagination: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      page: {}
    }
  },
  watch: {
    pagination: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  methods: {
    init() {
      const page = {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 1,
        showQuickJumper: false,
        showSizeChanger: true
      }
      this.page = Object.assign(page, this.pagination)
    },
    /* 分页改变 */
    onPageChange(page) {
      this.$emit('page-change', page)
    },
    // pagesize改变触发
    onSizeChange(page, pageSize) {
      this.$emit('size-change', page, pageSize)
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
/deep/ ul li {
  line-height: 30px;
}
</style>