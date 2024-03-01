/* ----------------------------------------------------------------------
|  form 公共方法
|-----------------------------------------------------------------------
*/
import moment from 'moment'

export const formMixins = {
	components: {},
	data() {
		return {
			// 默认 表单配置信息
			form: this.$form.createForm(this, { name: 'search' }),
			format: {
				hour: 'YYYY-MM-DD HH:mm:ss',
				day: 'YYYY-MM-DD',
				week: 'YYYY-MM-DD',
				month: 'YYYY-MM',
				year: 'YYYY',
				range: 'YYYY-MM-DD HH:mm:ss'
			}
		}
	},
	// 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
	created() { },
	// 生命周期钩子：组件实例渲染完成时调用
	mounted() { },
	// 函数集，
	methods: {
		moment,

		/* ----------------------------------------------------------------------
		| 数据处理
		|-----------------------------------------------------------------------
		*/

		// moment值 时间转换  将表单里的时间格式转为
		convertMomentType(values, formItems, type = '') {
			const valueObj = {}
			for (const key in values) {
				const item = values[key]
				if (item instanceof moment) {
					if (type === 'model') {
						const data = []
						formItems.map(e => {
							const list = e.item
							list.map(k => {
								data.push(k)
							})
						})
						valueObj[key] = this.findTimeType(item, key, data)
					} else {
						valueObj[key] = this.findTimeType(item, key, formItems)
					}
				} else {
					valueObj[key] = item
				}
			}

			return valueObj
		},

		// 字符转时间类型
		stringToMoment(values, formItems, type = '') {
			// debugger;
			const _this = this
			if (type === 'model') {
				formItems.map(e => {
					const item = e.item
					item.map(key => {
						if (_this.format[key.type]) {
							if (values[key.id]) {
								values[key.id] = moment(values[key.id])
							}
						}
					})
				})
			} else {
				formItems.map(e => {
					if (_this.format[e.type]) {
						if (values[e.id]) {
							values[e.id] = moment(values[e.id])
						}
					}
				})
			}

			return values
		},

		// 查找时间类型
		findTimeType(val, key, formItems) {
			for (let i = 0; i < formItems.length; i++) {
				const item = formItems[i]
				if (item.id === key) {
					const valueFormat = item.valueFormat || this.format[item.type]
					return moment(val).format(valueFormat)
				}
			}
		},

		// 移除时间类型
		removeTimeType(values, formItems) {
			for (const key in values) {
				const item = values[key]
			
				if (item instanceof moment) {
					values[key] = null
				} else {
					values[key] = item
				}
			}
			return values
		},

		/* ----------------------------------------------------------------------
		| 表单校验
		|-----------------------------------------------------------------------
		*/

		// 设置表单验证规则
		getRules(rules, item, baseRule = [{ required: true, message: item.label + '不能为空' }]) {
			// 动态校验规则
			if (this.$utils.isNull(rules)) return

			// 1.判断  是否普通校验
			if (rules === 'required') {
				return baseRule
			}

			if (typeof rules === 'string') {
				// 2. 判断是否为字符串  字符串则是 内置校验规则

				// 判断  名称是否存在 内置正则规则
				if (!this.$utils.isNull(this.$validator.getRule(rules))) {
					// 通过内置正则规则 去校验表单信息
					baseRule.push(this.$validator.getRule(rules))
					return baseRule
				}
			} else if (!Array.isArray(rules)) {
				// 3.判断是否是 对象  对象则是 自定义正则校验

				// { pattern: '正则规则', message: '正则报错信息' }
				baseRule.push({ pattern: rules.pattern, message: rules.message })
				return baseRule
			} else {
				// 判断是数组 则自定义校验
				return rules
			}
		}
	}
}
