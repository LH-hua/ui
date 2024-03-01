import chongqin from '../../../assets/json/chongqin.json'
let geoData = JSON.stringify(chongqin)
export default {
	visualMap: `// visualMap图  案例代码
		<template>
		<div style="pading:10px">
				<div class='examples-echarts'>
						<s-echarts 
							chart-type="visualMap"
							:chart-data="chartData"
							:title="title"
							:map-option="mapOption"
						/>
				</div>
		</div>
		</template>
		<script>
		export default {
				data() {
						return {
								title: '重庆市各区县集合预报模式',
								// 数据
								chartData: [
										{ name: '渝北区', value: 100 },
										{ name: '南岸区', value: 200 }
								],
								mapOption:{
									//地图名称(必填)
									name:"重庆市",
									
									//地图底色（选填)
									bgColor:'#fff',

									//tooltip格式化工具（选填)
									tooltipFormatter:(params)=>{
										const value = params.value ? params.value:'无数据' 
        						return params.name +'：'+ value
									},

									//自定义范围标注解释颜色来表达边界（选填), 
									//lt（小于，less than），
									//gt（大于，greater than），
									//lte（小于等于 less than or equals），
									//gte（大于等于，greater than or equals）
									pieces: [
										// (300, Infinity]
										{gt: 300,color:'#00ff00',label:'300<值'},            
										// (200, 300]
										{gt: 200, lte: 300,color:'#ffff00',label:'200<值<=300'}, 
										// (100, 200]
										{gt: 100, lte: 200,color:'#ff7e00',label:'100<值<=200'},  
										// (50, 100]
										{gt: 50, lte: 100,color:'#ff0000',label:'50<值<=100'},   
										// (0, 50]
										{gt: 0, lte: 50, label: '0<值<=50',color:'#9b004d'},  
										// [0, 0]     
										{value: 0, label: '0（自定义特殊颜色）', color: 'grey'},                
									],


									//地图地理数据(必填)
									geoData:${geoData}
								}
							}
						}
		}
		</script>`,
	scatterVisualMap: `// scatterVisualMap图  案例代码
		<template>
		<div style="pading:10px">
				<div class='examples-echarts'>
						<s-echarts 
							chart-type="scatterVisualMap"
							:chart-data="chartData"
							:title="title"
							:map-option="mapOption"
						/>
				</div>
		</div>
		</template>
		<script>
		export default {
				data() {
						return {
								title: '重庆市站点AQI空间距平图',
								// 数据
								chartData: [
									//value： [经度，纬度，数值]
									{  name: '白市驿',value: [106.3754, 29.4572, 35], },
									{ name: '百安坝', value: [108.4319, 30.7555, -12] },
									{ name: '蔡家', value: [106.4522, 29.7091, 3] },
									{ name: '茶园', value: [106.6349, 29.4906, 7] },
									{ name: '昌元', value: [105.5933, 29.4105, 3] },
									{ name: '芙蓉中路', value: [107.7541, 29.3277, -18] },
									{ name: '虎峰', value: [106.2339, 29.5559, -2] },
									{ name: '虎溪', value: [106.2953, 29.5983, -3] },
									{ name: '空港', value: [106.6205, 29.7166, 20] },
									{ name: '礼嘉', value: [106.5616, 29.6453, 6] },
									{ name: '两路', value: [106.6263, 29.7228, 0] },
									{ name: '龙井湾', value: [106.4037, 29.5728, 10] },
									{ name: '龙洲湾', value: [106.5507, 29.4153, 9] },
									{ name: '南坪', value: [106.5777, 29.5102, 9] },
									{ name: '人民东路', value: [107.7983, 30.6758, -2] },
									{ name: '上清寺', value: [106.5468, 29.5654, 13] },
									{ name: '滩子口', value: [106.6479, 29.0244, -7] },
									{ name: '唐家沱', value: [106.6556, 29.6277, 6] },
									{ name: '桃源西路', value: [107.0732, 29.8617, 2] },
									{ name: '天生', value: [106.4213, 29.8253, -1] },
									{ name: '西山', value: [108.7661, 29.5368, -17] },
									{ name: '歇台子', value: [106.4958, 29.5346, 2] },
									{ name: '新山村', value: [106.4782, 29.4875, 11] },
									{ name: '行政中心', value: [106.2628, 29.32, 14] },
									{ name: '鱼新街', value: [106.5093, 29.3917, 7] },
									{ name: '舟白', value: [108.815, 29.5081, -18] },
									{ name: '周家坝', value: [108.3679, 30.8426, -14] },
									{ name: '南泉', value: [106.599573, 29.42724, 4] },
									{ name: '棠香', value: [105.725727, 29.710246, 2] },
									{ name: '迎宾大道', value: [107.368888, 29.723333, -7] },
									{ name: '书院路', value: [106.247419, 29.996742, 6] },
									{ name: '高寺路', value: [107.084722, 29.158888, -12] },
									{ name: '龙门街', value: [106.050558, 29.831422, -5] },
									{ name: '春阳街', value: [105.8425, 30.207222, -3] },
									{ name: '北山路', value: [105.896872, 29.356178, -8] }
								],
								mapOption:{
									//地图名称(必填)
									name:"重庆市",
									
									//地图底色（选填)
									bgColor:'#f2f2f2',
									
									//散点大小（选填)
									symbolSize:12,

									//tooltip格式化工具（选填)
									tooltipFormatter:(params)=>{
										const value = params.value ? params.value:'无数据' 
        						return params.name +' 距平差值：'+ value[2]
									},

									//自定义范围标注解释颜色来表达边界（选填), 
									//lt（小于，less than），
									//gt（大于，greater than），
									//lte（小于等于 less than or equals），
									//gte（大于等于，greater than or equals）
									pieces: [
										// (30, Infinity]
										{gt: 30,color:'#00ff00',label:'30<值'},            
										// (20, 30]
										{gt: 20, lte: 30,color:'#ffff00',label:'20<值<=30'}, 
										// (10, 20]
										{gt: 10, lte: 20,color:'#ff7e00',label:'10<值<=20'},  
										// (5, 10]
										{gt: 5, lte: 10,color:'#ff0000',label:'5<值<=10'},   
										// (0, 5]
										{gt: 0, lte: 5, label: '0<值<=5',color:'#9b004d'},  
										// [0, 0]     
										{value: 0, label: '0（自定义特殊颜色）', color: 'grey'},  
										// (-Infinity, -10)
										{lt: -10, color:'#7e0023',label: '值<=-10'}                 
									],


									//地图地理数据(必填)
									geoData:${geoData}
								}
							}
						}
		}
		</script>`
}
