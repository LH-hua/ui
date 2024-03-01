/*
 * @Author: lw
 * @Date: 2022-04-06 15:33:08
 * @Description:配置 echarts图表  bar柱状图案例
 */
export default {
	bar: `// 基础柱状图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts
          chart-type="bar"
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
                title: '污染物浓度时序图',
                // 坐标轴名称
                chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03'],
                chartYAxis: {
                    name: '浓度值(μg/m³)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30
                },
                // 数据
                chartData: [
                    {
                      name: 'NO₂',
                      value: [15, 25, 15],
                      color: '#3dbfbf'
                    },
                    {
                      name: 'O₃_8h',
                      value: [25, 35, 55],
                      color: '#1967bc'
                    }
                ]
            }
        },
    }
<\/script>`,

	stackBar: `// 堆积柱状图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts
          chart-type="stackBar"
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
                title: '污染物浓度时序图',
                // 坐标轴名称
                chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03'],
                chartYAxis: {
                    name: '浓度值(μg/m³)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30
                },
                // 数据
                chartData: [
                    {
                      name: 'NO₂',
                      value: [15, 25, 15],
                      color: '#3dbfbf'
                    },
                    {
                      name: 'O₃_8h',
                      value: [25, 35, 55],
                      color: '#1967bc'
                    }
                ]
            }
        },
    }
<\/script>`,

	stripBar: `// 条形图状图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts
          chart-type="stripBar"
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
                title: '污染物浓度时序图',
                // 坐标轴名称
                chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03'],
                chartYAxis: {
                    name: '浓度值(μg/m³)',
                    nameLocation: 'middle',
                    nameGap: 30
                },
                // 数据
                chartData: [
                    {
                      name: 'NO₂',
                      value: [15, 25, 15],
                      color: '#3dbfbf'
                    },
                    {
                      name: 'O₃_8h',
                      value: [25, 35, 55],
                      color: '#1967bc'
                    }
                ]
            }
        },
    }
<\/script>`
}
