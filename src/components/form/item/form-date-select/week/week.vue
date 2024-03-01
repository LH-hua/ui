<template>
  <div class="s-week-picker" :style="{ width: width }">
    <a-tooltip
      placement="bottomLeft"
      overlayClassName="week-picker-tooltip"
      v-model="panelVisible"
      :get-popup-container="getPopupContainer"
      trigger="click"
    >
      <div slot="title" class="week-calendar">
        <!-- 头部 -->
        <div class="ant-calendar-month-panel-header">
          <a role="button" title="上一年" class="ant-calendar-month-panel-prev-year-btn" @click="onPrevYear"></a>
          <span>
            <span class="ivu-date-picker-header-label">{{ currentYear }}年</span>
          </span>
          <a title="下一年" class="ant-calendar-month-panel-next-year-btn" @click="onNextYear"></a>
        </div>
        <!-- 内容区 -->
        <div class="week-content" ref="box">
          <div
            v-for="(item, index) in weekData"
            :key="index"
            class="week-item"
            @click="changeWeek($event, item.weekIndex)"
            :class="[
              'week-item',
              currentWeek.weekIndex == item.weekIndex && item.year == currentWeek.year ? 'week-item-active' : '',
              (item.year == startYear && disableWeekIndex.includes(item.weekIndex)) || item.year < startYear ? 'disable' : ''
            ]"
            :id="'week' + item.weekIndex"
          >
            <span>{{ item.weekShortText }}</span>
          </div>
        </div>
      </div>

      <div class="date-input" @mouseenter="onEnter()" @mouseleave="onLeave()" @click="togglePanel">
        <div class="value-text" v-if="currentWeek.weekText">{{ currentWeek.weekText }}</div>
        <div class="value-text" style="color: #ccc" v-else>请选择周</div>
        <span style="margin-left: 5px; color: #ccc">
          <a-icon
            theme="filled"
            v-if="isAllowClear && isShowIcon && currentWeek.weekText"
            type="close-circle"
            @click.stop="clear"
          />
          <a-icon v-else type="calendar" />
        </span>
      </div>
    </a-tooltip>
  </div>
</template>

<script>
//周选择器
import moment from 'moment'
import { getStartDateOfWeek, getEndDateOfWeek, ONE_WEEK } from '../date-utils'
export default {
  props: {
    value: {
      type: [Object, String, Date]
      // default: () => ({
      // 	startTime: moment().format('YYYY-MM-DD HH:00:00')
      // })
    },
    rangeLimit: {
      type: Boolean,
      default: false
    },
    disableDate: {
      type: Object,
      default: () => ({})
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
  watch: {
    value(newVal, oldVal) {
      this.initDate(newVal, oldVal)
    },
    panelVisible(visible) {
      if (visible) {
        setTimeout(() => {
          document.querySelector('.week-calendar .week-content').scrollTop = (this.currentWeek.weekIndex - 1) * 42
        }, 0)
      }
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      selectedTime: moment(),
      panelVisible: false,
      isShowIcon: false,
      weekText: '',
      weekData: [],
      currentWeek: {
        weekIndex: 0,
        year: 0,
        weekText: ''
      },
      currentYear: -1,
      disableWeekIndex: [],
      startYear: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.useDefaultTime && this.value && this.value.startTime) {
        this.selectedTime = moment(this.value.startTime)
        this.currentYear = this.selectedTime.year()
        this.weekData = this.getWeekData(this.currentYear)
        this.currentWeek = this.findWeekByDate(this.selectedTime.toDate())
        this.emitDate()
      }
      if (this.useDefaultTime && !this.value && this.value !== null) {
        this.selectedTime = moment()
        this.currentYear = this.selectedTime.year()
        this.weekData = this.getWeekData(this.currentYear)
        this.currentWeek = this.findWeekByDate(this.selectedTime.toDate())
        this.emitDate()
      }
      if (!this.useDefaultTime) this.clear()
    })
  },
  methods: {
    // 初始化插件数据
    initDate(newVal, oldVal) {
      // console.log('重置', newVal)

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
      if (this.$utils.getType(this.value) == 'string') {
        this.selectedTime = moment(this.value)
        this.currentYear = this.selectedTime.year()
        this.weekData = this.getWeekData(this.currentYear)
        this.currentWeek = this.findWeekByDate(this.selectedTime.toDate())
        this.emitDate()
        return
      }
      //如果传进来是moment对象
      if (this.value instanceof moment) {
        this.selectedTime = this.value
        this.emitDate()
        return
      }
      //如果没有传默认值
      if (!newVal && !this.useDefaultTime) {
        let startTime = moment().startOf('week')
        this.weekData = this.getWeekData(startTime.year())
        this.currentYear = startTime.year()
        this.currentWeek = {
          weekIndex: 0,
          year: startTime.year(),
          weekStartDate: '',
          weekEndDate: '',
          weekText: ''
        }
      }
      if (!newVal && this.useDefaultTime && newVal !== null) {
        this.selectedTime = moment()
        this.currentYear = this.selectedTime.year()
        this.weekData = this.getWeekData(this.currentYear)
        this.currentWeek = this.findWeekByDate(this.selectedTime.toDate())
        this.emitDate()
        return
      }
    },

    //前一年
    onPrevYear() {
      this.currentYear--
      this.weekData = this.getWeekData(this.currentYear)
    },

    //后一年
    onNextYear() {
      this.currentYear++
      this.weekData = this.getWeekData(this.currentYear)
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

    changeWeek(event, w) {
      this.currentWeek = this.findWeekByIndex(w)
      this.panelVisible = false
      this.emitDate()
    },
    emitDate() {
      let data = {
        startTime: this.currentWeek?.weekStartDate ? moment(this.currentWeek.weekStartDate).format('YYYY-MM-DD 00:00:00') : '',
        endTime: this.currentWeek?.weekEndDate ? moment(this.currentWeek.weekEndDate).format('YYYY-MM-DD 23:59:59') : ''
      }
      this.$emit('change', data)
    },
    findWeekByIndex(index) {
      return this.weekData.find((x) => x.weekIndex === index)
    },
    findWeekByDate(dt) {
      let timestamp = dt.getTime()
      return this.weekData.find((item) => item.weekStartDate.getTime() <= timestamp && item.weekEndDate.getTime() >= timestamp)
    },
    // 获取周的数据
    getWeekData(year) {
      let index = 1
      let list = this.createWeeks(year)
      let weekList = []
      for (let item of list) {
        let weekStartDate = item.start,
          weekEndDate = item.end

        let weekIndex = index++
        let weekStart = moment(weekStartDate).format('MM-DD')
        let weekEnd = moment(weekEndDate).format('MM-DD')
        let weekText = `${year}年 第${weekIndex}周 ${weekStart} 至 ${weekEnd}`
        let weekShortText = `第${weekIndex}周 ${weekStart} 至 ${weekEnd}`

        weekList.push({
          weekIndex,
          weekText,
          weekShortText,
          weekStartDate,
          weekEndDate,
          year: year
        })
      }
      return weekList
    },

    createWeeks(year) {
      const first = getStartDateOfWeek(new Date(year, 0)).getTime()
      const last = getStartDateOfWeek(new Date(year, 11, 31)).getTime()
      const weeks = []
      for (let i = first; i <= last; i += ONE_WEEK) {
        const start = new Date(i)
        const end = getEndDateOfWeek(start)
        weeks.push({
          start: start,
          end: end
        })
      }

      return weeks
    },

    disableWeek(week = [], startYear) {
      this.disableWeekIndex = week
      this.startYear = startYear
    },
    clear() {
      this.selectedTime = moment()
      let startTime = moment().startOf('week')
      this.weekData = this.getWeekData(startTime.year())
      this.currentYear = startTime.year()
      this.currentWeek = {
        weekIndex: 0,
        year: startTime.year(),
        weekStartDate: '',
        weekEndDate: '',
        weekText: ''
      }
      this.$emit('clear')
      this.$emit('change', null)
    }
  }
}
</script>

<style lang="less">
.s-week-picker {
  display: inline-block;
  width: 100%;
  font-size: 12px;
  color: #888;

  .value-text {
    font-size: 12px;
    color: #666;
  }
}

.week-picker-tooltip {
  padding: 0;

  .ant-tooltip-arrow::before {
    background-color: transparent;
  }

  .ant-tooltip-inner {
    width: 210px;
    background-color: white;
    height: 300px;
    overflow: auto;
    position: relative;
    padding: 0;

    .week-calendar {
      color: #000;
      font-size: 12px;
    }

    .week-content {
      position: relative;
      overflow: auto;
      width: 100%;
      height: 260px;

      .disable {
        pointer-events: none;

        span {
          color: #ccc;
        }
      }

      .week-item {
        line-height: 42px;
        height: 42px;
        cursor: pointer;
        position: relative;
        text-align: center;

        &:hover {
          background-color: #fafbfc;
        }
      }

      .week-item-active {
        background-color: #3faaf5;

        span {
          color: white;
        }

        &:hover {
          background-color: #3faaf5 !important;
        }
      }
    }
  }
}
</style>
