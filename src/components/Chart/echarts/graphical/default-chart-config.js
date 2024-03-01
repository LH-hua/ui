import { charts } from '../../../../config/color'
//默认chart样式
export const titleConfig = {
  textStyle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  top: '20px'
}
export const legendConfig = {
  // top: '92%',
  show: true
}
export const xAxisConfig = {
  nameTextStyle: {
    color: '#000',
    fontSize: 12,
  },
  axisLine: {
    lineStyle: {
      color: "#cccccc"
    }
  },
  axisLabel: {
    color: "#000"
  }
}
export const yAxisConfig = {
  nameTextStyle: {
    color: '#000',
    fontSize: 12,
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: "#cccccc"
    }
  },
  axisLabel: {
    color: "#000"
  }
}

export const color = charts.color.default
export const toolbox = {
  show: true,
  showTitle: false,
  right: '30px',
  top: '15px'
}

export const grid = {
  containLabel: true
}

export const tooltip = {
  trigger: 'item',
  borderWidth: 1,
  backgroundColor: "#fff",
  borderColor: '#1890ff',
  shadowColor: 'rgba(43,154,250,.3)',
  textStyle: {
    color: '#333',
    fontSize: 12
  }
}

export default {
  line: {
    title: titleConfig,
    legend: legendConfig,
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    color: color,
    toolbox: toolbox,
    grid,
    tooltip
  },
  bar: {
    title: titleConfig,
    legend: {
      bottom: '8%'
    },
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    color: color,
    toolbox: toolbox,
    grid,
    tooltip
  },
  pie: {
    title: titleConfig,
    legend: legendConfig,
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    color: color,
    toolbox: toolbox,
    grid,
    tooltip
  },
  boxplot: {
    title: titleConfig,
    legend: legendConfig,
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    color: color,
    toolbox: toolbox,
    grid,
    tooltip
  },
  gauge: {
    title: titleConfig,
    legend: legendConfig,
    color: color,
    toolbox: toolbox,
    grid,
    tooltip
  },
  many: {
    title: titleConfig,
    legend: {
      top: '95%'
    },
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    color: color,
    toolbox: toolbox,
    grid,
    tooltip
  },
  scatterMap: {
    title: titleConfig,
    legend: legendConfig,
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    color: color,
    toolbox,
    grid,
    tooltip
  },
  hotPower: {
    title: titleConfig,
    legend: legendConfig,
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    color: color,
    grid,
    tooltip
  },
  monthMap: {
    title: titleConfig,
    legend: legendConfig,
    color: color,
    grid,
    tooltip
  },
  graphicLinkage: {
    title: {
      top: '10px'
    },
    legend: {
      top: '87%'
    },
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    color: color,
    grid,
    toolbox: {
      ...toolbox,
      top: '6px'
    },
    tooltip
  },
  visualMap: {
    title: titleConfig,
    toolbox: {
      ...toolbox,
      top: '25px'
    },
    color: color,
    grid,
    tooltip
  }

}