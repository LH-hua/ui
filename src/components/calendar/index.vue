<template>
	<div>
		<a-row>
			<a-col :span="6" v-for="(item, index) in monthData" :key="item.id">
				<div class="_month-box">
					<div class="_label">{{ monthLabel[index] }}</div>
					<div class="_week week-label" >
						<span>日</span>
						<span>一</span>
						<span>二</span>
						<span>三</span>
						<span>四</span>
						<span>五</span>
						<span>六</span>
					</div>

					<template>
						<div class="_week">
							<span v-for="list in item" :key="list.id" :style="{ backgroundColor: list.backgroundColor,color:list.color }" @click="onClick(list)">{{ list.days }}</span>
						</div>
					</template>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import { merge } from 'lodash'
import moment from 'moment'
export default {
	// 要用到哪些子组件
	components: {},
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		// 表单项
		range: {
			type: Array,
			default() {
				return [moment('2021-01').format('YYYY-MM-DD'), moment('2021-12').format('YYYY-MM-DD')]
			}
		},
		dataSource: {
			type: [Array, Object],
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			monthNumer: null, // 渲染的月份数量
			monthData: [],
			monthLabel: []
		}
	},
	// 计算属性
	computed: {
		// 监听多个对象 进行图表重新渲染
		infoChange() {
			const { range, dataSource } = this
			return { range, dataSource }
		}
	},
	// 监听
	watch: {
		// 监听图表数据
		infoChange: {
			deep: true,
			immediate: true,
			handler(nv) {
				if (nv) {
					this.init()
				}
			}
		}
	},
	// 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
	created() {
		this.init()
	},
	// 函数集，
	methods: {
		moment,
		/* ----------------------------------------------------------------------
		| 初始化数据
		|-----------------------------------------------------------------------
		*/
		init() {
			this.renderMonth()
		},

		/* ----------------------------------------------------------------------
		| 按钮事件
		|-----------------------------------------------------------------------
		*/
		onClick(val) {
			this.$emit('on-click', val)
		},

		/* ----------------------------------------------------------------------
		| 数据处理
		|-----------------------------------------------------------------------
		*/
		renderMonth() {
			// 判断开始时间 和结束时间 差距几个月  最大不超过 12个月、用于循环
			const start = this.range[0]
			const end = this.range[1]
			const monthArr = []
			const monthLabel = []
			const number = moment(end).diff(moment(start), 'month')
			this.monthNumer = number
			// 第二步 取月份的第一天是 星期几
			for (let i = 0; i <= number; i++) {
				const month = moment(start).add('month', i).format('YYYY-MM-01')
				const monthTitle = moment(start).add('month', i).format('YYYY年MM月')
				const week = moment(month).day()
				monthArr.push(this.renderWeek(month, week, i))
				monthLabel.push(monthTitle)
			}
			this.monthData = monthArr
			this.monthLabel = monthLabel
		},

		renderWeek(month, week, monthIndex) {
			// 循环月份里的天数 获取这个月有多少天
			const monthNumber = moment(month).daysInMonth()
			const days = []
			for (let i = 0; i < monthNumber; i++) {
         const date = i + 1 >= 10 ? i + 1 : '0' + (i + 1)
				const obj = {
					date: `${moment(month).format('YYYY-MM')}-${date}`,
					value: 0,
					days: i + 1
				}

				let dataSource = {}
				// 根据对象里的日期填充值
				if (!this.$utils.isNull(this.dataSource)) {
					const data = this.dataSource
					let value = data[`${moment(month).format('YYYY-MM')}-${date}`]

					if (value) {
						dataSource = value
					}
				}

				days.push(merge(obj, dataSource))
			}

			return this.renderPartition(days, month, week)
		},

		// 添加前后的分割 数据
		renderPartition(data, month, week) {
			// 添加月头的 占位格数据
			for (let i = 0; i < week; i++) {
				data.unshift({
					date: null,
					value: null,
					color: '#f6f8fb',
					days: null
				})
			}
			// 获取月尾
			const monthEndDay = moment(month).add('month', 1).add('days', -1)
			const monthEndNumber = moment(monthEndDay).day()
			const place = {
				0: 6,
				1: 5,
				2: 4,
				3: 3,
				4: 2,
				5: 1
			}

			if (monthEndNumber !== 6) {
				for (let i = 0; i < place[monthEndNumber]; i++) {
					data.push({
						date: null,
						value: null,
						color: '#f6f8fb',
						days: null
					})
				}
			}

			return data
		}
	}
}
</script>

<style lang="less" scoped>
._more {
	table {
		td {
			line-height: 26px;
			min-width: 60px;
			text-align: center;
		}
	}
}

._month-box {
	padding: 5px;
	margin: 5px;
	min-height: 255px;
	._label {
		padding: 5px 10px;
		background-color: #f6f8fb;
				font-weight: bold;
	}
	._week {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		justify-content: space-between;
		span {
			width: 14%;
			text-align: center;
			background-color: #f6f6f6;
			border: 1px solid #fff;
			font-size: 12px;
			padding: 5px;
			cursor: pointer;
		}
	}
	.week-label{
		span{
			background-color: #f6f8fb;
			font-weight: bold;
		}
	}
}
</style>
