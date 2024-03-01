export default {
	calendar: `// 日历图  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts
      :chart-data="chartData"
      title="2021-01-01至2021-01-03 NO₂值展示"
      :hot-graph="hotGraph"
      :chart-axis="chartXaxis"
      :chart-yaxis="chartYaxis"
      chart-type="calendar"
    >
    </s-echarts>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// X 轴名称
				chartXaxis: ['01-01', '01-02', '01-03'],
				// y 轴名称
				chartYaxis: ['渝南', '主城区', '渝西南'],
				// 数据
				chartData: [
					{ name: 'NO₂', value: [0, 0, 58] },
					{ name: 'NO₂', value: [0, 1, 25] },
					{ name: 'NO₂', value: [0, 2, 55] },

					{ name: 'NO₂', value: [1, 0, 22] },
					{ name: 'NO₂', value: [1, 1, 52] },
					{ name: 'NO₂', value: [1, 2, 39] },

					{ name: 'NO₂', value: [2, 0, 20] },
					{ name: 'NO₂', value: [2, 1, 50] },
					{ name: 'NO₂', value: [2, 2, 20] }
				],
				// 热力图范围值
				hotGraph: [
					{ gt: 0, lte: 30, color: '#ffff00' },
					{ gt: 20, lte: 50, color: '#00e400' },
					{ gt: 50, lte: 100, color: '#ff7e00' },
					{ value: 58, color: 'red' }
				]
			}
		}
	}
<\/script>`
}