<template>
	<div
		:class="fullscreen ? 'env-loading-main-FullScreen' : 'env-loading-main'"
		:style="{
			zIndex: zIndex,
			background: background,
			fontSize: fontSize + 'px',
			color: color
		}"
	>
		<!-- loading 样式 -->
		<template v-if="type == '1'">
			<a-icon type="loading" />
			<span :style="{ marginTop: '10px', fontSize: fontSize + 'px !important' }">{{ text }}</span>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Loading',
	data() {
		return {
			fullscreen: false,
			background: null,
			color: null,
			text: null,
			fontSize: null,
			type: 1,
			zIndex: 10
		}
	},
	beforeCreate() {},
	created() {},
	beforeMount() {},
	mounted() {
		if (this.fullscreen) {
			document.body.style.overflow = 'hidden'
		}
	},
	destroyed() {
		document.body.style.overflowX = 'hidden'
	},
	errorCaptured() {},
	methods: {}
}
</script>

<style lang="less">
.env-loading-main {
	position: absolute;
	z-index: 2000;
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
}

.env-loading-main-FullScreen {
	// @extend .env-loading-main;
	width: 100vw;
	height: 100vh;
	top: 0;
	background-color: rgb(0, 0, 0, 0.5);
}
</style>
