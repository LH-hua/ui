<template>
	<!-- 弹出框 -->
	<a-modal
		:wrap-class-name="`s-modal ${modalClass}`"
		:width="domWidth"
		:style="{ width: domWidth }"
		:dialog-style="{ top: domTop, height: domHeight }"
		:bodyStyle="enlargeStyle"
		:visible="visible"
		@cancel="onCancel"
		:mask-closable="maskClosable"
		:footer="isBottom === true ? $slots.bottom : null"
	>
		<!-- 头部标题 -->
		<div slot="title" class="modal-header">
			<div class="title-left">{{ title }}</div>
			<div class="title-right">
				<div @click="onEnlarge" v-if="infoData.isEnlarge" class="enlarge-btn" :title="ifEnlarge ? '关闭全屏' : '全屏'">
					<a-icon type="arrows-alt" v-if="!ifEnlarge" />
					<a-icon type="shrink" v-else />
				</div>
			</div>
		</div>

		<!-- 内容 -->
		<div v-if="visible" class="modal-content" :style="`height:${height};`">
			<slot v-if="domAttr"></slot>
		</div>

		<!-- 页脚 -->
		<template slot="footer">
			<slot name="bottom" v-if="$slots.bottom"></slot>

			<div v-if="!$slots.bottom">
				<a-button v-if="infoData.isSubmit" key="submit" type="primary" @click="onSubmit" style="margin-right: 10px" :loading="infoData.submitLoading">
					{{ infoData.submitText }}
				</a-button>
				<a-button v-if="infoData.isCancel" key="back" @click="onCancel"> {{ infoData.cancelText }} </a-button>
			</div>
		</template>
	</a-modal>
</template>

<script>
import { merge } from 'lodash'
export default {
	props: {
		// 标题
		title: {
			type: String,
			default: () => '新增'
		},
		// 显示隐藏弹出框
		visible: {
			type: Boolean,
			default: () => false
		},
		// 页面底部 按钮 显示隐藏
		isBottom: {
			type: Boolean,
			default: true
		},
		// 弹出框的宽度
		width: {
			type: [Number, String],
			default: '650px'
		},
		// 弹出框的高度
		height: {
			type: [Number, String],
			default: 'auto'
		},
		// 弹出框离顶部的距离
		top: {
			type: String,
			default: () => '0px'
		},
		// 弹出框 class
		modalClass: {
			type: String,
			default: () => ''
		},
		// 配置信息
		info: {
			type: Object,
			default: () => {
				return {}
			}
		},
		maskClosable: {
			type: Boolean,
			default: false
		}
	},
	//  数据
	data() {
		return {
			// 表单信息
			infoData: {
				// 内置信息
				isSubmit: true, // 显示搜索按钮
				isCancel: true, // 显示取消按钮
				isEnlarge: false, // 显示放大按钮
				submitText: '保存', // 按钮名称
				cancelText: '取消', // 按钮名称,
				submitLoading: false
			},
			domWidth: null,
			domTop: null,
			domHeight: 'auto',
			ifEnlarge: false,
			enlargeStyle: {},
			domAttr: true
		}
	},
	//  计算属性
	computed: {
		//  监听多个对象 进行图表重新渲染
		infoChange() {
			const { visible, info, title } = this
			return { visible, info, title }
		}
	},
	//  监听
	watch: {
		//  监听图表数据
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
	//  生命周期钩子：组件实例渲染完成时调用
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.init()
			})
		})
	},
	//  函数集，
	methods: {
		/* ----------------------------------------------------------------------
    | 初始化数据
    |-----------------------------------------------------------------------
    */

		init() {
			this.infoData = this.assembleDataToOption()
			this.initStyle()
		},

		initStyle() {
			this.domWidth = this.width
			this.domTop = this.top
			this.enlargeStyle = {}
			this.domHeight = 'auto'
			this.ifEnlarge = false
		},

		/* ----------------------------------------------------------------------
    | 点击事件
    |-----------------------------------------------------------------------
    */

		// 放大事件
		onEnlarge() {
			this.ifEnlarge = !this.ifEnlarge
			if (this.ifEnlarge) {
				this.domWidth = '100%'
				this.domTop = '0'
				if (this.isBottom) {
					const num = 130
					this.enlargeStyle = { height: `calc(100vh - ${num}px)` }
					this.domHeight = `100%`
				} else {
					const num = 75
					this.enlargeStyle = { height: `calc(100vh - ${num}px)` }
					this.domHeight = `100%`
				}
			} else {
				this.initStyle()
			}
			this.resetDom()
			this.$emit('on-Enlarge')
		},

		onSubmit() {
			this.$emit('on-submit')
		},

		onCancel() {
			this.$emit('on-cancel')
		},

		/**
		 * 将业务数据加入到基础样式配置中
		 */
		assembleDataToOption() {
			// lodash的一个公共函数merge,它表示递归合并来源对象自身和继承的可枚举属性到目标对象。后续的来源对象属性会覆盖之前同名的属性
			return merge({}, this.infoData, this.info)
		},

		/* ----------------------------------------------------------------------
    | 数据处理
    |-----------------------------------------------------------------------
    */
		// 重置dom 内容
		resetDom() {
			// 这里的 domAttr 控制着 弹出框内容的显示隐藏，
			// 点击放大事件 修改了弹出框大小，内容里的栅格没有变化，就需要重新去加载内容体
			this.domAttr = false
			setTimeout(() => {
				this.domAttr = true
			}, 200)
		}
	}
}
</script>

<style lang="less">
.ant-modal-wrap {
	margin: 10px;
}
.s-modal {
	display: flex;

	.ant-btn-primary {
		margin-bottom: 0;
	}

	.ant-modal {
		top: auto;
		display: inline-block;
		align-self: center;
		padding: 0;
		margin: auto;
		text-align: left;
		vertical-align: middle;
	}

	.ant-modal-content {
		.ant-modal-close {
			right: 5px;
			top: 0;
			margin: 0 !important;
		}

		.ant-modal-close-x {
			color: #000;
			font-weight: bold;
			font-size: 16px;
			width: 22px;
			margin-right: 20px;
		}

		.ant-modal-header {
			background-color: #ffffff;
			border-bottom: 1px solid #eef6ff;
			padding-top: 16px;
			padding-bottom: 16px;

			.ant-modal-title {
				// height: 22px;
				font-size: 14px;
				font-weight: bold;
				color: #333333;
			}
		}

		.ant-modal-body {
			// max-height: 60vh;
			overflow: auto;
			padding: 16px 24px;

			.__view {
				width: initial !important;
			}

			/*滚动条整体样式*/
			&::-webkit-scrollbar {
				width: 8px;
				// background: transparent;
			}

			/*滚动条里面小方块*/
			&::-webkit-scrollbar-thumb {
				border-radius: 10px;
				-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
				background-color: rgb(186, 198, 218);
			}

			/*滚动条里面轨道*/
			&::-webkit-scrollbar-track {
				-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
				border-radius: 10px;
				background: transparent;
				border: none;
			}
		}

		.ant-modal-footer {
			padding: 16px 24px;
			text-align: right;
			border-top: none;
		}
	}

  .modal-content{
    overflow-y: auto;
    overflow-x: hidden;
  }

	.modal-header {
		font-weight: bold;
		color: #000;
		display: flex;

		.title-left {
			width: 100%;
			// flex-shrink: 0;
			flex-grow: 0;
			margin-right: 100px;
		}

		.title-right {
			width: 56px;
			flex-shrink: 0;
			flex-grow: 0;

			.enlarge-btn {
				margin-right: 56px;
				font-weight: bold;
				color: #000;
				background: #ccc;
				cursor: pointer;
				font-size: 16px;
			}
		}
	}

	.env-action {
		.ant-btn {
			margin-right: 5px;
			font-size: 12px;
			border-radius: 4px !important;
			height: 24px;
			min-width: 60px;
		}

		.env-btn {
			background-color: #f6faff;
			border: 1px solid #1890ff;
			border-radius: 4px;
			color: #1890ff;
		}

		.env-btn-del {
			background-color: #f6faff;
			border: 1px solid #f9523e;
			border-radius: 4px;
			color: #f9523e;

			&:hover {
				color: #f9523e !important;
				border: 1px solid #f9523e !important;
			}
		}
	}
}
</style>
