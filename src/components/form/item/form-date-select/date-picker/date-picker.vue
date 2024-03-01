<template>
	<div class="s-date-picker">
		<span class="label" v-if="label">{{ label }}</span>
		<minute-picker
			v-if="mode === 'minute'"
			:value="minuteValue"
			@change="onChange"
			:disabled-date="disabledDate"
			:width="width"
			:disabled-time="disabledTime"
			:is-allow-clear="isAllowClear"
			:use-default-time="useDefaultTime"
			key="minute"
		></minute-picker>
		<hour-picker
			v-if="mode === 'hour'"
			:value="hourValue"
			@change="onChange"
			:disabled-date="disabledDate"
			:width="width"
			:disabled-time="disabledTime"
			:is-allow-clear="isAllowClear"
			:use-default-time="useDefaultTime"
			key="hour"
		></hour-picker>
		<day-picker
			v-else-if="mode === 'day'"
			:value="dayValue"
			@change="onChange"
			:disabled-date="disabledDate"
			:is-allow-clear="isAllowClear"
			:width="width"
			:use-default-time="useDefaultTime"
			key="day"
		></day-picker>
		<month-picker
			v-else-if="mode === 'month'"
			:value="monthValue"
			@change="onChange"
			:disabled-date="disabledDate"
			:is-allow-clear="isAllowClear"
			:width="width"
			:use-default-time="useDefaultTime"
			key="month"
		></month-picker>
		<year-picker
			v-else-if="mode === 'year'"
			:value="yearValue"
			@change="onChange"
			:disabled-date="disabledDate"
			:is-allow-clear="isAllowClear"
			:width="width"
			:use-default-time="useDefaultTime"
			key="year"
		></year-picker>
		<quarter-picker
			v-else-if="mode === 'quarter'"
			:value="quarterValue"
			@change="onChange"
			:is-allow-clear="isAllowClear"
			:width="width"
			:use-default-time="useDefaultTime"
			key="quarter"
		></quarter-picker>
		<week-picker v-else-if="mode === 'week'" :value="weekValue" @change="onChange" :is-allow-clear="isAllowClear" :width="width" :use-default-time="useDefaultTime" key="week">
		</week-picker>
	</div>
</template>

<script>
import QuarterPicker from '../quarter/quarter.vue'
import WeekPicker from '../week/week.vue'
import HourPicker from '../hour/hour.vue'
import DayPicker from '../day/day.vue'
import MonthPicker from '../month/month.vue'
import YearPicker from '../year/year.vue'
import MinutePicker from '../minute/minute.vue'
export default {
	name: 'DatePicker',
	components: {
		QuarterPicker,
		WeekPicker,
		HourPicker,
		DayPicker,
		MonthPicker,
		YearPicker,
    MinutePicker
	},
	model: {
		prop: 'value',
		event: 'date-change'
	},
	props: {
		mode: String,
		value: {
			type: [Object, String, Array],
			default: ''
		},
		isAllowClear: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: '250px'
		},
		label: String,
		disabledDate: {
			type: Function
		},
		disabledTime: {
			type: Function
		},
		useDefaultTime: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
      minuteValue:'',
			hourValue: '',
			dayValue: '',
			monthValue: '',
			yearValue: '',
			weekValue: '',
			quarterValue: ''
		}
	},
	watch: {
		value() {
			this.setValue()
		},
		mode() {
			this.setValue()
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.minuteValue = this.value
			this.hourValue = this.value
			this.dayValue = this.value
			this.monthValue = this.value
			this.yearValue = this.value
			this.quarterValue = this.value
			this.weekValue = this.value
		})
	},
	methods: {
		onChange(val) {
			this.$emit('date-change', val)
		},
		setValue() {
			switch (this.mode) {
				case 'minute':
					this.minuteValue = this.value
					break
				case 'hour':
					this.hourValue = this.value
					break
				case 'day':
					this.dayValue = this.value
					break
				case 'month':
					this.monthValue = this.value
					break
				case 'year':
					this.yearValue = this.value
					break
				case 'quarter':
					this.quarterValue = this.value
					break
				case 'week':
					this.weekValue = this.value
					break
			}
		}
	}
}
</script>

<style lang="less">
.s-date-picker {
	display: flex;
	align-items: center;

	.label {
		flex-shrink: 0;
		font-size: 12px;
		margin-right: 10px;
	}
}
</style>