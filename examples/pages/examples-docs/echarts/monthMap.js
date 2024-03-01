export default {
	monthMap: `// 月份图  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts :chart-data="chartData" :hot-graph="hotGraph" chart-type="monthMap"></s-echarts>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// 数据
				chartData: [
					{ name: 'NO₂', value: ['2021-04-14', 0] },
					{ name: 'NO₂', value: ['2021-04-15', 0] },
					{ name: 'NO₂', value: ['2021-04-16', 0] },

					{ name: 'NO₂', value: ['2021-04-17', 1] },
					{ name: 'NO₂', value: ['2021-04-18', 5] },
					{ name: 'NO₂', value: ['2021-04-19', 4] },

					{ name: 'NO₂', value: ['2021-04-20', 5] },
					{ name: 'NO₂', value: ['2021-04-21', 2] },
					{ name: 'NO₂', value: ['2021-04-22', 2] }
				],
				// 热力图范围值
				hotGraph: [
					{ gt: 0, lte: 3, color: '#ffff00' },
					{ gt: 2, lte: 5, color: '#00e400' },
					{ gt: 5, lte: 10, color: '#ff7e00' }
				]
			}
		}
	}
<\/script>`
}