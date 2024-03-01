# echarts 图表

---

### 概述

使用 `echarts-5.0.2` 版本进行封装 [echarts5](https://echarts.apache.org/zh/tutorial.html#ECharts%205%20%E6%96%B0%E7%89%B9%E6%80%A7) 新特性加强了图表的显示功能

### 基础用法

通过 切换`chartType` 不同的图表类型 `chartData` 图表数据 `chartAxis` 图表坐标轴名称 渲染图表效果。

### 条形图 stripBar

::: demo

```html
<div style="pading:10px">
	<div style="width:100%;height:300px">
		<s-echarts :chart-data="chartData" :chart-axis="chartAxis" chart-type="scatterMap" :info="info" :csv-export="csvExport"></s-echarts>
	</div>
</div>
<script>
export default {
  data() {
    return {
      // 坐标轴名称
      chartAxis: ['T', 'RH', 'wind dir'],
      info: {
        isToolbox: true,
        isDownloadCsv: false,
        isDownloadImg: false
      },
      // 数据
      chartData: [
        {
          name: 'T',
          value: [0, 0, 100]
        },
        {
          name: 'T',
          value: [0, 1, 85]
        },
        {
          name: 'T',
          value: [0, 2, 75]
        },
        {
          name: 'RH',
          value: [1, 0, 100]
        },
        {
          name: 'RH',
          value: [1, 1, 75]
        },
        {
          name: 'RH',
          value: [1, 2, 23]
        },
        {
          name: 'wind dir',
          value: [2, 0, 100]
        },
        {
          name: 'wind dir',
          value: [2, 1, 75]
        },
        {
          name: 'wind dir',
          value: [2, 2, 35]
        }
      ]
    }
  },
  methods: {
    // 自定义数据导出csv格式文件
    // chartOption 图表配置对象
    csvExport(chartOption) {
      let exportTitle = ['', 'T', 'RH', 'wind dir']
      let exportData = [
        { name: 'T', T: '100', RH: '100', WD: '100' },
        { name: 'RH', T: '85', RH: '75', WD: '75' },
        { name: 'wind dir', T: '75', RH: '23', WD: '35' }
      ]
      return { exportData, exportTitle }
    }
  }
}
</script>
```
