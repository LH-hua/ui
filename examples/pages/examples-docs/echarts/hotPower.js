export default {
	hotPower: `// 热力图  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts
		:chart-data="chartData"
		:chart-axis="chartXAxis"
		:info="info"
		:chart-yaxis="chartYAxis"
		chart-type="hotPower"
		:extra-option="extraOption"
		:title="title"
		></s-echarts>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title:'多站点AQI日历图',
				// X 轴名称
				chartXAxis: [
					'04-01','04-02','04-03','04-04','04-05','04-06',
					'04-07','04-08','04-09','04-10','04-11', '0-12',
					'04-13'
				],
				// y 轴名称
				chartYAxis: ["上清寺", "两路", "书院路", "人民东路", "北山路", "南坪", "南泉", "沙洲坝"],
				// 数据
				chartData: [
					{ value:[0,0,171] },{ value:[0,1,108] },{ value:[0,2,168] },{ value:[0,3,34] },{ value:[0,4,169] },
					{ value:[0,5,158] },{ value:[0,6,30] },{ value:[0,7,118] },{ value:[1,0,125] },{ value:[1,1,138] },
					{ value:[1,2,46] },{ value:[1,3,142] },{ value:[1,4,160] },{ value:[1,5,46] },{ value:[1,6,198] },
					{ value:[1,7,97] },{ value:[2,0,159] },{ value:[2,1,97] },{ value:[2,2,79] },{ value:[2,3,57] },
					{ value:[2,4,0] },{ value:[2,5,164] },{ value:[2,6,4] },{ value:[2,7,175] },{ value:[3,0,71] },
					{ value:[3,1,84] },{ value:[3,2,191] },{ value:[3,3,198] },{ value:[3,4,126] },{ value:[3,5,163] },
					{ value:[3,6,11] },{ value:[3,7,110] },{ value:[4,0,196] },{ value:[4,1,49] },{ value:[4,2,120] },
					{ value:[4,3,182] },{ value:[4,4,170] },{ value:[4,5,158] },{ value:[4,6,157] },{ value:[4,7,21] },
					{ value:[5,0,13] },{ value:[5,1,115] },{ value:[5,2,76] },{ value:[5,3,189] },{ value:[5,4,82] },
					{ value:[5,5,94] },{ value:[5,6,29] },{ value:[5,7,75] },{ value:[6,0,13] },{ value:[6,1,192] },
					{ value:[6,2,24] },{ value:[6,3,63] },{ value:[6,4,72] },{ value:[6,5,107] },{ value:[6,6,196] },
					{ value:[6,7,188] },{ value:[7,0,109] },{ value:[7,1,15] },{ value:[7,2,129] },{ value:[7,3,84] },
					{ value:[7,4,145] },{ value:[7,5,13] },{ value:[7,6,59] },{ value:[7,7,6] },{ value:[8,0,135] },
					{ value:[8,1,2] },{ value:[8,2,191] },{ value:[8,3,57] },{ value:[8,4,169] },{ value:[8,5,68] },
					{ value:[8,6,37] },{ value:[8,7,57] },{ value:[9,0,189] },{ value:[9,1,82] },{ value:[9,2,13] },
					{ value:[9,3,105] },{ value:[9,4,119] },{ value:[9,5,187] },{ value:[9,6,167] },{ value:[9,7,101] },
					{ value:[10,0,118] },{ value:[10,1,149] },{ value:[10,2,128] },{ value:[10,3,54] },{ value:[10,4,39] },
					{ value:[10,5,139] },{ value:[10,6,22] },{ value:[10,7,60] },{ value:[11,0,188] },{ value:[11,1,190] },
					{ value:[11,2,123] },{ value:[11,3,33] },{ value:[11,4,67] },{ value:[11,5,181] },{ value:[11,6,71] },
					{ value:[11,7,182] },{ value:[12,0,43] },{ value:[12,1,128] },{ value:[12,2,70] },{ value:[12,3,10] },
					{ value:[12,4,193] },{ value:[12,5,108] },{ value:[12,6,195] },{ value:[12,7,109] }],

				info:{ isToolbox:true },
				extraOption:{
					series:[{
					  label:{
						show:true
					  }
					}],
				}
			}
		},
	}
<\/script>`
}