<template>
	<div ref="box" class="station-select" :style="styles">
		<div type="text" class="sun-input" @click.stop="showList"> {{ selectedStation }}<span class="arrow">></span></div>

		<div class="list" v-if="show" :style="`${listSize.width ? `width: ${listSize.width}px;` : '400px'}${listSize.height ? `height: ${listSize.height}px` : '400px'};
		left: ${isRight ? 'auto' : '0px'}; right: ${isRight ? '0px' : 'auto'};`" @click.stop>
			<tabs :tabs="tabsData" v-model="tabIndex" @tabCange="tabCange"></tabs>
			<div class="list-content">
				<ul v-show="!folded" v-if="list.length > 0">
					<li v-for="(item, index) in list" :key="index"
						:class="item.children && item.children.length > 0 ? 'city-group' : 'station-group'">
						<div class="group-name" v-if="tabIndex === 0">
							<div v-if="mode === 'radio'" class="radio">{{ item.name }}</div>
							<s-checkbox :param="item" :index="index" v-model="item.all" @change="toggleAll"
								v-if="mode === 'checkbox'" />
						</div>
						<ul class="station-group">
							<li v-for="(station, index2) in item.children" :key="index2" :style="`width: ${width}`">
								<s-checkbox :param="station" :index="index2" :pIndex="index" v-model="station.checked" @change="update"
									v-if="mode === 'checkbox'" />
								<s-radio :param="station" :index="index2" :pIndex="index" v-model="station.checked"
									@change="radioSelect" v-if="mode === 'radio'" />
							</li>
						</ul>
					</li>
				</ul>
				<a-empty style="margin-top: 80px" v-else></a-empty>
			</div>
			<div class="list-operation">
				<div v-if="this.mode === 'checkbox'" class="station-btn empty" @click.stop="selectAll(false)">取消全选</div>
				<div v-if="this.mode === 'checkbox'" class="station-btn all" @click.stop="selectAll(true)">全选</div>
				<div class="station-btn cancel" @click.stop="cancel">取消</div>
				<div class="station-btn confirm" @click.stop="confirm">确定</div>
			</div>
		</div>
		<!-- </transition> -->
	</div>
</template>

<script>
import { Empty } from 'ant-design-vue'
import { buildLeftSideTreeByItem } from '../../../../utils/other'
import SCheckbox from './checkbox'
import SRadio from './radio'
import Tabs from './tab'

export default {
	components: {
		SCheckbox,
		SRadio,
		Tabs,
		AEmpty: Empty
	},
	props: {
		// 模式 单选、多选
		mode: {
			type: String,
			default: 'checkbox'
		},
		defaultType: {
			type: Number,
			default: 0
		},
		// 弹窗大小
		listSize: {
			type: Object,
			default: () => { }
		},
		// 输入框样式
		styles: {
			type: String,
			default: ''
		},
		// 列表最小宽度
		minItemWidth: {
			type: Number,
			default: 100
		},
		// 组件选中值
		value: {
			type: [Array, String],
			default: () => []
		},
		// 数据列表
		datas: {
			type: Array,
			default: () => []
		},
		// tab列表数据
		tabsData: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			folded: false,
			show: false,
			tabIndex: this.defaultType,
			list: [],
			selectedStation: '',
			selectedData: {
				texts: [],
				code: [],
				keys: []
			},
			isRight: false,
			tempSelected: [],
			tempList: [],
			showStation: false,
			tempTab: 0
		}
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	watch: {
		datas(v) {
			this.initData()
		},
		// 监听选中值，统一更新选中状态
		value(v) {
			this.initCheck()
		},
		selectedItem(items) {
			// console.log(`选中的类型:${items}`)
			this.$emit('tabChange', items)
		},
		list(data) {
			const res = this.getSearchParams()
			this.selectedData = res
		},
		// selectedData(data) {
		//   this.selectedStation = data.texts.join(',')
		// },
		tabIndex(index) {
			this.setList(index)
		},
		show(bol) {
			if (bol) {
				this.tempList = JSON.parse(JSON.stringify(this.list))
			}
		}
	},
	computed: {
		width() {
			if (this.listSize.width > 0) {
				const space = this.listSize.width - 140
				const count = Math.floor(space / this.minItemWidth)
				return `${Math.floor(1000 / count) / 10}%`
			} else {
				return '25%'
			}
		}
	},

	methods: {
		/* ----------------------------------------------------------------------
		| 初始化方法
		|-----------------------------------------------------------------------
		*/
		// 1.初始化组件数据
		initData() {
			if (!this.$utils.isNull(this.datas)) {
				// 获取数据成功后进行默认值初始化
				this.list = this.getTreeData(this.datas)
			} else {
				this.list = []
			}
			this.initCheck()
		},
		// 2.更新树选中状态
		initCheck() {
			const checkedItems = Array.isArray(this.value) ? this.value : this.value.split(',')

			this.list.forEach(st => {
				let stChecked = true
				st.children.forEach(nd => {
					const rdItem = nd
					rdItem.checked = checkedItems.indexOf(nd.value) > -1
					if (stChecked && !rdItem.checked) {
						stChecked = false
					}
				})
				st.all = stChecked
			})

			this.selectByCode(checkedItems)
			this.selectedStation = this.getSearchParams().texts.join(',')
		},

		showSelectedStation() {
			this.showStation = !this.showStation
		},
		fillText() {
			this.selectedStation = this.selectedData.texts.join(',')
		},
		selectByCode(code) {
			this.list.forEach((item, i) => {
				item.children.forEach(citem => {
					if (!citem.checked && code.indexOf(citem.code) > -1) {
						citem.checked = code.indexOf(citem.code) > -1
						this.$set(this.list, i, this.list[i])
					}
				})
			})
		},
		// 单选事件
		radioSelect(checked, index, pindex) {
			for (let i = 0; i < this.list.length; i++) {
				const group = this.list[i].children
				for (let j = 0; j < group.length; j++) {
					if (i === pindex && j === index) {
						group[j].checked = true
						this.$set(this.list, i, this.list[i])
					} else {
						group[j].checked = false
					}
				}
			}
			this.fillText()
		},
		// 站点选择事件
		update(checked, index, pindex) {
			const item = this.list[pindex]
			for (let i = 0; i < item.children.length; i++) {
				if (!item.children[i].checked) {
					item.all = false
					this.$set(this.list, pindex, item)
					return false
				}
			}
			item.all = true
			this.$set(this.list, pindex, item)
		},
		// 地区站点全选切换
		toggleAll(checked, index) {
			const item = this.list[index]
			item.all = checked
			item.children.map(e => (e.checked = checked))
			this.$set(this.list, index, item)
		},
		// 确定事件
		confirm() {
			this.fillText()
			this.hideList()
			//   this.$emit('change', this.selectedData)
			this.$emit('change', this.selectedData.code)
		},
		// 取消事件
		cancel() {
			this.list = this.tempList
			this.hideList()
			this.tabIndex = this.tempTab
		},
		// 选择全部站点
		selectAll(bol) {
			for (let i = 0; i < this.list.length; i++) {
				this.toggleAll(bol, i)
			}
		},
		// 显示列表
		showList() {
			window.addEventListener('click', this.windowClick)
			this.show = true
			this.tempTab = this.tabIndex
			this.getPopupPosition()
		},
		// 隐藏列表
		hideList() {
			window.removeEventListener('click', this.windowClick)
			this.show = false
		},
		// tab切换事件
		tabCange(index, item) {
			this.tabIndex = index
			this.$emit('tabchange', item)
		},
		// 获取选中站点
		getSearchParams() {
			const texts = []
			const code = []
			const keys = []
			for (let i = 0; i < this.list.length; i++) {
				for (let j = 0; j < this.list[i].children.length; j++) {
					const item = this.list[i].children[j]
					if (item.checked) {
						texts.push(item.name)
						code.push(item.code)
						keys.push(item.key)
					}
				}
			}
			return { texts: texts, code: code, keys: keys }
		},
		windowClick() {
			this.cancel()
		},
		getPopupPosition() {
			if (!this.show) {
				return
			}
			// 打开列表判断右侧剩余距离，判断弹窗在左边还是右边
			const { left, width } = this.$refs.box.getBoundingClientRect()
			this.isRight = document.body.clientWidth - (left + width) < 600
		},

		/* ----------------------------------------------------------------------
		| 数据处理
		|-----------------------------------------------------------------------
		*/
		// 数据成树结构
		getTreeData(data) {
			return buildLeftSideTreeByItem(data, 'parentId', 'value', this.treeConstruction)
		},

		// 树结构 数据
		treeConstruction(item) {
			item.children = []
			item.name = item.label
			item.code = item.value
			item.isDisabled = false
			item.checked = false
		}
	},
	created() { },

	mounted() {
		const self = this
		this.$nextTick(() => {
			this.initData()
		})
		window.addEventListener('resize', self.getPopupPosition)
	},
	destroyed() {
		window.removeEventListener('resize', self.getPopupPosition)
	}
}
</script>

<style lang="less">
.station-select {
	position: relative;
	width: 100%;
	display: inline-block;
	text-align: left;

	.arrow {
		position: absolute;
		width: 20px;
		height: 20px;
		right: 5px;
		top: 6px;
		line-height: 20px;
		text-align: center;
		font-size: 12px;
		font-family: 'youyuan';
		font-weight: bold;
		transform: rotateZ(90deg);
	}

	.stationtext {
		display: inline-block;
		width: 100%;
		height: 32px;
		line-height: 1.5;
		padding: 4px 25px 4px 7px;
		font-size: 14px;
		border: 1px solid #b5b5b5;
		border-radius: 4px;
		color: #515a6e;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: pointer;
		transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}

	.list {
		z-index: 999;
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 2px;
		height: 400px;
		width: 400px;
		border: 1px solid #dcdee2;
		border-radius: 4px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.list-content {
			flex: 1;
			height: 0;
			padding: 5px;
			box-sizing: border-box;
			overflow: auto;

			.province-name {
				font-size: 14px;
				font-weight: bold;
				color: #000;
				line-height: 34px;
				border-bottom: 1px solid rgba(241, 241, 241, 0.8);

				.anticon {
					font-size: 10px;
					margin: 0 3px;
				}

				&:hover {
					background-color: #f1f1f1;
				}
			}

			ul {
				padding: 0;
				margin: 0;
				color: #000;
			}

			.city-group {
				display: flex;
				border-bottom: 1px solid rgba(241, 241, 241, 0.8);

				.group-name {
					width: 120px;

					.radio {
						font-size: 12px;
						font-weight: bold;
						line-height: 16px;
						padding: 7px 10px;
					}
				}
			}

			.station-group {
				flex: 1;
				width: 0;
				list-style: none;

				li {
					position: relative;
					float: left;
					padding-left: 10px;
					box-sizing: border-box;

					&::before {
						position: absolute;
						content: '';
						width: 1px;
						height: 20px;
						top: 5px;
						left: 0;
						background: rgba(241, 241, 241, 0.8);
					}
				}

				&::after {
					content: '';
					display: block;
					clear: both;
				}
			}
		}

		.list-operation {
			height: 42px;
			background: #f1f1f1;
			text-align: right;

			.show-station-btn {
				float: left;
				font-size: 12px;
				color: #1c84f0;
				margin-left: 15px;
				margin-top: 6px;
				cursor: pointer;
				-webkit-user-select: none;

				&>span {
					display: inline-block;
					vertical-align: top;
					width: 20px;
					height: 12px;
					border-radius: 2px;
					margin-top: 9px;
					margin-left: 5px;
					line-height: 12px;
					text-align: center;
					background-color: #1c80f4;
					color: #fff;

					.anticon {
						transform: scale(0.8);
					}
				}
			}

			.station-btn {
				display: inline-block;
				vertical-align: top;
				height: 32px;
				width: 60px;
				margin: 5px;
				font-size: 12px;
				line-height: 32px;
				text-align: center;
				background: #ccc;
				border-radius: 4px;
				color: #fff;
				-webkit-user-select: none;
				cursor: pointer;

				&.all {
					background-color: #19be6b;

					&:hover {
						background-color: #47cb89;
					}
				}

				&.confirm {
					background-color: #2d8cf0;

					&:hover {
						background-color: #57a3f3;
					}
				}

				&.empty {
					width: 70px;
					border: 1px solid #f30;
					color: #f30;
					background-color: transparent;

					&:hover {
						border: 1px solid #ff5c33;
						color: #ff5c33;
						background-color: transparent;
					}
				}

				&.cancel {
					background-color: #f30;

					&:hover {
						background-color: #ff5c33;
					}
				}
			}
		}
	}
}
</style>
