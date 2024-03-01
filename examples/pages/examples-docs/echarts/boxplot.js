export default {
	boxplot: `// 箱线图  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts chart-type="boxplot" :title="title" :chart-data="chartData" :chart-axis="chartAxis" :chart-yaxis="chartYAxis" />
	</div>
</template>
<script>
	export default {
		data() {
			return {
        title: '污染物浓度箱线图分析',
				// 坐标轴名称
				chartAxis: ['2021-02-01', '2021-02-02'],
        chartYAxis: {
            name: '浓度值(μg/m³)',
            nameLocation: 'middle',
            nameRotate: 90,
            nameGap: 30
        },
				// 数据
				chartData: [
          {
            name: 'SO₂',
            value: [
              [650, 850, 940, 980, 1070],
              [750, 850, 930, 980, 1080]
            ],
            color: '#2b99fd'
          },
          // 多个系列时
          // { name: 'NO₂', value: [[650, 850, 940, 980, 1070], [750, 850, 930, 980, 1080]], color: '#3dbfbf' }
				]
			}
		}
	}
<\/script>`
}