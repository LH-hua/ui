# 介绍

| 部署方式 | 相关技术点 |
| ---- | ---- |
| 动管仪、AI智能终端、联网平台 | 模板匹配、颜色空间 |

门状态的在线实时检测结合Rola用电量等模块，可判断监测站房、作业车间、储物间等室内环境是否存在门长时间未关的状态；避免室内的监测仪器、生产设备、存放物由于长时间门未关，受外部影响而产生异常，并保障室内安全。

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
        url: require('../../../assets/video/ai/10门开关状态监测-演示视频.mp4')
      }
    }
  }
</script>
```

:::
