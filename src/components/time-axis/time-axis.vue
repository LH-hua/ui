<template>
  <div class="s-time-axis" :style="{
    height: axisHeight
  }">
    <ul class="unit-switch" v-if="isSwitch">
      <li :class="{ active: interval === 'day' }" @click="changeInterval('day')">天</li>
      <li :class="{ active: interval === 'hour' }" @click="changeInterval('hour')">时</li>
    </ul>
    <div class="time-axis">
      <div class="btn" @click="play">
        <span class="icon-play" v-if="!playing"></span>
        <span class="icon-pause" v-if="playing"></span>
      </div>

      <div class="progress" ref="progress">
        <div class="progress-bar">
          <span class="bar" :style="`width: ${barWidth}%`">
            <span class="tooltip">{{ dateStr }}</span>
          </span>
          <div class="hover-tooltip" v-if="showHover" :style="`left: ${hoverLeft}%;`">{{ hoverStr }}</div>
        </div>
        <ul class="progress-label scale-wrap" v-if="isScale">
          <li v-for="(timeItem, index) in timeList" :key="index">
            <div class="scale">
              <div class="scale-item" :style="`width: ${100 / scaleInterval}%`"
                v-for="scaleIntervalItem in (24 / scaleInterval)" :key="scaleIntervalItem">
              </div>
            </div>
            <div class="scale-label">
              <div class="scale-label-item" v-for="item in (24 / scaleInterval)" :style="{
                width: `${100 / scaleInterval}%`,
              }">
                <span>{{ item * scaleInterval === 24 ? '' : (item * scaleInterval) >= 10 ? item * scaleInterval :
                    `0${item * scaleInterval}`
                }}</span>
              </div>
            </div>
          </li>
        </ul>
        <ul class="progress-label">
          <li v-for="(timeItem, index) in timeList" :key="index"
            :style="`line-height:${isScale ? '20px' : '30px'};padding-top:${isScale ? '25px' : '5px'}`">{{
    timeItem
            }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const DAY = 1000 * 60 * 60 * 24
import moment from 'moment'
export default {
  data() {
    return {
      timeList: [],
      interval: 'day',
      playing: false,
      days: 0,
      barWidth: 0,
      // 间隔为日
      daystep: 0,
      // 间隔为小时
      hourstep: 0,
      hoverLeft: 0,
      playTimer: null,
      dateStr: '',
      hoverStr: '?????????????',
      showHover: false,
      showPopup: false,
      hourdate: new Date(2000, 0, 1),
      daydate: new Date(2000, 0, 1),
      playSpeed: 2000,
    }
  },
  props: {
    height: {
      type: String,
      default: ''
    },
    range: {
      type: Array,
      required: true
    },
    unit: {
      type: String,
      default: 'day'
    },
    speed: {
      type: Number,
      default: 2000
    },
    initialDate: {
      type: Date,
      default: () => new Date()
    },
    initialHourDate: {
      type: Date,
      default: () => new Date()
    },
    isScale: {
      type: Boolean,
      default: true
    },
    scaleInterval: {
      type: Number,
      default: 4
    },
    isSwitch: {
      type: Boolean,
      default: true
    },
    nextStep: {
      type: Function
    }
  },
  computed: {
    start() {
      const s = this.range[0]
      return new Date(s.getFullYear(), s.getMonth(), s.getDate())
    },
    end() {
      const e = this.range[1]
      return new Date(e.getFullYear(), e.getMonth(), e.getDate())
    },
    axisHeight() {
      if (this.height) {
        return this.height
      }
      if (!this.height && this.isScale) {
        return '60px'
      }

      if (!this.height && !this.isScale) {
        return '40px'
      }
    }
  },
  watch: {
    speed(val) {
      this.playSpeed = val
    },
    range() {
      this.initDateList()
      this.initEvent()
      this.initlDate()
    },
    playing(playing) {
      // debugger
      const self = this
      if (playing) {
        if (self.interval === 'day' && self.daystep[0] >= self.days) {
          // 超过时间轴重置为起始位置
          // console.log('重置天')
          self.initlDate()
          self.initEvent()
        }
        if (self.interval === 'hour' && self.hourstep[0] >= self.days && self.hourstep[1] === 0) {
          // console.log('重置小时')
          // 超过时间轴重置为起始位置
          self.initlDate()
          self.initEvent()
        }
        this.playTimer = setInterval(function () {
          // 如果外部传入回调函数，则根据回调函数获取时间轴时间改变后的事件是否处理完成
          // 此时，时间轴定时器不做为时间轴播放的触发标准，只是定时检查外部状态，直到外部状态为true，才真正进入下一步
          // 如果外部没有传入回调函数，则只通过speed控制时间轴的播放，按固定速度进行播放
          if (self.nextStep && !self.nextStep()) {
            return
          }
          let step = 0
          switch (self.interval) {
            case 'hour':
              const h = self.hourstep[1]
              if (h + 1 > 23) {
                self.hourstep = [self.hourstep[0] + 1, 0]
              } else {
                self.hourstep = [self.hourstep[0], h + 1]
              }
              step = self.hourstep
              break
            case 'day':
              self.daystep = [self.daystep[0] + 1, 0.5]
              step = self.daystep
              break
          }
          if ((step[0] === self.days && self.interval === 'day') || (step[0] === self.days && step[1] === 0 && self.interval === 'hour')) {
            self.playing = false
            return false
          }
          self.run()
        }, self.playSpeed)
      } else {
        clearInterval(self.playTimer)
      }
    },
    initialHourDate() {
      this.initDateList()
      this.initEvent()
      this.initlDate()
    },
    initialDate() {
      this.initDateList()
      this.initEvent()
      this.initlDate()
    }
  },
  mounted() {
    this.playSpeed = this.speed
    this.initDateList()
    this.$nextTick(() => {
      this.interval = this.unit !== 'day' && this.unit !== 'hour' ? 'day' : this.unit
      this.initEvent()
      this.initlDate()
    })
  },
  methods: {
    play() {
      this.playing = !this.playing
    },
    changeInterval(type) {
      if (type === this.interval) {
        return false
      }
      this.interval = type
      this.run(true)
    },
    initDateList() {
      const days = (this.end.getTime() - this.start.getTime()) / DAY
      this.timeList = []
      this.days = days + 1
      for (let i = 0; i <= days; i++) {
        this.timeList.push(this.formatDate(new Date(this.start.getTime() + DAY * i)))
      }
    },
    formatDate(date) {
      return `${date.getMonth() + 1}月${date.getDate()}日`
    },
    initlDate() {
      if (this.initialDate.getTime() > this.end.getTime() + DAY || this.initialDate.getTime() < this.start.getTime()) {
        this.daystep = [0, 5]
        this.hourstep = [0, 12]
        return false
      }
      this.daystep = [Math.floor((this.initialDate.getTime() - this.start.getTime()) / DAY), 0.5]
      this.hourstep = [Math.floor((this.initialHourDate.getTime() - this.start.getTime()) / DAY), this.initialHourDate.getHours()]
      this.run()
    },
    initEvent() {
      const self = this
      // 容器与左边距离
      self.wrapLeft = self.$refs.progress.getBoundingClientRect().left
      // 容器宽度
      self.wrapWidth = self.$refs.progress.clientWidth
      this.$refs.progress.addEventListener(
        'click',
        function (event) {
          // 点击区域X坐标
          const clickX = event.clientX
          // 进度条长度
          const barWidth = clickX - self.wrapLeft
          // 时间条进度
          const d = Math.floor((barWidth / self.wrapWidth) * self.days)
          const h = Math.floor(((barWidth / self.wrapWidth) * self.days - d) * 24)
          if (self.interval === 'day') {
            self.daystep = [d, 0.5]
          } else {
            self.hourstep = [d, h]
          }
          self.run()
        },
        false
      )

      window.onresize = function () {
        self.wrapLeft = self.$refs.progress.getBoundingClientRect().left
        self.wrapWidth = self.$refs.progress.clientWidth
      }

      self.$refs.progress.addEventListener(
        'mouseenter',
        function () {
          self.showHover = true
          self.$refs.progress.addEventListener('mousemove', self.ProgressMove, false)
        },
        false
      )
      self.$refs.progress.addEventListener(
        'mouseleave',
        function () {
          self.showHover = false
          self.$refs.progress.removeEventListener('mousemove', self.ProgressMove)
        },
        false
      )
    },
    ProgressMove(event) {
      const self = this
      // 点击区域X坐标
      const clickX = event.clientX
      // 进度条长度
      const barWidth = clickX - this.wrapLeft
      // 时间条进度
      const step = parseFloat(((barWidth / this.wrapWidth) * this.days).toFixed(2))
      const start = self.start
      const date = new Date(start.getTime() + step * DAY)
      const week = ['日', '一', '二', '三', '四', '五', '六']
      self.hoverLeft = (step / self.days) * 100
      switch (this.interval) {
        case 'day':
          this.hoverStr = `${moment(date).format('MM月DD日')} 周${week[date.getDay()]}`
          break
        case 'hour':
          this.hoverStr = `${moment(date).format('MM月DD日')} 周${week[date.getDay()]} ${date.getHours()}:00`
          break
      }
    },
    resize() {
      this.wrapLeft = this.$refs.progress.getBoundingClientRect().left
      this.wrapWidth = this.$refs.progress.clientWidth
    },
    run(typechange) {
      const week = ['日', '一', '二', '三', '四', '五', '六']
      const start = this.start
      let date = null
      switch (this.interval) {
        case 'day':
          date = new Date(start.getTime() + this.daystep[0] * DAY)
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
          this.dateStr = `${moment(date).format('MM月DD日')} 周${week[date.getDay()]}`
          this.barWidth = ((this.daystep[0] + this.daystep[1]) / this.days) * 100
          break
        case 'hour':
          date = new Date(start.getTime() + this.hourstep[0] * DAY)
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.hourstep[1])
          this.dateStr = `${moment(date).format('MM月DD日')} 周${week[date.getDay()]} ${date.getHours()}:00`
          this.barWidth = ((this.hourstep[0] + this.hourstep[1] / 24) / this.days) * 100
          break
      }
      // 如果选中时间没有改变不出发change事件
      if (((this.interval === 'day' && date.getTime() === this.daydate.getTime()) || (this.interval === 'hour' && date.getTime() === this.hourdate.getTime())) && !typechange) {
        return false
      }
      if (this.interval === 'day') {
        this.daydate = date
      } else {
        this.hourdate = date
      }
      this.$emit('change', {
        type: this.interval,
        date
      })
    }
  }
}
</script>

<style lang="less" scoped>
.s-time-axis {
  position: relative;
  // height: 60px;

  .unit-switch {
    position: absolute;
    left: 0;
    bottom: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: rgba(117, 154, 190, 0.8);
    color: #fff;
    list-style: none;

    &:hover {
      z-index: 10;
    }

    li {
      width: 32px;
      float: left;
      text-align: center;
      line-height: 22px;
      border: 1px solid transparent;
      cursor: pointer;
      user-select: none;

      &.active {
        background-color: #1c84f0;
        border-color: #6ba4f6;
        border-radius: 3px;
        box-shadow: 0 0 2px #6ba4f6;
      }
    }
  }

  .time-axis {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 42px;
    bottom: 0;
    background: #759abe;
    opacity: 0.8;
    border-radius: 4px;
    padding-left: 50px;


    .btn {
      position: absolute;
      top: 50%;
      left: 10px;
      width: 30px;
      height: 30px;
      transform: translateY(-50%);
      background-color: #fff;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: #1c84f0;

        .icon-play {
          border-left-color: #fff;
        }

        .icon-pause {
          border-left-color: #fff;
          border-right-color: #fff;
        }
      }

      .icon-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-40%, -50%);
        border-left: 10px solid #1c84f0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;

      }

      .icon-pause {
        display: inline-block;
        vertical-align: top;
        border-left: 3px solid #1c84f0;
        border-right: 3px solid #1c84f0;
        width: 10px;
        height: 14px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // margin: 8px 10px;
      }
    }

    .progress {
      width: 100%;
      height: 100%;
      cursor: pointer;
      position: relative;

      .progress-bar {
        position: absolute;
        top: 0;
        width: 100%;
        height: 7px;
        z-index: 99;
        background: rgba(255, 255, 255, 0.4);

        .hover-tooltip {
          position: absolute;
          z-index: 5;
          transform: translateX(-50%);
          left: 0;
          bottom: 12px;
          height: 24px;
          padding: 0 7px;
          font-size: 12px;
          line-height: 24px;
          border-radius: 4px;
          background: rgba(117, 154, 190, 0.8);
          color: #fff;
          white-space: nowrap;
          pointer-events: none;

          &::after {
            content: '';
            position: absolute;
            top: 24px;
            width: 0;
            left: 0;
            right: 0;
            margin: auto;
            border-top: 5px solid rgba(117, 154, 190, 0.8);
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
          }
        }

        .bar {
          position: relative;
          float: left;
          height: 7px;
          background: #0177ff;
          // border-radius: 4px;
          transition: width 0.3s;

          .tooltip {
            position: absolute;
            right: 0;
            transform: translateX(50%);
            bottom: 12px;
            height: 24px;
            padding: 0 7px;
            font-size: 12px;
            line-height: 24px;
            border-radius: 4px;
            background: #1c80f4;
            white-space: nowrap;
            pointer-events: none;
            color: #fff;

            &::after {
              content: '';
              position: absolute;
              top: 24px;
              width: 0;
              left: 0;
              right: 0;
              margin: auto;
              border-top: 5px solid #1c80f4;
              border-left: 7px solid transparent;
              border-right: 7px solid transparent;
            }
          }


        }
      }

      .scale-wrap {
        position: absolute;
        top: -4px;
        width: 100%;
        height: 10px !important;
        left: 0;
        right: 0;
        z-index: 99;
        display: none;

        .scale {
          width: 100%;
          display: flex;
          position: absolute;
          top: 0;

          .scale-item {
            color: #000;
            border-right: 1px solid #fff;
            height: 7px;
            margin-right: -1px;
            flex-grow: 1;

            &:last-child {
              border-right: none;
            }
          }
        }

        .scale-label {
          width: 100%;
          background: linear-gradient(0deg, #235592, #046EB8);
          position: absolute;
          top: 7px;
          left: 0;
          right: 0;
          z-index: 10;
          background-color: #ccc;
          display: flex;

          .scale-label-item {
            color: #fff;
            height: 18px;
            line-height: 18px;
            width: 100%;
            flex-grow: 1;
            position: relative;
            // --scale-text: '1';

            // &::after {
            //   position: absolute;
            //   counter-reset: progress var(--scale-text);
            //   content: counter(progress);
            //   color: #fff;
            //   right: -4px;
            //   font-size: 12px;
            //   font-weight: normal;
            // }

            // &:last-child::after {
            //   content: '';
            // }

            span {
              position: absolute;
              right: -8px
            }
          }
        }
      }

      .progress-label {
        width: 100%;
        height: 100%;
        display: flex;
        list-style: none;
        padding: 0;
        margin: 4px 0;

        li {
          flex: 1;
          color: #fff;
          height: 100%;
          border-left: 1px solid rgba(255, 255, 255, 0.6);
          // border-left: 1px solid rgba(50, 108, 184, 1);
          display: inline-block;
          text-align: center;
          position: relative;
          // background-color: red;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
