# 介绍

| 部署方式 | 相关技术点 |
| ---- | ---- |
| 联网平台 | 基于人体监测算法，对站房摄像头的移动侦测识别结果进行二次确认。|

对监控区域内的人体目标进行监测，甄别非法入侵、污染源生产线非工作时段运行、违规运行等异常入侵行为，作告警提示并自动留证。
自动标识监控图像中的人形，并且显示实时的置信度数值（范围：0~1.00）。

::: demo

```html
<video width="100%" controls>
  <source :src="url" type="video/mp4">
</video>
<script>
  export default{
    data(){
      return {
        url: require('../../../assets/video/ai/6异常入侵-演示视频.mp4')
      }
    }
  }
</script>
```

:::
