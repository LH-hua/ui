<template>
	<a-date-picker
		:style="{ minWidth: minWidth ? minWidth : '160px' }"
		mode="year"
		format="YYYY"
		:open="yearOpen"
		:value="moment(yearVal)"
		v-bind="$attrs"
		v-on="$listeners"
		@openChange="onTimeOpen($event, option)"
		@panelChange="(val, mode) => onTimePane(val, option)"
		@change="onTimeChange"
	>
		<!-- <a-icon slot="suffixIcon" type="close-circle" /> -->
	</a-date-picker>
</template>

<script>
import moment from 'moment'
export default {
	name: 'YearPicker',
	// 要用到哪些子组件
	components: {},
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		// 数据配置
		option: {
			type: Object,
			default: () => ({})
		},
		minWidth: {
			type: String,
			default: () => '160px'
		},
		// 额外的配置
		extraOption: {
			type: Object,
			default: () => ({})
		},
		// 组件选中值
		value: {
			type: Object,
			default: () => null
		}
	},
	// 数据
	data() {
		return {
			yearOpen: false,
			yearVal: moment()
		}
	},
	// 计算属性
	computed: {},
	model: {
		prop: 'value',
		event: 'change'
	},
	// 监听
	watch: {
		// 监听选中值，统一更新选中状态
		value(val) {
			this.initVal()
		}
	},
	// 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
	created() {},
	// 生命周期钩子：组件实例渲染完成时调用
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {})
		})
	},
	// 函数集，
	methods: {
		moment,
		/* ----------------------------------------------------------------------
		| 初始化数据
		|-----------------------------------------------------------------------
		*/

		// 初始化值
		initVal() {
			this.yearVal = this.value
		},

		/* ----------------------------------------------------------------------
	| 按钮事件
	|-----------------------------------------------------------------------
	*/

		// 弹出日历和关闭日历的回调
		onTimeOpen(status, item) {
			this.yearOpen = status
		},
		// 得到年份选择器的值
		onTimePane(value, item) {
			this.yearVal = value
			this.yearOpen = false
			this.$emit('change', moment(value), moment(value).format('YYYY')) // 触发 input 事件，并传入新值
		},
		// 当我们设置mode=“year”后，这个allowClear便不起作用了。怎么办呢？
		// 因为onChange事件不会在选择值的时候触发，但是点击清除icon 却会触发。因此通过change事件便可以达到清除value的效果。
		onTimeChange(value) {
			this.yearVal = null
			this.$emit('change', null, null)
		}
	}
}
</script>
