<script>
import moment from 'moment'
import { merge, toSafeInteger, max } from 'lodash'
import $ from 'jquery'

import { formMixins } from '../../form-mixins.js'
import formItem from '../../item/index.vue'
import formSlots from '../../item/form-slots/scopedSlots.vue'
import * as Encryption from '../../../../utils/encrypt'

export default {
	mixins: [formMixins],
	// 要用到哪些子组件
	components: {
		formItem,
		formSlots
	},
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		/* ----------------------------------------------------------------------
    | 表单
    |-----------------------------------------------------------------------
    */
		rowClass: {
			type: String,
			default: () => {
				return ''
			}
		},
		formClass: {
			type: String,
			default: () => {
				return ''
			}
		},
		// 表单项
		formItems: {
			type: Array,
			default() {
				return []
			}
		},
		// 请求参数
		parameter: {
			type: Object,
			default: () => {
				return {}
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
			// 表单信息
			infoData: {
				layout: 'inline' // 表单布局 'horizontal'|'vertical'|'inline'	'horizontal'
			},
			params: {}
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
			immediate: false,
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

		window.onresize = () => {
			return (() => {
				this.init()
			})()
		}
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
		initStyle() {
			const than = this
			// 循环 多少个表单
			$('.env-modal-form').map((w, obj) => {
				const objForm = obj
				// 表单下有 多少个表结构
				$('.ant-row').map((index, e) => {
					// 获取每个表结构的 最长标题
					const row = $(objForm).find(`.env-row-${index}`)
					const maxLabelWidth = than.countLabelWidth(objForm)
					// 循环单个设置 长度
					row.map((k, kobj) => {
						const list = $(kobj).find('.el-form-item-col')
						list.map((i, item) => {
							$(item).find('.ant-form-item-label').width(maxLabelWidth)
							// 第一步获取栅格行的总宽度 减去 10的浮动
							const colWidth = $(item).width() - 10
							// 获取label 文字的宽度
							const labelWidth = $(item).find('.ant-form-item-label').width()
							// 通过 总宽度 - 文字宽度 - (浮动宽度)
							const width = `${colWidth - labelWidth}px`

							$(item).find('.ant-form-item-control-wrapper').width(width)
							$(item).find('.ant-select').css({ width: width, minWidth: width })
						})
					})
				})
			})
		},
		/* ----------------------------------------------------------------------
    | 表单事件
    |-----------------------------------------------------------------------
    */

		// 设置表单值
		setForm(obj) {
			// const data = this.stringToMoment(obj, this.formItems, 'model')
			this.form.setFieldsValue(obj)
		},

		// 获取表单所有值
		getForm() {
			const value = this.form.getFieldsValue()
			const form = this.convertMomentType(value, this.formItems, 'model')
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
			const privateKey = options.privateKey || ''

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
          let startTime = new Date();
					const result = Encryption.aesEncode(form, aesKey, aesIv)
          let endTime = new Date();
          // console.log("加密时间" + (endTime - startTime) + "ms");
          return result
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
			// 			form[item] = Encryption.rsaEncode(form[item], publicKey, privateKey)
			// 		})
			// 		return form
			// 	} else {
			// 		return Encryption.rsaEncode(form, publicKey, privateKey)
			// 	}
			// }
		},

		setEncryptionForm(content, options) {
			const type = options.type || 'aes'
			const aesKey = options.aesKey || ''
			const aesIv = options.iv || ''
			const dataKeys = options.dataKeys || []
			const publicKey = options.publicKey || ''
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
			// 			content[item] = Encryption.rsaDecode(content[item], publicKey, privateKey)
			// 		})
			// 		console.log('rsa解密', content)
			// 		this.form.setFieldsValue(content)
			// 	} else {
			// 		const result = Encryption.rsaDecode(content, publicKey, privateKey)
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
			// console.log('重置', data)
			this.setForm(data)
		},

		/* ----------------------------------------------------------------------
    | 校验
    |-----------------------------------------------------------------------
    */
		checkForm() {
			let flag = false
			this.form.validateFields((err, values) => {
				if (!err) {
					let params = merge(this.parameter, values)
					params = this.convertMomentType(params, this.formItems, 'model')
					this.params = params
					flag = true
				}
			})
			return flag
		},

		/* ----------------------------------------------------------------------
    |  数据操作
    |-----------------------------------------------------------------------
    */

		// 将业务数据加入到基础样式配置中
		assembleDataToOption() {
			// lodash的一个公共函数merge,它表示递归合并来源对象自身和继承的可枚举属性到目标对象。后续的来源对象属性会覆盖之前同名的属性
			return merge({}, this.infoData, this.info)
		},

		// 计算 label 中 最宽的数据
		countLabelWidth(obj) {
			const numArr = []
			const col = $(obj).find('.el-form-item-col')
			// 循环设置
			col.each((index, item) => {
				numArr.push($(item).find('.ant-form-item-label').width())
			})
			return max(numArr) < 60 ? 60 : max(numArr)
		},

		/* ----------------------------------------------------------------------
    | 渲染组件
    |-----------------------------------------------------------------------
    */

		// 渲染表单项
		renderItem(h, _this) {},

		renderChilds(h, _this) {}
	},
	// render函数， 实现封装动态组件
	render(h) {
		const { $slots, $scopedSlots } = this
		const box = this.formItems.map((list, order) => {
			const childs = list.item.map((item, index) => {
				if (this.$utils.isNull(item.width)) {
					item.width = '100%'
					item.minWidth = '100%'
				}

				let formItemContent = ''

				// 具名插槽
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
				return h(
					'a-col',
					{
						style: item.hide ? `display:none` : '',
						class: ['el-form-item-col', item.class],
						attrs: {
							span: item.span || toSafeInteger(24 / list.item.length)
						}
					},
					[vnode]
				)
			})

			const labelPiece = h('div', { class: ['env-model-form-label'] }, list.label || '')

			return h('div', { class: [this.formClass] }, [
				list.label ? labelPiece : '',
				h(
					'a-row',
					{
						class: [`env-row-${order}`, this.rowClass],
						attrs: {
							gutter: 20
						}
					},
					[childs]
				)
			])
		})
		return h('div', { class: ['env-modal-form'] }, [
			h(
				'a-form',
				{
					attrs: {
						form: this.form,
						layout: this.infoData.layout
					}
				},
				[box]
			)
		])
	}
}
</script>

<style lang="less">
</style>
