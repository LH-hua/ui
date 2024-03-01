<template>
	<div class="s-quarter-range-picker" :style="{ width: width }" ref="sQuarterRangePicker">
		<a-tooltip placement="bottomLeft" overlayClassName="quarter-range-tooltip" v-model="panelVisible" :getPopupContainer="getPopupContainer" trigger="click">
			<template slot="title">
				<div class="quarter-range-calendar">
					<!--开始面板-->
					<div class="start-quarter-calendar">
						<div class="ant-calendar-month-panel-header">
							<a role="button" title="上一年" class="ant-calendar-month-panel-prev-year-btn" @click="onStartPanelPrevYear"></a>
							<span>
								<span class="ivu-date-picker-header-label">{{ startPanel.currentYear }}年</span>
							</span>
							<a title="下一年" class="ant-calendar-month-panel-next-year-btn" @click="onStartPanelNextYear"></a>
						</div>
						<div class="quarter-content">
							<div
								v-for="(item, index) in startPanel.quarterData"
								:key="'quarter' + index"
								@click="onStartPanelChange(item.quarterIndex)"
								:class="['quarter-item', startPanel.currentQuarter.quarterIndex == item.quarterIndex && item.year == startPanel.currentQuarter.year ? 'quarter-item-active' : '']"
							>
								<span>{{ item.quarterFullText }}</span>
							</div>
						</div>
					</div>
					<!--结束面板-->
					<div class="end-quarter-calendar">
						<div class="ant-calendar-month-panel-header">
							<a role="button" title="上一年" class="ant-calendar-month-panel-prev-year-btn" @click="onEndPanelPrevYear"></a>
							<span>
								<span class="ivu-date-picker-header-label">{{ endPanel.currentYear }}年</span>
							</span>
							<a title="下一年" class="ant-calendar-month-panel-next-year-btn" @click="onEndPanelNextYear"></a>
						</div>
						<div class="quarter-content">
							<div
								v-for="(item, index) in endPanel.quarterData"
								:key="index"
								@click="onEndPanelChange(item.quarterIndex)"
								:class="[
									'quarter-item',
									endPanel.currentQuarter.quarterIndex == item.quarterIndex && item.year == endPanel.currentQuarter.year ? 'quarter-item-active' : '',
									(item.year == startPanel.currentQuarter.year && startPanel.currentQuarter.quarterIndex >= item.quarterIndex) || item.year < startPanel.currentQuarter.year
										? 'disable'
										: ''
								]"
							>
								<span>{{ item.quarterFullText }}</span>
							</div>
						</div>
					</div>
				</div>
			</template>

			<div class="date-input" @mouseenter="onEnter()" @mouseleave="onLeave()" @click="togglePanel">
				<a-tooltip>
					<template slot="title" v-if="startPanel.currentQuarter.quarterFullText">
						{{ startPanel.currentQuarter.quarterFullText }}
					</template>
					<div class="value-text" v-if="startPanel.currentQuarter.quarterText">{{ startPanel.currentQuarter.quarterText }}</div>
					<div class="value-text" style="color: #ccc" v-else>开始季度</div>
				</a-tooltip>
				<span>~</span>
				<a-tooltip>
					<template slot="title" v-if="endPanel.currentQuarter.quarterFullText">
						{{ endPanel.currentQuarter.quarterFullText }}
					</template>
					<div class="value-text" v-if="endPanel.currentQuarter.quarterText">{{ endPanel.currentQuarter.quarterText }}</div>
					<div class="value-text" style="color: #ccc" v-else>结束季度</div>
				</a-tooltip>
				<span style="margin-left: 5px; color: #ccc">
					<a-icon
						theme="filled"
						v-if="isAllowClear && isShowIcon && startPanel.currentQuarter.quarterText && endPanel.currentQuarter.quarterText"
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
//季度范围选择器
import moment from 'moment'
import { getMonthDays } from '../date-utils'
export default {
	props: {
		value: {
			type: [Object, String, Array]
			// default: () => ({
			// 	startTime: moment().format('YYYY-MM-DD 00:00:00'),
			// 	endTime: moment().add(1, 'quarters').endOf('quarter').format('YYYY-MM-DD 23:59:59')
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
	model: {
		prop: 'value',
		event: 'change'
	},
	data() {
		return {
			panelVisible: false,
			isShowIcon: false,

			startTime: moment(), //moment类型
			endTime: moment().add(1, 'quarters'), //moment类型

			//开始面板
			startPanel: {
				currentYear: -1,
				quarterData: [],
				currentQuarter: {
					quarterIndex: 0,
					year: 0,
					quarterText: ''
				},
				disableQuarterIndex: [],
				disableYear: null
			},
			//结束面板
			endPanel: {
				currentYear: -1,
				quarterData: [],
				currentQuarter: {
					quarterIndex: 0,
					year: 0,
					quarterText: ''
				},
				disableQuarterIndex: [],
				disableYear: null
			}
		}
	},
	watch: {
		value(newVal, oldVal) {
			this.initDate(newVal, oldVal)
		},
		panelVisible(visible) {
			if (visible) {
				this.isOverDtep()
			}
		}
	},
	mounted() {
		//挂载的时候初始化（如果没有设置默认值的话）
		this.$nextTick(() => {
			if (this.useDefaultTime) {
				// console.log('this.value',this.value)
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
			const layout = this.$refs.sQuarterRangePicker.getBoundingClientRect()
			// console.log('框', width,layout.left)
			if (width - layout.left < 400) {
				this.$nextTick(() => {
					document.querySelectorAll('.quarter-range-tooltip .ant-tooltip-inner').forEach(item => {
						item.style.left = `-${layout.width}px`
					})
				})
			}
		},
		// 初始化插件数据
		initPanel() {
			console.log('初始化value', this.value)
			let st = this.startTime || moment()
			let et = this.endTime || moment().add(1, 'weeks')
			// debugger;
			//初始化开始面板
			this.startPanel.currentYear = st.year()
			this.startPanel.quarterData = this.getQuarterData(this.startPanel.currentYear)
			this.startPanel.currentQuarter = this.startPanel.quarterData.find(item => item.quarterStartDate.getTime() <= st.valueOf() && item.quarterEndDate.getTime() >= st.valueOf())
			//初始化结束面板
			this.endPanel.currentYear = et.year()
			this.endPanel.quarterData = this.getQuarterData(this.endPanel.currentYear)
			this.endPanel.currentQuarter = this.endPanel.quarterData.find(item => item.quarterStartDate.getTime() <= et.valueOf() && item.quarterEndDate.getTime() >= et.valueOf())
		},

		initDate(newVal, oldVal) {
			console.log('默认值', newVal)
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
				this.endTime = moment().add(1, 'quarters')
				this.clear()
				this.initPanel()
				this.emitDate()
				return
			}
			//初始化的时候传进来是对象
			if (!oldVal && newVal.startTime && newVal.endTime) {
				console.log(1)
				this.startTime = moment(this.value.startTime)
				this.endTime = moment(this.value.endTime)
				this.initPanel()
				this.emitDate()
			}

			//更新的时候传进来是对象(判断两者是否相等，防止死循环更新)
			if (newVal && oldVal && newVal.startTime !== oldVal.startTime && newVal.endTime !== oldVal.endTime) {
				console.log(2)
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
			//重置的时候（表单重置方法会传入日期字符串）
			if (this.$utils.getType(this.value) === 'string') {
				this.startTime = moment(this.value)
				this.endTime = moment(this.value).add(1, 'weeks')
				this.initPanel()
				this.emitDate()
			}

			//如果没有值
			// if (!this.value) {
			//   this.startTime = moment()
			//   this.endTime = moment().add(1, 'quarters')
			//   this.initPanel()
			//   this.emitDate()
			// }
			//清除置空的情况下
			// if (!this.value || (!this.value.startTime && !this.value.endTime)) {
			// 	let startTime = moment().startOf('week')
			// 	let endTime = moment().endOf('week')

			// 	this.startPanel.quarterData = this.getQuarterData(startTime.year())
			// 	this.startPanel.currentYear = startTime.year()
			// 	this.startPanel.currentQuarter = {
			// 		quarterIndex: 0,
			// 		year: startTime.year(),
			// 		quarterStartDate: '',
			// 		quarterEndDate: '',
			// 		quarterText: ''
			// 	}

			// 	this.endPanel.quarterData = this.getQuarterData(endTime.year())
			// 	this.endPanel.currentYear = endTime.year()
			// 	this.endPanel.currentQuarter = {
			// 		weekIndex: 0,
			// 		year: endTime.year(),
			// 		quarterStartDate: '',
			// 		quarterEndDate: '',
			// 		quarterText: ''
			// 	}
			// }
		},

		//开始季度面板前一年
		onStartPanelPrevYear() {
			this.startPanel.currentYear--
			this.startPanel.quarterData = this.getQuarterData(this.startPanel.currentYear)
		},
		//开始季度面板后一年
		onStartPanelNextYear() {
			this.startPanel.currentYear++
			this.startPanel.quarterData = this.getQuarterData(this.startPanel.currentYear)
		},
		//结束季度面板前一年
		onEndPanelPrevYear() {
			this.endPanel.currentYear--
			this.endPanel.quarterData = this.getQuarterData(this.endPanel.currentYear)
		},
		//结束季度面板后一年
		onEndPanelNextYear() {
			this.endPanel.currentYear++
			this.endPanel.quarterData = this.getQuarterData(this.endPanel.currentYear)
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
			this.isShowPanel = !this.isShowPanel
		},

		onStartPanelChange(index) {
			this.startPanel.currentQuarter = this.startPanel.quarterData.find(x => x.quarterIndex === index)
			//点击开始时间清除结束时间，因为要重新算禁用范围
			this.endPanel.currentQuarter = {
				quarterIndex: 0,
				year: 0,
				quarterText: ''
			}
		},
		onEndPanelChange(index) {
			//选结束的时候先判断有没有选开始
			if (!this.startPanel.currentQuarter.quarterText) {
				this.$message.error('请先选择开始季度！')
				return
			}
			this.endPanel.currentQuarter = this.endPanel.quarterData.find(x => x.quarterIndex === index)
			this.panelVisible = false
			this.emitDate()
		},

		emitDate() {
			let data = {
				startTime: this.startPanel?.currentQuarter?.quarterStartDate ? moment(this.startPanel.currentQuarter.quarterStartDate).format('YYYY-MM-DD 00:00:00') : '',
				endTime: this.endPanel?.currentQuarter?.quarterEndDate ? moment(this.endPanel.currentQuarter.quarterEndDate).format('YYYY-MM-DD 23:59:59') : ''
			}
			this.$emit('change', data)
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
				let quarterFullText = `${yearText} 第${quarterIndex}季度 ${dateText}`
				let quarterText = `${yearText} 第${quarterIndex}季度`

				quarterList.push({
					quarterIndex,
					quarterFullText,
					quarterText,
					quarterStartDate,
					quarterEndDate,
					year
				})
			}
			return quarterList
		},
		clear() {
			let startTime = moment().startOf('week')
			let endTime = moment().endOf('week')

			this.startPanel.quarterData = this.getQuarterData(startTime.year())
			this.startPanel.currentYear = startTime.year()
			this.startPanel.currentQuarter = {
				quarterIndex: 0,
				year: startTime.year(),
				quarterStartDate: '',
				quarterEndDate: '',
				quarterText: ''
			}

			this.endPanel.quarterData = this.getQuarterData(endTime.year())
			this.endPanel.currentYear = endTime.year()
			this.endPanel.currentQuarter = {
				weekIndex: 0,
				year: endTime.year(),
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
.s-quarter-range-picker {
	display: inline-block;
	width: 100%;

	.value-text {
		text-align: center;
		color: #000;
	}
}

.quarter-range-tooltip {
	padding: 0;

	.ant-tooltip-arrow::before {
		background-color: transparent;
	}

	.ant-tooltip-inner {
		width: 500px;
		background-color: white;
		overflow: auto;
		position: relative;
		padding: 0;

		.quarter-range-calendar {
			color: #000;

			.start-quarter-calendar,
			.end-quarter-calendar {
				display: inline-block;
				width: 50%;
				height: 100%;
				overflow: auto;
			}
		}

		.quarter-content {
			position: relative;
			width: 100%;
			overflow: auto;

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
