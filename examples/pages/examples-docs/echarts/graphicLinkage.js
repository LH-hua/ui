export default {
	graphicLinkage: `// 多图形联动  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts
      :chart-data="chartData"
      :chart-axis="chartAxis"
      chart-type="graphicLinkage"
      title="各城市污染物"
      :chart-yaxis="chartYaxis"
    />
	</div>
</template>
<script>
	export default {
		data() {
			return {
				chartYaxis: [
          { name: '广州', min: 0,max: 100, nameGap: 50 },
          { name: '北京', interval:150, nameGap: 50 },
          { name: '上海', nameGap: 50 },
          { name:'南京', nameGap: 50 },
          { name: '杭州', nameGap: 50 }
        ],
				chartData:[
					{
						name: 'SO₂',
						type: 'bar',
						value: [12, 150, 230, 50, 230, 200],
						siteName:'广州',
            color: '#2b99fd'
					},
					{
						name: 'NO₂',
						type: 'bar',
						value: ['-', 50, 230, 50, 230, 200],
						siteName:'北京',
            color: '#3dbfbf'
					},
					{
						name: 'SO₂',
						type: 'bar',
						value: [12, 0, 230, 50, 230, 200],
						siteName:'北京',
            color: '#2b99fd'
					},
					{
						name: 'NO₂',
						type: 'bar',
						value: [12, 20, 230, 50, 230, 200],
						siteName:'上海',
            color: '#3dbfbf'
					},
					{
						name: 'NO₂',
						type: 'bar',
						value: [12, 10, 230, 50, 230, 200],
						siteName:'南京',
            color: '#3dbfbf'
					},
					{
						name: 'NO₂',
						type: 'bar',
						value: [12, 60, 160, 150, 20, 90],
						siteName:'杭州',
            color: '#3dbfbf'
					}
				],
      	chartAxis:[ '2009/10/1 6:00', '2009/10/1 7:00', '2009/10/1 8:00', '2009/10/1 20:00','2009/10/1 6:00'],
			}
		}
	}
<\/script>`
}