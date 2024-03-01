<template>
	<div class="legendRegion">
		<div v-if="renderLegends" class="legend">
			<div class="legendPanel" :style="`height: 28px; line-height: 28px; color: rgb(0, 0, 0); font-size: 12px;`">
				<div class="legendName" style="height: 28px; line-height: 28px; color: rgb(0, 0, 0); font-size: 12px">
					<span>{{ renderLegends.name }}</span>
					<span>{{ renderLegends.unit ? `(${renderLegends.unit})` : '' }}</span>
				</div>
				<div class="legendPaneContent" :style="`width:${width}px;float: left; margin-top: 4px; margin-left:10px;`">
					<div class="legendPaneContentPanel">
						<div class="legendItemArray">
							<template v-for="site in renderLegends.legends">
								<canvas
									v-if="site.colorLevel"
									:width="site.width ? site.width : 47"
									height="8"
									:key="legendId + site.labelId"
									:id="legendId + site.labelId"
									class="legendItem"
									style="line-height: 8px; color: rgb(0, 0, 0)"
								></canvas>
							</template>
						</div>
						<template v-for="(site, index) in renderLegends.legends">
							<div
								v-if="gradient || range"
								:key="site.labelId"
								class="legendLabel"
								:style="`width:${index === renderLegends.legends.length - 1 ? '10' : site.width ? site.width : '47'}px;color: rgb(0, 0, 0);height: 14px;line-height: 14px;`"
							>
								<span style="margin-left: -7px">{{ site.labelName }}</span>
							</div>
							<div
								v-else
								:key="site.labelId"
								class="legendLabel"
								:style="`width: ${site.width ? site.width : 47}px; color: rgb(0, 0, 0); height: 14px; line-height: 14px; text-align: center;`"
							>
								<span style="margin-left: -3px">{{ site.labelName }}</span>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		legendId: {
			type: String,
			default() {
				return 'legend'
			}
		},
		gradient: {
			type: Boolean,
			default() {
				return true
			}
		},
		legend: {
			type: Object,
			required: true,
			default() {
				return {
					name: '',
					unit: '',
					legends: []
				}
			}
		}
	},
	data() {
		return {}
	},
	methods: {
		initLegend() {
			setTimeout(() => {
				if (this.legend.legends) {
					this.legend.legends.forEach((element, index) => {
						if (!element.skip && element.colorLevel) {
							const canvas = document.getElementById(this.legendId + element.labelId)
							const canvasSet = canvas.getContext('2d')
							if (this.gradient) {
								if (index + 1 < this.legend.legends.length) {
									const gradientColors = [element]
									for (let i = 1; i < this.legend.legends.length - index; i++) {
										const next = this.legend.legends[index + i]
										gradientColors.push(next)
										if (!next.skip) break
									}
									const linearGradient1 = canvasSet.createLinearGradient(0, 0, 100, 0)
									const step = 1 / (gradientColors.length - 1)
									for (let i = 0; i < gradientColors.length; i++) {
										linearGradient1.addColorStop(i * step, gradientColors[i].colorLevel)
									}
									canvasSet.fillStyle = linearGradient1
									canvasSet.fillRect(0, 0, 100, 100)
								}
							} else {
								if (element.colorLevel) {
									canvasSet.fillStyle = element.colorLevel
									canvasSet.fillRect(0, 0, 100, 100)
								}
							}
						}
					})
				}
			}, 1000)
		}
	},
	computed: {
		renderLegends() {
			if (this.legend && this.legend.legends) {
				return {
					name: this.legend.name,
					unit: this.legend.unit,
					legends: this.legend.legends.filter(l => !l.skip)
				}
			}
			return undefined
		},
		width() {
			// 每个颜色canvas宽度可以动态设置
			let total = 0
			const length = this.renderLegends.legends.length
			for (let i = 0; i < length; i++) {
				// 如果没有设置宽度，默认47px
				total += this.renderLegends.legends[i].width ? this.renderLegends.legends[i].width : 47
			}
			if (this.leftClose) total = total - (this.renderLegends.legends[0].width ? this.renderLegends.legends[0].width : 47)
			return total + 10
		},
		range() {
			return this.legend && this.legend.legends && this.legend.legends.length > 0 && !this.legend.legends[0].colorLevel
		},
		leftClose() {
			return this.legend && this.legend.legends && this.legend.legends.length > 0 && !this.legend.legends[0].colorLevel && !this.legend.legends[0].skip
		}
	},
	watch: {
		legend(val) {
			this.initLegend()
		}
	},
	mounted() {
		this.initLegend()
	}
}
</script>

<style lang="less" scoped>

.legendRegion {
  font-family: Arial, Helvetica, sans-serif;
	.legend {
		position: absolute;
		z-index: 600;
	}
	.legendPanel {
		width: auto;
		background-color: hsla(0, 0%, 100%, 0.6);
		border-radius: 3px;
	}
	.legendName {
		width: auto;
		font-weight: 700;
		text-align: left;
		float: left;
		padding: 0 10px;
		background-color: hsla(0, 0%, 100%, 0.6);
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}
	.legendItemLabelArray,
	.legendPaneContentPanel,
	.legendLabel {
		float: left;
		font-size: 12px;
	}
	.legendItemArray {
		float: left;
		background-color: hsla(0, 0%, 100%, 0.6);
	}
	.legendItem {
		float: left;
		text-align: center;
		text-indent: 3px;
		font-weight: 700;
	}
}
</style>
