export default {
	many: `// 多系列图表  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts
            :chart-data="chartData"
            :chart-axis="chartAxis"
            :chart-yaxis="chartYaxis"
            chart-type="many"
            :info="info" >
        </s-echarts>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// 坐标X轴名称
				chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03'],
				// 多坐标Y轴 展示
				chartYaxis: [
					{ name: '温度', unit: 'ml', min: '-200' },
					{ name: 'NO3', min: '-200' },
					{ name: '风速', min: '-200' }
				],
				// 数据
				chartData: [
					{
						name: '温度',
						type: 'bar',
						value: [null, 250, 230]
					},
					{
						name: 'NO3',
						type: 'smoothLine',
						value: [-50, 230, 200]
					},
					{
						name: '风速',
						type: 'wind',
						value: [
							[100, 100],
							[50, 45],
							[30, 270]
						]
					},
					{
						name: '风速2',
						type: 'followWind',
						value: [
							[180, 0],
							[210, 5],
							[134, 9]
						]
					}
				],
				info:{ isToolbox:true }
			}
		}
	}
<\/script>`,
}