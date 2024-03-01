<template>
	<div class="s-day-picker" :style="{ width: width }">
		<a-date-picker
			v-model="selectedTime"
			format="YYYY-MM-DD"
			placeholder="请选择日期"
			:disabledDate="disaDate"
			@change="dateChange"
			placement="bottom-end"
			:allowClear="isAllowClear"
			inputReadOnly
		>
		</a-date-picker>
	</div>
</template>
<script>
//日期选择器
import moment from 'moment'
export default {
	name: 'DayPicker',
	props: {
		value: {
			type: [Object, String]
		},
		isAllowClear: {
			type: Boolean,
			default: false
		},
		disabledDate: {
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
			selectedTime: moment().format('YYYY-MM-DD 00:00:00')
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
		watchDate(newVal, oldVal) {
			// console.log('重置', newVal)
			// 重置
			if (!this.useDefaultTime && !newVal) {
				this.selectedTime = null
				this.emitDate()
				return
			}
			// 重置
			if (this.useDefaultTime && !newVal) {
				this.selectedTime = moment().format('YYYY-MM-DD 00:00:00')
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
			// this.selectedTime = date
			this.emitDate()
		},
		// emit 到父级組件
		emitDate() {
			const result = {
				startTime: this.selectedTime ? moment(this.selectedTime).format('YYYY-MM-DD 00:00:00') : '',
				endTime: this.selectedTime ? moment(this.selectedTime).format('YYYY-MM-DD 23:59:59') : ''
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
		}
	}
}
</script>

<style lang="less">
.s-day-picker {
	> .ant-calendar-picker {
		width: 100% !important;
	}
}
</style>


