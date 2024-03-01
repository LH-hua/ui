<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
	name: 'Scroll',
	// 要用到哪些子组件
	components: {},
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		// better-scroll原生属性
		// 0: 不派发 scroll 事件
		// 1: 会非实时（屏幕滑动超过一定时间后）派发scroll 事件
		// 2: 会在屏幕滑动的过程中实时的派发 scroll 事件
		// 3: 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
		probeType: {
			type: Number,
			default: 1
		},
		// 是否横向滚动
		scrollX: {
			type: Boolean,
			default: false
		},
		// 是否纵向滚动
		scrollY: {
			type: Boolean,
			default: true
		},
		// 是否支持点击事件
		click: {
			type: Boolean,
			default: true
		},
		// 是否重新加载
		reload: {
			type: Boolean,
			default: false
		},
		// 是否监听滚动事件
		listenScroll: {
			type: Boolean,
			default: false
		}
	},
	// 数据
	data() {
		return {}
	},
	// 计算属性
	computed: {},
	// 监听
	watch: {
		// 监听滚动条刷新
		reload() {
			setTimeout(() => {
				this.refresh()
			}, 20)
		}
	},
	// 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
	created() {},
	// 生命周期钩子：组件实例渲染完成时调用
	mounted() {
		setTimeout(() => {
			this._initScroll()
		}, 20)
	},
	// 函数集，
	methods: {
		/* ----------------------------------------------------------------------
        | 初始化数据
        |-----------------------------------------------------------------------
        */

		_initScroll() {
			if (!this.$refs.wrapper) {
				return
			}
			// console.log(this.click)
			this.scroll = new BScroll(this.$refs.wrapper, {
				scrollbar: {
					fade: false,
					interactive: false
				},
				mouseWheel: true,
				bounce: false,
				scrollX: this.scrollX,
				scrollY: this.scrollY,
				stopPropagation: true,
				probeType: this.probeType,
				click: this.click
			})
			if (this.listenScroll) {
				const me = this
				this.scroll.on('scroll', pos => {
					me.$emit('scroll', pos)
				})
			}
		},

		/* ----------------------------------------------------------------------
        | 公开Api
        |-----------------------------------------------------------------------
        */
		enable() {
			this.scroll && this.scroll.enable()
		},
		disable() {
			this.scroll && this.scroll.disable()
		},
		refresh() {
			this.scroll && this.scroll.refresh()
		},
		scrollTo() {
			this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
		},
		scrollToElement() {
			this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
		}
	}
}
</script>

<style lang="less" scoped>
.wrapper {
	position: relative;
	height: 100%;
	overflow: hidden;
	/deep/ .bscroll-vertical-scrollbar {
		z-index: 1 !important;
	}
}
</style>
