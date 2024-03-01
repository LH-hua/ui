<template>
	<div class="env-chart">
		<div class="chart" :style="{ opacity: isEmpty ? 0 : 1 }" ref="chartDom"></div>
		<div v-if="isEmpty" class="el-isEmpty">
			<slot name="empty" v-if="this.$slots.empty"></slot>
			<Empty v-else :description="emptyText"></Empty>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import ResizeListener from 'element-resize-detector'
import { merge } from 'lodash'
import { Empty } from 'ant-design-vue'
import methodsApi from './methods/index'
import graphical from './graphical/index'
import toolBox from './tool/tool-box'
import { color } from './graphical/default-chart-config'

export default {
	name: 'EchartsBar',
	// 要用到哪些子组件
	components: { Empty },
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		// 标题
		title: {
			type: String,
			default: () => null
		},
		// 副标题
		subtext: {
			type: String,
			default: () => null
		},
		// x坐标轴的值
		chartAxis: {
			type: Array,
			required: false,
			default: () => []
		},
		// y坐标轴的值
		chartYaxis: {
			type: [Array, Object],
			required: false,
			default: () => []
		},
		markLine: {
			type: Array,
			default: () => []
		},
		// 数据源
		chartData: {
			type: Array,
			required: false,
			default: () => []
		},
		// 图表展示 形状
		chartType: {
			type: String,
			default: () => 'bar'
		},
		// 颜色配置
		chartColor: {
			type: [Array, String, Number],
			default: () => null
		},
		// 热力图配置
		hotGraph: {
			type: [Array],
			default: () => []
		},
		// 内置配置
		info: {
			type: Object,
			default: () => ({})
		},
		// 自定义图表的配置
		extraOption: {
			type: Object,
			default: () => ({})
		},
		csvExport: {
			type: Function
		},
		abilityApi: {
			type: Object,
			default: () => ({
				name: '',
				params: {}
			})
		},
		//visualMao地图数据
		mapOption: {
			type: Object
		}
	},
	// 数据
	data() {
		return {
			/** @msg 地铁图 属性
        ----------------------------------------------------------------*/
			chart: null,
			defaultsOption: {}, // 默认配置
			styleOption: {}, //内置配置
			axisData: [], // X坐标轴名称
			yAxisData: [], // y坐标轴名称
			seriesData: [], //图表数据

			// 内置数据
			infoData: {
				renderer: 'canvas', // 渲染方式  ‘canvas | svg’
				xUnit: null, // X轴单位名称
				yUnit: null, // Y轴单位名称
				isZoom: false, //显示缩放
				isLegend: true, //显示图例
				isTooltip: true, //显示提示框
				isGridborder: true, // 显示边框
				isTabLine: true, // 显示平滑线、虚线、重置功能按钮
				isDownloadImg: true, // 显示图片导出
				isDownloadCsv: true, // 显示csv导出

				xAxisTick: true, // X坐标签刻度
				yAxisTick: true, // X坐标签刻度
				Max: null, //坐标轴刻度最大值。
				Min: null, //坐标轴刻度最小值。
				SplitNumber: null // 坐标轴的分割段数
			},

			// 轴线、name颜色
			lineColor: '#666',

			// 空内容展示
			isEmpty: true,
			emptyText: '暂无数据',

			// 导出
			firstLoad: true,
			defaultOptions: null
		}
	},
	// 计算属性
	computed: {
		// 监听多个对象 进行图表重新渲染
		infoChange() {
			const { chartType, chartColor, chartAxis, hotGraph, chartData, extraOption, chartYaxis, title, subtext, markLine, info, mapOption } = this
			return {
				chartType,
				chartColor,
				chartAxis,
				chartYaxis,
				chartData,
				hotGraph,
				extraOption,
				title,
				subtext,
				markLine,
				info,
				mapOption
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
					this.updateChartView()
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
		/* ----------------------------------------------------------------------
      | 初始化数据
      |-----------------------------------------------------------------------
      */

		init() {
			// 初始化 图表对象
			// 根据 infoData 内部属性 去配置图表信息
			this.setInternalAttribute()
			if (this.chartType && this.mapOption) echarts.registerMap(this.mapOption.name, this.mapOption.geoData)
			this.chart = echarts.init(this.$refs.chartDom, null, { renderer: this.infoData.renderer })

			this.updateChartView()
		},

		/* ----------------------------------------------------------------------
      |  图表渲染
      |-----------------------------------------------------------------------
      */

		/**
		 * 更新视图
		 */
		updateChartView() {
			if (!this.chart) return
			this.chart.clear()
			this.isEmpty = false
			// 第二步 选择对应 图表类型
			if (!this.$utils.isNull(this.chartType)) {
				// 获取系类值 数组
				this.axisData = this.chartAxis
				this.yAxisData = this.chartYaxis
				this.seriesData = this.chartData
				const colors = this.chartColor && this.chartColor.length > 0 ? this.chartColor : color
				// 获取 对应的类型的 样式
				this.styleOption = new graphical(this.chartType, this.seriesData, this.axisData, this.yAxisData, colors, this.hotGraph, this.markLine, this.mapOption).options
			}

			// 第三步 根据 infoData 内部属性 去配置图表信息
			this.setInternalAttribute()

			// 第四步 合并对象 形成图表配置信息
			let fullOption = this.assembleDataToOption()

			if (this.$utils.isNull(fullOption.series)) {
				this.isEmpty = true
				return
			}

			// 是否添加工具栏
			if (this.info.isToolbox) {
				fullOption = this.addToolBox(fullOption)
			}
			// echart有时候渲染数据的时候，因为数据的先后顺序导致 会导致一些 报错信息
			setTimeout(() => {
				methodsApi.chart = this.chart
				const { name, params } = this.abilityApi
				fullOption = methodsApi.setOption(fullOption, this.chartType, name, params)
				this.chart.setOption(fullOption, true)
			}, 500)

			// 第五步 窗口缩放监听
			window.addEventListener('resize', this.handleWindowResize)
			this.addChartResizeListener()
		},

		/**
		 * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
		 */
		addChartResizeListener() {
			const instance = ResizeListener({
				strategy: 'scroll',
				callOnAdd: true
			})

			instance.listenTo(this.$el, () => {
				this.handleWindowResize()
			})
		},

		/**
		 * 当窗口缩放时，echart动态调整自身大小
		 */
		handleWindowResize() {
			if (!this.chart) return
			this.chart.resize()
		},

		/* ----------------------------------------------------------------------
    |  数据操作
    |-----------------------------------------------------------------------
    */

		//内部属性 去配置图表信息
		setInternalAttribute() {
			let info = merge(this.infoData, this.info)
			this.infoData = info

			let option = {}

			// 设置X轴和 Y轴的名称
			if (info.xUnit || info.yUnit) {
				option = {
					xAxis: {
						name: info.xUnit
					},
					yAxis: {
						name: info.yUnit
					}
				}
			}

			// 是否显示缩放 true 添加
			if (info.isZoom) {
				option.grid = {
					left: '3%',
					right: '4%',
					bottom: '20%',
					containLabel: true
				}
				let zoomConfig = {
					top: 'auto',
					bottom: '18.5%',
					right: 'ph'
				}
				if (info.zoomConfig) {
					zoomConfig = {
						...zoomConfig,
						...info.zoomConfig
					}
          if (zoomConfig.left) {
						delete zoomConfig.left
					}
					if (zoomConfig.right && zoomConfig.right !== 'ph') {
						zoomConfig.right = 'ph'
					}
				}
				option.dataZoom = [
					{
						type: 'inside',
						show: false
					},
					{
						show: true,
						type: 'slider',
						showDataShadow: false,
						brushSelect: false,
						borderColor: 'transparent',
						...zoomConfig
					}
				]
			}
			// 是否显示 工具栏目
			if (info.isToolbox) {
				// echarts toolbox工具框
				// 参考网址 https://www.jianshu.com/p/718739575372
				option.toolbox = {
					show: true, //是否显示工具栏组件
					orient: 'horizontal', //工具栏 icon 的布局朝向'horizontal' 'vertical'
					itemSize: 15, //工具栏 icon 的大小
					itemGap: 10, //工具栏 icon 每项之间的间隔
					showTitle: true, //是否在鼠标 hover 的时候显示每个工具 icon 的标题
					feature: {
						//自定义按钮必须以my开头
					}
				}
			}
			// 是否显示提示框
			if (!info.isTooltip) {
				option.tooltip = null
			}

			// 是否显示 图例
			if (!info.isLegend) {
				option.legend = null
			}

			this.defaultsOption = option
		},

		/**
		 * 将业务数据加入到基础样式配置中
		 * @returns {Object} 完整的echart配置
		 */
		assembleDataToOption() {
			const gridborder = {
				grid: { show: true, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 1)' }
			}

			const xAxis = {
				// 坐标与标签刻度对齐
				axisTick: {
					alignWithLabel: true
				}
			}

			const defaultOption = {
				title: {
					text: this.title || null,
					subtext: this.subtext || null,
					left: 'center',
					textStyle: { fontSize: 14 }
				},
				// animationDuration: 1000,
				color: this.chartColor,
				grid: {
					left: '3%',
					right: '4%',
					bottom: '12%',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
					// formatter: this.formatTooltip
				},
				legend: {
					// backgroundColor: 'red',
					borderColor: '#ccc',
					top: 'bottom',
					textStyle: { color: '#838383' }
				}
			}

			//lodash的一个公共函数merge,它表示递归合并来源对象自身和继承的可枚举属性到目标对象。后续的来源对象属性会覆盖之前同名的属性
			let option = merge(
				{},
				this.styleOption, //默认配置的样式
				this.defaultsOption, // 通过 info 内置属性添加
				this.extraOption //自定义配置
			)
      
			if (option.dataZoom) {
				if (option.dataZoom[1] && option.dataZoom[1].left) {
					delete option.dataZoom[1].left
				}

				if (option.dataZoom[1] && option.dataZoom[1].right && option.dataZoom[1].right !== 'ph') {
					option.dataZoom[1].right = 'ph'
				}
			}

			if (option.yAxis) {
				defaultOption.yAxis = {
					axisLine: {
						show: true,
						lineStyle: {
							color: this.lineColor
						}
					}
				}
			}

			if (option.xAxis) {
				defaultOption.xAxis = xAxis
			}

			if (this.infoData.isGridborder && (option.xAxis || option.yAxis)) {
				merge({}, this.defaultsOption, gridborder)
			}

			option = merge({}, defaultOption, option)
			// 如果外部有传入颜色设置，则使用外部设置的颜色
			if (defaultOption.color) {
				option.color = defaultOption.color
				if (option.visualMap) {
					option.visualMap['inRange']['color'] = defaultOption.color
				}
			}
			return option
		},

		/*----------------------------------------------------------------------
    | 工具栏目
    |-----------------------------------------------------------------------
    */

		// 添加工具栏目
		addToolBox(option) {
			const { isTabLine, isDownloadImg, isDownloadCsv } = this.infoData
			const tool = new toolBox(this.chart, this.defaultOptions, this.firstLoad, this.infoData, this.csvExport)

			if (isTabLine) {
				option = tool.addSmoothLineBtn(option)
				option = tool.addDottedLineBtn(option)
				option = tool.addRestoreBtn(option)
			}

			if (isDownloadImg || isDownloadCsv) {
				option = tool.addTool(option)
			}
			return option
		}
	}
}
</script>
<style lang="less">
.env-chart {
	position: relative;
	width: 100%;
	height: 100%;
	border: 0;
	overflow: hidden;
	box-sizing: border-box;

	.ant-empty {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;

		.ant-empty-description {
			color: #dce0e6;
		}
	}

	.chart {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.el-isEmpty {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}
}

.echarts_download {
	position: absolute;
	right: 0;
	top: 38px;
	width: 100px;
	text-align: center;
	border: 1px solid #ccc;
	padding: 5px 0;
	font-size: 12px;
	background-color: white;

	div {
		height: 30px;
		line-height: 30px;
		transition: all 0.5s;

		&:hover {
			background: #335cad;
			color: #fff;
			cursor: pointer;
		}
	}
}
</style>
