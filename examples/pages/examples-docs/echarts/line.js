/*
 * @Author: lw
 * @Date: 2022-04-06 15:33:08
 * @Description:配置 echarts图表  line折线图 案例
 */
export default {
	line: `// 基础折线图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts chart-type="line"
          :chart-data="chartData"
          :chart-axis="chartAxis"
          :chart-yaxis="chartYAxis"
          :title="title"
        >
        </s-echarts>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                title: '污染物浓度时序图',
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
                      name: 'NO₂',
                      value: [15, 25, null, 15],
                      color: '#3dbfbf'
				            },
                    {
                      name: 'O₃_8h',
                      value: [25, 35, 55, 20],
                      color: '#1967bc'
                    }
                ]
            }
        },
    }
<\/script>`,

	smoothLine: `// 平滑折线图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts
          chart-type="smoothLine"
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

	followWind: `// 风向折线图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts
          chart-type="followWind"
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
                title: '风速时序图',
                // 坐标轴名称
                chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03'],
                chartYAxis: {
                    name: '风速(m/s)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30
                },
                // 数据
                chartData: [
                    {
                      name: '风速',
                      // smooth: true,
                      value: [
                        // [风速、风向]
                        [12, 100],
                        [0, 45],
                        [1, 270]
                      ]
                    },
                ]
            }
        },
    }
<\/script>`,

	arrowWind: `// 风矢折线图  案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts
          chart-type="arrowWind"
          :chart-data="chartData"
          :chart-axis="chartAxis"
          :chart-yaxis="chartYAxis"
          :title="title"
          :extra-option="option"
        />
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                title: '风速时序图',
                // 坐标轴名称
                chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03'],
                chartYAxis: {
                    name: '风速(m/s)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30,
                  	min:0
                },
                // 数据
                chartData: [
                    {
                      value: [
                        // ['X轴对应名称', 风速、风向, '箭头的位置(对于y轴的值)']
                        // 箭头的位置需要根据实际情况动态调整
                        ['2021-02-01', 12, 100, -0.5],
                        ['2021-02-02', 0, 45, -0.5],
                        ['2021-02-03', 1, 270, -0.5]
                      ]
                    },
                ],
              	option:{
                  xAxis: {
                    axisLabel:{
                      	// x轴文本偏移量，需要和箭头位置结合，根据实际情况调整
                        margin: 40
                      }
                  },
                  tooltip: {
                      extraCssText: 'max-height:500px;overflow-y:auto',
                      enterable: true,
                      appendToBody: true,
                      formatter: (params) => {
                        const outerStyle = 'min-width:180px;display:flex;justify-content: space-between;height:25px'
                        const innerStyle = 'font-size:14px;'

                        let str = params[0].name + '<br/>'
                        params.forEach((item) => {
                          const isWD = item.seriesName.indexOf('风向') > -1
                          const unit = isWD ? '°' : 'm/s'
                          let val = ''
                          if(item.value !== undefined){
                            val = isWD ? item.value[2] : item.value
                            val = val !== undefined ? val+unit : '-'
                          }
                           str += '<div style="'+ outerStyle + '"><span style="'+ innerStyle + '">' + item.marker + item.seriesName + ' :</span><span style="'+ innerStyle + '">' + val + '</span></div>'
                        })
                        return str
                      }
                    }
                }
            }
        },
    }
</script>`,

	stackLine: `// 堆积折线图  案例代码
<template>
<div style="pading:10px">
<div class='examples-echarts'>
    <s-echarts
      chart-type="stackLine"
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

	areahLine: `// 面积折线图  案例代码
<template>
<div style="pading:10px">
<div class='examples-echarts'>
    <s-echarts
      chart-type="areahLine"
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

	stackAreaLine: `// 堆积面积线图   案例代码
<template>
<div style="pading:10px">
<div class='examples-echarts'>
    <s-echarts
      chart-type="stackAreaLine"
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

	manyYAxis: `// 多Y轴   案例代码
<template>
<div style="pading:10px">
    <div class='examples-echarts'>
        <s-echarts
          chart-type="smoothLine"
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
                chartYAxis: [{
                    name: 'NO₂(μg/m³)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30,
                  	interval: 5,
                  	max: 60
                },{
                    name: 'O₃_8h(μg/m³)',
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 30,
                  	interval: 5,
                  	max: 60
                }],
                // 数据
                chartData: [
                    {
                      name: 'NO₂',
                      yAxisIndex:0,
                      value: [15, 25, 15],
                      color: '#3dbfbf'
                    },
                    {
                      name: 'O₃_8h',
                      yAxisIndex:1,
                      value: [25, 35, 55],
                      color: '#1967bc'
                    }
                ]
            }
        },
    }
</script>`,

	manyAreaLine: `// 多层面积线图   案例代码
<template>
    <div style="pading:10px">
        <div class='examples-echarts'>
            <s-echarts
              :chart-data="chartData"
              :chart-axis="chartAxis"
              :chart-yaxis="chartYAxis"
              chart-type="manyAreaLine"
              :title="title"
            />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
             title: 'O₃(ug/m3)对比分析',
            // 坐标轴名称
            chartAxis: ['2021-02-01', '2021-02-02', '2021-02-03','2021-02-04','2021-02-05','2021-02-06','2021-02-07','2021-02-08','2021-02-09','2021-02-10','2021-02-11','2021-02-12','2021-02-13','2021-02-14','2021-02-15','2021-02-16','2021-02-17','2021-02-18','2021-02-19','2021-02-20'],
            chartYAxis: [
              {
                name: 'O₃(ug/m3)',
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 30
              }
            ],
            // 数据
            chartData: [
              {
                name: '对比变化范围',
                value: [
                  [3.1, 5.7],
                  [1.8, 3.3],
                  [1.7, 6.9],
                  [2.6, 7.4],
                  [3.3, 9.3],
                  [3.0, 7.9],
                  [3.9, 6.0],
                  [3.9, 5.5],
                  [-0.6, 4.5],
                  [-0.5, 5.3],
                  [-0.3, 2.4],
                  [-6.5, -0.4],
                  [-7.3, -3.4],
                  [-7.3, -2.3],
                  [-7.9, -4.2],
                  [-4.7, 0.9],
                  [-1.2, 0.4],
                  [-2.3, -0.1],
                  [-2.0, 0.3],
                  [-5.1, -2.0],
                  [-4.4, -0.5],
                ],
                color: 'rgb(157,200,241)',
                symbol: 'roundRect',
                type:'rangeArea'
              },
              {
                name: '站点',
                type: 'smoothLine',
                value: [2, 5, 1, 2, 5, 1, 5, 7, 7, 6, 8, 6,5,2,3,4,7,5,9,5,3],
                color: '#f73232'
              }
            ]
        }
    },
}
<\/script>`
}
