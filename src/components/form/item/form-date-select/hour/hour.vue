<template>
	<div class="s-hour-picker" :style="{ width: width }">
		<a-date-picker
			v-model="selectedTime"
			format="YYYY-MM-DD HH时"
			placeholder="请选择日期"
			:disabled-date="disaDate"
			:disabled-time="disaTime"
			@change="dateChange"
			placement="bottom-end"
			:allow-clear="isAllowClear"
			:show-time="showTime"
			@ok="onConfirm"
			inputReadOnly
		>
		</a-date-picker>
	</div>
</template>
<script>
//日期小时选择器
import moment from 'moment'
export default {
	name: 'HourPicker',
	props: {
		value: {
			type: [Object, String]
		},
		showTime: {
			type: Object,
			default: () => ({ defaultValue: moment('00:00:00', 'HH:mm:ss'), format: 'HH' })
		},
		isAllowClear: {
			type: Boolean,
			default: false
		},
		disabledDate: {
			type: Function
		},
		disabledTime: {
			type: Function
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
			selectedTime: moment().format('YYYY-MM-DD HH:00:00')
		}
	},
	// 监听
	watch: {
		value(newVal, oldVal) {
			this.watchDate(newVal, oldVal)
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (this.useDefaultTime) {
				//挂载初始化
				if (this.value && this.value.startTime) {
					this.selectedTime = moment(this.value.startTime)
				}
				this.emitDate()
			} else {
				this.selectedTime = null
			}
		})
	},
	methods: {
		moment,
		//监听日期变化
		watchDate(newVal, oldVal) {
			// 重置
			if (!this.useDefaultTime && !newVal) {
				this.selectedTime = null
				this.emitDate()
				return
			}
			// 重置
			if (this.useDefaultTime && !newVal) {
				this.selectedTime = moment().format('YYYY-MM-DD HH:00:00')
				this.emitDate()
				return
			}
			//初始化
			if (!oldVal && newVal && newVal.startTime) {
				this.selectedTime = moment(this.value.startTime)
				this.emitDate()
				return
			}

			//更新的时候传进来是对象
			if (newVal && oldVal && newVal.startTime && newVal.startTime !== oldVal.startTime) {
				this.selectedTime = moment(this.value.startTime)
				this.emitDate()
				return
			}
			//如果传进来是字符串
			if (this.$utils.getType(this.value) == 'string') {
				this.selectedTime = moment(this.value)
				this.emitDate()
				return
			}
			//如果传进来是moment对象
			if (this.value instanceof moment) {
				this.selectedTime = this.value
				this.emitDate()
				return
			}
		},
		//日期改变
		dateChange(date, dateString) {
			// console.log('已选', date)
			this.emitDate()
		},
		onConfirm() {
			this.emitDate()
		},
		// emit 到父级組件
		emitDate() {
			const result = {
				startTime: this.selectedTime ? moment(this.selectedTime).format('YYYY-MM-DD HH:00:00') : '',
				endTime: this.selectedTime ? moment(this.selectedTime).format('YYYY-MM-DD HH:59:59') : ''
			}
			// console.log('提交', result)
			this.$emit('change', result)
		},
		//禁用日期
		disaDate(current) {
			if (this.disabledDate) {
				return this.disabledDate(current)
			}
			return false
		},
		//禁用时间
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
.s-hour-picker {
	> .ant-calendar-picker {
		width: 100% !important;
	}
}
</style>