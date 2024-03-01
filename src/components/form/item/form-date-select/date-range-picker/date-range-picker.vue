<template>
	<div class="s-date-range-picker">
		<span class="label" v-if="label">{{ label }}</span>
		<minute-range-picker v-if="mode === 'minute'" :value="minuteValue" @change="onChange" :is-allow-clear="isAllowClear" :style="{ width: width }" :use-default-time="useDefaultTime">
		</minute-range-picker>
		<hour-range-picker v-if="mode === 'hour'" :value="hourValue" @change="onChange" :is-allow-clear="isAllowClear" :style="{ width: width }" :use-default-time="useDefaultTime">
		</hour-range-picker>
		<day-range-picker v-else-if="mode === 'day'" :value="dayValue" @change="onChange" :is-allow-clear="isAllowClear" :style="{ width: width }" :use-default-time="useDefaultTime">
		</day-range-picker>
		<month-range-picker
			v-else-if="mode === 'month'"
			:value="monthValue"
			@change="onChange"
			:is-allow-clear="isAllowClear"
			:style="{ width: width }"
			:use-default-time="useDefaultTime"
		></month-range-picker>
		<year-range-picker
			v-else-if="mode === 'year'"
			:value="yearValue"
			@change="onChange"
			:is-allow-clear="isAllowClear"
			:style="{ width: width }"
			:use-default-time="useDefaultTime"
		>
		</year-range-picker>
		<quarter-range-picker
			v-else-if="mode === 'quarter'"
			:value="quarterValue"
			@change="onChange"
			:is-allow-clear="isAllowClear"
			:style="{ width: width }"
			:use-default-time="useDefaultTime"
		>
		</quarter-range-picker>
		<week-range-picker
			v-else-if="mode === 'week'"
			:value="weekValue"
			@change="onChange"
			:is-allow-clear="isAllowClear"
			:style="{ width: width }"
			:use-default-time="useDefaultTime"
		>
		</week-range-picker>
	</div>
</template>

<script>
import QuarterRangePicker from '../quarter-range/quarter-range.vue'
import WeekRangePicker from '../week-range/week-range.vue'
import HourRangePicker from '../hour-range/hour-range.vue'
import DayRangePicker from '../day-range/day-range.vue'
import MonthRangePicker from '../month-range/month-range.vue'
import YearRangePicker from '../year-range/year-range.vue'
import MinuteRangePicker from '../minute-range/minute-range.vue'
export default {
	name: 'DateRangePicker',
	components: {
		QuarterRangePicker,
		WeekRangePicker,
		HourRangePicker,
		DayRangePicker,
		MonthRangePicker,
		YearRangePicker,
		MinuteRangePicker
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
			default: '300px'
		},
		label: String,
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
.s-date-range-picker {
	display: flex;
	align-items: center;

	.label {
		flex-shrink: 0;
		font-size: 12px;
		margin-right: 10px;
	}
}
</style>