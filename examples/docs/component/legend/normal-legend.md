### 图例下标在中间

::: demo 测试

```html
<div>
	<s-legend :legend-id="'demo1'" :gradient="gradient" :legend="legend"></s-legend>
</div>

<script>
export default {
  data() {
    return {
      gradient: false,
      legend: {
          name: 'AQI',
          legends: [
            {
              labelId: 1,
              labelName: '优',
              colorLevel: 'rgb(0, 228, 0)'
            },
            {
              labelId: 2,
              labelName: '良',
              colorLevel: 'rgb(255, 225, 0)'
            },
            {
              labelId: 3,
              labelName: '轻度',
              colorLevel: 'rgb(255, 126, 0)'
            },
            {
              labelId: 4,
              labelName: '中度',
              colorLevel: 'rgb(255, 0, 0)'
            },
            {
              labelId: 5,
              labelName: '重度',
              colorLevel: 'rgb(153, 0, 76)'
            },
            {
              labelId: 6,
              labelName: '严重',
              colorLevel: 'rgb(126, 0, 35)'
            }
          ]
        }
    }
  }
}
</script>

```

:::

### 图例下标从最左侧开始

::: demo 测试

```html
<div>
	<s-legend :legend-id="'demo2'" :gradient="gradient" :legend="legend"></s-legend>
</div>
<script>
export default {
  data() {
    return {
      gradient: false,
      legend: {
          name: 'PM₂.₅',
          unit: 'μg/m³',
          legends: [
            {
              labelId: 0,
              labelName: '0'
            },
            {
              labelId: 1,
              labelName: '35',
              colorLevel: 'rgb(0, 228, 0)'
            },
            {
              labelId: 2,
              labelName: '75',
              colorLevel: 'rgb(255, 225, 0)'
            },
            {
              labelId: 3,
              labelName: '115',
              colorLevel: 'rgb(255, 126, 0)'
            },
            {
              labelId: 4,
              labelName: '150',
              colorLevel: 'rgb(255, 0, 0)'
            },
            {
              labelId: 5,
              labelName: '250',
              colorLevel: 'rgb(153, 0, 76)'
            },
            {
              labelId: 6,
              labelName: '350',
              colorLevel: 'rgb(126, 0, 35)'
            }
          ]
        }
    }
  }
}
</script>

```

:::

### 图例下标空出左侧第一个

::: demo 测试

```html
<div>
	<s-legend :legend-id="'demo3'" :gradient="gradient" :legend="legend"></s-legend>
</div>
<script>
export default {
  data() {
    return {
      gradient: false,
      legend: {
          name: '气压',
          unit: 'hPa',
          legends: [
            {
              labelId: 0,
              labelName: ''
            },
            {
              labelId: 1,
              labelName: '800',
              colorLevel: 'rgb(142,179,184)'
            },
            {
              labelId: 2,
              labelName: '900',
              colorLevel: 'rgb(105,180,179)'
            },
            {
              labelId: 3,
              labelName: '1000',
              colorLevel: 'rgb(61,137,153)'
            },
            {
              labelId: 4,
              labelName: '1030',
              colorLevel: 'rgb(53,105,141)'
            },
            {
              labelId: 5,
              labelName: '1070',
              colorLevel: 'rgb(56,113,72)'
            },
            {
              labelId: 6,
              labelName: '1100',
              colorLevel: 'rgb(165, 151, 62)'
            },
            {
              labelId: 7,
              labelName: '',
              skip: true,
              colorLevel: 'rgb(169,89,66)'
            }
          ]
        }
    }
  }
}
</script>

```

:::


### 图例下标空出右侧第一个

::: demo 测试

```html
<div>
	<s-legend :legend-id="'demo4'" :gradient="gradient" :legend="legend"></s-legend>
</div>
<script>
export default {
  data() {
    return {
      gradient: false,
      legend: {
          name: '小时降雨量',
          unit: 'mm',
          legends: [
            {
              labelId: -2,
              labelName: '',
              skip: true
            },
            {
              labelId: 0,
              labelName: '0',
              colorLevel: 'rgba(184,243,175,255)'
            },
            {
              labelId: 1,
              labelName: '2.5',
              colorLevel: 'rgba(118,215,111,255)'
            },
            {
              labelId: 2,
              labelName: '5',
              colorLevel: 'rgba(63,185,58,255)'
            },
            {
              labelId: 3,
              labelName: '10',
              colorLevel: 'rgba(40,140,42,255)'
            },
            {
              labelId: 4,
              labelName: '25',
              colorLevel: 'rgba(105,181,241,255)'
            },
            {
              labelId: 5,
              labelName: '50',
              colorLevel: 'rgba(3,0,250,255)'
            },
            {
              labelId: 6,
              labelName: '100',
              colorLevel: 'rgba(251,0,255,255)'
            }
          ]
        }
    }
  }
}
</script>

```

:::

### 图例下标空出两侧第一个

::: demo 测试

```html
<div>
	<s-legend :legend-id="'demo5'" :gradient="gradient" :legend="legend"></s-legend>
</div>
<script>
export default {
  data() {
    return {
      gradient: false,
      legend: {
          name: '温度',
          unit: '℃',
          legends: [
            {
              labelId: -1,
              labelName: '',
              skip: true
            },
            {
              labelId: 0,
              labelName: '',
              colorLevel: 'rgba(126,2,64,255)',
              width: 23
            },
            {
              labelId: 1,
              labelName: '-32',
              colorLevel: 'rgba(0,47,134,255)',
              width: 23
            },
            {
              labelId: 2,
              labelName: '-28',
              colorLevel: 'rgba(26,92,166,255)',
              width: 23
            },
            {
              labelId: 3,
              labelName: '-24',
              colorLevel: 'rgba(32,117,210,255)',
              width: 23
            },
            {
              labelId: 4,
              labelName: '-20',
              colorLevel: 'rgba(60,160,240,255)',
              width: 23
            },
            {
              labelId: 5,
              labelName: '-16',
              colorLevel: 'rgba(117,207,255,255)',
              width: 23
            },
            {
              labelId: 6,
              labelName: '-12',
              colorLevel: 'rgba(151,225,244,255)',
              width: 23
            },
            {
              labelId: 7,
              labelName: '-8',
              colorLevel: 'rgba(189,249,255,255)',
              width: 23
            },
            {
              labelId: 8,
              labelName: '-4',
              colorLevel: 'rgba(242,255,255,255)',
              width: 23
            },
            {
              labelId: 9,
              labelName: '0',
              colorLevel: 'rgba(223,255,217,255)',
              width: 23
            },
            {
              labelId: 10,
              labelName: '4',
              colorLevel: 'rgba(196,255,183,255)',
              width: 23
            },
            {
              labelId: 11,
              labelName: '8',
              colorLevel: 'rgba(186,254,131,255)',
              width: 23
            },
            {
              labelId: 12,
              labelName: '12',
              colorLevel: 'rgba(252,254,156,255)',
              width: 23
            },
            {
              labelId: 13,
              labelName: '16',
              colorLevel: 'rgba(255,243,196,255)',
              width: 23
            },
            {
              labelId: 14,
              labelName: '20',
              colorLevel: 'rgba(255,220,168,255)',
              width: 23
            },
            {
              labelId: 15,
              labelName: '24',
              colorLevel: 'rgba(255,175,117,255)',
              width: 23
            },
            {
              labelId: 16,
              labelName: '28',
              colorLevel: 'rgba(253,135,132,255)',
              width: 23
            },
            {
              labelId: 17,
              labelName: '32',
              colorLevel: 'rgba(236,91,95,255)',
              width: 23
            }
          ]
        }
    }
  }
}
</script>

```

:::

### 属性

| 参数            | 说明     | 类型        | 可选值    | 默认值 |
| --------------- | -------- | ----------- | --------- | ------ |
| gradient | 是否渐变  | boolean | true/false     | - |
| legend | 图例对象 | object  | - | - |
| legendId | 图例id，用于一个页面有多个图例时区分不同图例 | string | | legend |

### legend

| 参数            | 说明     | 类型        | 可选值    | 默认值 |
| --------------- | -------- | ----------- | --------- | ------ |
| name | 是否渐变  | boolean | true/false     | - |
| unit | 图例对象 | object  | - | - |
| legends | 颜色集合 | Array<object> | - | - |

### legends对象
| 参数            | 说明     | 类型        | 可选值    | 默认值 |
| --------------- | -------- | ----------- | --------- | ------ |
| labelId | 与legendid一起组成canvas唯一id  | string | - | - |
| labelName | 颜色对应文字 | string  | - | - |
| colorLevel | 颜色值,rgba格式，如'rgba(253,135,132,255)' | string | - | - |
| width | canvas宽度 | number | - | 47 |
| skip | 是否跳过不渲染 | boolean | true/false | false |
