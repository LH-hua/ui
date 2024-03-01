<template>
	<div id="time-interval-select">
		<div class="label" v-if="label !== ''">{{ label }}</div>

		<!-- 日 -->
		<template v-if="defaultOptions.mode == 'day'">
			<a-range-picker
				:placeholder="['开始时间', '结束时间']"
				format="MM-DD"
				:style="{ width }"
				:value="value"
				:mode="dateMode"
				@panelChange="handlePanelChange"
				@change="handleChange"
				@openChange="openPanel"
				:disabled-date="disabledTime"
			/>
		</template>

		<!-- 月 -->
		<template v-else-if="defaultOptions.mode == 'month'">
			<a-range-picker
				:placeholder="['开始时间', '结束时间']"
				format="MM月"
				:style="{ width }"
				:value="value"
				:mode="monthMode"
				@change="handleChange"
				@panelChange="handlePanelChange"
				@openChange="openPanel"
				:disabled-date="disabledTime"
			/>
		</template>

		<!-- 季 -->
		<template v-else-if="defaultOptions.mode == 'quarter'">
			<s-quarter-picker :default-value="value[0]" @change="quarterStartChange" placeholder="开始时间" :options="{ ignoreYear: true }" :date-width="width" />
			<span style="padding: 2px">~</span>
			<s-quarter-picker :default-value="value[1]" @change="quarterEndChange" placeholder="结束时间" :options="{ ignoreYear: true }" :date-width="width" />
		</template>

		<!-- 小时 -->
		<template v-else>
			<a-range-picker
				:placeholder="['开始时间', '结束时间']"
				format="MM-DD HH时"
				:show-time="{ format: 'HH' }"
				:style="{ width }"
				:value="value"
				:mode="dateMode"
				@panelChange="handlePanelChange"
				@change="handleChange"
				@openChange="openPanel"
				:disabled-date="disabledTime"
			/>
		</template>
	</div>
</template>
<script>
import moment from 'moment'

// 时段选择器
export default {
	name: 'timeIntervalSelect',
	props: {
		label: {
			type: String,
			default: ''
		},
		options: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			width: 250,
			startDateTime: '',
			endDateTime: '',
			value: [],
			dateMode: ['date', 'date'],
			monthMode: ['month', 'month'],
			defaultOptions: {
				// 时间类型 hour day week month quarter year, 未传时默认day
				mode: 'day',
				startDate: moment().subtract(1, 'days'),
				endDate: moment(),
				dateWidth: ''
			}
		}
	},
	methods: {
		moment,
		/**
		 * 时间选择改变事件
		 */
		handleChange(value) {
			this.value = value
			this.$emit('change', this.getSearchParams())
		},
		handlePanelChange(value, mode) {
			this.value = value
			switch (this.mode) {
				case 'day':
					this.dateMode = mode
					break
				case 'month':
					this.monthMode = [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]]
					break
				default:
					this.dateMode = mode
					break
			}
			this.$emit('change', this.getSearchParams())
		},
		weekStartChange(dateObj) {
			this.startDateTime = moment(dateObj.startTime).format('YYYY-MM-DD 00:00:00')
			this.$emit('change', this.getSearchParams())
		},
		weekEndChange(dateObj) {
			this.endDateTime = moment(dateObj.endTime).format('YYYY-MM-DD 23:59:59')
			this.$emit('change', this.getSearchParams())
		},
		quarterStartChange(dateObj) {
			this.startDateTime = moment(dateObj.startTime).format('YYYY-MM-DD 00:00:00')
			this.$emit('change', this.getSearchParams())
		},
		quarterEndChange(dateObj) {
			this.endDateTime = moment(dateObj.endTime).format('YYYY-MM-DD 23:59:59')
			this.$emit('change', this.getSearchParams())
		},
		/**
		 * 组织返回值
		 */
		VerDate() {
			const startUnix = this.startDateTime == '' ? this.value[0].unix() : moment(this.startDateTime).unix()
			const endUnix = this.endDateTime == '' ? this.value[1].unix() : moment(this.endDateTime).unix()

			if (!startUnix || !endUnix) {
				throw new TypeError(`时间不能为空`)
			}
			if (startUnix > endUnix) {
				throw new TypeError('结束时间必须大于开始时间!')
			}

			let start = this.startDateTime
			let end = this.endDateTime
			switch (this.defaultOptions.mode) {
				case 'hour':
					start = this.value[0].format('MM-DD HH:00:00')
					end = this.value[1].format('MM-DD HH:59:59')
					break
				case 'day':
					start = this.value[0].format('MM-DD 00:00:00')
					end = this.value[1].format('MM-DD 23:59:59')
					break
				case 'week':
					start = moment(this.startDateTime).format('MM-DD 00:00:00')
					end = moment(this.endDateTime).format('MM-DD 23:59:59')
					break
				case 'month':
					start = this.value[0].startOf('month').format('MM-DD 00:00:00')
					end = this.value[1].endOf('month').format('MM-DD HH:mm:ss')
					break
				case 'quarter':
					start = moment(this.startDateTime).format('MM-DD 00:00:00')
					end = moment(this.endDateTime).format('MM-DD 23:59:59')
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
		/**
		 * 初始化组件时间
		 */
		Initialize() {
			const now = moment()
			let startDate = moment(this.defaultOptions.startDate).year(now.year())
			let endDate = moment(this.defaultOptions.endDate).year(now.year())

			let dateWidth = 140
			switch (this.defaultOptions.mode) {
				case 'hour':
					dateWidth = 150
					this.value = [startDate, endDate]
					break
				case 'day':
					dateWidth = 100
					this.value = [startDate, endDate]
					break
				case 'week':
					let today = startDate
					let day = today.day()
					let monday = today.subtract(day - 1, 'day')
					let sunday = monday.add(6, 'day')
					dateWidth = 120
					this.startDateTime = monday.format('YYYY-MM-DD 00:00:00')
					this.endDateTime = sunday.format('YYYY-MM-DD 00:00:00')
					break
				case 'month':
					dateWidth = 100
					this.value = [startDate, endDate]
					break
				case 'quarter':
					dateWidth = 130
					this.value = [startDate, endDate]
					break
				default:
					this.value = [startDate, endDate]
					break
			}
			this.width = this.defaultOptions.dateWidth || dateWidth * 1.5 + 'px'
		},
		disabledTime(current) {
			const yearBegin = moment().month(0).date(1).hour(0).minute(0).second(0).add(-1, 'day')
			const yearEnd = moment().month(0).date(1).hour(0).minute(0).second(0).add(1, 'year').add(-1, 'second')
			if (moment(current).isBetween(yearBegin, yearEnd)) {
				return false
			}
			return true
		},
		openPanel(show) {
			if (!show) return
			const mode = this.defaultOptions.mode
			const visible = className => {
				setTimeout(() => {
					this.$nextTick(() => {
						for (let x = 0; x < className.length; x++) {
							const domClass = className[x]
							let dom = document.getElementsByClassName(domClass)
							for (let i = 0; i < dom.length; i++) {
								const element = dom[i]
								if (element.style.display == 'none') {
									return
								}
								element.style.display = 'none'
							}
						}
						if (mode == 'month') {
							let dom = document.getElementsByClassName('ant-calendar-header')
							for (let j = 0; j < dom.length; j++) {
								const element = dom[j]
								element.style.height = 0
							}
						}
					})
				})
			}
			const monthPanel = () => {
				let classList = ['ant-calendar-month-panel-prev-year-btn', 'ant-calendar-month-panel-next-year-btn', 'ant-calendar-month-panel-year-select']
				visible(classList)
			}
			const dayPanel = () => {
				let classList = ['ant-calendar-prev-year-btn', 'ant-calendar-next-year-btn', 'ant-calendar-year-select']
				visible(classList)
			}
			switch (mode) {
				case 'month':
					monthPanel()
					break
				case 'day':
					dayPanel()
					break
				case 'hour':
					dayPanel()
					break
			}
		}
	},
	watch: {
		options(val) {
			this.defaultOptions = { ...this.defaultOptions, ...val }
			this.Initialize()
			this.$emit('change', this.getSearchParams())
		}
	},
	mounted() {
		this.defaultOptions = { ...this.defaultOptions, ...this.options }
		this.Initialize()
	}
}
</script>
<style lang="less">
#time-interval-select {
	display: flex;
	align-items: center;
	.h-datetime-input-border .h-input {
		border-radius: 4px;
	}
}
</style>
