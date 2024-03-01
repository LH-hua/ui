### 图例定位到右下角

::: demo 测试

```html
<div class="legend-demo">
	<s-legend :gradient="gradient" :legend="legend"></s-legend>
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

<style lang="less" scoped>
.legend-demo{
  /* 相对于当前容器, 不加则相对于当前浏览器窗口 */
  /* position: relative; */
  .legendRegion {
    .legend {
      right: 25px;
      bottom: 50px;
    }
  }
}
</style>

```

:::

### 样式

通过以下方式控制图例位置，或者调整样式
```
<style lang="less" scoped>
.legendRegion {
  .legend {
    right: 25px;
    bottom: 50px;
  }
}
</style>
```

结合地图使用请见地图组件
