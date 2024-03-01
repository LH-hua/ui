# 介绍

| 部署方式 | 相关技术点 |
| ---- | ---- |
| 联网平台 | 集成YOLOv5目标检测模型、CRNN卷积循环神经网络、DeepSort多目标追踪算法 |

对受监测道路进行车型识别、车牌识别，并进行路段车流量统计，进而构建车辆多维属性数据库，利于车辆精细化监管，可辅助高排车识别系统、道路噪声监测系统进行远程执法查证。

编号：在线监控开始后，通过该监控路段的第几辆车，如果编号相同则为同一车辆再次通过该路段。

车的种类：用不同色框标识。

小轿车——Car

中型轿车/面包车——Middle car

中型客车——Middle Bus

轻型货车——Tiny truck

中重型货车——Middle truck

混泥土运输车——Agitator truck

置信度：0~1.00。

演示视频：

::: demo

```html
<video width="100%" controls>
  <source :src="url" type="video/mp4">
</video>
<script>
  export default{
    data(){
      return {
        url: require('../../../assets/video/ai/4车辆识别统计-演示视频.mp4')
      }
    }
  }
</script>
```

:::
