<template>
	<div class="_weekPickerBox">
		<a-tooltip placement="bottomLeft" overlayClassName="_tooltip" v-model="boxVisible"
			@visibleChange="handleVisibleChange" :get-popup-container="getPopupContainer" trigger="click">
			<template slot="title">
				<!-- 头部 -->
				<div>
					<div class="ant-calendar-month-panel-header">
						<a role="button" title="上一年" class="ant-calendar-month-panel-prev-year-btn" @click="onPrevYear"></a>
						<span>
							<span class="ivu-date-picker-header-label">{{ currentYear }}年</span>
						</span>
						<a title="下一年" class="ant-calendar-month-panel-next-year-btn" @click="onNextYear"></a>
					</div>
				</div>

				<!-- 内容区 -->
				<div class="_info" ref="box" :style="`width:100%;height:calc(100% - 40px);`">
					<a-row>
						<a-col :span="24" v-for="(item, index) in weekData" :key="index" class="_row"
							@click="changeWeek($event, item.weekIndex)"
							:class="['_row',
							currentWeek.weekIndex == item.weekIndex && item.year == currentWeek.year ? '_acitve' : '',
							(item.year == startYear && disableWeekIndex.includes(item.weekIndex)) || item.year < startYear ? 'disable' : '']" :id="'week' + item.weekIndex">
							<span>{{ item.weekShortText }}</span>
						</a-col>
					</a-row>
				</div>

				<!-- 底部 -->
				<!-- <div class="_foot"></div> -->
			</template>

			<div :class="[isRange ? 'date-input-range' : 'date-input']" style="text-align:center" data-id="weekValue"
				@mouseenter="onEnter()" @mouseleave="onLeave()">
				<div class="value-text">{{ weekText || placeholder }}</div>
				<span style="margin-left: 5px;color: #ccc;">
					<a-icon v-if="isShowIcon && weekText" type="close-circle" @click.stop="clear" />
					<a-icon v-else type="calendar" />
				</span>
			</div>
		</a-tooltip>
	</div>
</template>

<script>
import moment from 'moment'
// import { directive as clickOutside } from "v-click-outside-x"
import CollapseTransition from './collapse-transition'
import { getStartDateOfWeek, getEndDateOfWeek, ONE_WEEK } from './utils.js'
export default {
	components: {
		CollapseTransition
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		dateWidth: {
			type: String,
			default: '200px'
		},
		isRange: {
			type: Boolean,
			default: false
		},
		// 组件选中值
		value: {
			type: [Object, String, Date],
			default: () => ({ startTime: moment(new Date()) })
		},
		rangeLimit: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
	},
	data() {
		return {
			defaultValue: null,
			weekValue: '',
			isShowPanel: false,
			isShowIcon: false,
			boxVisible: false,
			scrollTop: false,
			currentWeekIndex: null,
			weekShortText: '',
			weekText: '',
			weekData: [],
			currentWeek: {
				weekIndex: 0,
				year: 0
			},
			currentYear: -1,
			disableWeekIndex: [],
			startYear: null,
		}
	},
	computed: {},
	// 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用

	// 监听
	watch: {
		// 监听选中值，统一更新选中状态
		// value: {
		// 	deep: true,
		// 	handler(v) {
		// 		this.initData()
		// 	}
		// }
	},
	created() { },
	// 生命周期钩子：组件实例渲染完成时调用
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.init()
			})
		})
	},

	methods: {
		/*----------------------------------------------------------------------
				| 初始化
				|-----------------------------------------------------------------------
				*/
		init() {
			this.initData()
		},

		// 初始化值
		initVal() {
			let date = this.value?.startTime
			if (!(date instanceof moment)) {
				this.defaultValue = moment(date)
				return
			}
			this.defaultValue = date
		},

		// 初始化插件数据
		initData() {
			this.initVal()
			this.weekValue = this.defaultValue.format('YYYY-MM-DD')
			this.currentYear = this.defaultValue.year()
			this.weekData = this.getWeekData(this.currentYear)
			let dt = new Date(this.weekValue)
			this.setValue(dt)
			//根据开始时间禁用结束时间选择范围
			if (this.name === 'endWeek') {
				let disableIndex = []
				for (let i = 1; i <= this.$parent.$refs.startWeekSelector.currentWeekIndex; i++) {
					disableIndex.push(i)
				}
				this.disableWeek(disableIndex, new Date(this.value.startTime).getFullYear())
			}
			// this.currentWeek = this.findWeekByDate(dt)
			// let data = {
			// 	weekIndex: this.currentWeek.weekIndex,
			// 	startTime: this.currentWeek.weekStartDate,
			// 	endTime: this.currentWeek.weekEndDate
			// }
			// this.$emit('change', data)
		},

		// 初始化插件的样式
		initStyle() {
			setTimeout(() => {
				this.$nextTick(() => {
					let action = document.getElementsByClassName('_acitve')[0].offsetTop
					if (!this.$utils.isNull(action)) {
						document.querySelector('._info').scrollTop = action
					}
				})
			}, 200)
		},

		/*----------------------------------------------------------------------
				| 点击事件
				|-----------------------------------------------------------------------
				*/

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

		/*----------------------------------------------------------------------
			 | 数据处理
			 |-----------------------------------------------------------------------
			 */
		// 弹出框 显示隐藏的回调
		handleVisibleChange(visible) {
			if (visible) {
				this.initStyle()
			}
		},

		getPopupContainer(trigger) {
			return trigger.parentElement
		},

		//点击文本框弹出日期选择
		togglePanel(e) {
			this.isShowPanel = !this.isShowPanel
		},

		setValue(dt) {
			this.currentWeek = this.findWeekByDate(dt)
			this.submitChange()
		},

		changeWeek(event, w) {
			if (this.rangeLimit) {
				let currentWeek = this.findWeekByIndex(w)
				if (this.$parent.$refs.endWeekSelector.currentWeekIndex) {
					if (this.name == 'startWeek' && (w > this.$parent.$refs.endWeekSelector.currentWeekIndex) || this.name == 'startWeek' && (currentWeek.year > this.$parent.$refs.endWeekSelector.currentYear)) {
						this.$message.error('开始周不晚于结束周！请先清除结束周再选择！')
						return;
					}
				}
			}
			this.currentWeek = this.findWeekByIndex(w)
			this.submitChange()
			this.boxVisible = false

			let data = {
				weekIndex: this.currentWeek.weekIndex,
				startTime: this.currentWeek.weekStartDate,
				endTime: this.currentWeek.weekEndDate
			}
			this.$emit('change', data)
		},
		findWeekByIndex(index) {
			return this.weekData.find(x => x.weekIndex === index)
		},
		findWeekByDate(dt) {
			let timestamp = dt.getTime()
			return this.weekData.find(item => item.weekStartDate.getTime() <= timestamp && item.weekEndDate.getTime() >= timestamp)
		},
		submitChange() {
			this.currentWeekIndex = this.currentWeek?.weekIndex || ''
			this.weekShortText = this.currentWeek?.weekShortText || ''
			/* 设置选项框文本 */
			const weekText = this.currentWeek?.weekText || ''
			const index = weekText.search('周') + 1
			const rangeText = weekText.slice(0, index)
			this.weekText = this.isRange ? rangeText : weekText
			this.isShowPanel = false
		},
		getWeekShortText(timestramp) {
			let len = this.weekData.length,
				item = null,
				prevItem = null,
				shortText = ''
			for (let i = 0; i < len; i++) {
				item = this.weekData[i]
				if (i > 0) {
					prevItem = this.weekData[i - 1]
				}
				if (timestramp < item.weekStartDate && prevItem != null) {
					this.currentWeekIndex = prevItem.weekIndex
					shortText = prevItem.weekShortText
					break
				}
			}
			return shortText
		},

		//点击面板
		panelClick: function () { },

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
			this.currentWeek = {
				weekIndex: 0,
				year: 0
			}
			this.currentWeekIndex = null
			this.weekValue = ''
			this.weekShortText = ''
			this.weekText = ''
			this.defaultValue = null
			this.$emit('clear')
		}

	}
}
</script>

<style lang="less">
._weekPickerBox {
	display: inline-block;

	._tooltip {
		padding: 0;

		* {
			font-size: 12px;
			color: black;
		}

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

			._info {
				position: relative;
				overflow: auto;

				.disable {
					pointer-events: none;

					span {
						color: #ccc;
					}
				}

				._row {
					line-height: 45px;
					cursor: pointer;
					position: relative;
					padding-bottom: 5px;
					text-align: center;

					&:hover {
						background-color: #fafbfc;
					}
				}

				._acitve {
					background-color: #3faaf5;

					span {
						color: white;
					}

					&:hover {
						background-color: #3faaf5 !important;
					}
				}

				._col {
					&:after {
						content: '';
						position: absolute;
						width: 1px;
						height: 20px;
						top: 8px;
						left: 0;
						background-color: #f1f1f1;
					}
				}
			}

			._foot {
				position: absolute;
				right: 0;
				bottom: 0;
				position: absolute;
				right: 0;
				bottom: 0;
				background-color: #f1f1f1;
				width: 100%;
				padding: 10px;
			}

			._right {
				text-align: right;
			}
		}
	}

	._input {

		// margin: 0px 10px;
		.ant-input[disabled] {
			color: #666;
			background-color: #ffffff;
			cursor: pointer;
			opacity: 1;

			&:hover,
			&:focus,
			&:active {
				border-color: #3390f1;
			}
		}

		.ant-input-suffix .anticon {
			cursor: pointer;
		}
	}
}
</style>
