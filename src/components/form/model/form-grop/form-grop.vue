<script>
import moment from 'moment'
import { merge } from 'lodash'
import { formMixins } from '../../form-mixins.js'
import formItem from '../../item/index.vue'
import formSlots from '../../item/form-slots/scopedSlots.vue'
import * as Encryption from '../../../../utils/encrypt'

export default {
	mixins: [formMixins],
	// 要用到哪些子组件
	components: { formItem, formSlots },
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		// 表单项
		formItems: {
			type: Array,
			default() {
				return []
			}
		},
		// 表单配置信息
		formExport: {
			type: Object,
			default: () => {
				return {}
			}
		},
		// 表单配置信息
		info: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	// 数据
	data() {
		return {
			btnArea: [],
			// 表单信息
			infoData: {
				layout: 'inline', // 表单布局 'horizontal'|'vertical'|'inline'	'horizontal'
				// 内置信息
				isShowSearch: true, // 显示搜索按钮
				isShowReset: true, // 显示重置按钮
				isShowBtn: true, // 显示按钮区域

				searchText: '查询', // 按钮名称
				resetText: '重置', // 按钮名称

				isShowFold: false, // 显示折叠区域
				isShowFoldArea: true // 显示折叠区域
			}
		}
	},
	// 计算属性
	computed: {
		// 监听多个对象 进行图表重新渲染
		infoChange() {
			const { formExport } = this
			return {
				formExport
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
	// 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
	created() {},
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
			this.infoData = this.assembleDataToOption()
			this.initStyle()
		},

		// 初始化数据
		initData() {},

		// 初始化样式 布局
		initStyle() {},

		/* ----------------------------------------------------------------------
    | 表单事件
    |-----------------------------------------------------------------------
    */

		// 设置表单值
		setForm(obj) {
			// const data = this.stringToMoment(obj, this.formItems, 'group')
			// console.log('设置数据', obj)
			this.form.setFieldsValue(obj)
		},

		// 获取表单所有值
		getForm() {
			const value = this.form.getFieldsValue()
			const form = this.convertMomentType(value, this.formItems, 'group')
			// console.log('表单', value, form)
			return form
		},

		getEncryptionForm(options) {
			const value = this.form.getFieldsValue()
			const form = this.convertMomentType(value, this.formItems, 'model')
			// aes加密项
			const type = options.type || 'aes'
			const aesKey = options.aesKey || ''
			const aesIv = options.iv || ''
			const dataKeys = options.dataKeys || []
			const publicKey = options.publicKey || ''

			if (type === 'aes' && !aesKey) console.error('请输入aes加密秘钥aesKey！')
			// if (type === 'rsa' && !publicKey) console.error('请输入rsa加密publicKey！')

			// aes对称加密
			if (type === 'aes' && aesKey) {
				if (dataKeys.length > 0) {
					// 某个数据加密
					dataKeys.forEach(item => {
						form[item] = Encryption.aesEncode(form[item], aesKey, aesIv)
					})
					return form
				} else {
					// 整体加密
					return Encryption.aesEncode(form, aesKey, aesIv)
				}
			}

			// md5不可逆加密
			if (type === 'md5') {
				if (dataKeys.length > 0) {
					dataKeys.forEach(item => {
						form[item] = Encryption.md5Encode(form[item])
					})
					return form
				} else {
					return Encryption.md5Encode(form)
				}
			}

			// rsa非对称加密
			// if (type === 'rsa' && publicKey) {
			// 	if (dataKeys.length > 0) {
			// 		dataKeys.forEach(item => {
			// 			form[item] = Encryption.rsaEncode(form[item], publicKey)
			// 		})
			// 		return form
			// 	} else {
			// 		return Encryption.rsaEncode(form, publicKey)
			// 	}
			// }
		},

		setEncryptionForm(content, options) {
			const type = options.type || 'aes'
			const aesKey = options.aesKey || ''
			const aesIv = options.iv || ''
			const dataKeys = options.dataKeys || []
			const privateKey = options.privateKey || ''

			if (type === 'aes' && !aesKey) console.error('请输入aes加密秘钥aesKey！')
			// if (type === 'rsa' && !privateKey) console.error('请输入rsa解密privateKey！')

			// aes解密
			if (type === 'aes' && aesKey) {
				if (dataKeys.length > 0) {
					dataKeys.forEach(item => {
						content[item] = Encryption.aesDecode(content[item], aesKey, aesIv)
					})
					// console.log('aes解密', content)
					this.form.setFieldsValue(content)
				} else {
					const dcontent = Encryption.aesDecode(content, aesKey, aesIv)
					// console.log('aes解密', dcontent)
					this.form.setFieldsValue(dcontent)
				}
			}

			// rsa非对称加密
			// if (type === 'rsa' && privateKey) {
			// 	if (dataKeys.length > 0) {
			// 		dataKeys.forEach(item => {
			// 			content[item] = Encryption.rsaDecode(content[item], privateKey)
			// 		})
			// 		console.log('rsa解密', content)
			// 		this.form.setFieldsValue(content)
			// 	} else {
			// 		const result = Encryption.rsaDecode(content, privateKey)
			// 		console.log('rsa解密', result)
			// 		this.form.setFieldsValue(result)
			// 	}
			// }
		},
		// 获取表单单值
		getFormById(id) {
			const data = this.getForm()
			return data[id]
		},

		// 重置表单
		resetForm(ids) {
			this.form.resetFields(ids || undefined)
			const data = this.removeTimeType(this.getForm(), this.formItems)
			this.setForm(data)
		},

		/* ----------------------------------------------------------------------
    | 按钮事件
    |-----------------------------------------------------------------------
    */
		// 清空
		onReset() {
			this.resetForm()
			this.$emit('on-reset')
		},
		// 搜索按钮事件
		onSearch() {
			this.form.validateFields((err, values) => {
				if (err) return
				this.$emit('on-search', this.getForm())
				// console.log(this.getForm())
			})
		},

		/* ----------------------------------------------------------------------
    | 渲染组件
    |-----------------------------------------------------------------------
    */

		// 渲染表单项
		renderItem(h, _this) {
			const { $slots, $scopedSlots } = _this
			const childs = _this.formItems.map(item => {
				let formItemContent = ''

				if (item.type === 'slot' && item.slot && $slots[item.slot]) {
					// 插槽
					formItemContent = h(
						'div',
						{
							slot: item.slot
						},
						$slots[item.slot]
					)
				}

				// 作用域插槽
				if (item.type === 'slot' && item.itemRender && item.itemRender.slot) {
					// 作用域插槽
					formItemContent = h(
						'form-slots',
						{
							scopedSlots: {
								default: $scopedSlots[item.itemRender.slot]
							},
							slot: item.itemRender.slot,
							directives: [
								{
									name: 'decorator',
									rawName: 'v-decorator',
									value: [item.id, { rules: this.getRules(item.rules, item), initialValue: item.value || '' }]
								}
							],
							attrs: {
								value: item.value
							}
						}
						// $slots[item.itemRender.slot]
					)
				}

				// form-item 封装了 表单基础信息
				const vnode = h(
					'form-item',
					{
						attrs: {
							formOptions: item
						}
					},
					[formItemContent]
				)

				return vnode
			})

			return childs
		},

		// 渲染表单按钮
		renderBtn(h, _this) {},

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
		}
	},
	// render函数， 实现封装动态组件
	render(h) {
		const btuArae = [
			h('a-form-item', {}, [
				h(
					'a-button',
					{
						attrs: {
							type: 'primary',
							style: this.infoData.isShowSearch ? '' : 'display:none'
						},
						on: {
							click: this.onSearch
						}
					},
					[
						h('span', {}, this.infoData.searchText),
						h('a-icon', {
							attrs: {
								type: 'search'
							}
						})
					]
				),
				h(
					'a-button',
					{
						attrs: {
							style: this.infoData.isShowReset ? '' : 'display:none'
						},
						on: {
							click: this.onReset
						}
					},
					[
						h('span', {}, this.infoData.resetText),
						h('a-icon', {
							attrs: {
								type: 'reload'
							}
						})
					]
				)
			])
			// h(
			// 	'span',
			// 	{
			// 		class: 'env-mg-r-5',
			// 		attrs: {
			// 			style: this.infoData.isShowSearch ? '' : 'display:none'
			// 		}
			// 	},
			// 	[
			// 		h(
			// 			'a-button',
			// 			{
			// 				attrs: {
			// 					type: 'primary',
			// 				},
			// 				on: {
			// 					click: this.onSearch
			// 				}
			// 			},
			// 			[
			// 				h('span', {}, this.infoData.searchText),
			// 				h('a-icon', {
			// 					attrs: {
			// 						type: 'search'
			// 					}
			// 				})
			// 			]
			// 		)
			// 	]
			// ),
			// h(
			// 	'span',
			// 	{
			// 		class: 'env-mg-r-5',
			// 		attrs: {
			// 			style: this.infoData.isShowReset ? '' : 'display:none'
			// 		}
			// 	},
			// 	[
			// 		h(
			// 			'a-button',
			// 			{
			// 				on: {
			// 					click: this.onReset
			// 				}
			// 			},
			// 			[
			// 				h('span', {}, this.infoData.resetText),
			// 				h('a-icon', {
			// 					attrs: {
			// 						type: 'reload'
			// 					}
			// 				})
			// 			]
			// 		)
			// 	]
			// )
			// ])
		]

		return h('div', { class: ['env-base-form-box'] }, [
			h(
				'a-form',
				{
					attrs: {
						form: this.form,
						layout: this.infoData.layout
					}
				},
				[this.renderItem(h, this), this.infoData.isShowBtn ? btuArae : '']
			)
		])
	}
}
</script>

<style lang="less" scoped>
.env-base-form-box {
	/deep/.ant-form-item-control {
		line-height: 20px;
	}

	form {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.env-mg-r-5 {
		margin-right: 5px;
	}
}
</style>
