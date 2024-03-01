<template>
	<div class="selector-wrap">
		<a-tooltip placement="bottomLeft" overlayClassName="_selector_tooltip" v-model="visible" :get-popup-container="getPopupContainer" trigger="click">
			<template v-if="tooltipVisible">
				<a-tooltip>
					<template v-if="activeName.length >= 3" #title>{{ activeName.join() }}</template>
					<div :style="{ width: datas.inputWidth || '100%' }">
						<a-input ref="dom" :id="dom" :read-only="true" :placeholder="datas.placeholder || '请选择'" :value="getActiveName"> </a-input>
					</div>
				</a-tooltip>
			</template>

			<template v-else>
				<div :style="{ width: datas.inputWidth || '100%' }">
					<a-input ref="dom" :id="dom" :read-only="true" :placeholder="datas.placeholder || '请选择'" :value="getActiveName"> </a-input>
				</div>
			</template>
			<!-- 内容 -->
			<template slot="title">
				<div class="selector-box" :style="{ width: panelWidth, right: overstep ? 0 : '' }" ref="warpContanier" :class="activeClass" v-show="visible">
					<div class="list">
						<ul :style="{ width: `calc(${datas.source.length} * 80px)` }" v-if="datas.source.length > 1">
							<li v-for="(ele, i) in datas.source" :key="i" :class="ele.key == activeKey ? 'active' : ''" @click="Pagechange(ele, i)">{{ ele.name }}</li>
						</ul>

						<div style="height: 400px">
							<div v-for="(item, i) in datas.source" :key="i">
								<div v-show="activeKey == item.key">
									<simple-select
										v-show="item.type == 'single'"
										:data-source="item.data"
										:echo="echoKey === item.key"
										:default-code="item.defaultCode"
										:multiple="item.multiple"
										:onInit="onInit"
										@onRegionClose="onClose"
										:delete-codes="deleteCodes"
									/>
									<select-tree
										v-show="item.type == 'tree'"
										:data-source="item.data"
										:echo="echoKey === item.key"
										:son="true"
										@onSiteClose="onClose"
										@dosChange="dosChange"
										:multiple="item.multiple"
										:default-code="item.defaultCode"
										:expand-code="item.expandCode"
										:left-width="item.leftWidth"
										:right-width="item.rightWidth"
										:level="item.level"
										:onInit="onInit"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</a-tooltip>
	</div>
</template>

<script>
import SimpleSelect from './simple-select.vue'
import SelectTree from './select-tree.vue'
export default {
	components: {
		SimpleSelect,
		SelectTree
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		dom: {
			type: [String],
			default: () => 'dropDom'
		},
		value: {
			type: Object,
			default: () => ({})
		},
		data: {
			type: Object,
			default: () => ({})
		},
		maxTagCount: {
			type: [Number, String],
			default: 3
		},
		tooltipVisible: {
			type: Boolean,
			default: true
		},
    panelWidth:{
      type:String,
      default:'600px'
    }
	},
	data() {
		return {
			visible: true,
			datas: {},
			activeName: [],
			overstep: false, //是否超出浏览器
			activeKey: '', //选中索引设置高亮
			echoKey: '',
			selectedItems: [],
			deleteCodes: '',
			selectedTitles: [],
			isOcclusion: false, //外层是左右布局
			resultKey: '' //最终确定的tab key,
		}
	},
	watch: {
		visible: {
			// immediate:true,
			handler() {
				this.isOverDtep()
			}
		},
		treeData() {
			this.init()
		},
		'data.source': {
			deep: true,
			handler() {
				this.init()
			}
		}
	},
	computed: {
		activeClass() {
			let cls = ''
			let data = this.data.source
			if (this.isOcclusion) {
				cls = 'left-and-right'
			}
			if (data.length <= 1) {
				cls = cls + ' ' + 'onlyOne'
			}
			return cls
		},
		getActiveName() {
			let name = this.activeName
			let suffix = ''
			if (this.activeName.length > this.maxTagCount) {
				name = this.activeName.slice(0, this.maxTagCount)
				suffix = ` + ${this.activeName.length - this.maxTagCount}...`
			}
			return name + suffix
		}
	},
	methods: {
		getPopupContainer(trigger) {
			return document.body
		},
		onShowPanel() {
			this.visible = true
		},
		onHidePanel() {
			this.visible = false
		},

		// 初始化插件的样式
		isOverDtep() {
			// 用来判断 左右展示的布局
			const height = document.body.clientWidth
			const layout = document.getElementById(this.dom).getBoundingClientRect().right
			if (height - layout < 200) {
				this.isOcclusion = true
			} else {
				this.isOcclusion = false
			}
		},

		//选项切换
		Pagechange(target, i) {
			this.activeKey = target.key
		},

		//组件点击确定或者取消的事件
		onClose(arr, keyArr) {
			this.visible = false
			let titleArr = []
			if (this.resultKey == this.activeKey && this.selectedTitles.toString() == keyArr.toString()) {
				return
			}
			if (Array.isArray(arr)) {
				this.resultKey = this.activeKey
				if (arr.length) {
					titleArr = arr.map(item => item.title)
				}
				this.activeName = titleArr
				this.selectedItems = arr
				this.selectedTitles = keyArr

				const obj = {
					value: keyArr,
					key: this.resultKey,
					prop: arr
				}
				this.$emit('change', obj)
			}
		},

		//初始化设置,默认触发
		onInit(arr, keyArr) {
			let titleArr = []
			if (arr.length) {
				titleArr = arr.map(item => item.title)
				this.activeName = titleArr
				this.selectedItems = arr
				this.selectedTitles = keyArr
			}
		},
		//站点选择器右侧顶部的选项切换
		dosChange(target, i) {
			this.$emit('dos-change', target, i)
		},

		getSearchParams() {
			return {
				items: this.selectedItems,
				titles: this.selectedTitles,
				level: this.resultKey
			}
		},
		// 组件初始化
		init() {
			this.datas = { ...this.data }
			const defaultKey = this.data.defaultKey || this.data.source[0].key
			this.activeKey = defaultKey
			this.echoKey = defaultKey
			this.resultKey = defaultKey
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.visible = false
		})
	},
	created() {
		this.init()
	}
}
</script>
<style lang="less" >
._selector_tooltip {
	.ant-tooltip-inner {
		background-color: transparent !important;
		box-shadow: none;
	}

	.ant-tooltip-arrow {
		display: none;
	}
}
</style>

<style lang="less" scoped>
._selector_tooltip {
	* {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.65);
	}
}

.selector-wrap {
	width: 100%;
	position: relative;
}

.selector-box {
	position: absolute;
	// height: 300px;
	width: 600px;
	top: 0;
	margin-left: -8px;
	border-radius: 4px;
	padding: 0;
	background: #fff;
	border: 1px solid #eee;
	z-index: 100;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

	/deep/.tree-box {
		box-shadow: none;
	}

	.list {
		padding: 0;

		ul {
			margin-top: 10px;
			margin-left: 10px;
			margin-bottom: 8px;
			display: flex;
			border: 1px solid #ccc;
			border-radius: 5px;
			height: 30px;
			line-height: 28px;

			li {
				// width: 80px;
				flex: 1;
				text-align: center;
				border-right: 1px solid #ccc;
				cursor: pointer;
				transition: all 0.5s;

				&:hover {
					color: #1c84f0;
				}

				&:last-child {
					border: none;
				}
			}

			.active {
				background: #1c84f0;
				color: #fff;

				&:hover {
					color: #fff;
				}
			}
		}
	}
}

/deep/.tree-box {
	width: 100% !important;
}

/deep/ .ant-input {
	font-size: 12px;
}

/* 左右布局 */
.left-and-right {
	position: absolute;
	right: -174px;
	top: 0;
	padding-top: 0;
}

/* 只有一个tab栏的样式 */
.onlyOne {
	background: transparent;
	border: none;
}
</style>