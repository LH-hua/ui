<template>
	<div class="anchor-wrapper">
		<div class="anchor">
			<div class="anchor-ink">
				<b-icon v-if="icon" :name="icon" :style="iconStyle" :color="activeColorStr"></b-icon>
				<span v-show="!icon && showInk" class="anchor-ink-ball" :style="{ borderColor: activeColorStr, top: `${inkTop}px` }"></span>
				<span v-show="!icon && !showInk" class="anchor-ink-line" :style="{ backgroundColor: activeColorStr, top: `${inkTop}px` }"></span>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { scrollTop,off, on } from '../../../utils/index'

export default {
	provide() {
		return {
			anchorCom: this
		}
	},
	data() {
		return {
			inkTop: 8,
			currentLink: '', // current show link =>  #href -> currentLink = #href
			currentId: '', // current show title id =>  #href -> currentId = href
			titlesOffsetArr: []
		}
	},
	props: {
		icon: String,
		iconSize: Number,
		activeColor: String,
		offsetTop: {
			type: Number,
			default: 0
		},
		bounds: {
			type: Number,
			default: 5
		},
		showInk: {
			type: Boolean,
			default: false
		},
		scrollOffset: {
			type: Number,
			default: 0
		},
		target: String
	},
	computed: {
		iconStyle() {
			let size = this.iconSize ? this.iconSize : 14
			return {
				width: `${size}px`,
				height: `${size}px`,
				fontSize: `${size}px`,
				top: `${this.inkTop}px`,
				transform: `translate(-${(size - 2) * 0.5}px, -${(size - 14) / 2}px)`
			}
		},
		activeColorStr() {
			const colorMap = {
				primary: '#1089ff',
				success: '#52c41a',
				info: '#35495E',
				warning: '#fea638',
				danger: '#ff4d4f'
			}
			return this.activeColor ? (colorMap[this.activeColor] ? colorMap[this.activeColor] : this.activeColor) : null
		}
	},
	methods: {
		chooseLink(current) {
			this.currentLink = current
			this.currentId = current.slice(1)
			this.$emit('select', this.currentLink)
			const anchor = document.getElementById(this.currentId)
			if (!anchor) return
			this.handleScrollTo(anchor.offsetTop)
			this.handleSetInkTop()
		},
		handleScrollTo(to) {
			const offsetTop = to - this.scrollOffset
			this.animating = true
			const currentPos = this.domEl.pageYOffset || this.domEl.scrollTop
			scrollTop(this.domEl, currentPos, offsetTop, 1000, () => {
				this.animating = false
			})
		},
		handleSetInkTop() {
			const currentLinkElementA = this.$el.querySelector(`a[data-href="${this.currentLink}"]`)
			if (!currentLinkElementA) return
			const elementATop = currentLinkElementA.offsetTop
			this.inkTop = elementATop < 0 ? this.offsetTop : elementATop
		},
		handleScroll() {
			if (this.animating) return
			this.updateTitleOffset()
			const scrollTop = this.domEl.pageYOffset || this.domEl.scrollTop
			this.getCurrentScrollAtTitleId(scrollTop)
		},
		findComponentsDownward(context, componentName) {
			return context.$children.reduce((components, child) => {
				if (child.$options.name === componentName) components.push(child)
				const foundChilds = this.findComponentsDownward(child, componentName)
				return components.concat(foundChilds)
			}, [])
		},
		updateTitleOffset() {
			const links = this.findComponentsDownward(this, 's-anchor-link').map(link => {
				return link.href
			})
			const idArr = links.map(link => {
				return link.split('#')[1]
			})
			let offsetArr = []
			idArr.forEach(id => {
				const titleEle = document.getElementById(id)
				if (titleEle) {
					offsetArr.push({
						link: `#${id}`,
						offset: titleEle.offsetTop - this.scrollOffset
					})
				}
			})
			this.titlesOffsetArr = offsetArr
		},
		getCurrentScrollAtTitleId(scrollTop) {
			let i = -1
			let len = this.titlesOffsetArr.length
			let titleItem = {
				link: '#',
				offset: 0
			}
			scrollTop += this.bounds
			while (++i < len) {
				let currentEle = this.titlesOffsetArr[i]
				let nextEle = this.titlesOffsetArr[i + 1]
				if (scrollTop >= currentEle.offset && scrollTop < ((nextEle && nextEle.offset) || Infinity)) {
					titleItem = this.titlesOffsetArr[i]
					break
				}
			}
			this.currentLink = titleItem.link
			this.handleSetInkTop()
		}
	},
	mounted() {
		this.domEl = window
		if (this.target) {
			this.domEl = document.querySelector(this.target) || window
		}

		on(this.domEl, 'scroll', this.handleScroll)
		on(window, 'resize', this.handleScroll)

		this.$nextTick(() => {
			this.handleScroll()
			this.handleSetInkTop()
			this.updateTitleOffset()
		})
	},
	beforeDestroy() {
		off(this.domEl, 'scroll', this.handleScroll)
		off(window, 'resize', this.handleScroll)
	}
}
</script>

<style lang="less">
.anchor-wrapper {
	overflow: auto;
	padding-left: 8px;
	margin-left: -8px;
	.anchor {
		position: relative;
		padding-left: 2px;
		.anchor-ink {
			position: absolute;
			height: 100%;
			left: 0;
			top: 0;
			&:before {
				content: ' ';
				position: relative;
				width: 2px;
				height: 100%;
				display: block;
				background-color: #e8eaec;
				margin: 0 auto;
			}

			.anchor-ink-ball {
				display: inline-block;
				position: absolute;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				border: 1px solid #1089ff;
				background-color: #fff;
				left: 50%;
				-webkit-transition: top 0.2s ease;
				transition: top 0.2s ease;
				-webkit-transform: translate(-50%, 2px);
				transform: translate(-50%, 2px);
			}
			.anchor-ink-line {
				display: inline-block;
				position: absolute;
				left: 50%;
				width: 2px;
				height: 18px;
				background-color: #1089ff;
				-webkit-transition: top 0.2s ease;
				transition: top 0.2s ease;
				-webkit-transform: translate(-50%, -2px);
				transform: translate(-50%, -2px);
			}
		}

		.anchor-link {
			padding: 8px 0 8px 16px;
			line-height: 1;
			a {
				background: 0 0;
				text-decoration: none;
				outline: 0;
				cursor: pointer;
				color: rgba(0, 0, 0, 0.65);

				display: block;
				position: relative;
				-webkit-transition: all 0.2s;
				transition: all 0.2s;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-bottom: 8px;
				&:hover {
					color: #1089ff;
				}
			}
		}
		.anchor-link-active {
			a {
				color: #1089ff;
			}
		}
	}
}
</style>
