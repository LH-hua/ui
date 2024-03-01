<template>
	<div>
		<a-collapse class="form-item" :activeKey="'1'" expand-icon-position="right" v-if="cascade.show || true">
			<a-collapse-panel key="1" :header="cascade.name">
				<div class="btn-box">
					<a-button
						:class="item.active ? 'active' : ''"
						v-for="(item, index) in cascade.values"
						:key="index"
						@click="openTag(item)"
						class="el-button"
						:style="{ width: item.width }"
						>{{ item.name }}</a-button
					>
				</div>
			</a-collapse-panel>
		</a-collapse>

		<div v-if="temp_data && temp_data.values && temp_data.values.length">
			<cascades-form-tree :cascade="temp_data" @change="changeTree" />
		</div>
		<div v-if="temp_data && temp_data.cascades && temp_data.cascades.length">
			<div v-for="(cascade, index) in temp_data.cascades" :key="index">
				<cascades-form-tree :cascade="cascade" @change="changeTree" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CascadesFormTree',
	props: {
		cascade: {
			type: Object,
			required: true,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			temp_data: {}
		}
	},
	methods: {
		changeTree(tree) {
			this.$emit('change', tree)
		},
		// 激活标签
		selTree(tree, list) {
			list = list.map(item => {
				if (tree.key === item.key) {
					item.active = true
				} else {
					item.active = false
				}
				return item
			})
		},
		focusTree(tree) {
			if (tree.cascades) {
				tree.cascades.map(item => {
					if (item.values) {
						item.values.map((sub, index) => {
							item.values[index].active = false
							item.values[0].active = true
							if (sub.cascades) {
								this.focusTree(sub, true)
							}
						})
					}
				})
			}
		},
		// 选中标签
		openTag(tree) {
			this.temp_data = tree
			this.selTree(tree, this.cascade.values)
			this.focusTree(tree)
			this.$emit('change', tree)
		},
		init(tree) {
			this.temp_data = tree.values[0]
			this.selTree(tree.values[0], tree.values)
			this.focusTree(tree.values[0])
			this.$emit('created', tree.values[0])
		}
	},
	watch: {
		cascade(val) {
			if (val && val.values && val.values.length) {
				this.init(val)
			}
		}
	},
	created() {
		this.init(this.cascade)
	}
}
</script>

<style lang="less" scoped>
.form-item{
  margin-bottom: 10px;
  .btn-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    button {
      padding: 0 5px;
      margin: 5px;
    }
    .el-button {
      margin: 2px !important;
      padding: 0 5px;
      flex-grow: 1;
    }
    .el-active {
      border-color: #40a9ff !important;
    }
  }
}
/deep/.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
   padding: 7px 5px !important;
   padding-left: 10px !important;
 }
</style>
