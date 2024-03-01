<template>
	<div class="s-year-range-picker" :style="{ width: width }">
		<a-range-picker
			:style="{ width: width }"
			:placeholder="['开始时间', '结束时间']"
			:format="format"
			v-model="selectedTime"
			@panelChange="onDateChange"
			:allowClear="isAllowClear"
			:mode="['year', 'year']"
			:open="panelVisible"
			@openChange="onPanelOpen"
			inputReadOnly
		>
			<a-icon slot="suffixIcon" type="calendar" />
			<div slot="renderExtraFooter">
				<a-button size="small" class="date-confirm-btn" @click="onHidePanel" style="margin-right: 10px">取消</a-button>
				<a-button type="primary" size="small" class="date-confirm-btn" @click="onConfirm">确认</a-button>
			</div>
		</a-range-picker>
	</div>
</template>

<script>
//年范围选择器
import moment from 'moment'
export default {
	name: 'YearRangePicker',
	props: {
		value: {
			type: [Object, String]
			// default: () => ({
			// 	startTime: moment().startOf('year').format('YYYY-MM-DD 00:00:00'),
			// 	endTime: moment().add(1, 'years').endOf('year').format('YYYY-MM-DD 23:59:59')
			// })
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
			default: 'YYYY年'
		},
		rangeLimit: {
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
			selectedTime: [moment(), moment().add(1, 'years')],
			panelVisible: false
		}
	},
	watch: {
		value(newVal, oldVal) {
			this.initDate(newVal, oldVal)
		},
		selectedTime(newVal) {
			if (Array.isArray(newVal) && newVal.length == 0) this.emitDate()
		}
	},
	mounted() {
		//挂载的时候初始化一次值
		this.$nextTick(() => {
			if (this.useDefaultTime) {
				if (this.value && this.value.startTime && this.value.endTime) {
					this.selectedTime = [moment(this.value.startTime), moment(this.value.endTime)]
				}
				this.emitDate()
			} else {
				this.selectedTime = null
			}
		})
	},
	methods: {
		moment,
		initDate(newVal, oldVal) {
			// 重置
			if (!this.useDefaultTime && !newVal) {
				this.selectedTime = null
				this.emitDate()
				return
			}
			// 重置
			if (this.useDefaultTime && !newVal) {
				this.selectedTime = [moment(), moment().add(1, 'years')]
				this.emitDate()
				return
			}
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
				let startTime = this.value._i?.startTime || ''
				let endTime = this.value._i?.endTime || ''
				this.selectedTime = [moment(startTime), moment(endTime)]
				this.emitDate()
			}
			//表单重置方法会传入日期字符串
			if (this.$utils.getType(this.value) === 'string') {
				this.selectedTime = [moment(this.value), moment(this.value)]
				this.emitDate()
			}

			// if (!this.value) {
			//   this.selectedTime = []
			//   this.emitDate()
			// }
		},
		onHidePanel() {
			this.panelVisible = false
		},
		onPanelOpen() {
			this.panelVisible = true
		},
		onConfirm() {
			this.panelVisible = false
			this.emitDate()
		},
		emitDate() {
			let result = {
				startTime: this.selectedTime[0] ? this.selectedTime[0].startOf('year').format('YYYY-MM-DD 00:00:00') : '',
				endTime: this.selectedTime[1] ? this.selectedTime[1].endOf('year').format('YYYY-MM-DD 23:59:59') : ''
			}
			// console.log('提交值', result)
			this.$emit('change', result)
		},
		onDateChange(value) {
			// console.log('change', value)
			this.selectedTime = value
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
.s-year-range-picker {
	> .ant-calendar-picker {
		width: 100% !important;
	}
}
</style>
