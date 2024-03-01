<!--
 * @Author: lw
 * @Date: 2022-04-06 10:12:58
 * @Description: 代码预览组件 通过判断浏览器后缀传入参数 读取对应的属性
-->
<template>
	<div class="code-view-box">
		<!-- 插槽 通过顶部增加案例的 使用说明 -->
		<div class="code-view-head">
			<slot name="head"> </slot>
		</div>
		<code-viewer class="code-view-layout" :source="source" :layout="'right'" :show-code="false"></code-viewer>
	</div>
</template>
<script>
export default {
	//要用到哪些子组件
	components: {},
	//父组件传递过来的数据（两种方式声明：1.数组 2.对象）
	props: {},
	//组件私有数据（必须是function，而且要return对象类型）
	data() {
		return {
			source: ''
		}
	},
	//计算属性
	computed: {},
	//监听
	watch: {},
	//生命周期钩子：组件实例完成创建之后调用
	created() {
		this.init()
	},
	//生命周期钩子：组件实例渲染完成时调用
	mounted() {},
	//函数集，自己封装，便于开发使用
	methods: {
		/* ----------------------------------------------------------------------
        |  初始化
        |-----------------------------------------------------------------------
        */

		init() {
			const params = this.$route.query

			// 判断 浏览器头部是否传值
			if (!this.$utils.isNull(params)) {
				// 读取文件夹内容  动态引入文件
				const requireFile = require.context(`./examples-docs/`, true, /\.js$/)

				const modules = requireFile.keys().reduce((modules, modulePath) => {
					// "./test01.js"   --   test01
					// \w 匹配字母数字，下划线
					const moduleName = modulePath.replace(/\.\/(.*).js/, '$1')
					const value = requireFile(modulePath)
					modules[moduleName] = value.default
					return modules
				}, {})

				// 获取【examples-docs】/【文件夹名称】/【文件名称】/【属性名称】 示例代码
				this.source = modules[`${params.type}/${params.folder}`][`${params.fileName}`]
			} else {
				this.source = `// 默认案例代码
<template>
    <div>{{data}} </div>
</template>
<script>
    export default {
        data() {
            return {
                data:'测试'
            }
        },
    }
<\/script>`
			}
		}
	}
}
</script>
<style lang="less" scoped>
.code-view-box {
	.code-view-head {
		padding: 0px 40px;
	}
	.code-view-layout {
		height: 100%;
	}
	.output-container-ttt {
		background-color: #f2f3f9;
	}
}

/deep/.examples-echarts {
	position: absolute;
	top: 42px;
	right: 15px;
	bottom: 50px;
	left: 15px;
	box-sizing: border-box;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	background: #fff;
	overflow: hidden;
	padding: 10px;
}
</style>
