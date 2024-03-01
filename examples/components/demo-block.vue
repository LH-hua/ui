<template>
	<div class="docs-demo-wrapper">
		<!-- 代码展示头部 -->
		<section class="source">
			<slot name="source"></slot>
		</section>

		<!-- 代码片段 -->
		<div :style="{ height: isExpand ? 'auto' : '0' }" class="demo-container" ref="demo">
			<div span="14">
				<div class="docs-demo docs-demo--expand">
					<div class="highlight-wrapper">
						<div class="highlight">
							<slot name="highlight"></slot>
						</div>
					</div>
				</div>
			</div>
		</div>

		<section class="docs-box-meta">
			<!-- 标题 -->
			<!-- <section class="docs-title">组件名称</section> -->

			<!-- 描述 -->
			<!-- <section class="docs-desc">组件介绍</section> -->

			<!-- 底部 -->
			<section class="docs-actions" @click="toggle">
				<div class="center">{{ isExpand ? '隐藏代码' : '显示代码' }}</div>
				<!-- <div class="right" @click="onRunCode">执行代码</div> -->
			</section>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isExpand: false,
			isCopy: false
		}
	},
	methods: {
		/*----------------------------------------------------------------------
		| 点击事件
		|-----------------------------------------------------------------------
		*/
		// 显示隐藏
		toggle() {
			this.isExpand = !this.isExpand
		},
		onCopy() {},

		// 运行代码
		onRunCode() {}
	}
}
</script>

<style lang="less">
.docs-demo-wrapper {
	border: solid 1px #ebebeb;
	border-radius: 3px;
	transition: 0.2s;
	margin: 10px 0px;
}
.demo-container {
	transition: max-height 0.3s ease;
	overflow: hidden;
	// margin-top: 10px;
}
.source {
	// margin-top: 10px;
	// padding: 0px 10px;
	padding: 42px 24px 50px;
	color: #000000d9;
	border-bottom: 1px solid #f0f0f0;
}
.docs-demo {
	width: 100%;
	height: auto;
	box-sizing: border-box;
	font-size: 14px;
	background-color: #f7f7f7;
	border: 1px solid #e2ecf4;
	border-top: none;
	pre code {
		font-family: Consolas, Menlo, Courier, monospace;
		line-height: 18px;
		border: none;
	}
}
.docs-trans {
	cursor: pointer;
	width: 100%;
	text-align: center;
	display: inline-block;
	color: #858585;
	font-size: 12px;
	padding: 10px 0;
	background-color: #ffffff;
	border-top: 1px dashed #ebedf0;
}

.docs-demo__code,
.docs-demo__meta {
	padding: 0 20px;
}

.highlight-wrapper {
	overflow-y: auto;
}

.docs-demo__code {
	border-bottom: 1px solid #eee;
}
.docs-demo.docs-demo--expand .docs-demo__meta {
	border-bottom: 1px dashed #e9e9e9;
}

.docs-demo.docs-demo--expand .docs-demo__triangle {
	transform: rotate(180deg);
}

.highlight-wrapper {
	display: none;

	p,
	pre {
		margin: 0;
	}

	.hljs {
		padding: 0;
	}
}

.docs-demo.docs-demo--expand .highlight-wrapper {
	display: block;
}

.docs-demo__code__mobi {
	height: 620px;
	margin: 20px 0;
}

.docs-demo__code__mobi__header {
	border-radius: 4px 4px 0 0;
	background: -webkit-linear-gradient(rgba(55, 55, 55, 0.98), #545456);
	background: linear-gradient(rgba(55, 55, 55, 0.98), #545456);
	text-align: center;
	padding: 8px;

	img {
		width: 100%;
	}

	.url-box {
		height: 28px;
		line-height: 28px;
		color: #fff;
		padding: 0 3px;
		background-color: #a2a2a2;
		margin: 10px auto 0;
		border-radius: 4px;
		white-space: nowrap;
		overflow-x: auto;
	}
}

.docs-demo__code__mobi__content {
	iframe {
		width: 100%;
		border: 0;
		height: 548px;
	}
}

.docs-actions {
	position: relative;
	border-top: 1px solid #ebedf0;
	height: 36px;
	text-align: center;
	cursor: pointer;
	transition: 0.2s;
	user-select: none;
	width: 100%;
	display: inline-block;
	color: #858585;
	font-size: 12px;
	padding: 10px 0;
	background-color: #ffffff;
	border-top: 1px dashed #ebedf0;
	.center {
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -8px;
		margin-top: -8px;
	}
	.right {
		position: absolute;
		right: 20px;
		top: 50%;
		margin-left: -8px;
		margin-top: -8px;
	}
}

.docs-box-meta {
	position: relative;
	width: 100%;
	.docs-title {
		position: absolute;
		top: -14px;
		margin-left: 16px;
		padding: 1px 8px;
		color: #000000d9;
		background: #fff;
	}
	.docs-desc {
		padding: 18px 24px 12px;
		font-size: 14px;
		line-height: 28px;
	}
}
</style>
