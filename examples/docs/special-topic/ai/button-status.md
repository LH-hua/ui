# 介绍

| 部署方式 | 相关技术点 |
| ---- | ---- |
| 动管仪、AI智能终端、联网平台 | 模板匹配、颜色空间 |

通过机器视觉智能识别在线监测仪器、污染治理设施、生产设施的设备灯色，灯闪烁、按钮等状态，无需现场安装额外的用电量监控设备亦可有效判定设备运行状态和用电情况，及时发现受监控设备的故障异常，避免异常状态影响在线监测的连续性或常规的生产作业周期。

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
        url: require('../../../assets/video/ai/9设备灯按钮状态监测-演示视频.mp4')
      }
    }
  }
</script>
```

:::
