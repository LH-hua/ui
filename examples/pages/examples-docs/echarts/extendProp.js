export default {
	markLine: `// 带 markLine Y 轴线  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts :title="title" :chart-data="chartData" :chart-axis="chartAxis" :mark-line="markLine" chart-type="bar"></s-echarts>
	</div>
</template>
<script>
	export default {
		data() {
			return {
        title: '污染物时序图',
				// 坐标轴名称
				chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03'],
				// 数据
				chartData: [
					{ name: 'SO₂', value: [15, 25, 15], color: '#2b99fd' },
					{ name: 'NO₂', value: [25, 35, 55], color: '#3dbfbf' }
				],
				markLine: [
					{ name: '一级标准限值', value: 10, color: '#00ff00' },
					{ name: '二级标准限值', value: 20, color: '#ffff00' },
					{ name: '三级标准限值', value: 30, color: '#ff7e00' },
					{ name: '四级标准限值', value: 40, color: '#ff0000' },
					{ name: '五级标准限值', value: 50, color: '#9b004d' }
				]
			}
		}
	}
<\/script>`,

	toolbox: `// 工具箱  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts :chart-data="chartData" :chart-axis="chartAxis" chart-type="smoothLine" :info="info" :csv-export="csvExport"></s-echarts>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// 坐标轴名称
				chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03'],
				info:{
          isToolbox:true, // 显示工具箱
          isZoom: true, // 开启缩放功能
          //zoom的配置项，更多配置看echart文档datazoom -> slider的配置
          zoomConfig:{
            bottom: '18.5%'
          },
          isLegend: true, // 是否显示图例
          isTooltip: true, // 是否显示提示框
          isGridborder: true, // 是否显示边框
          isDownloadImg: true, // 是否启用下载图片功能
          isDownloadCsv: true, // 是否启用下载csv功能
        },
				// 数据
				chartData: [
					{ name: 'SO₂', value: [15, 25, 15], color: '#2b99fd' },
					{ name: 'PM₁₀', value: [25, 35, 55], color: '#fcd600' }
				]
			}
		},
    methods:{
        // 自定义数据导出csv格式文件
        // chartOption 图表配置对象
        csvExport(chartOption){
            let exportTitle = ['','温度', '相对湿度', '风速']
            let exportData = [{name:'温度',温度:'100',相对湿度:'-100',风速:'8'},{name:'相对湿度',温度:'18.5',相对湿度:'100',风速:'7.5'},{name:'wind dir',温度:'-27.5',相对湿度:'23',风速:'100'}]
            return { exportData, exportTitle }
        }
    }
	}
<\/script>`,

	multiCharts: `// 一页多图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts' style="overflow: auto;">
        <s-echarts v-for="item in datas"
          style="height: 350px;"
          chart-type="line"
          :chart-data="item.chartData"
          :chart-axis="item.chartAxis"
          :chart-yaxis="item.chartYAxis"
          :title="item.title"
        />
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
              datas: [{
                title: '站点A污染物浓度时序图',
                // 坐标轴名称
                chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03', '2021-02-04'],
                chartYAxis: {
                    name: '浓度值(μg/m³)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30
                },
                // 数据
                chartData: [
                    {
                      name: 'PM₂.₅',
                      value: [15, 25, null, 15],
                      color: '#fa6982'
				            },
                    {
                      name: 'PM₁₀',
                      value: [25, 35, 55, 20],
                      color: '#fcd600'
                    }
                ]
              }, {
                title: '站点B污染物浓度时序图',
                // 坐标轴名称
                chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03', '2021-02-04'],
                chartYAxis: {
                    name: '浓度值(μg/m³)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30
                },
                // 数据
                chartData: [
                    {
                      name: 'PM₂.₅',
                      value: [15, 25, 10, 15],
                      color: '#fa6982'
				            },
                    {
                      name: 'PM₁₀',
                      value: [25, 35, 55, 20],
                      color: '#fcd600'
                    }
                ]
              }, {
                title: '站点C污染物浓度时序图',
                // 坐标轴名称
                chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03', '2021-02-04'],
                chartYAxis: {
                    name: '浓度值(μg/m³)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30
                },
                // 数据
                chartData: [
                    {
                      name: 'PM₂.₅',
                      value: [11, 28, 18, 15],
                      color: '#fa6982'
				            },
                    {
                      name: 'PM₁₀',
                      value: [26, 35, 45, 20],
                      color: '#fcd600'
                    }
                ]
              }]
            }
        },
    }
<\/script>`,

	extraOption: `自定义图表  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts :extra-option="extraOption"></s-echarts>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				extraOption: {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Mon',
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar',
                            showBackground: true,
                            backgroundStyle: {
                                color: 'rgba(180, 180, 180, 0.2)'
                            }
                        }
                    ]
                }
			}
		}
	}
<\/script>`
}