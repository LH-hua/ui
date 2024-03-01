<template>
  <div class="_box">
    <vuescroll :ops="ops">
      <slot></slot>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'

export default {
  //  要用到哪些子组件
  components: {
    vuescroll
  },
  //  父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
  props: {},
  //  数据
  data() {
    return {
      ops: {
        vuescroll: {
          mode: 'native', //  模式:pc natice 移动端是slice
          sizeStrategy: 'percent', //  父元素是否是固定的是就percent 不是就是number 填一个数值
          detectResize: true //  内容是否根据页面调整
        },
        scrollPanel: {
          initialScrollY: false, // 初始化距离顶部的位置
          initialScrollX: false, // 初始化距离左侧的位置
          scrollingX: true, //  是否开启横向滚动
          scrollingY: true, // 是否开启竖向滚动
          speed: 300, // 多长时间内完成一次滚动。 数值越小滚动的速度越快。
          easing: 'easeInQuad', // 默认动画
          verticalNativeBarPos: 'right',
          maxHeight: undefined, // 这是滚动条最大高度,内容高度小于 maxHeight 时高度自适应，超出的话出现滚动条。
          maxWidth: undefined // 这是滚动条最大宽度,内容宽度小于 maxWidth 时高度自适应，超出的话出现滚动条。
        },
        rail: {
          background: 'transparent', // 轨道的背景色。
          opacity: 0, // 轨道的透明度。 0是透明，1是不透明
          size: '6px', // 轨道的尺寸。
          specifyBorderRadius: false, // 是否指定轨道的 borderRadius， 如果不那么将会自动设置。
          gutterOfEnds: null,
          gutterOfSide: '0px', // 距离容器的距离
          keepShow: false // 是否即使 bar 不存在的情况下也保持显示。
        },
        bar: {
          showDelay: 500, // 在鼠标离开容器后多长时间隐藏滚动条。
          onlyShowBarOnScroll: true, // 是否只在滚动时显示 bar。
          keepShow: true, // 滚动条是否保持显示。
          background: '#bac6da', // 滚动条背景色。
          opacity: 1, // 滚动条透明度。
          hoverStyle: false,
          specifyBorderRadius: false, // 是否指定滚动条的 borderRadius， 如果不那么和轨道的保持一致。
          minSize: '0.1', // 为 bar 设置一个最小尺寸, 从 0 到 1. 如 0.3, 代表 30%.
          size: '6px', // bar 的尺寸。
          disable: false // 是否禁用滚动条。
        }
      }
    }
  },
  created() {},
  //  生命周期钩子：组件实例渲染完成时调用
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.init()
      })
    })
  },
  //  函数集，
  methods: {
    /* ----------------------------------------------------------------------
    | 初始化数据
    |-----------------------------------------------------------------------
    */

    init() {},
    /**
     * 将业务数据加入到基础样式配置中
     */
    assembleDataToOption() {
      // lodash的一个公共函数merge,它表示递归合并来源对象自身和继承的可枚举属性到目标对象。后续的来源对象属性会覆盖之前同名的属性
      //    return merge({}, this.formInfo, this.formExport)
    }
  }
}
</script>
