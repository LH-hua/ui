<template>
  <div class="s-quarter-picker" :style="{ width: width }">
    <a-tooltip
      placement="bottomLeft"
      overlayClassName="quarter-picker-tooltip"
      v-model="panelVisible"
      :get-popup-container="getPopupContainer"
      trigger="click"
    >
      <div slot="title" class="quarter-calendar">
        <!-- 头部 -->
        <div>
          <div class="ant-calendar-month-panel-header">
            <a role="button" title="上一年" class="ant-calendar-month-panel-prev-year-btn" @click="prevYear"></a>
            <span>
              <span class="ivu-date-picker-header-label">{{ currentYear }}年</span>
            </span>
            <a title="下一年" class="ant-calendar-month-panel-next-year-btn" @click="nextYear"></a>
          </div>
        </div>
        <!-- 内容区 -->
        <div class="quarter-content">
          <div
            v-for="(item, index) in quarterData"
            :key="index"
            class="quarter-item"
            @click="changeQuarter(item.quarterIndex)"
            :class="[
              'quarter-item',
              currentQuarter.quarterIndex == item.quarterIndex && item.year == currentQuarter.year ? 'quarter-item-active' : '',
              (item.year == startYear && disableQuarterIndex.includes(item.quarterIndex)) || item.year < startYear
                ? 'disable'
                : ''
            ]"
            :id="'quarter' + item.quarterIndex"
          >
            <span>{{ item.quarterShortText }}</span>
          </div>
        </div>
      </div>

      <div class="date-input" @mouseenter="onEnter()" @mouseleave="onLeave()" @click="togglePanel">
        <div class="value-text" v-if="currentQuarter.quarterText">{{ currentQuarter.quarterText }}</div>
        <div class="value-text" style="color: #ccc" v-else>请选择季度</div>
        <span style="margin-left: 5px; color: #ccc">
          <a-icon
            v-if="isAllowClear && isShowIcon && currentQuarter.quarterText"
            type="close-circle"
            @click.stop="clear"
            theme="filled"
          />
          <a-icon v-else type="calendar" />
        </span>
      </div>
    </a-tooltip>
  </div>
</template>

<script>
//季度选择器
import moment from 'moment'
import { getMonthDays } from '../date-utils'
export default {
  props: {
    value: {
      type: [Object, String]
      // default: () => ({
      // 	startTime: moment().format('YYYY-MM-DD HH:00:00')
      // })
    },
    // 是否用于范围选择器
    isRange: {
      type: Boolean,
      default: false
    },
    dateWidth: {
      type: String,
      default: '200px'
    },
    options: {
      type: Object,
      default() {
        return {
          ignoreYear: false,
          igonreDate: false
        }
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    rangeLimit: {
      type: Boolean,
      default: false
    },
    isAllowClear: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '250px'
    },
    useDefaultTime: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      selectedTime: moment(),
      quarterValue: '',
      panelVisible: false,
      panelVisible: false,
      currentQuarterIndex: null,
      quarterShortText: '',
      quarterData: [],
      currentQuarter: {
        quarterIndex: 0,
        year: 0,
        quarterText: ''
      },
      currentYear: -1,
      isShowIcon: false,
      disableQuarterIndex: [],
      startYear: null
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.initDate(newVal, oldVal)
    }
  },
  mounted() {
    //挂载的时候初始化（如果没有设置默认值的话）
    this.$nextTick(() => {
      if (this.useDefaultTime && this.value && this.value.startTime) {
        this.selectedTime = moment(this.value.startTime)
        this.currentYear = this.selectedTime.year()
        this.quarterData = this.getQuarterData(this.currentYear)
        this.currentQuarter = this.findQuarterByDate(this.selectedTime.toDate())
        this.emitDate()
      }
      if (this.useDefaultTime && !this.value && this.value !== null) {
        this.selectedTime = moment()
        this.currentYear = this.selectedTime.year()
        this.quarterData = this.getQuarterData(this.currentYear)
        this.currentQuarter = this.findQuarterByDate(this.selectedTime.toDate())
        this.emitDate()
      }

      if (!this.useDefaultTime) this.clear()
    })
  },
  methods: {
    // 初始化插件数据
    initDate(newVal, oldVal) {
      console.log('initDate', newVal)
      //初始化的时候传进来是对象
      if (!oldVal && this.value && this.value.startTime) {
        this.selectedTime = moment(this.value.startTime)
        this.emitDate()
        return
      }
      //更新的时候传进来是对象
      if (newVal && oldVal && newVal.startTime !== oldVal.startTime) {
        this.selectedTime = moment(this.value.startTime)
        this.emitDate()
        return
      }
      //如果传进来是字符串
      if (this.$utils.getType(this.value) === 'string') {
        this.selectedTime = moment(newVal)
        this.currentYear = this.selectedTime.year()
        this.quarterData = this.getQuarterData(this.currentYear)
        this.currentQuarter = this.findQuarterByDate(this.selectedTime.toDate())
        this.emitDate()
        return
      }
      //如果传进来是moment对象
      if (this.value instanceof moment) {
        this.selectedTime = this.value
        this.emitDate()
        return
      }

      //如果没有传默认值 或者 被清空
      if (!newVal && !this.useDefaultTime) {
        let startTime = moment().startOf('week')
        this.quarterData = this.getQuarterData(startTime.year())
        this.currentYear = startTime.year()
        this.currentQuarter = {
          quarterIndex: 0,
          year: startTime.year(),
          quarterStartDate: '',
          quarterEndDate: '',
          quarterText: ''
        }
      }

      if (!newVal && this.useDefaultTime && newVal !== null) {
        this.selectedTime = moment()
        this.currentYear = this.selectedTime.year()
        this.quarterData = this.getQuarterData(this.currentYear)
        this.currentQuarter = this.findQuarterByDate(this.selectedTime.toDate())
        this.emitDate()
        return
      }
    },

    // 鼠标移入
    onEnter() {
      this.isShowIcon = true
    },

    // 鼠标移除
    onLeave() {
      this.isShowIcon = false
    },

    getPopupContainer(trigger) {
      return document.body
    },

    //点击文本框弹出日期选择
    togglePanel(e) {
      this.panelVisible = !this.panelVisible
    },

    changeQuarter(w) {
      this.currentQuarter = this.findQuarterByIndex(w)
      this.panelVisible = false
      this.emitDate()
    },
    emitDate() {
      let data = {
        startTime: this.currentQuarter.quarterStartDate
          ? moment(this.currentQuarter.quarterStartDate).format('YYYY-MM-DD 00:00:00')
          : '',
        endTime: this.currentQuarter.quarterEndDate
          ? moment(this.currentQuarter.quarterEndDate).format('YYYY-MM-DD 23:59:59')
          : ''
      }
      this.$emit('change', data)
    },
    findQuarterByIndex(index) {
      return this.quarterData.find((x) => x.quarterIndex === index)
    },
    findQuarterByDate(dt) {
      let timestamp = dt.getTime()
      const data = this.quarterData.find(
        (item) => item.quarterStartDate.getTime() <= timestamp && item.quarterEndDate.getTime() >= timestamp
      )
      return data
    },
    //前一年
    prevYear() {
      this.currentYear--
      this.quarterData = this.getQuarterData(this.currentYear)
    },
    //后一年
    nextYear() {
      this.currentYear++
      this.quarterData = this.getQuarterData(this.currentYear)
    },

    getQuarterData(year) {
      let index = 1
      let list = createQuarters(year)
      let quarterList = []
      for (let item of list) {
        let quarterStartDate = item.start,
          quarterEndDate = item.end

        let quarterIndex = index++
        let year = moment(quarterStartDate).year()
        let quarterStart = moment(quarterStartDate).format('MM-DD')
        let quarterEnd = moment(quarterEndDate).format('MM-DD')

        const yearText = `${year}年`
        const dateText = `${quarterStart} 至 ${quarterEnd}`
        let quarterShortText = `${this.options.ignoreYear ? '' : yearText} 第${quarterIndex}季度 ${
          this.options.igonreDate ? '' : dateText
        }`
        let quarterText = `${yearText} 第${quarterIndex}季度 ${dateText}`

        quarterList.push({
          quarterIndex,
          quarterShortText,
          quarterText,
          quarterStartDate,
          quarterEndDate,
          year
        })
      }
      return quarterList
    },

    disableQuarter(quarter = [], startYear) {
      this.disableQuarterIndex = quarter
      this.startYear = startYear
    },
    clear() {
      this.selectedTime = moment()
      let startTime = moment().startOf('week')
      this.quarterData = this.getQuarterData(startTime.year())
      this.currentYear = startTime.year()
      this.currentQuarter = {
        quarterIndex: 0,
        year: startTime.year(),
        quarterStartDate: '',
        quarterEndDate: '',
        quarterText: ''
      }
      this.$emit('clear')
      this.$emit('change', null)
    }
  }
}

function createQuarters(year) {
  const quarters = []
  for (let i = 0; i < 11; i += 3) {
    let start = new Date(year, i, 1)
    let end = new Date(year, i + 2, getMonthDays(year, i + 2), 23, 59, 59)
    quarters.push({
      start: start,
      end: end
    })
  }

  return quarters
}
</script>

<style lang="less">
.s-quarter-picker {
  display: inline-block;
  width: 100%;

  .value-text {
    color: #666;
  }
}

.quarter-picker-tooltip {
  padding: 0;

  .ant-tooltip-arrow::before {
    background-color: transparent;
  }

  .ant-tooltip-inner {
    width: 210px;
    background-color: white;
    overflow: auto;
    position: relative;
    padding: 0;

    .quarter-calendar {
      font-size: 12px;
      color: #000;
    }

    .quarter-content {
      position: relative;
      overflow: auto;
      font-size: 12px;
      color: #000;

      .disable {
        pointer-events: none;

        span {
          color: #ccc;
        }
      }

      .quarter-item {
        line-height: 42px;
        height: 42px;
        cursor: pointer;
        position: relative;
        text-align: center;

        &:hover {
          background-color: #fafbfc;
        }
      }

      .quarter-item-active {
        background-color: #3faaf5;

        &:hover {
          background-color: #3faaf5;
        }

        span {
          color: white;
        }
      }
    }
  }
}
</style>
