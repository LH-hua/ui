<template>
	<div class="dateSelectBox">
		<span :style="`width:${lableWidth}px;color:#000;`"> {{ lable }}</span>

		<!-- 小时  -->
		<template v-if="mode == 'hour'">
			<a-date-picker :value="selectedTime" format="YYYY-MM-DD HH时" placeholder="请选择日期" :disabled-date="disaDate"
				:disabled-time="disaTime" @change="dateChange" :clearable="false" :style="{ width: `${infoData.dateWidth}px` }"
				placement="bottom-end" :allowClear="isAllowClear" :inputReadOnly="infoData.inputReadOnly"
				:show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss'), format: 'HH' }">
			</a-date-picker>
		</template>
		<!-- 日 -->
		<template v-else-if="mode == 'day'">
			<a-date-picker :value="selectedTime" format="YYYY-MM-DD" placeholder="请选择日期" :disabledDate="disaDate"
				@change="dateChange" :clearable="false" :style="{ width: `${infoData.dateWidth}px` }" placement="bottom-end"
				:allowClear="isAllowClear" :inputReadOnly="infoData.inputReadOnly">
			</a-date-picker>
		</template>

		<!-- 周 -->
		<template v-else-if="mode == 'week'">
			<week v-model="selectedTime" @change="weekChange" placeholder="请选择时间" :date-width="dateWidth || '240px'" />
		</template>

		<!-- 月 -->
		<template v-else-if="mode == 'month'">
			<a-month-picker :style="{ width: `${infoData.dateWidth}px` }" :disabledDate="disaDate" :locale="locale"
				placeholder="请选择日期" :value="selectedTime" @change="monthChange" :allowClear="isAllowClear" />
		</template>

		<!-- 年 -->
		<template v-else-if="mode == 'year'">
			<year-picker v-if="yearSelected" v-model="selectedTime" :option="yearSelected"
				:style="{ width: `${infoData.dateWidth}px` }" placeholder="请选择年份" @change="yearChange" />
		</template>

		<!-- 季度  -->
		<template v-else-if="mode == 'quarter'">
			<quarter placeholder="请选择季度" v-model="selectedTime" @change="quarterChange" :date-width="dateWidth || '240px'" />
		</template>

		<!-- 农历日历 -->
		<template v-else-if="mode == 'lunar'">
			<a-date-picker dropdownClassName="lunar-picker" :value="selectedTime" format="yyyy-MM-DD" placeholder="请选择日期"
				:disabledDate="disaDate" @change="dateChange" :readonly="false" :clearable="false"
				:style="{ width: `${infoData.dateWidth}px` }" placement="bottom-end" :allowClear="isAllowClear">
				<template slot="dateRender" slot-scope="current, today">
					<div class="ant-calendar-date" style="width: 50px; height: 50px; font-size: 12px">
						<span>{{ current.date() }}</span>
						<br />
						<span>{{ getLunarDate(current) }}</span>
					</div>
				</template>
			</a-date-picker>
		</template>
	</div>
</template>
<script>
import moment from 'moment'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
import { merge } from 'lodash'

import yearPicker from './year-picker.vue'
import week from './week-picker.vue'
import quarter from './quarter-picker.vue'

// hour day week month quarter year
export default {
	name: 'dateSelect',
	// 要用到哪些子组件
	components: { week, quarter, yearPicker },
	model: {
		prop: 'value',
		event: 'change'
	},
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		// 时间类型
		mode: {
			type: String,
			default: 'day' // day | week | month | year | quarter
		},
		value: {
			type: Object,
			default: () => null
		},
		// 标题
		lable: {
			type: String,
			default: () => {
				return '日期'
			}
		},
		lableWidth: {
			type: [String, Number],
			default: () => {
				return 120
			}
		},
		dateWidth: {
			type: String,
			default: ''
		},
		// 内置属性
		info: {
			type: Object,
			default: () => {
				return {}
			}
		},
		disDate: {
			type: Object,
			default: () => ({ disabled: false, month: 12, customFun: () => { } })
		},
		isAllowClear: {
			type: Boolean,
			default: () => false
		},
		disabledDate: {
			type: Function
		},
		disabledTime: {
			type: Function
		},
		lunarData: {
			type: Object,
			default: () => null
		}
	},
	// 数据
	data() {
		return {
			locale,
			infoData: {
				dateWidth: 100,
				placeholder: '请选择开始时间',
				inputReadOnly: true // input框是否只读
			},
			selectedTime: null,
			yearSelected: null
		}
	},
	// 监听
	watch: {
		mode() {
			this.Initialize()
			this.emitDate()
		},
		value() {
			// console.log("重置", this.value)
			if (this.value instanceof moment) {
				this.Initialize()
			}
			if (!this.value) {
				this.selectedTime = moment()
				this.emitDate()
			}
		}
	},
	// 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
	created() { },
	// 生命周期钩子：组件实例渲染完成时调用
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.init()
			})
		})
	},
	methods: {
		moment,

		dadt() {
			return {
				// // 小时
				disabledHours: () => [1, 2],
				// // 分钟
				disabledMinutes: () => [1, 2, 3, 4, 5, 6, 7, 8, 9],
				// // 秒
				disabledSeconds: () => [55, 56]
			};
		},

		/*----------------------------------------------------------------------
				| 初始化
				|-----------------------------------------------------------------------
				*/

		init() {
			this.Initialize()
			this.info = this.assembleInfo()
		},

		Initialize() {
			// 存在问题--this.value.startTime不能直接拿到
			const date = this.value?._i?.startTime || moment().format('YYYY-MM-DD')
			switch (this.mode) {
				case 'day':
					this.infoData.dateWidth = 160
					this.selectedTime = moment(date, 'yyyy-MM-DD')
					break
				case 'week':
					this.selectedTime = { startTime: moment(date, 'yyyy-MM-DD') }
					break
				case 'month':
					this.infoData.dateWidth = 160
					this.selectedTime = moment(date, 'yyyy-MM')
					break
				case 'quarter':
					this.infoData.dateWidth = 240
					this.selectedTime = { startTime: moment(date, 'yyyy-MM-DD') }
					break
				case 'year':
					this.infoData.dateWidth = 160
					this.selectedTime = moment(date)
					this.yearSelected = { value: date, disabled: this.disDate.disabled }
					break
				case 'lunar':
					this.infoData.dateWidth = 160
					this.selectedTime = moment(date, 'yyyy-MM-DD')
					break
				default:
					this.infoData.dateWidth = 160
					this.selectedTime = moment(date, 'yyyy-MM-DD HH')
					break
			}
			this.emitDate()
		},

		/*----------------------------------------------------------------------
				| 初始化
				|-----------------------------------------------------------------------
				*/

		monthChange(date) {
			this.selectedTime = date
			this.emitDate()
		},

		dateChange(date, dateString) {
			if (date instanceof moment) {
				this.selectedTime = date
			} else {
				this.selectedTime = {
					startTime: date.startTime,
					endTime: date.endTime,
				}
			}
			this.emitDate()
		},
		// emit 到父級組件的方法----对moment对象进行格式化
		emitDate() {
			this.$emit('change', this.getSearchParams())
		},
		weekChange(date) {
			this.dateChange(date)
		},
		quarterChange(date) {
			this.dateChange(date)
		},
		yearChange(date) {
			// console.log('年份改变', date)
			this.yearSelected = { value: date }
			this.selectedTime = date
			this.emitDate()
		},
		VerDate() {
			let startTime = ''
			let endTime = ''

			switch (this.mode) {
				case 'hour':
					startTime = moment(this.selectedTime).format('YYYY-MM-DD HH:00:00')
					endTime = moment(this.selectedTime).format('YYYY-MM-DD HH:59:59')
					break
				case 'day':
					startTime = moment(this.selectedTime).format('YYYY-MM-DD 00:00:00')
					endTime = moment(this.selectedTime).format('YYYY-MM-DD 23:59:59')
					break
				case 'week':
					startTime = moment(this.selectedTime.startTime).format('YYYY-MM-DD 00:00:00')
					endTime = moment(this.selectedTime.endTime).format('YYYY-MM-DD 23:59:59')
					break
				case 'month':
					startTime = moment(this.selectedTime).format('YYYY-MM-1 00:00:00')
					endTime = moment(this.selectedTime).endOf('month').format('YYYY-MM-DD 23:59:59')
					break
				case 'quarter':
					startTime = moment(this.selectedTime.startTime).format('YYYY-MM-DD 00:00:00')
					endTime = moment(this.selectedTime.endTime).format('YYYY-MM-DD 23:59:59')
					break
				case 'year':
					startTime = moment(this.selectedTime).format('YYYY-1-1 00:00:00')
					endTime = moment(this.selectedTime).format('YYYY-12-31 23:59:59')
					break
				case 'lunar':
					startTime = moment(this.selectedTime).format('YYYY-MM-DD 00:00:00')
					endTime = moment(this.selectedTime).format('YYYY-MM-DD 23:59:59')
					break
			}
			const result = {
				startTime: startTime,
				endTime: endTime
			}
			return result
		},
		getSearchParams() {
			return this.VerDate()
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

		// //限制日期
		// disabledDate(current, type) {
		// 	console.log(' this.disDate', this.disDate)
		// 	const { disabled, month, customFun } = this.disDate

		// 	if (disabled && customFun) return customFun(current) // 为满足更多业务需求提供外层自定义函数

		// 	const num = month ? month : 12
		// 	if (disabled) {
		// 		// 默认限制只能选择今年的日期
		// 		let day = moment(new Date()).format('YYYY-01-01')
		// 		if (type == 'month') {
		// 			// 月份处理
		// 			return current < moment().subtract(1, 'months') || current > moment(day).add(Number(num - 1), 'months')
		// 		} else {
		// 			// 日期处理
		// 			return current < moment().subtract(1, 'day') || current > moment(day).add(Number(num), 'months')
		// 		}
		// 	} else {
		// 		return false
		// 	}
		// },
		// 获取农历日期、节气
		getLunarDate(current) {
			const year = moment(current).format('YYYY')
			const date = moment(current).format('YYYY-MM-DD')
			// let data = this.lunarData || require('../../static/json/LunarCalendar.json')
			let data = this.lunarData || []
			let obj = data[year] ? data[year].find(item => item.date == date) : null
			return obj ? obj.text : ''
		},

		/*----------------------------------------------------------------------
				| 数据处理
				|-----------------------------------------------------------------------
				*/

		// 合并内置对象
		assembleInfo() {
			//lodash的一个公共函数merge,它表示递归合并来源对象自身和继承的可枚举属性到目标对象。后续的来源对象属性会覆盖之前同名的属性
			return merge(this.info, this.infoData)
		}
	}
}
</script>

