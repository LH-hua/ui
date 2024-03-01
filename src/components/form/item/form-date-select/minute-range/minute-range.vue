<template>
	<div class="s-minute-range" :style="{ width: width }">
		<a-range-picker
			:placeholder="['开始时间', '结束时间']"
			:format="format"
			:show-time="showTime"
			v-model="selectedTime"
			@change="onDateChange"
			@ok="onDateConfirm"
			:disabledDate="disaDate"
			:disabled-time="disaTime"
			:allowClear="isAllowClear"
			inputReadOnly
		>
			<a-icon slot="suffixIcon" type="calendar" />
		</a-range-picker>
	</div>
</template>
<script>
//分钟范围选择器
import moment from 'moment'
export default {
	name: 'MinuteRangePicker',
	props: {
		value: {
			type: [Object, String],
			default: () => ({
				startTime: moment().startOf('hour').format('YYYY-MM-DD HH:mm:00'),
				endTime: moment().add(1, 'hours').endOf('hour').add(1, 'minutes').format('YYYY-MM-DD HH:mm:59')
			})
		},
		disabledDate: {
			type: Function
		},
		disabledTime: {
			type: Function
		},
		isAllowClear: {
			type: Boolean,
			default: false
		},
		format: {
			type: String,
			default: 'YYYY-MM-DD HH时mm分'
		},
		rangeLimit: {
			type: Boolean,
			default: false
		},
		showTime: {
			type: Object,
			default: () => ({ format: 'HH:mm' })
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
			selectedTime: []
		}
	},
	watch: {
		value(newVal, oldVal) {
			this.initDate(newVal, oldVal)
		}
	},
	mounted() {
		//挂载的时候初始化一次值
		this.$nextTick(() => {
			if (this.useDefaultTime) {
				if (this.value && this.value.startTime && this.value.endTime) {
					this.selectedTime = [moment(this.value.startTime), moment(this.value.endTime)]
					this.emitDate()
				}
			}else{
        this.selectedTime = null
      }
		})
	},
	methods: {
		moment,

		initDate(newVal, oldVal) {
			//初始化的时候传进来是对象
			if (!oldVal && newVal.startTime && newVal.endTime) {
				this.selectedTime = [moment(this.value.startTime), moment(this.value.endTime)]
				this.emitDate()
			}

			//更新的时候传进来是对象(判断两者是否相等，防止死循环更新)
			if (newVal && oldVal && newVal.startTime !== oldVal.startTime && newVal.endTime !== oldVal.endTime) {
				if (!newVal.startTime && !newVal.endTime) {
					//点击清除的时候
					this.selectedTime = []
				} else {
					this.selectedTime = [moment(this.value.startTime), moment(this.value.endTime)]
					this.emitDate()
				}
			}

			//如果传入的moment对象
			if (this.value instanceof moment) {
				//取值
				let startTime = this.value._i?.startTime || ''
				let endTime = this.value._i?.endTime || ''
				this.selectedTime = [moment(startTime), moment(endTime)]
				this.emitDate()
			}
			//重置的时候（表单重置方法会传入日期字符串）
			if (this.$utils.getType(this.value) === 'string') {
				this.selectedTime = [moment(this.value), moment(this.value)]
				this.emitDate()
			}

			if (!this.value) {
				this.selectedTime = [moment(), moment().add(1, 'hours').add(1, 'minutes')]
				this.emitDate()
			}
		},

		emitDate() {
			let result = {
				startTime: this.selectedTime[0] ? this.selectedTime[0].format('YYYY-MM-DD HH:mm:00') : '',
				endTime: this.selectedTime[1] ? this.selectedTime[1].format('YYYY-MM-DD HH:mm:59') : ''
			}
			// console.log('提交值', result)
			this.$emit('change', result)
		},
		onDateChange(val) {
			this.selectedTime = val
		},
		onDateConfirm(val) {
			this.selectedTime = val
			this.emitDate()
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
		}
	}
}
</script>
<style lang="less">
.s-minute-range {
	> .ant-calendar-picker {
		width: 100% !important;
	}
}
</style>