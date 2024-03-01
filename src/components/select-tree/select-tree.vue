<template>
	<div class="wrap-tree">
		<a-input style="width: 180px" @focus="() => (visible = true)" placeholder="请选择" :value="activeName.join()" v-if="!son">
			<a-icon slot="suffix" type="down" />
		</a-input>

		<div class="tree-box" v-show="visible || son" :style="{ width: '100%', height: height, right: overstep ? 0 : '' }" ref="treeContainer">
			<div class="tree" :style="{ width: leftWidth }">
				<a-input-search placeholder="省市县搜索" class="searchInput" @input="onInput" />
				<a-tree
					v-model="checkedKeys"
					:checkable="multiple"
					:expanded-keys="expandedKeys"
					:auto-expand-parent="autoExpandParent"
					:selected-keys="selectedKeys"
					:tree-data="treeData"
					@expand="onExpand"
					@select="onSelect"
					@check="onCheck"
					show-icon
					default-expand-all
				>
					<a-icon slot="smile" type="profile" theme="filled" style="color: goldenrod" />
					<a-icon slot="isqu" type="layout" theme="filled" style="color: red" />
					<template slot="title" slot-scope="{ title }">
						<span v-if="title.indexOf(searchValue) > -1">
							{{ title.substr(0, title.indexOf(searchValue)) }}
							<span style="color: #f50">{{ searchValue }}</span>
							{{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
						</span>
						<span v-else>{{ title }}</span>
					</template>
				</a-tree>
			</div>
			<div class="children" :style="{ width: rightWidth }">
				<div class="ascription">
					<div>
						<a-button v-for="(item, i) in controlList" :key="i" :class="i == dosIndex ? 'active' : ''" @click="onDosChange(item, i)">
							{{ item.name }}
						</a-button>
					</div>
					<div v-if="level == 1 && queryed !== 'meteor'">
						<a-button v-for="(item, i) in ascriptionList" :key="i" :class="i == ascriptionIndex ? 'active' : ''" @click="ascriptionChange(i)">
							{{ item }}
						</a-button>
					</div>
				</div>
				<div class="_collapse_contanier">
					<template v-if="controlList[dosIndex].list && controlList[dosIndex].list.length > 0 && controlList[dosIndex].list[0].children">
						<div v-for="item in controlList[dosIndex].list" :key="item.value" class="_collapse">
							<!-- 父项 -->
							<div class="_collapse_content" @click="onCollapse($event, item.value)">
								<span :id="'parent-wrap' + item.value">
									<a-checkbox :disabled="!multiple" :checked="parentCheck(item)" @change="e => onTypeChecked(e, item)">{{ item.title }}</a-checkbox>
								</span>
								<span>
									<a-icon class="_icon" type="caret-right" :rotate="item.isActive ? 90 : 0"></a-icon>
								</span>
							</div>

							<!-- 子项 -->
							<ul :id="'panel' + item.value" class="_collapse-panel">
								<li v-for="(items, i) in item.children" :key="items.value">
									<span :title="items.title" v-if="multiple">
										<a-checkbox :checked="items.checked" @change="e => onItemCheck(items, i)">
											{{ items.title.length > 7 ? items.title.substring(0, 7) + '...' : items.title }}
										</a-checkbox>
									</span>
									<span :title="items.title" v-else>
										<a-radio :checked="items.checked" @change="e => onItemCheck(items, i)">
											{{ items.title.length > 7 ? items.title.substring(0, 7) + '...' : items.title }}
										</a-radio>
									</span>
								</li>
							</ul>
						</div>
					</template>
					<template v-else>
						<a-col v-for="(item, i) in controlList[dosIndex].list" :key="i" span="8">
							<a-checkbox v-if="multiple" :checked="item.checked" @click="onItemCheck(item, i)">
								<span :title="item.title">{{ item.title.length > 5 ? item.title.substring(0, 4) + '...' : item.title }}</span>
							</a-checkbox>
							<a-radio v-else :checked="item.checked" @click="onItemCheck(item, i)">
								<span :title="item.title">{{ item.title.length > 5 ? item.title.substring(0, 4) + '...' : item.title }}</span>
							</a-radio>
						</a-col>
					</template>
				</div>
				<!-- <a-row class="items">
					<a-col span="8" v-for="(item, i) in controlList[dosIndex].list" :key="i">
						<a-checkbox v-if="multiple" :checked="item.checked" @click="onItemCheck(item, i)">
							<span :title="item.title">{{ item.title.length > 5 ? item.title.substring(0, 4) + '...' : item.title }}</span>
						</a-checkbox>
						<a-radio v-else :checked="item.checked" @click="onItemCheck(item, i)">
							<span :title="item.title">{{ item.title.length > 5 ? item.title.substring(0, 4) + '...' : item.title }}</span>
						</a-radio>
					</a-col>
				</a-row> -->

				<div class="footer">
					<span v-if="multiple">
						<a-checkbox @change="onAllChecked" :checked="allCheck"> 全选 </a-checkbox>
					</span>
					<div class="btn-box">
						<a-button type="primary" class="submit" @click="onConfim()">确定</a-button>
						<a-button @click="onCancel()">取消</a-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { cloneDeep, throttle } from 'lodash'
import collect from 'collect.js'
import { parseJson, searchFun } from './utils'
//数组删除指定项方法
Array.prototype.remove = function (val) {
	const index = this.indexOf(val)
	if (index > -1) {
		this.splice(index, 1)
	}
}

export default {
	props: {
		// 数据源
		dataSource: { type: Array, default: () => [] },
		level: { type: Number, default: 1 },
		expandCode: { type: String, require: true },
		defaultCode: { type: Array, default: () => [] },
		echo: { type: Boolean, default: true },
		queryed: { type: String },
		//dosChange选项回调 onSiteClose点击取消或确定的回调
		// visible: { type: Boolean, default: true },
		width: { type: String, default: '100%' }, //选择器宽度
		leftWidth: { type: String, default: '35%' }, //选择器宽度
		rightWidth: { type: String, default: '65%' }, //选择器宽度
		height: { type: String, default: '400px' }, //选择器高度
		multiple: { type: Boolean, default: true }, //多选/单选
		// treeData: { type: Array, default: () => [] }, //数据源
		son: { type: Boolean, default: false }, //当前组件作为子项的时候移除自动适应屏幕效果,上级父组件做自适应
		onInit: { type: Function, default: () => () => {} }
	},
	data() {
		return {
			treeData: [],
			expandedKeys: ['0'],
			autoExpandParent: true,
			checkedKeys: [],
			selectedKeys: [],
			visible: false,
			activeName: [],

			ItemDatas: [],
			datas: [],
			rightItem: [], //右侧渲染数据
			selectedItems: [], // 已被选择的选项
			overstep: false, //是否超出浏览器

			controlList: [
				{
					name: '当前',
					list: []
				},
				{
					name: '已选项',
					list: []
				}
			],
			ascriptionList: ['全部', '国控', '省控'],
			dosIndex: 0,
			ascriptionIndex: 0,
			dataList: [],
			searchValue: '' // 搜索关键词
		}
	},
	watch: {
		visible: {
			immediate: true,
			handler() {
				this.isOverDtep()
			}
		},
		dataSource: {
			deep: true,
			handler(val) {
				this.initData()
				this.expandedKeys = ['0']
			}
		},
		level() {
			this.multipleEffect()
		},
		multiple() {
			this.initData()
		},
		defaultCode: {
			deep: true,
			handler() {
				this.initData()
			}
		}
	},
	computed: {
		allCheck() {
			// 是否全选
			let isAllCheck = false
			if (this.rightItem.length > 0) {
				if (this.rightItem[0].children) {
					const checkeds = this.rightItem
						.map(i => i.children.map(c => c.checked))
						.reduce((prev, next) => {
							return prev.concat(next) //循环将数组进行拼接
						})
					isAllCheck = checkeds.every(i => i)
				} else {
					isAllCheck = this.rightItem.every(item => item.checked)
				}
			}
			return isAllCheck
		}
	},
	methods: {
		// 初始化
		initData() {
			this.rightItem = []
			// 左侧树结构数据
			if (!this.$utils.isNull(this.dataSource)) {
				this.datas = this.duplicationKeyHandle(this.dataSource)
				const treeDatas = this.datas.filter(s => s.level !== this.level)
				if (!this.$utils.isNull(treeDatas)) {
					const topLevel = collect(treeDatas).max('level')
					let tops = treeDatas.filter(d => d.level === topLevel)
					tops = collect(tops).sortBy(d => `${d.rank}_${d.id}`).items
					const result = []
					tops.forEach(element => {
						const children = this.cardingHierarchy(element, treeDatas)
						result.push({
							title: element.title,
							key: element.id,
							children: children
						})
					})
					this.treeData = result
					this.generateList(this.treeData)
					// console.log('this.dataList', this.dataList)
				}
				// 右侧选择框数据
				this.ItemDatas = this.datas.filter(s => s.level === this.level)
				if (this.defaultCode && this.defaultCode.length) {
					// 有默认参数
					this.defaultCode.forEach(e => {
						this.ItemDatas.filter(d => {
							if (d['value'] == e) {
								this.rightItem.push(d)
							}
						})
					})
					this.rightItem.forEach((item, index) => {
						this.$set(item, 'checked', true)
					})
				} else {
					// 无默认参数
					this.rightItem = this.ItemDatas.filter(d => d.parent === this.expandCode)
					const selectedCount = this.multiple ? 3 : 1
					this.rightItem.forEach((item, index) => {
						if (index < selectedCount) {
							this.$set(item, 'checked', true)
						}
					})
				}
				// this.allCheckedList()
				this.controlListHandle(0, this.rightItem)
				// 数据回显到父组件
				const titleArr = []
				const keyArr = []
				const selectedItems = this.rightItem.filter(d => d.checked)
				selectedItems.forEach(item => {
					titleArr.push(item.title)
					keyArr.push(item.value)
				})
				this.activeName = titleArr
				this.selectedItems = keyArr

				// 是否回显初始值
				if (this.echo) {
					this.son ? this.onInit(selectedItems, keyArr) : this.$emit('onSiteClose', selectedItems, this.selectedItems)
				}
			}
			this.multipleEffect()
		},

		/**
		 * 递归构建树数据结构
		 */
		cardingHierarchy(parent, selection) {
			const result = []
			let items = selection.filter(d => d.parent === parent.id && d.level < parent.level)
			items = collect(items).sortBy(d => `${d.rank}_${d.id}`).items
			// 处理直辖区省份和城市编码一样的问题
			const theSameCode = items.filter(d => d.id === parent.id)
			if (theSameCode.length > 0) items = theSameCode
			items.forEach(element => {
				const children = this.cardingHierarchy(element, selection)
				result.push({
					title: element.title,
					key: element.id,
					parent: element.parent,
					children: children
				})
			})
			return result
		},
		// 处理省份和城市value值相同的问题
		duplicationKeyHandle(data) {
			const record = cloneDeep(data)
			// 添加id属性 作为树形数据的key
			record.forEach(item => (item.id = item.value))
			let level = 0
			const arr = [] // 找出存在相同id的项
			for (let i = 0; i < record.length - 1; i++) {
				for (let j = i + 1; j < record.length; j++) {
					if (record[i].id === record[j].id) {
						level = record[i].level >= record[j].level ? record[i].level : record[j].level
						arr.push(record[i])
						arr.push(record[j])
					}
				}
			}
			// 城市不做处理直接 return
			if (arr.length == 0 || this.level == 9) return record
			arr.forEach(ele => {
				// 存在相同id 做额外处理
				ele.level == level ? (ele.id = ele.id + '-0') : (ele.parent = ele.id + '-0')
			})
			return record
		},
		//判断选项框是否超出屏幕宽度
		isOverDtep() {
			if (this.son) return
			this.$nextTick(() => {
				const container = this.$refs.treeContainer
				const ww = window.innerWidth
				const cr = container.getBoundingClientRect().right
				cr > ww && (this.overstep = true)
				if (this.layout) {
				}
			})
		},

		// 筛选框输入
		onInputFocus() {
			this.expandedKeys = []
		},

		getParentKey(key, tree) {
			let parentKey
			for (let i = 0; i < tree.length; i++) {
				const node = tree[i]
				if (node.children) {
					if (node.children.some(item => item.key === key)) {
						parentKey = node.key
					} else if (this.getParentKey(key, node.children)) {
						parentKey = this.getParentKey(key, node.children)
					}
				}
			}
			return parentKey
		},
		generateList(data) {
			for (let i = 0; i < data.length; i++) {
				const node = data[i]
				const key = node.key
				this.dataList.push({ key, title: node.title })
				if (node.children) {
					this.generateList(node.children)
				}
			}
		},

		//input框搜索关键字
		onInput: throttle(function (e) {
			const value = e.target.value
			if (!value) {
				this.expandedKeys = []
				this.searchValue = value
				this.autoExpandParent = false
				return
			}
			const expandedKeys = this.dataList
				.map(item => {
					if (item.title.indexOf(value) > -1) {
						return this.getParentKey(item.key, this.treeData)
					}
					return null
				})
				.filter((item, i, self) => item && self.indexOf(item) === i)
			this.searchValue = value
			this.expandedKeys = expandedKeys
			this.autoExpandParent = true
			// searchFun(this.treeData, this.expandedKeys, value)
			// console.log('this.treeData', this.treeData, this.expandedKeys)
		}, 1000),

		//点击右侧选项按钮
		onDosChange(item, i) {
			this.dosIndex = i

			this.ascriptionListHandle()
			this.$emit('dosChange', item)
		},
		ascriptionChange(index) {
			this.ascriptionIndex = index
			this.ascriptionListHandle()
		},

		// 点击某个check框 |----------------------------------
		onItemCheck(item, i) {
			if (!this.multiple) {
				//单选模式
				this.datas.forEach((ele, j) => {
					this.$set(ele, 'checked', false)
				})
				this.$set(item, 'checked', !item.checked)

				this.selectedItems = [item.value]
			} else {
				//多选模式
				this.$set(item, 'checked', !item.checked)
				this.multipleEffect()
			}
		},
		// 分组项全选
		parentCheck(target) {
			const checked = target.children.every(item => item.checked)
			return checked
		},
		// 分类权限 ----------------------------------------------------|
		onTypeChecked(e, currentItem) {
			currentItem.checked = !currentItem.checked
			currentItem.children.forEach(ci => {
				this.$set(ci, 'checked', currentItem.checked)
			})
			this.multipleEffect()
		},
		// 全选 |------------------------------
		onAllChecked(e) {
			if (!this.rightItem.length) return
			this.rightItem = this.controlList[this.dosIndex].list
			this.rightItem.forEach(item => {
				if (item.children) {
					item.children.forEach(c => {
						this.$set(c, 'checked', e.target.checked)
					})
				} else {
					this.$set(item, 'checked', e.target.checked)
				}
			})

			this.multipleEffect()
			if (!e.target.checked && this.dosIndex == 1) {
				this.checkedKeys = []
			}
		},
		// ------------------------------------|

		// 点击确定 |------------------------------
		onConfim() {
			this.visible = false
			const arr = this.datas.filter(item => item.checked == true && item.level == this.level)
			const titleArr = []
			const keyArr = []
			if (arr.length) {
				arr.forEach(item => {
					titleArr.push(item.title)
					keyArr.push(item.value)
				})
			}
			this.activeName = titleArr
			this.$emit('onSiteClose', arr, keyArr)
			this.selectedItems = keyArr
		},

		// 获取选中的项目
		getSearchParams() {
			return this.selectedItems
		},
		// ------------------------------------|

		//点击取消
		onCancel() {
			this.visible = false
			this.$emit('onSiteClose', 'close')
		},

		// 左侧树点击展开
		onExpand(expandedKeys) {
			// console.log('onExpand', expandedKeys)
			// if not set autoExpandParent to false, if children expanded, parent can not collapse.
			// or, you can remove all expanded children keys.
			this.expandedKeys = expandedKeys
			this.autoExpandParent = false
		},

		// 左侧树点击
		onCheck(checkedKeys, e) {
			// console.log('onCheck', checkedKeys, e.node.eventKey)
			this.checkedKeys = checkedKeys

			//关联子项做全选
			let arr = []
			arr = [...arr, ...parseJson(this.treeData, 'key', e.node.eventKey)] //所有checked为真的父级对象
			//checked为false时
			if (!e.checked) {
				this.datas.forEach(item => {
					if (item.parent == e.node.eventKey) {
						this.$set(item, 'checked', false)
						this.checkedKeys.includes('0') && this.checkedKeys.remove('0')
					}
					if (e.node.eventKey == 0) {
						this.$set(item, 'checked', false)
					}
				})
				//递归获取所有子项的key
				function getKey(data) {
					const res = []
					data.forEach(item => {
						res.push(item.key)
						if (Array.isArray(item.children) && item.children.length) {
							res.push(...getKey(item.children))
						}
					})
					return res
				}
				const secondArr = getKey(arr)
				secondArr.forEach(item => {
					this.datas.forEach(ele => {
						if (ele.parent == item) {
							this.$set(ele, 'checked', false)
						}
					})
				})
			} else {
				//check为true
				const checkArr = []
				for (let i = 0; i < checkedKeys.length; i++) {
					this.datas.forEach(item => {
						if (item.parent == checkedKeys[i]) {
							checkArr.push(item)
							this.$set(item, 'checked', true)
						}
					})
				}
				if (this.dosIndex == 0) {
					this.dosIndex = 1
				}
				// 为站点时需要多做一步处理,删除数据中level不为1的
				const isLevel = checkArr.some(item => item.level == 1)
				if (isLevel) {
					for (let j = 0; j < checkArr.length; j++) {
						if (checkArr[j].parent == checkArr[j].value || checkArr[j].level > 1) {
							checkArr[j].checked && delete checkArr[j].checked
						}
					}
				}
			}
			this.ascriptionListHandle()
			this.multipleEffect()
		},

		// 左侧树选中
		onSelect(selectedKeys, info) {
			// console.log('onSelect',selectedKeys, info)
			this.selectedKeys = selectedKeys
			if (!info.selected) return

			if (this.dosIndex == 1) {
				this.dosIndex = 0
			}
			this.ascriptionListHandle()
		},

		//右侧子项选中后父项添加标识
		multipleEffect() {
			if (!this.multiple) return
			const obj = {} // 计算出右侧属于同一个父级的所有子项
			const arr = [] // 把obj处理成json格式
			for (let index = 0; index < this.ItemDatas.length; index++) {
				const element = this.ItemDatas[index]
				obj[element['parent']] ? obj[element['parent']]++ : (obj[element['parent']] = 1)
			}
			const datas = [...this.datas]
			for (const i in obj) {
				let num = 0 //计算出选中的
				for (let j = 0; j < datas.length; j++) {
					const item = datas[j]
					if (item.level == this.level && item.parent == i && item.checked) {
						num++
					}
				}
				arr.push({ key: i, value: obj[i], checked: num })
			}
			const treeData = JSON.parse(JSON.stringify(this.treeData))
			//找到需要设置标识的父级
			for (let t = 0; t < arr.length; t++) {
				const attr = arr[t]
				const parObj = parseJson(treeData, 'key', attr.key)[0]
				if (parObj) {
					if (attr.value > attr.checked && attr.checked > 0) {
						parObj.class = 'ant-tree-checkbox-indeterminate'
						this.checkedKeys.includes(attr.key) && this.checkedKeys.remove(attr.key)
					} else if (attr.checked == 0) {
						parObj.class = ''
						const arr = this.getParentIdList(treeData, attr.key)
						arr.forEach(item => {
							this.checkedKeys.includes(item) && this.checkedKeys.remove(item)
						})
					} else if (attr.checked == attr.value) {
						!this.checkedKeys.includes(attr.key) && this.checkedKeys.push(attr.key)
						parObj.class = ''
					} else {
						parObj.class = ''
						this.checkedKeys.includes(attr.key) && this.checkedKeys.remove(attr.key)
					}
				}
			}
			this.treeData = treeData
		},

		// 设置右侧选项对应的数据
		controlListHandle(index, listArr) {
			let arr = []
			const d = collect(listArr)
			const decisionObj = listArr.find(item => item.groupType) // 根据groupType进行排序分组
			if (listArr.length > 0 && decisionObj && decisionObj.groupType) {
				const groupItems = d.groupBy(e => e.groupType)
				for (let item in groupItems.items) {
					arr.push({
						title: item,
						value: item + 100 * Math.random(), // 绑定dom id 保证唯一性
						isActive: true,
						children: groupItems.items[item].sortBy('value').items
					})
				}
			} else {
				arr = listArr
			}
			this.controlList[index].list = arr
		},
		// 根据id查找该项所有父级的id
		getParentIdList(list, id) {
			if (!list || !id) {
				return ''
			}
			const arr = []
			const findParent = (data, nodeId, parentId) => {
				for (let i = 0, length = data.length; i < length; i++) {
					const node = data[i]
					if (node.key === nodeId) {
						arr.unshift(nodeId)
						if (nodeId === list[0].key) {
							break
						}
						findParent(list, parentId)
						break
					} else {
						if (node.children) {
							findParent(node.children, nodeId, node.key)
						}
						continue
					}
				}
				return arr
			}
			return findParent(list, id)
		},

		// 当前选择/已选项 + 国控省控数据
		ascriptionListHandle() {
			const key = this.ascriptionIndex
			const selectKey = this.selectedKeys.length ? this.selectedKeys[0].split('-')[0] : '' // 当前省份项
			let current = [] // 当前
			// 点击省级查所有站点
			const that = this
			function siteFind(keys) {
				for (let i = 0; i < that.datas.length; i++) {
					const item = that.datas[i]
					if (item.parent == keys) {
						let id = item.value
						if (item.level == that.level) {
							current.push(item)
						} else {
							siteFind(id)
						}
					}
				}
			}
			siteFind(selectKey)
			let checkList = this.datas.filter(item => item.checked && item.level == this.level) // 已选项

			if (key) {
				// 国控/省控
				current = current.filter(ele => ele.controlLevel == key)
				checkList = checkList.filter(ele => ele.controlLevel == key)
			}

			this.controlListHandle(0, current)
			this.controlListHandle(1, checkList)
			this.rightItem = this.controlList[this.dosIndex].list
		},
		// 展开、收起
		onCollapse(e, key) {
			const parentWrap = document.getElementById(`parent-wrap${key}`).getBoundingClientRect()
			if (parentWrap.right >= e.target.getBoundingClientRect().right) return
			// 控制功能
			const panl = document.getElementById('panel' + key)
			const display = panl.style.display || 'flex'
			panl.style.display = display == 'none' ? 'flex' : 'none'

			// 控制箭头
			const datas = this.controlList[this.dosIndex].list
			datas.forEach(item => {
				if (item.value === key) {
					item.isActive = !item.isActive
				}
			})
		}
	},
	created() {
		this.initData()
	},
	mounted() {
		setTimeout(() => {
			//设置默认展开第一层
			this.expandedKeys = ['0']
		}, 1000)
	}
}
</script>
<style>
ul,
li {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
<style lang="less" scoped>
.wrap-tree {
	position: relative;
	z-index: 999;

	.ant-tree {
		font-size: 13px;
	}
}

.tree-box {
	display: flex;
	overflow: hidden;
	margin-top: 3px;
	position: absolute;
	background: #fff;
	width: 100%;
	height: 100%;
	border-top: 1px solid #ddd;
	box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);

	.tree {
		width: 40%;
		height: 100%;
		border-right: 1px solid #ddd;
		background-color: rgba(0, 0, 0, 0.02);
		padding: 10px;
		overflow-y: auto;

		.searchInput {
			width: 90%;
			transform: translate(5%, 0);
			positive: sticky;

			/deep/ .ant-input {
				font-size: 12px !important;
			}
		}
	}

	.children {
		width: 60%;
		height: 100%;
		position: relative;

		.ascription {
			width: 100%;
			padding: 10px;
			display: flex;
			justify-content: space-between;

			button {
				margin-right: 5px;
			}

			.ant-btn {
				font-size: 12px;
				padding: 0 10px;
				height: 30px;
			}
		}

		.items {
			width: 100%;
			height: 75%;
			padding: 0 10px;
			overflow-y: auto;

			div {
				width: calc(100% / 3);
				height: 40px;
				line-height: 40px;

				.ant-checkbox-wrapper {
					color: rgba(0, 0, 0, 0.75);
					font-size: 13px;
				}
			}
		}

		._collapse_contanier {
			height: calc(100% - 100px);
			overflow: auto;
			padding: 10px;

			._collapse {
				._collapse_content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-weight: bold;
					font-size: 14px;

					&:hover {
						background: #f7f5f5;
					}

					._icon {
						font-size: 16px;
						cursor: pointer;
					}
				}

				._collapse-panel {
					padding: 5px 10px;
					display: flex;
					flex-wrap: wrap;

					li {
						margin-top: 2px;
						width: 50%;
					}
				}
			}
		}

		.ant-checkbox-disabled + span {
			color: #000;
		}

		.footer {
			width: 100%;
			height: 50px;
			background: rgba(0, 0, 0, 0.02);
			position: absolute;
			bottom: 0;
			display: flex;
			align-items: center;
			padding: 0 10px;

			.btn-box {
				position: absolute;
				right: 10px;

				.ant-btn {
					font-size: 12px;
				}

				.submit {
					margin-right: 10px;
				}
			}
		}
	}
}
</style>
