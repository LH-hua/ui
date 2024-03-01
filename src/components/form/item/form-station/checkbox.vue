<template>
	<label class="checkbox" :class="{ checked: checked }" @click.stop.prevent="change">
		<span class="icon">
			<input type="checkbox" v-model="checked" v-show="false" />
			<svg
				v-if="checked"
				t="1587976064214"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="4734"
				width="14"
				height="14"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<path
					d="M886.4 240c-12.8-12.8-32-12.8-44.8 0L364.8 716.8l-182.4-182.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l204.8 204.8c6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6L886.4 284.8c12.8-12.8 12.8-32 0-44.8z"
					fill="#ffffff"
					p-id="4735"
				></path>
			</svg>
		</span>
		<span class="name" :title="param.name">{{ param.name }}</span>
	</label>
</template>

<script>
export default {
	data() {
		return {
			loaded: false
		}
	},
	props: {
		param: {
			default: () => {},
			type: Object
		},
		index: {
			default: -1,
			type: Number
		},
		pIndex: {
			default: -1,
			type: Number
		},
		checked: {
			default: false,
			type: Boolean
		}
	},
	model: {
		prop: 'checked',
		event: 'change'
	},
	methods: {
		change() {
			this.$emit('change', !this.check, this.index, this.pIndex)
		}
	},
	watch: {
		checked(bol) {
			this.check = this.checked
		}
	},
	mounted() {
		this.check = this.checked
	},
	updated() {
		this.loaded = true
	}
}
</script>

<style lang="less">
.checkbox {
	display: inline-block;
	vertical-align: top;
	width: 100%;
	height: 30px;
	padding: 7px 2px;
	line-height: 16px;
	box-sizing: border-box;
	-webkit-user-select: none;
	font-size: 0;
	&.checked {
		.icon {
			background: #1890ff;
			border-color: #1890ff;
		}
	}
	.icon {
		position: relative;
		display: inline-block;
		vertical-align: top;
		width: 16px;
		height: 16px;
		margin-right: 5px;
		border-radius: 2px;
		border: 1px solid #ddd;
		box-sizing: border-box;
		input[type='checkbox'] {
			position: absolute;
			opacity: 0;
		}
	}
	.name {
		display: inline-block;
		vertical-align: top;
		font-size: 12px;
		padding-right: 5px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: calc(~'100% - 21px');
		box-sizing: border-box;
	}
}
</style>
