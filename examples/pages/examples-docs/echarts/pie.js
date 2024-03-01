/*
 * @Author: lw
 * @Date: 2022-04-06 15:33:08
 * @Description:配置 echarts图表  pie 饼图图案例
 */
export default {
	pie: `// 基础柱状图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts chart-type="pie" :chart-data="chartData" :title="title" />
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                title: '污染物浓度占比',
                // 数据
                chartData: [
                  {
                    name: 'SO₂',
                    value: [25],
                    color: '#2b99fd'
                  },
                  {
                    name: 'NO₂',
                    value: [15],
                    color: '#3dbfbf'
                  }
                ]
            }
        },
    }
<\/script>`,

	annularPie: `// 环形圆形  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts chart-type="annularPie" :chart-data="chartData" :title="title" />
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                title: '污染物浓度占比',
                // 数据
                chartData: [
                  {
                    name: 'SO₂',
                    value: [25],
                    color: '#2b99fd'
                  },
                  {
                    name: 'NO₂',
                    value: [15],
                    color: '#3dbfbf'
                  }
                ]
            }
        },
    }
<\/script>`,

	polarPie: `// 极坐标饼图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts chart-type="polarPie" :title="title" :chart-axis="chartAxis" :chart-data="chartData" :extra-option="extraOption" />
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                title: '上清寺风玫瑰图',
                // 数据
                chartAxis: [
                  '正北',
                  '北东北',
                  '东北',
                  '东东北',
                  '正东',
                  '东东南',
                  '东南',
                  '南东南',
                  '正南',
                  '南西南',
                  '西南',
                  '西西南',
                  '正西',
                  '西西北',
                  '西北',
                  '北西北'
                ],
                chartData: [
                  {
                      "name": "无数据",
                      "color": "rgb(192,192,192)",
                      "value": [
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0
                      ]
                  },
                  {
                      "name": "0～35",
                      "color": "rgb(0,228,0)",
                      "value": [
                          0,
                          6.5,
                          16.1,
                          29,
                          3.2,
                          3.2,
                          0,
                          3.2,
                          3.2,
                          0,
                          3.2,
                          3.2,
                          3.2,
                          6.5,
                          3.2,
                          0
                      ]
                  },
                  {
                      "name": "36～75",
                      "color": "rgb(255,255,0)",
                      "value": [
                          0,
                          3.2,
                          0,
                          3.2,
                          0,
                          0,
                          0,
                          0,
                          3.2,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0
                      ]
                  },
                  {
                      "name": "76～115",
                      "color": "rgb(255,126,0)",
                      "value": [
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0
                      ]
                  },
                  {
                      "name": "116～150",
                      "color": "rgb(255,0,0)",
                      "value": [
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0
                      ]
                  },
                  {
                      "name": "151～250",
                      "color": "rgb(153,0,76)",
                      "value": [
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0
                      ]
                  },
                  {
                      "name": ">250",
                      "color": "rgb(153,0,76)",
                      "value": [
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0
                      ]
                  }
              ],
              extraOption: {
                grid: { show: false },
                angleAxis: { boundaryGap: false },
                radiusAxis: {
                  axisLabel: {
                    formatter: '{value}%',
                    color: '#000'
                  },
                  polar: {
                    radius: '40%',
                    center: ['50%', '50%']
                  }
                },
                tooltip: {
                  formatter: function (value, index) {
                    return '<span style="color:#333">' + value.name + '：</span>' + value.value + '%'
                  }
                }
              }
            }
        },
    }
<\/script>`,

	nestedPie: `// 嵌套圆形  案例代码
<template>
<div>
    <div class='examples-echarts'>
        <s-echarts :chart-data="chartData" chart-type="nestedPie" />
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                // 数据
                chartData: [
                  {
                    name: 'NO₂',
                    value: [
                      { name: '测试1', value: 12 },
                      { name: '测试2', value: 12 },
                      { name: '测试3', value: 12 }
                    ]
                  },
                  {
                    name: 'SO₂',
                    value: [
                      { name: '测试4', value: 12 },
                      { name: '测试5', value: 12 },
                      { name: '测试6', value: 12 }
                    ]
                  }
                ]
            }
        },
    }
<\/script>`
}
