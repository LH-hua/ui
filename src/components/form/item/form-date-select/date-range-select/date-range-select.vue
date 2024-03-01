<template>
	<div id="date-range-select">
		{{ label }}

		<!-- 日 -->
		<template v-if="mode == 'day'">
			<a-range-picker :dropdownClassName="className" :placeholder="['开始时间', '结束时间']" :format="getFormat(mode)"
				:style="{ width }" :value="values" :mode="dateMode" @panelChange="handlePanelChange" @change="handleChange"
				:disabledDate="disaDate" :allowClear="isAllowClear" />
		</template>

		<!-- 周/季 -->
		<template v-else-if="mode == 'week' || mode == 'quarter'">
			<other-Range-picker :value="value" :mode="mode" @change="otherPickerChange" :range-limit="rangeLimit" />
		</template>

		<!-- 月 -->
		<template v-else-if="mode == 'month'">
			<a-range-picker :placeholder="['开始时间', '结束时间']" :format="getFormat(mode)" :style="{ width }" :value="values"
				:mode="monthMode" @change="handleChange" @panelChange="handlePanelChange" :allowClear="isAllowClear" />
		</template>

		<!-- 年 -->
		<template v-else-if="mode == 'year'">
			<a-range-picker :placeholder="['开始时间', '结束时间']" :format="getFormat(mode)" :style="{ width }" :value="values"
				:mode="['year', 'year']" @change="handleChange" @panelChange="handlePanelChange" @openChange="openChange"
				:allowClear="isAllowClear" />
		</template>

		<!-- 小时 -->
		<template v-else>
			<a-range-picker :placeholder="['开始时间', '结束时间']" format="YYYY-MM-DD HH时" :show-time="{ format: 'HH' }"
				:style="{ width }" :value="values" :mode="dateMode" @panelChange="handlePanelChange" @change="handleChange"
				:disabledDate="disaDate" :disabled-time="disaTime" :allowClear="isAllowClear" />
		</template>
	</div>
</template>
<script>
import moment from 'moment'
import OtherRangePicker from '../date-range-select/other-Range-picker.vue'
// hour day week month quarter year
export default {
	name: 'DateSelect',
	components: {
		OtherRangePicker
	},
	// model: {
	// 	prop: 'value',
	// 	event: 'change'
	// },
	props: {
		value: {
			type: Object,
			default: () => ({ startTime: moment().format('YYYY-MM-DD') })
		},
		// 时间类型 hour day week month quarter year, 未传时默认hour
		mode: {
			type: String,
			default: 'day'
		},
		// 组件lable
		label: {
			type: String,
			default: '日期范围'
		},
		dateWidth: {
			type: String,
			default: ''
		},
		disabledDate: {
			type: Function
		},
		disabledTime: {
			type: Function
		},
		isAllowClear: {
			type: Boolean,
			default: () => false
		},
		format: {
			type: String,
			default: ''
		},
		className: {
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
			width: 250,
			startDateTime: '',
			endDateTime: '',
			values: [],
			dateMode: ['date', 'date'],
			monthMode: ['month', 'month'],
			tart: '',
			end: '',
			dateFormat: {
				day: 'YYYY-MM-DD',
				month: 'YYYY-MM',
				year: 'YYYY年'
			},
		}
	},
	methods: {
		moment,
		/**
		 * 时间选择改变事件
		 */
		handleChange(value) {
			this.values = value
			this.$emit('change', this.getSearchParams())
		},
		handlePanelChange(value, mode) {
			this.values = value
			switch (this.mode) {
				case 'day':
					this.dateMode = mode
					break
				case 'month':
					this.monthMode = [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]]
					break
				case 'year':
					this.start = moment(value[0]).format('YYYY')
					this.end = moment(value[1]).format('YYYY')
					this.openChange()
					break
				default:
					this.dateMode = mode
					break
			}
			this.$emit('change', this.getSearchParams())
		},
		// 周 / 季 emit事件
		otherPickerChange(date) {
			this.$emit('change', date)
		},
		/**
		 * 组织返回值
		 */
		VerDate() {
			const startUnix = this.startDateTime == '' ? this.values[0].unix() : moment(this.startDateTime).unix()
			const endUnix = this.endDateTime == '' ? this.values[1].unix() : moment(this.endDateTime).unix()

			if (!startUnix || !endUnix) {
				throw new TypeError(`${this.label}不能为空`)
			}

			// 过滤季度选择的 时间判断
			if (this.mode !== 'quarter' && this.mode !== 'week' && startUnix > endUnix) {
				throw new TypeError('结束时间必须大于开始时间!')
			}
			let start = this.startDateTime
			let end = this.endDateTime
			switch (this.mode) {
				case 'hour':
					start = this.values[0].format('YYYY-MM-DD HH:00:00')
					end = this.values[1].format('YYYY-MM-DD HH:59:59')
					break
				case 'day':
					start = this.values[0].format('YYYY-MM-DD 00:00:00')
					end = this.values[1].format('YYYY-MM-DD 23:59:59')
					break
				case 'week':
					// 判断时间大于 开始时间和结束时间 装换
					// if(startUnix > endUnix){
					// 	start = moment(this.endDateTime).startOf("week").format('YYYY-MM-DD 00:00:00')
					// 	end = moment(this.startDateTime).endOf("week").format('YYYY-MM-DD 23:59:59')
					// }else{
					// 	start = moment(this.startDateTime).format('YYYY-MM-DD 00:00:00')
					// 	end = moment(this.endDateTime).format('YYYY-MM-DD 23:59:59')
					// }
					if (startUnix > endUnix) {
						start = moment(this.values[1]).startOf('week').format('YYYY-MM-DD 00:00:00')
						end = moment(this.values[0]).endOf('week').format('YYYY-MM-DD 23:59:59')
					} else {
						start = moment(this.values[0]).format('YYYY-MM-DD 00:00:00')
						end = moment(this.values[1]).format('YYYY-MM-DD 23:59:59')
					}
					break
				case 'month':
					start = this.values[0].startOf('month').format('YYYY-MM-DD 00:00:00')
					end = this.values[1].endOf('month').format('YYYY-MM-DD HH:mm:ss')
					break
				case 'quarter':
					// 判断时间大于 开始时间和结束时间 装换
					if (startUnix > endUnix) {
						start = moment(this.endDateTime).startOf('quarter').format('YYYY-MM-DD 00:00:00')
						end = moment(this.startDateTime).endOf('quarter').format('YYYY-MM-DD 23:59:59')
					} else {
						start = moment(this.startDateTime).format('YYYY-MM-DD 00:00:00')
						end = moment(this.endDateTime).format('YYYY-MM-DD 23:59:59')
					}

					break
				case 'year':
					start = this.values[0].startOf('year').format('YYYY-MM-DD 00:00:00')
					end = this.values[1].endOf('year').format('YYYY-MM-DD HH:mm:ss')
					break
			}
			return {
				startTime: start,
				endTime: end
			}
		},
		getSearchParams() {
			return this.VerDate()
		},
		openChange() {
			setTimeout(() => {
				this.endDisabled()
				this.startDisabled()
			})
		},
		disaDate(current) {
			if (this.disabledDate) {
				return this.disabledDate(current)
			}
			return false
		},
		disaTime(_, type) {
			if (this.disabledTime) {
				return this.disabledTime(_, type)
			}
			return {}
		},
		// 年份开始日期禁用
		startDisabled() {
			this.$nextTick(() => {
				const table = document.getElementsByClassName('ant-calendar-year-panel-tbody')

				const startList = table[0].querySelectorAll('td') // 所有开始年份
				startList.forEach(item => {
					if (item.innerText > this.end) {
						item.setAttribute('class', 'year-disabled')
					} else {
						item.classList.remove('year-disabled')
					}
				})
			})
		},
		// 年份禁用结束时间
		endDisabled() {
			this.$nextTick(() => {
				const table = document.getElementsByClassName('ant-calendar-year-panel-tbody')
				const endList = table[1].querySelectorAll('td') // 所有结束年份
				endList.forEach(item => {
					if (item.innerText < this.start) {
						item.setAttribute('class', 'year-disabled')
					} else {
						item.classList.remove('year-disabled')
					}
				})
			})
		},
		/**
		 * 初始化组件时间
		 */
		Initialize() {
			const sTime = this.value.startTime || this.value?._i?.startTime
			const eTime = this.value.endTime || this.value?._i?.endTime
			let startDate = !sTime ? moment().subtract(1, 'days') : moment(sTime)
			let endDate = !eTime ? moment() : moment(eTime)
			let dateWidth = 160
			switch (this.mode) {
				case 'hour':
					dateWidth = 240
					this.values = [startDate, endDate]
					break
				case 'day':
					this.values = [startDate, endDate]
					break
				case 'week':
					this.values = [startDate, endDate]
					break
				case 'month':
					this.values = [startDate, endDate]
					break
				case 'year':
					this.values = [startDate, endDate]
					this.start = moment(startDate).format('YYYY')
					this.end = moment(endDate).format('YYYY')
					break
				case 'quarter':
					this.values = [startDate, endDate]
					break
				default:
					this.values = [startDate, endDate]
					break
			}
			this.width = dateWidth + 'px'

		},

		// 设置 显示界面的 时间格式
		getFormat(mode) {
			if (this.$utils.isNull(this.format)) {
				return this.dateFormat[mode]
			}

			return this.format
		}
	},
	watch: {
		mode() {
			this.Initialize()
			this.$emit('change', this.getSearchParams())
		},
		value() {
			// console.log('值', this.value)
			if (!this.value||!this.value.endTime) {
				this.Initialize()
				this.$emit('change', this.getSearchParams())
			} else {
				this.Initialize()
			}
		},
	},
	mounted() {
		this.Initialize()
	}
}
</script>
<style lang="less">
// .env-demo2 .env-modal-form .ant-form-item .ant-form-item-control-wrapper input {
// 	width: 100% !important;
// }

/* 周、季 */
// .env-demo2 .env-modal-form .ant-form-item .ant-form-item-control-wrapper {

// 	._weekPickerBox input,
// 	._quarterPickerBox input {
// 		width: 100% !important;
// 	}
// }

#date-range-select {
	.h-datetime-input-border .h-input {
		border-radius: 4px;
	}
}

.year-disabled {
	pointer-events: none;
	cursor: not-allowed;

	a {
		color: rgba(0, 0, 0, 0.25);
		background: #f5f5f5;
	}
}
</style>
