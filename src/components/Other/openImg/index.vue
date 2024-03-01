<template>
	<div class="img-large-mode">
		<!-- 引入遮罩组件,配置相关属性与方法 -->
		<open-img :visible.sync="visible" v-if="visible" @close="closeMask" :imgData="imgData" :buttonOptions="buttonOptions"></open-img>
	</div>
</template>

<script>
//import x from ''
import openImg from './openImg'
export default {
	components: {
		openImg
	},
	props: {
		// 按钮配置
		buttonOptions: {
			type: Object,
			default: function() {
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
			default: function() {
				return false
			}
		}
	},
	data() {
		return {}
	},
	computed: {},
	methods: {
		// 打开遮罩方法
		show(opt) {
			// 对用户传入的的opt进行相关设置
			if (opt) {
				this.imgData = opt.imgData
				this.buttonOptions = opt.buttonOptions
			}
			// 打开遮罩
			this.visible = true
		},
		// 关闭遮罩方法
		closeMask() {
			this.visible = false
			let imgLargeDomArr = document.querySelectorAll('.img-large-mode')
			// 删除产生的dom
			if (imgLargeDomArr.length > 0) {
				for (let i = 0; i < imgLargeDomArr.length; i++) {
					imgLargeDomArr[i].parentNode.removeChild(imgLargeDomArr[i])
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
//@import url()
.img-large-mode {
}
</style>
