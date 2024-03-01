# 介绍

|部署方式 | 相关技术点 |
| ---- | ---- |
| 水质动管仪、AI智能终端、联网平台 | Haar/LBP特征、Adaboost级联分类器、金字塔LK光流、颜色空间、图像形态学（轮廓提取和量化） |

结合多种视频和图形处理技术，通过多种AI算法的端到端管道集成进而提供实时自动的排水监测、判定和报警功能，如是否正在排水，流动轨迹捕捉、排水量估算、污水色度和浊度判定。在污染源企业、河涌流域等排污环境中可监控偷排暗排行为。
如有监控位置有排水迹象，仪器或平台上调取监控画面会自动标识排水状态、排水流量估算值（L/min）、污水颜色、浊度等级（Lv）。

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
        url: require('../../../assets/video/ai/1排水监测-演示视频.mp4')
      }
    }
  }
</script>
```

:::
