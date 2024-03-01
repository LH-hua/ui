<template>
  <div class="env-station-select" :style="styles">
    <a-popover v-model="visible" placement="bottomLeft" trigger="click" overlayClassName="department">
      <div slot="content">
        <div class="list" :style="`${listSize.width ? `width: ${listSize.width}px;` : 'width: 400px;'} height:400px`">
          <tabs :tabs="tabs" v-model="selectedItem" @search="search"></tabs>
          <div class="list-content">
            <a-spin :spinning="loading">
              <ul v-if="displayDataList.length > 0">
                <li v-for="(city, cindex) in searchList" :key="cindex" v-show="hasDistrict(city.children)">
                  <div class="province-name" @click="toggleCity(city.regionCode)">
                    <a-icon :type="foldItems.indexOf(city.regionCode) > -1 ? 'caret-right' : 'caret-down'" />
                    <span v-if="mode === 'radio'">{{ city.name }}</span>
                    <s-checkbox style="width: 150px" :param="city" :index="cindex" v-if="mode === 'checkbox'"
                      v-model="city.checked" @change="checked => toggleAll(checked, city, 1)" />
                    <p class="station-total" v-show="mode === 'checkbox'">
                      已选单位：<span style="color: #1890ff; white-space: nowrap">{{ getCityTotal(city, 1) }}</span>/{{
                      getCityTotal(city, 2)
                      }}
                    </p>
                  </div>
                  <ul v-show="!(foldItems.indexOf(city.regionCode) > -1)">
                    <li v-show="hasStation(district.children)" v-for="(district, dindex) in city.children" :key="dindex"
                      class="city-group">
                      <div class="group-name" style="padding-left: 38px">
                        <div v-if="mode === 'radio'" class="radio">{{ district.name }}</div>
                        <s-checkbox :param="district" :index="dindex"
                          :class="{ disabled: district.children.length === 0 }" v-model="district.checked"
                          @change="checked => toggleAll(checked, district, 2)" v-if="mode === 'checkbox'" />
                      </div>
                      <ul class="station-group">
                        <li v-for="(station, index2) in district.children" :key="index2" style="width: 33.3%">
                          <s-checkbox :class="{ disabled: disableStation.indexOf(station.stationCode) > -1 }"
                            :param="station" :index="index2" :pIndex="dindex" v-model="station.checked"
                            @change="checked => itemChecked(checked, station, 1)" v-if="mode === 'checkbox'" />
                          <s-radio :class="{ disabled: disableStation.indexOf(station.stationCode) > -1 }"
                            :param="station" :index="index2" :pIndex="dindex" v-model="station.checked"
                            @change="checked => itemChecked(checked, station, 2)" v-if="mode === 'radio'" />
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <a-empty style="margin-top: 80px" v-else></a-empty>
            </a-spin>
          </div>
          <div class="list-operation">
            <div v-if="this.mode === 'checkbox'" class="station-btn empty" @click.stop="selectAll(false)">取消全选</div>
            <div v-if="this.mode === 'checkbox'" class="station-btn all" @click.stop="selectAll(true)">全选</div>
            <div class="station-btn cancel" @click.stop="cancel">取消</div>
            <div class="station-btn confirm" @click.stop="confirm">确定</div>
          </div>
        </div>
      </div>

      <div type="text" class="sun-input" v-if="getSelectedName">{{ getSelectedName }}
        <span class="arrow">></span>
      </div>
      <div type="text" class="sun-input placeholder" v-else>请选择</div>
    </a-popover>
  </div>
</template>

<script>
import SCheckbox from './checkbox'
import Tabs from './checkTab'
import SRadio from './radio'
import { Empty } from 'ant-design-vue'
import { buildLeftSideTreeByItem } from '../../../../utils/other'
import { cloneDeep } from 'lodash'

export default {
  props: {
    // 同步id，给组件配置相同的id可实现数据值同步
    syncId: {
      type: String,
      default: ''
    },
    // 数据列表
    datas: {
      type: Array,
      default: () => []
    },
    // 默认选中的 tabs属性
    tabsData: {
      type: Array,
      default: () => []
    },
    // 禁用站点列表
    disableStation: {
      type: Array,
      default: () => []
    },
    // 组件选中值
    value: {
      type: [Array, String],
      default: () => []
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 模式 单选、多选
    mode: {
      type: String,
      default: 'checkbox'
    },
    // 弹窗大小
    listSize: {
      type: Object,
      default: () => ({
        width: 650,
        height: 400
      })
    },
    // 输入框样式
    styles: {
      type: String,
      default: ''
    },
    // 列表最小宽度
    minItemWidth: {
      type: Number,
      default: 100
    },
    // 需要返回的字段
    field: {
      type: [Array],
      default: () => []
    },
    maxTagCount: {
      type: [Number,String],
      default: 3
    }
  },
  data() {
    return {
      // 控制下拉框显示
      visible: false,
      // 列表数据
      dataList: [],
      // 用于展示内容的数据
      displayDataList: [],
      // 记录点击确认前所选中的数据
      tempValue: [],
      // 第一次加载数据loading
      loading: false,
      // 选中站点名称
      selectedName: '',
      // 搜索文字
      searchText: '',
      // 站点总数
      dataTotal: 0,
      // tab列表数据
      tabs: [],
      // tab选中项
      selectedItem: [],
      // 列表折叠项
      foldItems: [],
      // 成功获取vuex数据
      syncComplete: false,
      // 获取全局同步站点
      syncStations: []
    }
  },
  watch: {
    // 监听选中值，统一更新选中状态
    // value(v) {
    //   const checkedItems = Array.isArray(v) ? v : v.split(',')
    //   this.initCheck(checkedItems)
    //   this.dataList = this.displayDataList
    //   this.getCityNames()
    // },
    // 监听列表显示隐藏
    visible(v) {
      // 更新选中数据
      this.tempValue = this.value

      if (v) {
        // 列表显示时
        this.displayDataList = this.dataList
      }
    },
    // 监听数据源
    datas(newVal, oldVal) {
      if (newVal.length > 0) {
        this.initData()
        this.initTab()
        // console.log(this.value);
        if (!Array.isArray(this.value) && this.value === 'all') {
          this.selectAll(true)
          this.value = this.tempValue
        } else {
          const checkedItems = Array.isArray(this.value) ? this.value : this.value.split(',')
          this.initCheck(checkedItems)
          this.tempValue = checkedItems
        }
        this.dataList = this.displayDataList
        this.getCityNames()
        this.$emit('onGetFullData', this.getFullData())
      }
    }
  },
  computed: {
    // 根据搜索条件生成新的数据
    // eslint-disable-next-line vue/return-in-computed-property
    searchList() {
      // 根据搜索过滤列表
      const filterData = this.displayDataList.map(st => ({
        ...st,
        children: st.children.map(nd => ({
          ...nd,
          children: nd.children.filter(e => e.name.indexOf(this.searchText) > -1).filter(e => this.selectedItem.indexOf(e.stationTypeId.toString()) > -1)
        }))
      }))
      const result = []
      filterData.forEach(st => {
        const stItem = { ...st, children: [] }
        let stChecked = true
        st.children.forEach(nd => {
          const ndItem = { ...nd, children: [] }
          let ndChecked = nd.children.length > 0
          nd.children.forEach(rd => {
            const rdItem = rd
            // console.log(this.tempValue);
            rdItem.checked = Array.isArray(this.tempValue) ? this.tempValue.indexOf(rd.stationCode) > -1 : this.tempValue === rd.stationCode
            const isDisabled = this.disableStation.indexOf(rd.stationCode) > -1
            if (stChecked && !rdItem.checked && !isDisabled) {
              stChecked = false
            }
            if (ndChecked && !rdItem.checked && !isDisabled) {
              ndChecked = false
            }
            ndItem.children.push(rdItem)
          })
          ndItem.checked = ndChecked
          stItem.children.push(ndItem)
        })
        stItem.checked = stChecked
        result.push(stItem)
      })
      return result
    },
    selectNameArr() {
      if (this.selectedName) {
        return this.selectedName.split(',')
      } else {
        return []
      }
    },
    getSelectedName(){
      let name = this.selectedName.split(',')
      let selectedName = this.selectedName.split(',')
      let suffix  = ''
      if(name.length > this.maxTagCount){
        name = name.slice(0,this.maxTagCount)
        suffix = ` + ${selectedName.length - this.maxTagCount}...`
      }
      return name + suffix
    }
  },
  components: {
    SCheckbox,
    SRadio,
    Tabs,
    AEmpty: Empty
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  mounted() {
    this.$nextTick(() => {
      this.initData()
      this.initTab()
      if (!Array.isArray(this.value) && this.value === 'all') {
        this.selectAll(true)
        this.value = this.tempValue
        this.getCityNames()
        this.$emit('onGetFullData', this.getFullData())
      } else {
        const checkedItems = Array.isArray(this.value) ? this.value : this.value.split(',')
        this.initCheck(checkedItems)
        this.tempValue = checkedItems
        this.getCityNames()
        this.$emit('onGetFullData', this.getFullData())
      }
    })
  },
  methods: {
    // 1.初始化组件数据
    initData() {
      if (!this.$utils.isNull(this.datas)) {
        // 获取数据成功后进行默认值初始化
        this.displayDataList = this.getTreeData(this.datas)
        this.initDefault()
        this.getDataTotal()
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 2.更新树选中状态
    initCheck(value) {
      const result = []

      this.displayDataList.forEach(st => {
        const stItem = { ...st, children: [] }

        let stChecked = true
        st.children.forEach(nd => {
          const ndItem = { ...nd, children: [] }
          let ndChecked = nd.children.length > 0
          nd.children.forEach(rd => {
            const rdItem = rd

            rdItem.checked = Array.isArray(value) ? value.indexOf(rd.stationCode) > -1 : value === rd.stationCode
            const isDisabled = this.disableStation.indexOf(rd.stationCode) > -1
            if (stChecked && !rdItem.checked && !isDisabled) {
              stChecked = false
            }
            if (ndChecked && !rdItem.checked && !isDisabled) {
              ndChecked = false
            }
            ndItem.children.push(rdItem)
          })
          ndItem.checked = ndChecked
          stItem.children.push(ndItem)
        })
        stItem.checked = stChecked
        result.push(stItem)
      })
      this.displayDataList = result
      // console.log(this.displayDataList);
    },
    // 3.根据选中项获取名称
    getCityNames() {
      const nameArr = []
      this.dataList.forEach(st => {
        st.children.forEach(nd => {
          nd.children.forEach(rd => {
            if (rd.checked) {
              // 拼接数据
              nameArr.push(rd.name)
            }
          })
        })
      })
      this.selectedName = nameArr.toString()
      return this.selectedName
    },
    // 4.选中事件
    itemChecked(checked, item, type) {
      const { stationCode } = item
      if (this.disableStation.indexOf(stationCode) > -1) {
        // 如果站点为禁用站点则直接跳过
        return
      }

      if (type === 1) {
        // 多选
        // debugger
        this.tempValue = checked ? [...this.tempValue, stationCode] : this.tempValue.filter(e => e !== item.stationCode)
      } else {
        // 单选
        this.tempValue = stationCode
      }
      this.initCheck(this.tempValue)
    },
    // 5.确认事件
    confirm() {
      // 更新组件值
      this.$emit('change', this.tempValue, this.getCityNames())

      this.$emit('onGetFullData', this.getFullData())
      // 隐藏列表
      this.visible = false
    },
    // 6.初始化默认选中
    initDefault() {
      // 同步值优先级大于外部传值
      if (this.syncId) {
        this.initCheck(this.syncStations)
      } else {
        this.initCheck(this.value)
      }
      this.dataList = this.displayDataList
      this.getCityNames()
    },
    // 7.搜索事件
    search(v) {
      this.searchText = v
    },
    // 8.省、市全选|取消
    toggleAll(checked, item, level) {
      const childrenItems = []
      item.children.forEach(i1 => {
        if (level === 2) {
          if (this.disableStation.indexOf(i1.stationCode) === -1) {
            childrenItems.push(i1.stationCode)
          }
        } else {
          i1.children.forEach(i2 => {
            if (this.disableStation.indexOf(i2.stationCode) === -1) {
              childrenItems.push(i2.stationCode)
            }
          })
        }
      })
      if (checked) {
        this.tempValue = Array.from(new Set([...this.tempValue, ...childrenItems]))
      } else {
        this.tempValue = this.tempValue.filter(e => childrenItems.indexOf(e) === -1)
      }
      this.initCheck(this.tempValue)
    },
    // 9.全选
    selectAll(checked) {
      if (checked) {
        const all = []
        this.displayDataList.forEach(st => {
          st.children.forEach(nd => {
            nd.children.forEach(rd => {
              all.push(rd.stationCode)
            })
          })
        })
        this.tempValue = all
      } else {
        this.tempValue = []
      }
      this.initCheck(this.tempValue)
    },
    // 10.取消事件
    cancel() {
      this.visible = false
    },
    // 11.获取全部站点数量
    getDataTotal() {
      let total = 0
      this.dataList.forEach(st => {
        st.children.forEach(nd => {
          total += nd.children.length
        })
      })
      this.dataTotal = total
    },
    // 12.提供给外部获取除id以外其他信息
    getFullData() {
      // debugger
      let params = ['name', 'stationCode']

      if (!this.$utils.isNull(this.field)) {
        params = this.field
      }

      const result = []
      const data = cloneDeep(this.dataList)
      data.forEach(st => {
        st.children.forEach(nd => {
          nd.children.forEach(rd => {
            if (rd.checked) {
              const obj = {}
              params.map(e => {
                obj[e] = rd[e]
              })
              result.push(obj)
            }
          })
        })
      })

      return this.mode === 'radio' ? result[0] : result
    },
    // 13.获取一市站点数量
    getCityTotal(list, type) {
      let total = 0
      let count = 0
      list.children.forEach(nd => {
        total += nd.children.length
        count += nd.children.filter(e => e.checked).length
      })
      if (type === 1) {
        return count
      } else if (type === 2) {
        return total
      }
    },

    // 14. 城市显示、隐藏
    toggleCity(code) {
      if (this.foldItems.indexOf(code) > -1) {
        this.foldItems = this.foldItems.filter(i => i !== code)
      } else {
        this.foldItems.push(code)
      }
    },
    // 15.初始化站点种类tab
    initTab() {
      // 深拷贝份 数据源
      const data = cloneDeep(this.datas)

      if (this.$utils.isNull(data)) return

      const arr = []
      // 1.遍历站点类型对象
      data.map(e => {
        if (!this.$utils.isNull(e.regionType)) {
          arr.push({
            dictionaryItemCode: String(e.regionType),
            dictionaryItemText: e.dictionaryItemText,
            rank: e.rank
          })
        }
      })

      // 2.去除重复的对象
      const obj = {}
      const tabs = arr.reduce((cur, next) => {
        // eslint-disable-next-line no-unused-expressions
        obj[next.dictionaryItemCode] ? '' : (obj[next.dictionaryItemCode] = true && cur.push(next))
        return cur
      }, [])

      // 3.根据 rank字段 排序
      tabs.sort(function (a, b) {
        return a.rank - b.rank
      })

      this.tabs = tabs

      if (!this.$utils.isNull(this.tabsData)) {
        this.selectedItem = this.tabsData
      } else {
        this.selectedItem = tabs.map(e => e.dictionaryItemCode)
      }
    },
    // 16.判断选中站点是否相等
    isEqual() {
      if (this.syncStations.length !== this.value.length) {
        return false
      }
      for (let i = 0; i < this.syncStations.length; i++) {
        const code = this.syncStations[i]
        if (this.value.indexOf(code) === -1) {
          return false
        }
      }
      return true
    },
    // 17.加载全局同步选中站点
    initSyncData() {
      // 更新选中值
      this.tempValue = this.syncStations
      // 更新组件数据
      this.confirm()
    },

    /* ----------------------------------------------------------------------
    | 数据处理
    |-----------------------------------------------------------------------
    */
    // 18 数据成树结构
    getTreeData(data) {
      return buildLeftSideTreeByItem(data, 'parentCode', 'regionCode', this.treeConstruction)
    },

    // 树结构 数据
    treeConstruction(item) {
      item.children = []
      item.name = item.regionName
      item.stationTypeId = String(item.regionType)
      item.stationCode = item.regionCode
      item.isDisabled = false
      item.checked = false
    },
    // 判断市内是否有选中类型的站点，如果没有则不显示
    hasDistrict(list) {
      for (let i = 0; i < list.length; i++) {
        if (this.hasStation(list[i].children)) {
          return true
        }
      }
      return false
    },
    // 判断区县是否有选中类型的站点，如果没有则不显示
    hasStation(list) {
      for (let i = 0; i < list.length; i++) {
        if (this.selectedItem.indexOf(list[i].stationTypeId.toString()) > -1 && !(this.searchText.length > 0 && this.indexOf(list[i].name, this.searchText) === -1)) {
          return true
        }
      }
      return false
    },
    // 搜索匹配功能
    indexOf(str, key) {
      let i = 0
      let j = 0
      while (key[i] !== undefined && str[j] !== undefined) {
        if (key[i] === str[j]) {
          i++
          j++
        } else {
          j = j - i + 1
          i = 0
        }
      }
      if (i === 0) return -1
      return j - i
    }
  }
}
</script>

<style lang="less" scoped>
.env-station-select {
  margin: 5px 0;
  position: relative;
  width: 100%;
  // display: inline-block;
  text-align: left;

  .arrow {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 5px;
    top: 6px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    font-family: 'youyuan';
    font-weight: bold;
    transform: rotateZ(90deg);
  }

  .stationtext {
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 1.5;
    padding: 4px 25px 4px 7px;
    font-size: 14px;
    border: 1px solid #b5b5b5;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: pointer;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
}

.list {
  z-index: 999;
  position: relative;
  left: 0;
  top: 100%;
  margin-top: 2px;
  height: 400px;
  width: 400px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .list-content {
    flex: 1;
    height: 0;
    padding: 5px;
    box-sizing: border-box;
    overflow: auto;

    .disabled {
      color: #ddd;
      cursor: not-allowed;
    }

    .province-name {
      font-size: 14px !important;
      font-weight: bold;
      color: #000;
      line-height: 34px;
      border-bottom: 1px solid rgba(241, 241, 241, 0.8);

      .anticon {
        font-size: 10px;
        margin: 0 3px;
      }

      &:hover {
        background-color: #f1f1f1;
      }
    }

    ul {
      padding: 0;
      margin: 0;
      color: #000;
    }

    .city-group {
      display: flex;
      border-bottom: 1px solid rgba(241, 241, 241, 0.8);

      &:hover {
        background-color: rgba(200, 200, 200, 0.1);
      }

      &:not([style$='none;']):last-child .group-name::before {
        height: 16px;
      }

      .group-name {
        position: relative;
        width: 150px;
        font-weight: bold;
        background-color: #f9f9f9;

        .radio {
          font-size: 12px;
          font-weight: bold;
          line-height: 16px;
          padding: 7px 10px;
        }

        &::before {
          position: absolute;
          content: '';
          height: 100%;
          top: 0;
          left: 20px;
          border-left: 1px dashed #ccc;
        }

        &::after {
          position: absolute;
          content: '';
          width: 15px;
          top: 15px;
          left: 20px;
          border-top: 1px dashed #ccc;
        }
      }
    }

    .station-group {
      flex: 1;
      width: 0;
      list-style: none;

      li {
        position: relative;
        float: left;
        padding-left: 10px;
        box-sizing: border-box;

        &::before {
          position: absolute;
          content: '';
          width: 1px;
          height: 20px;
          top: 5px;
          left: 0;
          background: rgba(241, 241, 241, 0.8);
        }

        .disabled {
          cursor: not-allowed;
          color: #ccc;

          /deep/ .name {
            text-decoration: line-through;
          }
        }
      }

      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }

  .list-operation {
    height: 42px;
    background: #f1f1f1;
    text-align: right;

    .show-station-btn {
      float: left;
      font-size: 12px;
      color: #1386e8;
      margin-left: 15px;
      margin-top: 6px;
      cursor: pointer;
      user-select: none;

      &>span {
        display: inline-block;
        vertical-align: top;
        width: 20px;
        height: 12px;
        border-radius: 2px;
        margin-top: 9px;
        margin-left: 5px;
        line-height: 12px;
        text-align: center;
        background-color: #1c80f4;
        color: #fff;

        .anticon {
          transform: scale(0.8);
        }
      }
    }

    .station-btn {
      display: inline-block;
      vertical-align: top;
      height: 32px;
      width: 60px;
      margin: 5px;
      line-height: 32px;
      text-align: center;
      background: #ccc;
      border-radius: 4px;
      color: #fff;
      user-select: none;
      cursor: pointer;

      &.all {
        background-color: #19be6b;

        &:hover {
          background-color: #47cb89;
        }
      }

      &.confirm {
        background-color: #2d8cf0;

        &:hover {
          background-color: #57a3f3;
        }
      }

      &.empty {
        width: 70px;
        border: 1px solid #f30;
        color: #f30;
        background-color: transparent;

        &:hover {
          border: 1px solid #ff5c33;
          color: #ff5c33;
          background-color: transparent;
        }
      }

      &.cancel {
        background-color: #f30;

        &:hover {
          background-color: #ff5c33;
        }
      }
    }
  }
}

.station-total {
  display: inline-block;
  vertical-align: top;
  width: 150px;
  font-size: 12px;
  line-height: 20px;
  font-weight: normal;
  white-space: nowrap;
  margin: 5px;
}
</style>
<style lang="less">
.department {
  .ant-popover-inner-content {
    padding: 0;
  }

  ._list-search {
    line-height: 32px;

    .ant-input-search-button {
      margin: 0;
    }
  }
}
</style>
