export default {
	gauge: `// 仪表盘  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts chart-type="gauge" :title="title" :chart-data="chartData" />
	</div>
</template>
<script>
	export default {
		data() {
			return {
        title: 'AQI范围准确度评估',
				// 数据
				chartData: [{ name: 'AQI范围准确度', value: [85] }]
			}
		}
	}
<\/script>`
}