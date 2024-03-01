<template>
	<a-card
		class="cascades-form-box"
		:style="{
			'min-height': `${height}px`,
			'max-height': `${height}px`,
			'min-width': `${width}px`,
			'max-width': `${width}px`,
			overflow: 'auto'
		}"
	>
		<p slot="title" v-show="title">
			<a-icon type="setting" style="color:#fff;margin-right:5px" />
			<span>{{ title }}</span>
		</p>
		<div>
			<slot name="top"></slot>
			<div>
				<div v-for="(parameter, index) in parameters" :key="index">
					<cascades-form-tree :cascade="parameter" @change="changeTree" @created="inited" />
				</div>
			</div>
			<slot name="foot"></slot>
		</div>
	</a-card>
</template>

<script>
import CascadesFormTree from './cascades-form-tree'

export default {
	components: { CascadesFormTree },
	props: {
		formItems: {
			type: Array,
			default: () => {
				return []
			}
		},
		title: {
			type: String,
			default: () => '查询条件'
		},
		activeCollapse: {
			type: String,
			default: () => {
				return '1'
			}
		},
		height: {
			type: Number
		},
		width: {
			type: Number
		}
	},
	data() {
		return {
			parameters: [],
			selectTreeObject: {},
			count: 0
		}
	},
	watch: {
		formItems(val) {
			this.parameters = val
			this.count = 0
		}
	},
	methods: {
		changeTree() {
			this.selectTreeObject = {}
			this.parameters.map(paramter => {
				const key = paramter.key
				const actived = paramter.values.find(item => item.active)
				if (actived) {
					const value = actived.key
					this.selectTreeObject[key] = value
					this.elveTree(paramter.values.find(item => item.active))
				}
			})
			this.$emit('change', this.selectTreeObject)
		},
		inited() {
			this.selectTreeObject = {}
			this.parameters.map(paramter => {
				const key = paramter.key
				const actived = paramter.values.find(item => item.active)
				if (actived) {
					const value = actived.key
					this.selectTreeObject[key] = value
					this.elveTree(paramter.values.find(item => item.active))
				}
			})
			this.count++
			if (this.count === this.parameters.length) {
				this.$emit('change', this.selectTreeObject)
			}
		},
		elveTree(tree) {
			if (tree.cascades) {
				tree.cascades.map(item => {
					item.values.map(sub => {
						if (sub.active) {
							this.selectTreeObject[item.key] = sub.key
							if (sub.cascades) {
								this.elveTree(sub)
							}
						}
					})
				})
			}
		}
	},
	mounted() {
		this.parameters = this.formItems
		this.count = 0
	}
}
</script>

<style lang="less" scoped>
.cascades-form-box{
  /deep/ .ant-card-body{
    padding: 10px 5px 30px 5px !important;
    overflow: hidden;
  }
  /deep/.ant-card-head {
  min-height: 38px;
  line-height: 38px;
  background: #2f72bd;
  padding-left: 10px;
  .ant-card-head-title {
    // 条件选择div
    height: 32px;
    font-weight: bold;
    padding: 0;
    p{
      line-height: 35px;
      span {
        //条件选择文本
        font-size: 14px !important;
        line-height: 32px;
        vertical-align: middle;
        margin-top: -2px;
        display: inline-block;
        color: #fff;
      }
    }
  }
}
}
</style>
