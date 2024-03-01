<template>
	<div class="range-picker">
		<!-- 周 -->
		<div v-if="mode == 'week'" class="range-picker-wrap">
			<week-picker ref="startWeekSelector" name="startWeek" v-model="values.startTime" @change="weekStartChange"
				placeholder="开始周" :date-width="dateWidth" isRange :range-limit="rangeLimit" @clear="onWeekStartClear" />
			<span class="_symbol">~</span>
			<week-picker ref="endWeekSelector" name="endWeek" v-model="values.endTime" @change="weekEndChange"
				placeholder="结束周" :date-width="dateWidth" isRange :range-limit="rangeLimit" @clear="onWeekEndClear" />
		</div>
		<!-- 季 -->
		<div v-else-if="mode == 'quarter'" class="range-picker-wrap">
			<quarter-picker name="quarterRangeStart" ref="startQuarterSelector" v-model="values.startTime"
				@change="quarterStartChange" placeholder="开始季度" :date-width="dateWidth" isRange :range-limit="rangeLimit"
				@clear="onQuarterStartClear" />
			<span class="_symbol">~</span>
			<quarter-picker name="quarterRangeEnd" ref="endQuarterSelector" v-model="values.endTime"
				@change="quarterEndChange" placeholder="结束季度" :date-width="dateWidth" isRange :range-limit="rangeLimit"
				@clear="onQuarterEndClear" />
		</div>
	</div>
</template>
<script>
import WeekPicker from '../date-select/week-picker.vue'
import QuarterPicker from '../date-select/quarter-picker.vue'
import moment from 'moment'
const _date = moment(new Date())
export default {
	name: 'OtherRangePicker',
	components: { WeekPicker, QuarterPicker },
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Object,
			default: () => ({
				startTime: _date
			})
		},
		dateWidth: {
			type: String,
			default: () => '112px'
		},
		mode: {
			type: String,
			default: () => 'week'
		},
		rangeLimit: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			values: {},
			rangeDates: {}
		}
	},
	watch: {
		value() {
			// console.log("范围", this.value)
			this.init()
			this.emitValue()
		}
	},
	created() {
		this.init()
	},
	methods: {
		init() {
			const start = this.value?.startTime || this.value?._i?.startTime || moment()
			const end = this.value?.endTime || this.value?._i?.endTime || moment()
			this.values = { startTime: start, endTime: end }
			this.rangeDates.startTime = start
			this.rangeDates.endTime = end
		},
		/*----------------------------------------------------------------------
		| 周
		|-----------------------------------------------------------------------
		*/
		weekStartChange(date) {
			const start = moment(date.startTime).format('YYYY-MM-DD 00:00:00')
			let disableIndex = []
			for (let i = 1; i <= date.weekIndex; i++) {
				disableIndex.push(i)
			}
			this.$refs.endWeekSelector.disableWeek(disableIndex, new Date(date.startTime).getFullYear())
			this.$refs.endWeekSelector.clear()
			this.rangeDates.startTime = start
			this.emitValue()
		},
		weekEndChange(date) {
			const end = moment(date.endTime).format('YYYY-MM-DD 23:59:59')
			if (!this.rangeDates.startTime) {
				this.$message.error('请先选择开始周！')
				this.$refs.endWeekSelector.clear()
				return;
			}
			this.rangeDates.endTime = end
			this.emitValue()
		},
		onWeekStartClear() {
			this.rangeDates.startTime = ''
		},
		onWeekEndClear() {
			this.rangeDates.endTime = ''
		},
		/*----------------------------------------------------------------------
		| 季度
		|-----------------------------------------------------------------------
		*/
		quarterStartChange(date) {
			const start = moment(date.startTime).format('YYYY-MM-DD 00:00:00')
			let disableQuarterIndex = []
			for (let i = 1; i <= date.quarterIndex; i++) {
				disableQuarterIndex.push(i)
			}
			this.$refs.endQuarterSelector.disableQuarter(disableQuarterIndex, new Date(date.startTime).getFullYear())
			this.$refs.endQuarterSelector.clear()
			this.rangeDates.startTime = start
			this.emitValue()
		},
		quarterEndChange(date) {
			const end = moment(date.endTime).format('YYYY-MM-DD 23:59:59')
			if (!this.rangeDates.startTime) {
				this.$message.error('请先选择开始季度！')
				this.$refs.endQuarterSelector.clear()
			}
			this.rangeDates.endTime = end
			this.emitValue()
		},
		onQuarterStartClear() {
			this.rangeDates.startTime = ''
		},
		onQuarterEndClear() {
			this.rangeDates.endTime = ''
		},
		/*----------------------------------------------------------------------
		| v-model emit
		|-----------------------------------------------------------------------
		*/
		emitValue() {
			this.$emit('change', this.rangeDates)
			// console.log('已选范围', this.rangeDates)
		}
	}
}
</script>
<style lang="less">
.range-picker-wrap {
	border: 1px solid #b5b5b5;
	width: 250px;
	border-radius: 4px;
	display: flex;
	height: 30px;
	// display: flex;
	// justify-content: center;
	cursor: text;
	transition: .2s all;

	&:hover {
		border-color: #3390f1;
	}

	._weekPickerBox input,
	._quarterPickerBox input {
		border: none !important;
		text-align: center;
		height: 29px;
		padding: 0 11px;
		cursor: text;
	}

	._weekPickerBox,
	._quarterPickerBox {
		display: flex;
		align-items: center;
	}

	._symbol {
		padding: 0 2px;
		line-height: 29px;
	}
}
</style>