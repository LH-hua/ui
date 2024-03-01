export default {
	scatter: `// 散点图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts
          chart-type="scatter"
          :chart-data="chartData"
          :chart-axis="chartAxis"
          :chart-yaxis="chartYAxis"
          :title="title"
        />
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                title: '污染物浓度散点分布图',
                // 坐标轴名称
                chartAxis: {
                  name: 'NO₂预报值(μg/m³)',
                  nameLocation: 'middle',
                  nameGap: 30,
                  max: 20
                },
                chartYAxis: {
                    name: 'NO₂实测值(μg/m³)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30,
                  	max: 15
                },
                // 数据
                chartData: [{
                  value:[
                      [10.0, 8.04],
                      [8.0, 6.95],
                      [13.0, 7.58],
                      [9.0, 8.81],
                      [11.0, 8.33],
                      [14.0, 9.96],
                      [6.0, 7.24],
                      [4.0, 4.26],
                      [12.0, 10.84],
                      [7.0, 4.82],
                      [5.0, 5.68]
                  ],
                  markLine: {
                    animation: false,
                    label: {
                      formatter: 'y = 0.5 * x + 3',
                      align: 'right'
                    },
                    lineStyle: {
                      type: 'solid'
                    },
                    tooltip: {
                      formatter: 'y = 0.5 * x + 3'
                    },
                    data: [
                      [
                        {
                          coord: [0, 3],
                          symbol: 'none'
                        },
                        {
                          coord: [20, 13],
                          symbol: 'none'
                        }
                      ]
                    ]
                  }
                }]
            }
        },
    }
</script>`,

	scatterMap: `// 相关系数图  案例代码
<template>
	<div class='examples-echarts'>
		<s-echarts
      :title="title"
      :chart-data="chartData"
      :chart-axis="chartAxis"
      chart-type="scatterMap"
      :info='info'
      :csv-export="csvExport"
    />
	</div>
</template>
<script>
export default {
    data() {
        return {
            title: '气象因子相关性分析',
            // 坐标轴名称
            chartAxis: ['温度', '相对湿度', '风速'],
            info:{ isToolbox:true },
            // 数据
            chartData: [
                {
                    name: '温度',
                    value: [0, 0, 100]
                },
                {
                    name: '温度',
                    value: [0, 1, 18.5]
                },
                {
                    name: '温度',
                    value: [0, 2, -27.5]
                },
                {
                    name: '相对湿度',
                    value: [1, 0, -100]
                },
                {
                    name: '相对湿度',
                    value: [1, 1, 100]
                },
                {
                    name: '相对湿度',
                    value: [1, 2, 23]
                },
                {
                    name: '风速',
                    value: [2, 0, 8]
                },
                {
                    name: '风速',
                    value: [2, 1, 7.5]
                },
                {
                    name: '风速',
                    value: [2, 2, 100]
                }
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
<\/script>`
}