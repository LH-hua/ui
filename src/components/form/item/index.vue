<script>
/**
 * 该插件根据配置生成 ant 表单组件
 * formOptions示例：
 *  {
 *    id: '菜单ID',
 *    type: '表单类型',
 *    label: '表单名称',
 *    value: '数据',
 *    data:{  '下拉/多选 数据源'
 *        label： '名称'
 *        value:  '值'
 *    }
 *  }
 *
 * item.type =  template: 自定义配置
 **/

// 封装参考 https://github.com/OPU-FE-TEAM/opu-components-vue/blob/master/packages/dataForm/src/dataForm.js

// 组件
// 图标选择器
import IconSelector from './form-icon/index.vue'
// 站点选择器
import stationSelect from './form-station/index.vue'
// 行业选择器
import industrySelect from './form-industry/index.vue'

// ----- 日期选择器
// 周选择器
import weekPicker from './form-date-select/date-select/week-picker.vue'
// 季度选择器
import quarterPicker from './form-date-select/date-select/quarter-picker.vue'
// 年份选择器
import yearPicker from './form-date-select/date-select/year-picker.vue'
// 自定义插槽
import formSlots from './form-slots/scopedSlots.vue'

// 组件的方法
import moment from 'moment'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import { merge, capitalize } from 'lodash'

export default {
	name: 'Form-Item',
	// 要用到哪些子组件
	components: {
		IconSelector,
		industrySelect,
		stationSelect,
		formSlots,
		weekPicker,
		quarterPicker,
		yearPicker
	},
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		// 表单项
		formOptions: {
			type: Object,
			default: () => {
				return {}
			}
		},
		// 接受父对象传入的插槽
		formSlot: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	// 数据
	data() {
		return {
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
	// 计算属性
	computed: {
		// 监听多个对象 进行图表重新渲染
		infoChange() {
			const { formOptions } = this
			return {
				formOptions
			}
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
	// 生命周期钩子：组件实例渲染完成时调用
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.init()
			})
		})
	},
	// 函数集，
	methods: {
		moment,
		/* ----------------------------------------------------------------------
    | 初始化数据
    |-----------------------------------------------------------------------
    */

		init() {
			this.initStyle()
			// this.infoData = this.assembleDataToOption()
		},

		// 初始化 配置信息
		initProps() {},

		// 初始化样式 布局
		initStyle() {},

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
		},

		/* ----------------------------------------------------------------------
    | 表单的生成
    |-----------------------------------------------------------------------
    */

		/**  渲染输入框类型
      ---------------------------------------------------------------- */

		renderLabel(h, props, item = this.formOptions) {
			const newInputProps = merge(props.inputProps, {
				attrs: {
					readOnly: true
				},
				style: {
					border: 'none'
				}
			})
			return h('a-form-item', props.itemProps, [h('a-input', newInputProps)])
		},

		// 输入框
		renderText(h, props, item = this.formOptions) {
			const newInputProps = {
				attrs: {}
			}

			// 前缀图标
			const prefixIcon = h('a-icon', {
				attrs: {
					type: item.prefixIcon
				},
				slot: 'prefix'
			})
			// 后缀图标
			const suffixIcon = h('a-icon', {
				attrs: {
					type: item.suffixIcon
				},
				slot: 'suffix'
			})

			// 前缀图标提示
			const prefixTooltip = h(
				'a-tooltip',
				{
					attrs: {
						title: item.prefixTooltip ? item.prefixTooltip.label : null
					},
					slot: 'prefix'
				},
				[
					h('a-icon', {
						attrs: {
							type: item.prefixTooltip ? item.prefixTooltip.icon : null
						}
					})
				]
			)

			// 后缀图标提示
			const suffixTooltip = h(
				'a-tooltip',
				{
					attrs: {
						title: item.suffixTooltip ? item.suffixTooltip.label : null
					},
					slot: 'suffix'
				},
				[
					h('a-icon', {
						attrs: {
							type: item.suffixTooltip ? item.suffixTooltip.icon : null
						}
					})
				]
			)

			// 前缀标签
			if (item.prefixNote) {
				newInputProps.attrs['addon-before'] = item.prefixNote
			}

			// 后缀标签
			if (item.suffixNote) {
				newInputProps.attrs['addon-after'] = item.suffixNote
			}

			// 前缀文字
			if (item.prefixText) {
				newInputProps.attrs.prefix = item.prefixText
			}

			// 后缀文字
			if (item.suffixText) {
				newInputProps.attrs.suffix = item.suffixText
			}

			if (item.maxLength) {
				newInputProps.attrs.maxLength = item.maxLength
			}

			return h('a-form-item', props.itemProps, [
				h('a-input', merge(props.inputProps, newInputProps), [
					item.prefixIcon ? prefixIcon : '',
					item.suffixIcon ? suffixIcon : '',
					item.prefixTooltip ? prefixTooltip : '',
					item.suffixTooltip ? suffixTooltip : ''
				])
			])
		},

		// 密码输入框
		renderPassword(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('a-input-password', props.inputProps)])
		},

		// 数字输入框
		renderNumber(h, props, item = this.formOptions) {
			const newInputProps = merge(props.inputProps, {
				attrs: {
					formatter: item.formatter,
					parser: item.parser,
					precision: item.precision,
					decimalSeparator: item.decimalSeparator,
					step: item.step
				}
			})

			return h('a-form-item', props.itemProps, [h('a-input-number', newInputProps)])
		},

		// 文本框
		renderTextarea(h, props, item = this.formOptions) {
			const newInputProps = merge(props.inputProps, {
				attrs: {
					type: 'textarea',
					rows: item.rows || 2,
					'auto-size': item.autoSize || false
				}
			})
			return h('a-form-item', props.itemProps, [h('a-input', newInputProps, {})])
		},

		/**  渲染 下拉框类型
         ---------------------------------------------------------------- */

		// 图标 下拉框
		renderIcon(h, props, item = this.formOptions) {
			const newInputProps = merge(props.inputProps, {
				attrs: {},
				style: {
					width: `${item.width ? item.width : '200px'}`,
					minWidth: `${item.minWidth ? item.minWidth : '200px'}`
				}
			})
			return h('a-form-item', props.itemProps, [h('icon-selector', newInputProps, {})])
		},

		// 下拉框
		renderSelect(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [
				h(
					'a-select',
					props.selectProps,
					item.data.map(opt => {
						return h(
							'a-select-option',
							{
								attrs: {
									value: opt.value,
									disabled: opt.disabled
								}
							},
							opt.label + (item.suffix || '')
						)
					})
				)
			])
		},

		// 下拉框分组
		renderSelectgroup(h, props, item = this.formOptions) {
			const newInputProps = merge(props.selectProps, {})

			return h('a-form-item', props.itemProps, [
				h(
					'a-select',
					newInputProps,
					item.data.map(optGroup => {
						return h(
							'a-select-opt-group',
							{
								attrs: {
									label: optGroup.label
								}
							},
							optGroup.itme.map(opt => {
								return h(
									'a-select-option',
									{
										attrs: {
											value: opt.value,
											disabled: opt.disabled
										}
									},
									opt.label
								)
							})
						)
					})
				)
			])
		},

		// 下拉多选框
		renderMultiple(h, props, item = this.formOptions) {
			const newInputProps = merge(props.selectProps, {
				attrs: {
					mode: 'multiple',
					maxTagTextLength: item.maxTagTextLength || 5,
					maxTagCount: item.maxTagCount || 3,
					maxTagPlaceholder: item.maxTagPlaceholder,
					dropdownClassName: item.dropdownClassName || '',
					dropdownMatchSelectWidth: item.dropdownMatchSelectWidth || true
				}
			})
			return h('a-form-item', props.itemProps, [
				h(
					'a-select',
					newInputProps,
					item.data.map(opt => {
						return h(
							'a-select-option',
							{
								attrs: {
									value: opt.value,
									disabled: opt.disabled
								}
							},
							opt.label
						)
					})
				)
			])
		},

		// 树形多选框 （需要再完善）
		renderTreeselect(h, props, item = this.formOptions) {
			const newInputProps = merge(props.inputProps, {
				attrs: {
					'tree-data': item.data,
					'dropdown-style': { maxHeight: '400px', overflow: 'auto' },
					'tree-default-expand-all': item.allexpand
				}
			})
			return h('a-form-item', props.itemProps, [h('a-tree-select', newInputProps, {})])
		},

		// 单选框
		renderRadio(h, props, item = this.formOptions) {
			const newInputProps = merge(props.checkProps, {
				attrs: {
					buttonStyle: 'solid'
				}
			})
			return h('a-form-item', props.itemProps, [
				h(
					'a-radio-group',
					newInputProps,
					item.data.map(opt => {
						if (item.radio) {
							return h(
								'a-radio',
								{
									attrs: {
										value: opt.value,
										disabled: opt.disabled
									}
								},
								opt.label
							)
						} else {
							return h(
								'a-radio-button',
								{
									attrs: {
										value: opt.value,
										disabled: opt.disabled
									}
								},
								opt.label
							)
						}
					})
				)
			])
		},

		// 多选框
		renderCheckbox(h, props, item = this.formOptions) {
			const newInputProps = merge(props.checkProps, {
				attrs: {
					buttonStyle: 'solid'
				}
			})
			return h('a-form-item', props.itemProps, [
				h(
					'a-checkbox-group',
					newInputProps,
					item.data.map(opt => {
						return h(
							'a-checkbox',
							{
								attrs: {
									value: opt.value,
									disabled: opt.disabled
								}
							},
							opt.label
						)
					})
				)
			])
		},

		// 级联选择
		renderCascader(h, props, item = this.formOptions) {
			const newInputProps = merge(props.selectProps, {
				attrs: {
					options: item.data,
					showSearch: item.showSearch || false
				}
			})
			return h('a-form-item', props.itemProps, [h('a-cascader', newInputProps)])
		},

		// 渲染站点选择器
		renderStationselect(h, props, item = this.formOptions) {
			const newInputProps = merge(props.inputProps, {
				attrs: {
					datas: item.data,
					disableStation: item.disableStation,
					mode: item.mode || 'checkbox', // radio | checkbox
					listSize: item.listSize || {
						width: 650,
						height: 400
					},
					tabsData: item.tabs || [],
					field: item.field || []
				}
			})
			if (item.onGetFullData) {
				newInputProps.on = {
					onGetFullData: item.onGetFullData
				}
			}

			return h('a-form-item', props.itemProps, [h('station-select', newInputProps)])
		},

		// 渲染站点选择器
		renderTreestationselect(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-tree-select', props.treeProps)])
		},

		// 渲染行业选择器
		renderIndustryselect(h, props, item = this.formOptions) {
			const newInputProps = merge(props.inputProps, {
				attrs: {
					datas: item.data,
					disableStation: item.disableStation,
					mode: item.mode || 'checkbox', // radio | checkbox
					listSize: item.listSize || {
						width: 650,
						height: 400
					},
					tabsData: item.tabsData || [
						{
							name: '请选择',
							value: 0
						}
					],
					field: item.field || []
				}
			})
			if (item.onGetFullData) {
				newInputProps.on = {
					onGetFullData: item.onGetFullData
				}
			}

			return h('a-form-item', props.itemProps, [h('industry-select', newInputProps)])
		},

		//渲染新的时间选择器
		//新小时选择器
		renderMinute(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-minute-picker', props.timeProps)])
		},
		//新小时选择器
		renderHour(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-hour-picker', props.timeProps)])
		},
		//新的天选择器
		renderDay(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-day-picker', props.timeProps)])
		},
		// 新周选择器
		renderWeek(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-week-picker', props.timeProps)])
		},
		//新月份选择器
		renderMonth(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-month-picker', props.timeProps)])
		},
		//新的季度选择器
		renderQuarter(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-quarter-picker', props.timeProps)])
		},
		// 新的年份选择器
		renderYear(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-year-picker', props.timeProps)])
		},
		// 新日期时间范围选择器
		renderMinutes(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-minute-range-picker', props.timeProps)])
		},
		renderHours(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-hour-range-picker', props.timeProps)])
		},
		// 新日范围选择器
		renderDays(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-day-range-picker', props.timeProps)])
		},
		// 新月范围选择器
		renderMonths(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-month-range-picker', props.timeProps)])
		},
		// 新年范围选择器
		renderYears(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-year-range-picker', props.timeProps)])
		},
		// 新周范围选择器
		renderWeeks(h, props, item = this.formOptions) {
			return h('a-form-item', props.itemProps, [h('s-week-range-picker', props.timeProps)])
		},
		// 新季度范围选择器
		renderQuarters(h, props, item = this.formOptions) {
			const newInputProps = merge(props.timeProps, {
				attrs: {
					...item.pickerOptions
				}
			})
			return h('a-form-item', props.itemProps, [h('s-quarter-range-picker', newInputProps)])
		},

		// 自定义 插槽组件
		renderSlot(h, props, item = this.formOptions) {
			const { $slots, $scopedSlots } = this
			let itemContent = ''

			if (item.itemRender && item.itemRender.slot && $scopedSlots[item.itemRender.slot]) {
				// 作用域插槽
				itemContent = h('form-slots', {
					scopedSlots: {
						default: $scopedSlots[item.itemRender.slot]
					}
				})
			} else {
				if ($slots[item.slot]) {
					// 插槽
					itemContent = h('div', {}, $slots[item.slot])
				}
			}

			return h('a-form-item', props.itemProps, [itemContent])
		},
		/* ----------------------------------------------------------------------
    |  数据操作
    |-----------------------------------------------------------------------
    */

		/**
		 * 将业务数据加入到基础样式配置中
		 */
		assembleDataToOption() {
			// lodash的一个公共函数merge,它表示递归合并来源对象自身和继承的可枚举属性到目标对象。后续的来源对象属性会覆盖之前同名的属性
			return merge({}, this.infoData, this.info)
		},

		// 合并方法属性
		mergingMethod(props, item) {
			const prams = {
				on: {}
			}

			// 获取内容改变事件
			if (item.onChange) {
				prams.on.change = item.onChange
			}

			// 面板打开/关闭时的回调
			if (item.onOpenChange) {
				prams.on.openChange = item.onOpenChange
			}

			// 获取焦点事件
			if (item.onFocus) {
				prams.on.focus = item.onFocus
			}

			// 移除焦点事件
			if (item.onBlur) {
				prams.on.blur = item.onBlur
			}

			// 按下回车的事件
			if (item.onPressEnter) {
				prams.on.pressEnter = item.onPressEnter
			}
			merge(props.inputProps, prams)
			merge(props.selectProps, prams)
			merge(props.checkProps, prams)
			merge(props.timeProps, prams)
			merge(props.customProps, {
				on: item?.customOptions?.on || {}
			})
			// console.log('合并',props)
			return props
		}
	},
	// render函数， 实现封装动态组件
	render(h) {
		const item = this.formOptions

		// 表单项目的配置
		const props = {
			// 表单 form-item 配置
			itemProps: {
				attrs: {
					label: item.label,
					// class: `el-form-item-box ${item.class}`,
					labelCol: item.labelCol,
					wrapperCol: item.wrapperCol,
					colon: item.colon,
					extra: item.extra,
					hasFeedback: item.hasFeedback,
					help: item.help,
					htmlFor: item.htmlFor
				},
				class: ['el-form-item-box', item.class]
			},

			// 表单项的 输入框input 配置
			inputProps: {
				attrs: {
					style: item.style,
					// model: this.parameter[item.id],
					placeholder: item.placeholder || '请输入' + item.label,
					disabled: item.disabled || false,
					maxLength: item.maxlength,
					min: item.min,
					max: item.max,
					addonAfter: item.addonAfter,
					addonBefore: item.addonBefore,
					prefix: item.prefix,
					suffix: item.suffix
				},
				directives: [
					{
						name: 'decorator',
						rawName: 'v-decorator',
						value: [item.id, { rules: this.getRules(item.rules, item), initialValue: item.value || '' }]
					}
				],
				style: {
					width: item.width ? item.width : '160px',
					minWidth: item.minWidth ? item.minWidth : '160px'
				}
			},

			// 表单项的下拉框 配置
			selectProps: {
				attrs: {
					style: item.style,
					placeholder: item.placeholder || '请选择' + item.label || '',
					disabled: item.disabled || false,
					allowClear: item.allowClear === true,
					autoFocus: item.autoFocus, // 默认获取焦点
					changeOnSelect: item.changeOnSelect,
					displayRender: item.displayRender,
					expandTrigger: item.expandTrigger,
					fieldNames: item.fieldNames,
					getPopupContainer: item.getPopupContainer,
					loadData: item.loadData,
					notFoundContent: item.notFoundContent,
					popupClassName: item.popupClassName,
					popupStyle: item.popupStyle,
					popupPlacement: item.popupPlacement,
					size: item.size,
					suffixIcon: item.suffixIcon
				},
				directives: [
					{
						name: 'decorator',
						rawName: 'v-decorator',
						value: [item.id, { rules: this.getRules(item.rules, item), initialValue: item.value || undefined }]
					}
				],
				style: {
					width: item.width ? item.width : '160px',
					minWidth: item.minWidth ? item.minWidth : '160px'
				}
			},

			// 表单项的 选项框配置
			checkProps: {
				attrs: {
					style: item.style,
					disabled: item.disabled || false
				},
				directives: [
					{
						name: 'decorator',
						rawName: 'v-decorator',
						value: [item.id, { rules: this.getRules(item.rules, item), initialValue: item.value }]
					}
				],
				style: {
					width: item.width ? item.width : '160px',
					minWidth: item.minWidth ? item.minWidth : '160px'
				}
			},

			// 表单项的 时间选择配置
			timeProps: {
				attrs: {
					style: item.style,
					placeholder: item.placeholder || '请选择' + item.label,
					disabled: item.disabled || false,
					format: item.format || this.format[item.type],
					valueFormat: item.valueFormat || item.format || this.format[item.type],
					locale: locale,
					allowClear: item.allowClear === true,
					showToday: item.showToday === true,
					disabledDate: item.disabledDate,
					disabledTime: item.disabledTime,
					rangeLimit: item.rangeLimit || false,
					...item.pickerOptions
				},
				style: {
					width: `${item.minWidth ? item.minWidth : '200px'}`,
					minWidth: `${item.minWidth ? item.minWidth : '200px'}`
				},
				props: { lable: '' },
				directives: [
					{
						name: 'decorator',
						rawName: 'v-decorator',
						value: [item.id, { rules: this.getRules(item.rules, item), initialValue: item.value ? moment(item.value) : undefined }]
					}
				]
			},

			// 外部注册的自定义type
			customProps: {
				props: item.customOptions || {},
				directives: [
					{
						name: 'decorator',
						rawName: 'v-decorator',
						value: [item.id, { rules: this.getRules(item.rules, item), initialValue: item.value || '' }]
					}
				]
			},

			// 树选择器下拉
			treeProps: {
				props: {
					data: item.data,
					maxTagCount: item.maxTagCount,
          panelWidth: item.panelWidth
				},
				directives: [
					{
						name: 'decorator',
						rawName: 'v-decorator',
						value: [item.id, { rules: this.getRules(item.rules, item), initialValue: item.value || '' }]
					}
				]
			}
		}
		// console.log('props',props)
		if (this.$utils.isNull(this[`render${capitalize(this.formOptions.type)}`])) {
			console.log(`这个${this.formOptions.type}类型不存在`, `render${capitalize(this.formOptions.type)}`)
		}
		// 根据type 类型 读取对应的 方法 渲染对应的表单项
		return this[`render${capitalize(this.formOptions.type)}`](h, this.mergingMethod(props, item), item, this)
	}
}
</script>

<style lang="less" scoped>
.el-form-item-box {
	* {
		font-size: 12px;
		position: relative;
	}

	.ant-radio-button-wrapper {
		width: auto;
		min-width: 54px;
		text-align: center;
	}
}
</style>
