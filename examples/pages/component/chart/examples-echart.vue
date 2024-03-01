<template>
	<div>
		<examplesView :dataSource="dataSource"></examplesView>
	</div>
</template>
<script>
import examplesView from '../../../components/examples-view.vue'
export default {
	//要用到哪些子组件
	components: { examplesView },
	//组件私有数据（必须是function，而且要return对象类型）
	data() {
		return {
			dataSource: [
				{
					title: '折线图',
					subtitle: 'line',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/line.png'),
							title: '基础折线图',
							subtitle: 'line',
							params: {
								folder: 'line',
								fileName: 'line'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/smoothLine.png'),
							title: '平滑折线图',
							subtitle: 'smoothLine',
							params: {
								folder: 'line',
								fileName: 'smoothLine'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/followWind.png'),
							title: '风向折线图',
							subtitle: 'followWind',
							params: {
								folder: 'line',
								fileName: 'followWind'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/arrowWind.png'),
							title: '风矢折线图',
							subtitle: 'arrowWind',
							params: {
								folder: 'line',
								fileName: 'arrowWind'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/manyYAxis.png'),
							title: '多Y轴图形',
							subtitle: 'manyYAxis',
							params: {
								folder: 'line',
								fileName: 'manyYAxis'
							}
						}
					]
				},
				{
					title: '柱状图',
					subtitle: 'bar',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/bar.png'),
							title: '基础柱状图',
							subtitle: 'bar',
							params: {
								folder: 'bar',
								fileName: 'bar'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/stackBar.png'),
							title: '堆积柱状图',
							subtitle: 'stackBar',
							params: {
								folder: 'bar',
								fileName: 'stackBar'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/stripBar.png'),
							title: '条形图',
							subtitle: 'stripBar',
							params: {
								folder: 'bar',
								fileName: 'stripBar'
							}
						}
					]
				},
				{
					title: '饼图',
					subtitle: 'pie',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/pie.png'),
							title: '基础饼图',
							subtitle: 'pie',
							params: {
								folder: 'pie',
								fileName: 'pie'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/annularPie.png'),
							title: '环形圆形',
							subtitle: 'annularPie',
							params: {
								folder: 'pie',
								fileName: 'annularPie'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/polarPie.png'),
							title: '风玫瑰图',
							subtitle: 'polarPie',
							params: {
								folder: 'pie',
								fileName: 'polarPie'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/nestedPie.jpg'),
							title: '嵌套饼图',
							subtitle: 'nestedPie',
							params: {
								folder: 'pie',
								fileName: 'nestedPie'
							}
						}
					]
				},
				{
					title: '面积图',
					subtitle: 'area',
					list: [
						// {
						// 	image: require('../../../assets/img/examples-image/chart/stackLine.jpg'),
						// 	title: '堆积折线图',
						// 	subtitle: 'stackLine',
						// 	params: {
						// 		folder: 'line',
						// 		fileName: 'stackLine'
						// 	}
						// },
						{
							image: require('../../../assets/img/examples-image/chart/areahLine.png'),
							title: '面积折线图',
							subtitle: 'areahLine',
							params: {
								folder: 'line',
								fileName: 'areahLine'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/stackAreaLine.png'),
							title: '堆积面积线图',
							subtitle: 'stackAreaLine',
							params: {
								folder: 'line',
								fileName: 'stackAreaLine'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/manyAreaLine.png'),
							title: '多层面积线图',
							subtitle: 'manyAreaLine',
							params: {
								folder: 'line',
								fileName: 'manyAreaLine'
							}
						}
					]
				},
				{
					title: '箱线图',
					subtitle: 'boxplot',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/boxplot.png'),
							title: '箱线图',
							subtitle: 'boxplot',
							params: {
								folder: 'boxplot',
								fileName: 'boxplot'
							}
						}
					]
				},
				{
					title: '仪表盘',
					subtitle: 'gauge',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/gauge.png'),
							title: '仪表盘',
							subtitle: 'gauge',
							params: {
								folder: 'gauge',
								fileName: 'gauge'
							}
						}
					]
				},
				{
					title: 'many 多系列 混合，折线 + 柱状图 (+ 跟随线条风向)',
					subtitle: 'many',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/many.jpg'),
							title: '仪表盘',
							subtitle: 'many',
							params: {
								folder: 'many',
								fileName: 'many'
							}
						}
					]
				},
				{
					title: '散点图',
					subtitle: 'scatterMap',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/scatter.png'),
							title: '散点图',
							subtitle: 'scatterMap',
							params: {
								folder: 'scatterMap',
								fileName: 'scatter'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/scatterMap.png'),
							title: '相关系数图',
							subtitle: 'scatterMap',
							params: {
								folder: 'scatterMap',
								fileName: 'scatterMap'
							}
						}
					]
				},
				// {
				// 	title: '热力图',
				// 	subtitle: 'hotPower',
				// 	list: [
				// 		{
				// 			image: require('../../../assets/img/examples-image/chart/hotPower.jpg'),
				// 			title: '热力图',
				// 			subtitle: 'hotPower',
				// 			params: {
				// 				folder: 'hotPower',
				// 				fileName: 'hotPower'
				// 			}
				// 		}
				// 	]
				// },
				{
					title: '月份图',
					subtitle: 'monthMap',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/monthMap.jpg'),
							title: '月份图',
							subtitle: 'monthMap',
							params: {
								folder: 'monthMap',
								fileName: 'monthMap'
							}
						}
					]
				},
				{
					title: '日历图',
					subtitle: 'calendar',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/calendar.jpg'),
							title: '日历图',
							subtitle: 'calendar',
							params: {
								folder: 'calendar',
								fileName: 'calendar'
							}
						}
					]
				},
				{
					title: '多图形联动',
					subtitle: 'graphicLinkage',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/graphicLinkage.jpg'),
							title: '多图形联动',
							subtitle: 'graphicLinkage',
							params: {
								folder: 'graphicLinkage',
								fileName: 'graphicLinkage'
							}
						}
					]
				},
        {
					title: 'VisualMap地图',
					subtitle: 'visualMap',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/visualMap.jpg'),
							title: 'visualMap地图',
							subtitle: 'visualMap',
							params: {
								folder: 'visualMap',
								fileName: 'visualMap'
							}
						},
							{
							image: require('../../../assets/img/examples-image/chart/scatterVisualMap.jpg'),
							title: '散点地图',
							subtitle: 'scatterVisualMap',
							params: {
								folder: 'visualMap',
								fileName: 'scatterVisualMap'
							}
						}
					]
				},
				{
					title: '扩展',
					subtitle: '',
					list: [
						{
							image: require('../../../assets/img/examples-image/chart/markLine.png'),
							title: '带 markLine Y 轴线',
							subtitle: 'markLine',
							params: {
								folder: 'extendProp',
								fileName: 'markLine'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/toolbox.png'),
							title: '工具箱',
							subtitle: 'toolbox',
							params: {
								folder: 'extendProp',
								fileName: 'toolbox'
							}
						},
            {
							image: require('../../../assets/img/examples-image/chart/multiCharts.png'),
							title: '一页多图',
							subtitle: 'multiCharts',
							params: {
								folder: 'extendProp',
								fileName: 'multiCharts'
							}
						},
						{
							image: require('../../../assets/img/examples-image/chart/extraOption.jpg'),
							title: '自定义图表',
							subtitle: 'extraOption',
							params: {
								folder: 'extendProp',
								fileName: 'extraOption'
							}
						}
					]
				},

			]
		}
	},
	//父组件传递过来的数据（两种方式声明：1.数组 2.对象）
	props: {},
	//计算属性
	computed: {},
	//监听
	watch: {},
	//生命周期钩子：组件实例完成创建之后调用
	created() {},
	//生命周期钩子：组件实例渲染完成时调用
	mounted() {},
	//函数集，自己封装，便于开发使用
	methods: {}
}
</script>
<style lang="less" scoped></style>
