<template>
	<!-- 包裹动画 -->
	<transition name="fade" v-if="visible">
		<div>
			<!-- 遮罩大背景,且通过监听window.resize事件进行自适应 -->
			<div class="bg-mask" :style="{ width: bodyWidth + 'px', height: bodyHeight + 'px' }" @click="closeAll"></div>
			<!-- 图片显示主题 自适应宽高且监听滚轮以进行缩放-->
			<div class="content-box-body" :style="{ width: bodyWidth + 'px', height: bodyHeight - 100 + 'px' }" @click="closeAll" @mousewheel="handleMousewheel">
				<img
					:src="imgURL"
					alt
					class="img-custom"
					ref="customImg"
					:style="{
						transform: `scale(${activeImg.scale}) rotate(${activeImg.rotate}deg)`,
						transition: `${aniOpenFlag && aniName} 0.12s linear`
					}"
				/>
			</div>
			<!-- 工具按钮 -->
			<div class="content-box-footer">
				<abbr title="放大" @click="enLarge" v-if="_buttonOptions.enLargeButton">
					<span class="iconfont icon-fangda icon"></span>
				</abbr>
				<abbr title="缩小" @click="narrowImg" v-if="_buttonOptions.narrowImgButton">
					<span class="iconfont icon-suoxiao icon"></span>
				</abbr>
				<abbr title="还原" @click="initImg" v-if="_buttonOptions.initImgButton">
					<span class="iconfont icon-huanyuan icon"></span>
				</abbr>

				<abbr title="左转" @click="rotate('left')" v-if="_buttonOptions.leftButton">
					<span class="iconfont icon-xiangyouxuanzhuan icon"></span>
				</abbr>
				<abbr title="右转" @click="rotate('right')" v-if="_buttonOptions.rightButton">
					<span class="iconfont icon-xiangzuoxuanzhuan icon"></span>
				</abbr>
				<abbr title="下载" @click="download" v-if="_buttonOptions.downloadButton">
					<span class="iconfont icon-xiazai icon"></span>
				</abbr>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			// 动画开关
			aniOpenFlag: true,
			// 当前图片相关属性
			activeImg: {
				scale: 1,
				rotate: 0
			},
			// 浏览器宽高
			bodyWidth: window.innerWidth,
			bodyHeight: window.innerHeight
		}
	},
	props: {
		// 按钮配置
		buttonOptions: {
			type: Object,
			default: function () {
				return {}
			}
		},
		// 图片URL地址
		imgData: {
			default: ''
		},
		// 遮罩开关
		visible: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		// 按钮配置,合并传递的数据
		_buttonOptions() {
			let initOptions = {
				enLargeButton: true,
				narrowImgButton: true,
				initImgButton: true,
				leftButton: true,
				rightButton: true,
				downloadButton: true
			}
			return Object.assign(initOptions, this.buttonOptions)
		},
		// 图片地址
		imgURL() {
			if (Object.prototype.toString.call(this.imgData) == '[object String]') {
				return this.imgData
			} else {
				return ''
			}
			// if (Object.prototype.toString.call(this.imgData) == '[object Array]') {
			//   return ''
			// }
		},
		// 动画显隐,一般全开,主要在恢复原形时暂时为none
		aniName() {
			return this.aniOpenFlag ? 'all' : 'none'
		}
	},
	created() {
		// 监听窗口变化,随时改变遮罩与图片大小
		window.addEventListener('resize', this.initMask)
	},
	methods: {
		/*----------------------------------------------------------------------
        | 初始化
        |-----------------------------------------------------------------------
        */
		// 初始化宽高
		initMask() {
			this.bodyWidth = window.innerWidth
			this.bodyHeight = window.innerHeight
		},
		// 图片恢复方法
		initImg() {
			this.aniOpenFlag = false
			this.activeImg = {
				scale: 1,
				rotate: 0
			}
		},
		/*----------------------------------------------------------------------
        | 点击事件
        |-----------------------------------------------------------------------
        */
		// 左转右转方法
		rotate(direction) {
			this.aniOpenFlag = true
			let rotate = this.activeImg.rotate
			rotate = direction == 'right' ? rotate + 90 : rotate - 90
			this.activeImg.rotate = rotate
		},
		// 缩小方法
		narrowImg() {
			let scale = this.activeImg.scale
			scale -= 0.1
			if (scale <= 0.1) {
				scale = 0.1
			}
			this.activeImg.scale = scale
		},
		// 放大方法
		enLarge() {
			let scale = this.activeImg.scale
			scale += 0.1
			if (scale >= 5) {
				scale = 5
			}
			this.activeImg.scale = scale
		},
		// 下载
		download() {
			this.$utils.downloadImg(this.imgData)
		},
		// 监听滚轮,放大缩小
		handleMousewheel(e) {
			if (e.deltaY < 0) {
				this.enLarge()
			}
			if (e.deltaY > 0) {
				this.narrowImg()
			}
		},

		// 关闭方法
		closeAll() {
			this.initImg()
			this.$emit('close')
		}
	}
}
</script>

<style lang="less" scoped>
//@import url()
// @import './styles/index.css';
@font-face {
	font-family: 'iconfont';
	/* Project id 2586079 */
	src: url('//at.alicdn.com/t/font_2586079_2jwcx90h46b.woff2?t=1622604219198') format('woff2'),
		url('//at.alicdn.com/t/font_2586079_2jwcx90h46b.woff?t=1622604219198') format('woff'), url('//at.alicdn.com/t/font_2586079_2jwcx90h46b.ttf?t=1622604219198') format('truetype');
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-fangda:before {
	content: '\e76e';
}

.icon-suoxiao:before {
	content: '\e77d';
}

.icon-xiazai:before {
	content: '\e659';
}

.icon-xiangyouxuanzhuan:before {
	content: '\e66a';
}

.icon-xiangzuoxuanzhuan:before {
	content: '\e66b';
}

.icon-huanyuan:before {
	content: '\e66f';
}

.bg-mask {
	background: #000;
	opacity: 0.5;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-content: center;
	color: #fff;
	z-index: 9998;
	overflow: hidden;
}
.content-box-body {
	position: fixed;
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 20px;
	img {
		// width: 100%;
		max-width: 100%;
		max-height: 100%;
	}
}
.content-box-footer {
	position: fixed;
	bottom: 20px;
	z-index: 10000;
	left: 50%;
	right: 50%;
	bottom: 30px;
	transform: translateX(-50%);
	width: 450px;
	height: 45px;
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: space-around;
	.icon {
		color: #fff;
		opacity: 0.6;
		font-size: 26px;
		&:hover {
			opacity: 1;
		}
	}
	& > abbr {
		font-size: 20px;
		cursor: pointer;
		-webkit-app-region: no-drag;
	}
	abbr[title] {
		border-bottom: none !important;
		text-decoration: none !important;
	}
}
</style>
