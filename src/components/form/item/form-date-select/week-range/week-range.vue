<template>
	<div class="s-week-range-picker" :style="{ width: width }" ref="sWeekRangePicker">
		<a-tooltip placement="bottomLeft" overlayClassName="week-range-tooltip" v-model="panelVisible" :get-popup-container="getPopupContainer" trigger="click">
			<template slot="title">
				<div class="week-range-calendar">
					<!--开始周面板-->
					<div class="start-week-calendar">
						<div class="ant-calendar-month-panel-header">
							<a role="button" title="上一年" class="ant-calendar-month-panel-prev-year-btn" @click="onStartPanelPrevYear"></a>
							<span>
								<span class="ivu-date-picker-header-label">{{ startPanel.currentYear }}年</span>
							</span>
							<a title="下一年" class="ant-calendar-month-panel-next-year-btn" @click="onStartPanelNextYear"></a>
						</div>
						<div class="week-content" ref="box">
							<div
								:id="`start-panel-week-${item.weekIndex}`"
								v-for="(item, index) in startPanel.weekData"
								:key="'week' + index"
								class="week-item"
								@click="onStartPanelChange(item.weekIndex)"
								:class="['week-item', startPanel.currentWeek.weekIndex == item.weekIndex && item.year == startPanel.currentWeek.year ? 'week-item-active' : '']"
							>
								<span>{{ item.weekFullText }}</span>
							</div>
						</div>
					</div>
					<!--结束周面板-->
					<div class="end-week-calendar">
						<div class="ant-calendar-month-panel-header">
							<a role="button" title="上一年" class="ant-calendar-month-panel-prev-year-btn" @click="onEndPanelPrevYear"></a>
							<span>
								<span class="ivu-date-picker-header-label">{{ endPanel.currentYear }}年</span>
							</span>
							<a title="下一年" class="ant-calendar-month-panel-next-year-btn" @click="onEndPanelNextYear"></a>
						</div>
						<div class="week-content" ref="box">
							<div
								:id="`end-panel-week-${item.weekIndex}`"
								v-for="(item, index) in endPanel.weekData"
								:key="index"
								class="week-item"
								@click="onEndPanelChange(item.weekIndex)"
								:class="[
									'week-item',
									endPanel.currentWeek.weekIndex == item.weekIndex && item.year == endPanel.currentWeek.year ? 'week-item-active' : '',
									(item.year == startPanel.currentWeek.year && startPanel.currentWeek.weekIndex >= item.weekIndex) || item.year < startPanel.currentWeek.year ? 'disable' : ''
								]"
							>
								<span>{{ item.weekFullText }}</span>
							</div>
						</div>
					</div>
				</div>
			</template>

			<!--选择框-->
			<div class="date-input" @mouseenter="onEnter()" @mouseleave="onLeave()" @click="togglePanel">
				<a-tooltip>
					<template slot="title" v-if="startPanel.currentWeek.weekFullText">
						{{ startPanel.currentWeek.weekFullText }}
					</template>
					<div class="value-text" v-if="startPanel.currentWeek.weekText">{{ startPanel.currentWeek.weekText }}</div>
					<div class="value-text" style="color: #ccc" v-else>开始周</div>
				</a-tooltip>

				<span>~</span>
				<a-tooltip>
					<template slot="title" v-if="endPanel.currentWeek.weekFullText">
						{{ endPanel.currentWeek.weekFullText }}
					</template>
					<div class="value-text" v-if="endPanel.currentWeek.weekText">{{ endPanel.currentWeek.weekText }}</div>
					<div class="value-text" style="color: #ccc" v-else>结束周</div>
				</a-tooltip>
				<span style="margin-left: 5px; color: #ccc">
					<a-icon theme="filled" v-if="isAllowClear && isShowIcon && startPanel.currentWeek.weekText && endPanel.currentWeek.weekText" type="close-circle" @click.stop="clear" />
					<a-icon v-else type="calendar" />
				</span>
			</div>
		</a-tooltip>
	</div>
</template>

<script>
//周范围选择器
import moment from 'moment'
import { getStartDateOfWeek, getEndDateOfWeek, ONE_WEEK } from '../date-utils'
export default {
	props: {
		value: {
			type: [Object, String, Array]
			// default: () => ({
			// 	startTime: moment().format('YYYY-MM-DD 00:00:00'),
			// 	endTime: moment().add(1, 'weeks').endOf('week').format('YYYY-MM-DD 23:59:59')
			// })
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
	data() {
		return {
			panelVisible: false,
			isShowIcon: false,

			startTime: moment(), //moment类型
			endTime: moment().add(1, 'weeks'), //moment类型

			//开始面板
			startPanel: {
				currentYear: -1,
				weekData: [],
				currentWeek: {
					weekIndex: 0,
					year: 0,
					weekText: ''
				},
				disableWeekIndex: [],
				disableYear: null
			},
			//结束面板
			endPanel: {
				currentYear: -1,
				weekData: [],
				currentWeek: {
					weekIndex: 0,
					year: 0,
					weekText: ''
				},
				disableWeekIndex: [],
				disableYear: null
			}
		}
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	watch: {
		panelVisible(visible) {
			//选项滚动到顶部
			if (visible) {
				setTimeout(() => {
					let startPanelWeekIndex = this.startPanel.currentWeek.weekIndex
					document.querySelector('.start-week-calendar .week-content').scrollTop = (startPanelWeekIndex - 1) * 42
					let endPanelWeekIndex = this.endPanel.currentWeek.weekIndex
					document.querySelector('.end-week-calendar .week-content').scrollTop = (endPanelWeekIndex - 1) * 42
					this.isOverDtep()
				}, 0)
			}
		},
		value(newVal, oldVal) {
			this.initDate(newVal, oldVal)
		}
	},
	mounted() {
		//挂载的时候有默认值传进来的话就初始化日期
		this.$nextTick(() => {
			if (this.useDefaultTime) {
				// console.log('周范围', this.value)
				if (this.value && this.value.startTime && this.value.endTime) {
					this.startTime = moment(this.value.startTime)
					this.endTime = moment(this.value.endTime)
				}
				this.initPanel()
				this.emitDate()
			} else {
				this.clear()
			}
		})
	},
	methods: {
		// 初始化插件的样式
		isOverDtep() {
			// 用来判断 左右展示的布局
			const width = document.body.clientWidth
			const layout = this.$refs.sWeekRangePicker.getBoundingClientRect()
			// console.log('框', width, layout.left)
			if (width - layout.left < 400) {
				this.$nextTick(() => {
					document.querySelectorAll('.week-range-tooltip .ant-tooltip-inner').forEach(item => {
						item.style.left = `-${layout.width}px`
					})
				})
			}
		},
		initPanel() {
			let st = this.startTime || moment()
			let et = this.endTime || moment().add(1, 'weeks')
			//初始化开始面板
			this.startPanel.currentYear = st.year()
			this.startPanel.weekData = this.getWeekData(this.startPanel.currentYear)
			this.startPanel.currentWeek = this.startPanel.weekData.find(item => item.weekStartDate.getTime() <= st.valueOf() && item.weekEndDate.getTime() >= st.valueOf()) || {
				weekIndex: 0,
				year: moment().year(),
				weekText: ''
			}
			//初始化结束面板
			this.endPanel.currentYear = et.year()
			this.endPanel.weekData = this.getWeekData(this.endPanel.currentYear)
			this.endPanel.currentWeek = this.endPanel.weekData.find(item => item.weekStartDate.getTime() <= et.valueOf() && item.weekEndDate.getTime() >= et.valueOf()) || {
				weekIndex: 0,
				year: moment().year(),
				weekText: ''
			}
		},

		initDate(newVal, oldVal) {
			// 重置置空
			if (!this.useDefaultTime && !newVal) {
				// console.log('重置置空', newVal)
				this.clear()
				this.emitDate()
				return
			}
			// 重置为默认时间
			if (this.useDefaultTime && !newVal && newVal === null) {
				// console.log('重置为默认时间', newVal)
				this.clear()
				this.emitDate()
				return
			}
			// 重置为默认时间
			if (this.useDefaultTime && !newVal && newVal === undefined) {
				// console.log('重置为默认时间', newVal)
				this.startTime = moment()
				this.endTime = moment().add(1, 'weeks')
				this.clear()
				this.initPanel()
				this.emitDate()
				return
			}
			//初始化的时候传进来是对象
			if (!oldVal && newVal.startTime && newVal.endTime) {
				this.startTime = moment(this.value.startTime)
				this.endTime = moment(this.value.endTime)
				this.initPanel()
				this.emitDate()
			}

			//更新的时候传进来是对象(判断两者是否相等，防止死循环更新)
			if (newVal && oldVal && newVal.startTime !== oldVal.startTime && newVal.endTime !== oldVal.endTime) {
				this.startTime = moment(this.value.startTime)
				this.endTime = moment(this.value.endTime)
				this.initPanel()
				// this.emitDate()
			}

			//如果传入的moment对象
			if (this.value instanceof moment) {
				//取值
				let startTime = this.value._i?.startTime || ''
				let endTime = this.value._i?.endTime || ''
				this.startTime = moment(startTime)
				this.endTime = moment(endTime)
				this.initPanel()
				this.emitDate()
			}
			//表单重置方法会传入日期字符串
			if (this.$utils.getType(this.value) === 'string') {
				this.startTime = moment(this.value)
				this.endTime = moment(this.value).add(1, 'weeks')
				this.initPanel()
				this.emitDate()
			}

			//如果没有设置默认值就设置一个初始化值
			// if (!this.value) {
			//   this.startTime = moment()
			//   this.endTime = moment().add(1, 'weeks')
			//   this.initPanel()
			//   this.emitDate()
			// }

			//清除置空的情况下
			// if (!this.value || (!this.value.startTime && !this.value.endTime)) {
			// 	let startTime = moment().startOf('week')
			// 	let endTime = moment().endOf('week')

			// 	this.startPanel.weekData = this.getWeekData(startTime.year())
			// 	this.startPanel.currentYear = startTime.year()
			// 	this.startPanel.currentWeek = {
			// 		weekIndex: 0,
			// 		year: startTime.year(),
			// 		weekStartDate: '',
			// 		weekEndDate: '',
			// 		weekText: ''
			// 	}

			// 	this.endPanel.weekData = this.getWeekData(endTime.year())
			// 	this.endPanel.currentYear = endTime.year()
			// 	this.endPanel.currentWeek = {
			// 		weekIndex: 0,
			// 		weekStartDate: '',
			// 		weekEndDate: '',
			// 		year: endTime.year(),
			// 		weekText: ''
			// 	}
			// }
		},

		//开始周面板前一年
		onStartPanelPrevYear() {
			this.startPanel.currentYear--
			this.startPanel.weekData = this.getWeekData(this.startPanel.currentYear)
		},
		//开始周面板后一年
		onStartPanelNextYear() {
			this.startPanel.currentYear++
			this.startPanel.weekData = this.getWeekData(this.startPanel.currentYear)
		},
		//结束周面板前一年
		onEndPanelPrevYear() {
			this.endPanel.currentYear--
			this.endPanel.weekData = this.getWeekData(this.endPanel.currentYear)
		},
		//结束周面板后一年
		onEndPanelNextYear() {
			this.endPanel.currentYear++
			this.endPanel.weekData = this.getWeekData(this.endPanel.currentYear)
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

		onStartPanelChange(index) {
			this.startPanel.currentWeek = this.startPanel.weekData.find(x => x.weekIndex === index)
			// this.startTime = moment(this.startPanel.currentWeek.weekStartDate)
			//点击开始时间清除结束时间，因为要重新算禁用范围
			this.endPanel.currentWeek = {
				weekIndex: 0,
				year: 0,
				weekText: ''
			}
		},
		onEndPanelChange(index) {
			// debugger
			// console.log('onEndPanelChange')
			//选结束的时候先判断有没有选开始
			if (!this.startPanel.currentWeek.weekText) {
				this.$message.error('请先选择开始周！')
				return
			}
			this.endPanel.currentWeek = this.endPanel.weekData.find(x => x.weekIndex === index)
			// this.endTime = moment(this.endPanel.currentWeek.weekEndDate)
			this.panelVisible = false
			this.emitDate()
		},

		emitDate() {
			//返回数据
			let data = {
				startTime: this.startPanel?.currentWeek?.weekStartDate ? moment(this.startPanel.currentWeek.weekStartDate).format('YYYY-MM-DD 00:00:00') : '',
				endTime: this.endPanel?.currentWeek?.weekEndDate ? moment(this.endPanel.currentWeek.weekEndDate).format('YYYY-MM-DD 23:59:59') : ''
			}
			this.$emit('change', data)
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
				let weekText = `${year}年 第${weekIndex}周`
				let weekFullText = `${year}年 第${weekIndex}周 ${weekStart} 至 ${weekEnd}`

				weekList.push({
					weekIndex,
					weekText,
					weekFullText,
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
		clear() {
			let startTime = moment().startOf('week')
			let endTime = moment().endOf('week')

			this.startPanel.weekData = this.getWeekData(startTime.year())
			this.startPanel.currentYear = startTime.year()
			this.startPanel.currentWeek = {
				weekIndex: 0,
				year: startTime.year(),
				weekStartDate: '',
				weekEndDate: '',
				weekText: ''
			}

			this.endPanel.weekData = this.getWeekData(endTime.year())
			this.endPanel.currentYear = endTime.year()
			this.endPanel.currentWeek = {
				weekIndex: 0,
				weekStartDate: '',
				weekEndDate: '',
				year: endTime.year(),
				weekText: ''
			}
			this.startTime = ''
			this.endTime = ''
			this.$emit('clear')
			// this.emitDate()
			this.$emit('change', null)
		}
	}
}
</script>

<style lang="less">
.s-week-range-picker {
	display: inline-block;

	.value-text {
		color: #000;
		font-size: 12px;
		text-align: center;
	}
}
.week-range-tooltip {
	padding: 0;

	.ant-tooltip-arrow::before {
		background-color: transparent;
	}

	.ant-tooltip-inner {
		width: 500px;
		background-color: white;
		height: 300px;
		overflow: hidden;
		position: relative;
		padding: 0;

		.week-range-calendar {
			color: #000;

			.start-week-calendar,
			.end-week-calendar {
				display: inline-block;
				width: 50%;
				height: 100%;
				overflow: auto;
			}
		}

		.week-content {
			position: relative;
			width: 100%;
			height: 260px;
			overflow: auto;

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
