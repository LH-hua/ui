<!--
 * @Author: your name
 * @Date: 2021-02-20 14:04:43
 * @LastEditTime: 2021-04-11 10:04:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \envUI\src\components\echarts\Readme.md
-->
## 封装插件思路
第一步 初始化图表 通过三种方式去渲染图表
    1.通过 `requestUrl` params 请求服务器获取到的值去渲染
    2.通过 `chartData chartAxis`  静态数据 去渲染
    3.通过 `extraOption` 自定义属性去渲染

第二步 通过 `chartType` 选择渲染的图表形状  通过 tricks 选择渲染的 图表样式 【目前只有 `bar | line | pie`】 默认是选择bar 
    1.不同的图表形状 将数据解析 成图表需要的格式
    2.内置了全局的图表颜色  或者通过 `tricksColor` 属性配置 对应的图表颜色

第三步 自定义去渲染图表 通过`extraOption` 去修改图表内置样式效果


## todo 代办
1.通过 统一的数据格式 去渲染数据
2.内置 3种图表的形状  和 3种内置的图表样式 【具体可以通过业务需求 封装多个不同的图表样式】


## 参考网站
参考图表封装
[在vue项目中封装echarts的正确姿势](https://www.cnblogs.com/zhangnan35/p/12680038.html)

参考图表样式网址
[echarts-社区](https://www.makeapie.com/explore.html#sort=rank~timeframe=all~author=all)







