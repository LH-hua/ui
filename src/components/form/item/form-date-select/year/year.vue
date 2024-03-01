<template>
	<div class="s-year-picker" :style="{ width: width }">
		<a-date-picker
			mode="year"
			format="YYYY年"
			:disabledDate="disaDate"
			placeholder="请选择年份"
			v-model="selectedTime"
			@panelChange="yearChange"
			:allow-clear="isAllowClear"
			inputReadOnly
		>
		</a-date-picker>
	</div>
</template>
<script>
//年选择器
import moment from 'moment'
export default {
	name: 'YearPicker',
	props: {
		value: {
			type: [Object, String]
			// default: () => ({
			// 	startTime: moment().format('YYYY-01-01 HH:00:00')
			// })
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
			selectedTime: moment().format('YYYY-01-01 HH:00:00'),
			panelVisible: false
		}
	},
	// 监听
	watch: {
		value(newVal, oldVal) {
			this.watchDate(newVal, oldVal)
		},
		selectedTime(newVal) {
			// console.log('监听清除', newVal)
			// //监听清除
			if (newVal === null) {
				this.$emit('change', null)
			}
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
			// console.log('watchDate', newVal)
			if (!this.useDefaultTime && !newVal) {
				this.selectedTime = null
				this.emitDate()
				return
			}
			// 重置
			if (this.useDefaultTime && !newVal && newVal !== null) {
				this.selectedTime = moment().format('YYYY-01-01 00:00:00')
				this.emitDate()
				return
			}
			//初始化
			if (!oldVal && newVal && newVal.startTime) {
				this.selectedTime = moment(this.value.startTime)
				this.emitDate()
			}

			//更新的时候传进来是对象
			if (newVal && oldVal && newVal.startTime && newVal.startTime !== oldVal.startTime) {
				this.selectedTime = moment(this.value.startTime)
				this.emitDate()
			}
			//如果传进来是字符串
			if (this.$utils.getType(this.value) == 'string') {
				this.selectedTime = moment(this.value)
				this.emitDate()
			}
			//如果传进来是moment对象
			if (this.value instanceof moment) {
				this.selectedTime = this.value
				this.emitDate()
			}
		},
		//时间改变
		yearChange(value) {
			// console.log('选择年份')
			this.selectedTime = value
			this.panelVisible = false
			this.emitDate()
		},
		// emit 到父级組件
		emitDate() {
			const result = {
				startTime: this.selectedTime ? moment(this.selectedTime).format('YYYY-1-1 00:00:00') : '',
				endTime: this.selectedTime ? moment(this.selectedTime).format('YYYY-12-31 23:59:59') : ''
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

		onPanelOpen() {
			this.panelVisible = true
		}
	}
}
</script>
<style lang="less">
.s-year-picker {
	> .ant-calendar-picker {
		width: 100% !important;
	}
}
</style>
