// 案例展示组件 用于图表 地图类的组件展示 通过展示图片 点击再展示效果类型
<template>
	<div class="examples-view-warp env-box">
		<div v-for="item in dataSource" :key="item.id" class="examples-view-panel">
			<h3 class="examples-view-head">
				<div class="examples-view-title">{{ item.title }}</div>
				<div v-if="item.subtitle" class="examples-view-subtitle">{{ item.subtitle }}</div>
			</h3>
			<a-row class="example-view-box" :gutter="16">
				<a-col v-for="list in item.list" :key="list.id" :span="4">
					<div class="example-list-item">
						<picture @click="onClick(list.params)">
							<img :src="list.image" style="width: auto" />
						</picture>
						<div class="item-area">
							<div class="item-title">{{ list.title }}</div>
							<div class="item-subtitle" v-if="list.subtitle">{{ list.subtitle }}</div>
						</div>
					</div>
				</a-col>
			</a-row>
		</div>
	</div>
</template>
<script>
export default {
	//要用到哪些子组件
	components: {},
	//父组件传递过来的数据（两种方式声明：1.数组 2.对象）
	props: {
		// 类型
		type: {
			type: String,
			default: () => {
				return 'echarts'
			}
		},
		// 数据源
		dataSource: {
			type: [Array],
			default: () => {
				return []
			}
		}
	},
	//组件私有数据（必须是function，而且要return对象类型）
	data() {
		return {}
	},
	//计算属性
	computed: {},
	//监听
	watch: {},
	//生命周期钩子：组件实例完成创建之后调用
	created() {},
	//生命周期钩子：组件实例渲染完成时调用
	mounted() {},
	//函数集，自己封装，便于开发使用
	methods: {
		/* ----------------------------------------------------------------------
		|  点击事件
		|-----------------------------------------------------------------------
		*/
		onClick(params) {
			const _this = this
			// $router.push 和 $router.go 但是vue2.0以后，这种方式就不支持新窗口打开的属性了，这个时候就需要使用this.$router.resolve
			let routeData = this.$router.resolve({
				name: 'codeView',
				query: {
					// examples-docs文件下 文件夹名称
					type: _this.type,
					// 文件名称
					folder: params.folder,
					// 对应属性名称
					fileName: params.fileName
				}
			})

			// 新增一个弹出框 展示代码预览
			window.open(routeData.href, '_blank')
		}
	}
}
</script>
<style lang="less" scoped>
.examples-view-warp {
	.examples-view-panel {
		margin-bottom: 20px;
		.examples-view-head {
			display: flex;
			flex-direction: row;
			align-items: flex-end;

			margin-bottom: 20px;
			padding-bottom: 10px;
			border-bottom: 1px solid #e1e5f2;
			.examples-view-title {
				font-weight: normal;
				color: #464646;
				font-size: 20px;
			}
			.examples-view-subtitle {
				font-size: 16px;
				padding-left: 5px;
				color: #949cb1;
				font-weight: 200;
			}
		}
		.example-view-box {
			.example-list-item {
				picture {
					margin-top: 10px;
					border-radius: 5px;
					box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
					overflow: hidden;
					display: block;
					img {
						max-width: 100%;
						vertical-align: middle;
						width: 100%;
						height: 100%;
						transition: 0.3s ease-in-out;
						cursor: pointer;
						&:hover {
							transform: scale(1.2);
						}
					}
				}
				.item-area {
					.item-title {
						color: #293c55;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding: 10px 10px 2px 10px;
						margin: 0;
						display: block;
						font-size: 14px;
						text-align: left;
					}
					.item-subtitle {
						font-size: 12px;
						text-align: left;
						color: #aaa;
						display: block;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin: 3px 0 0 0;
						padding-left: 10px;
					}
				}
			}
		}
	}
}
</style>
