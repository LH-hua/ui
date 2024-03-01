<template>
	<div class="_quarterPickerBox">
		<a-tooltip placement="bottomLeft" overlayClassName="_tooltip" v-model="boxVisible"
			:get-popup-container="getPopupContainer" trigger="click">
			<template slot="title">
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
				<div class="_info" :style="`width:100%;height:calc(100% - 40px);`">
					<a-row>
						<a-col :span="24" v-for="(item, index) in quarterData" :key="index" class="_row"
							@click="changeQuarter($event, item.quarterIndex)" :class="[
								'_row',
								currentQuarter.quarterIndex == item.quarterIndex && item.year == currentQuarter.year ? '_acitve' : '',
								(item.year == startYear && disableQuarterIndex.includes(item.quarterIndex)) || item.year < startYear ? 'disable' : ''
							]" :id="'quarter' + item.quarterIndex">
							<span>{{ item.quarterShortText }}</span>
						</a-col>
					</a-row>
				</div>

				<!-- 底部 -->
				<!-- <div class="_foot"></div> -->
			</template>

			<div :class="[isRange ? 'date-input-range' : 'date-input']" data-id="values" @mouseenter="onEnter()"
				@mouseleave="onLeave()">
				<div class="value-text">{{ quarterShortText || placeholder }}</div>
				<span style="margin-left: 5px;color: #ccc;">
					<a-icon v-if="isShowIcon && quarterShortText" type="close-circle" @click.stop="clear" />
					<a-icon v-else type="calendar" />
				</span>
			</div>
		</a-tooltip>
	</div>
</template>

<script>
import moment from 'moment'
import CollapseTransition from './collapse-transition.js'
import { getMonthDays } from './utils.js'
export default {
	components: {
		CollapseTransition
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [Object, String, Date],
			default: () => ({ startTime: moment(new Date()) })
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
		name: {
			type: String,
			default: ''
		},
		rangeLimit: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			values: '',
			isShowPanel: false,
			boxVisible: false,
			currentQuarterIndex: null,
			quarterShortText: '',
			quarterData: [],
			currentQuarter: {
				quarterIndex: 0,
				year: 0
			},
			currentYear: -1,
			isShowIcon: false,
			disableQuarterIndex: [],
			startYear: null
		}
	},
	watch: {
		options() {
			this.init()
		},
	},
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
			this.initStyle()
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
			this.values = this.defaultValue.format('YYYY-MM-DD')
			this.currentYear = this.defaultValue.year()
			this.quarterData = this.getQuarterData(this.currentYear)
			let dt = new Date(this.values)
			this.setValue(dt)
			// this.currentQuarter = this.findQuarterByDate(dt)
			// console.log('初始化季度选择器',this.currentQuarter)
			// let data = {
			// 	quarterIndex: this.currentQuarter.quarterIndex,
			// 	startTime: this.currentQuarter.quarterStartDate,
			// 	endTime: this.currentQuarter.quarterEndDate
			// }
			// this.$emit('change', data)
		},

		// 初始化插件的样式
		initStyle() { },

		/*----------------------------------------------------------------------
				| 点击事件
				|-----------------------------------------------------------------------
				*/
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

		getPopupContainer(trigger) {
			return trigger.parentElement
		},

		//点击文本框弹出日期选择
		togglePanel(e) {
			this.isShowPanel = !this.isShowPanel
		},
		handleClose() {
			this.isShowPanel = false
		},
		setValue(dt) {
			this.currentQuarter = this.findQuarterByDate(dt)
			this.submitChange()
		},
		changeQuarter(event, w) {
			if (this.rangeLimit) {
				if (this.$parent.$refs.endQuarterSelector.currentQuarter.quarterIndex) {
					let currentQuarter = this.findQuarterByIndex(w)
					if (this.name == 'quarterRangeStart' && (w > this.$parent.$refs.endQuarterSelector.currentQuarter.quarterIndex) || this.name == 'quarterRangeStart' && (currentQuarter.year > this.$parent.$refs.endQuarterSelector.currentQuarter.year)) {
						this.$message.error('开始季度不晚于结束季度！请先清除结束季度再选择！')
						return;
					}
				}
			}

			this.currentQuarter = this.findQuarterByIndex(w)
			this.submitChange()
			this.boxVisible = false

			let data = {
				quarterIndex: this.currentQuarter.quarterIndex,
				startTime: this.currentQuarter.quarterStartDate,
				endTime: this.currentQuarter.quarterEndDate
			}
			this.$emit('change', data)
		},
		findQuarterByIndex(index) {
			return this.quarterData.find(x => x.quarterIndex === index)
		},
		findQuarterByDate(dt) {
			let timestamp = dt.getTime()
			const data = this.quarterData.find(item => item.quarterStartDate.getTime() <= timestamp && item.quarterEndDate.getTime() >= timestamp)
			return data
		},
		submitChange() {
			this.currentQuarterIndex = this.currentQuarter.quarterIndex
			const quarterShortText = this.currentQuarter.quarterShortText
			const index = quarterShortText.search('度') + 1
			const rangeText = quarterShortText.slice(0, index)
			this.quarterShortText = this.isRange ? rangeText : quarterShortText
			this.isShowPanel = false
		},
		getQuarterShortText(timestramp) {
			let len = this.quarterData.length,
				item = null,
				prevItem = null,
				shortText = ''
			for (let i = 0; i < len; i++) {
				item = this.quarterData[i]
				if (i > 0) {
					prevItem = this.quarterData[i - 1]
				}
				if (timestramp < item.quarterStartDate && prevItem != null) {
					this.currentQuarterIndex = prevItem.quarterIndex
					shortText = prevItem.quarterShortText
					break
				}
			}
			return shortText
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
		//点击面板
		panelClick: function () { },

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
				let quarterShortText = `${this.options.ignoreYear ? '' : yearText}第${quarterIndex}季度 ${this.options.igonreDate ? '' : dateText}`

				quarterList.push({
					quarterIndex,
					quarterShortText,
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
			this.currentQuarter = {
				quarterIndex: 0,
				year: 0
			}
			this.values = ''
			this.quarterShortText = ''
			this.$emit('clear')
		}
	},

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
._quarterPickerBox {
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
			height: 240px;
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

					&:after {
						content: '';
						position: absolute;
						width: 100%;
						height: 1px;
						bottom: 0px;
						left: 0;
						background-color: #f1f1f1;
					}
				}

				._acitve {
					background-color: #3faaf5;

					&:hover {
						background-color: #3faaf5;
					}

					span {
						color: white;
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
		// width: 250px;
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
