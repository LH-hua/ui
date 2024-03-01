<template>
	<div class="verify-code">
		<canvas class="mycanvas" width="95" height="40" @click="verifyCodeClick"></canvas>
	</div>
</template>

<script>
// 验证码生成组件
export default {
	name: 'Verify',
	// 要用到哪些子组件
	components: {},
	// 父组件传递过来的数据 （两种方式声明：1.数组 2.对象）
	props: {
		// 验证码字符串
		verifyCode: {
			type: String,
			required: true,
			default: 'zbra'
		}
	},
	// 数据
	data() {
		return {}
	},
	// 监听
	watch: {
		// 监听验证码字符串变化，进行重绘
		verifyCode() {
			this.doDraw()
		}
	},
	// 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
	created() {},
	// 生命周期钩子：组件实例渲染完成时调用
	mounted() {
		this.doDraw()
	},
	// 函数集，
	methods: {
		/* ----------------------------------------------------------------------
        | 验证码区域点击事件, 用户可监听此事件, 传入新的验证码进行重绘
        |-----------------------------------------------------------------------
        */
		verifyCodeClick() {
			this.$emit('change')
		},

		/* ----------------------------------------------------------------------
        | 渲染验证码
        |-----------------------------------------------------------------------
        */
		randomColor() {
			//  得到随机的颜色值
			const r = Math.floor(Math.random() * 256)
			const g = Math.floor(Math.random() * 256)
			const b = Math.floor(Math.random() * 256)
			return 'rgb(' + r + ',' + g + ',' + b + ')'
		},
		doDraw() {
			const x = 20
			const y = 20 + Math.random() * 8
			const deg = (Math.random() * 30 * Math.PI) / 180
			//   获取canvas
			const canvas = document.getElementsByClassName('mycanvas')
			// eslint-disable-next-line no-self-assign
			canvas[0].width = canvas[0].width // 清空画布
			// eslint-disable-next-line no-self-assign
			canvas[0].height = canvas[0].height
			const cocanvasWidth = canvas[0].width
			const canvasHeight = canvas[0].height
			const context = canvas[0].getContext('2d')
			context.font = 'bold 23px 微软雅黑'
			context.fillText(this.verifyCode, 15, 30)
			context.translate(x, y) // canvas原点的偏移量
			context.rotate(deg) // 旋转度数
			context.fillStyle = this.randomColor() // 设置颜色
			context.strokeStyle = this.randomColor() // 设置颜色
			context.rotate(-deg)
			context.translate(-x, -y)
			for (let i = 0; i <= 15; i++) {
				// 验证码上显示线条
				context.strokeStyle = this.randomColor() // 轮廓风格
				context.beginPath()
				context.moveTo(Math.random() * cocanvasWidth, Math.random() * canvasHeight)
				context.lineTo(Math.random() * cocanvasWidth, Math.random() * canvasHeight)
				context.stroke()
			}
			for (let i = 0; i <= 30; i++) {
				// 验证码上显示小点
				context.strokeStyle = this.randomColor()
				context.beginPath() // 新建一条路径
				const x = Math.random() * cocanvasWidth
				const y = Math.random() * canvasHeight
				context.moveTo(x, y) // 吧画笔移动到指定位置
				context.lineTo(x + 1, y + 1) // 想指定位置移动
				context.stroke()
			}
		}
	}
}
</script>

<style scoped></style>

<style lang="less" scoped>
.mycanvas {
	border: 1px solid rgb(199, 198, 198);
	border-radius: 5%;
}
.verify-code {
	cursor: pointer;
}
</style>
