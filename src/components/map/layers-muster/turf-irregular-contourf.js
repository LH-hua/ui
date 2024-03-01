import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { pressureMarkInCanvas } from './pressure-mark'
import clip from '../utils/clip'
import colorPickup from '../utils/color-pickup'
import bilinear from '../utils/bilinear'
import { toPixel } from '../utils/coordinate'
import * as d3 from 'd3'

// 色块图层渲染
function turfIrregularContourf(data, width, height, colorbar, canvasAlpha, map) {
	if (!data.data) throw new Error('数据不能为空')
	if (!data.lons) throw new Error('经度集合不能为空')
	if (!data.lats) throw new Error('纬度集合不能为空')

	const layerName = data.name || data.type
	// 调制调色板
	data.zlim = []
	data.colors = []
	data.breaks = []
	if (data.isGradient) {
		if (!data.step) throw new Error('渐变渲染必须设置颜色变化步长!')

		data.zlim.push(colorbar[0].value)
		data.zlim.push(colorbar[colorbar.length - 1].value)
		for (let i = 0; i <= (data.zlim[1] - data.zlim[0]) / data.step; i++) {
			data.colors.push(colorPickup(i * data.step + data.zlim[0], colorbar, data.isGradient))
			data.breaks.push(i * data.step + data.zlim[0])
		}
	} else {
		data.colors = colorbar.map(c => `rgba(${c.r},${c.g},${c.b},${c.a !== undefined ? c.a : 255})`)
		data.breaks = colorbar.map(c => c.value)
	}

	// 找出等值线
	let contours = d3
		.contours()
		.size([width, height])
		.smooth(true)
		.thresholds(data.breaks)(data.data)

	// 绘制图层
	const source = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			let canvas = document.createElement('canvas')
			canvas.width = size[0]
			canvas.height = size[1]
			let ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)
			let bilinearer = bilinear().init(d3.range(0, width), d3.range(0, height))
			contours.forEach(geometry => {
				const value = geometry.value
				const currentIndex = data.breaks.indexOf(value)
				const color = data.colors[currentIndex]
				ctx.beginPath()
				for (let i = 0; i < geometry.coordinates.length; i++) {
					let polygon = geometry.coordinates[i]
					for (let j = 0; j < polygon.length; j++) {
						let points = polygon[j]
						bilinearer.train(points[0][0] - 0.5, points[0][1] - 0.5)
						let point = [bilinearer.predict(data.lons), bilinearer.predict(data.lats)]
						let pixel = toPixel(point, extent, resolution)
						ctx.moveTo(pixel[0], pixel[1])
						for (let k = 1; k < points.length; k++) {
							bilinearer.train(points[k][0] - 0.5, points[k][1] - 0.5)
							point = [bilinearer.predict(data.lons), bilinearer.predict(data.lats)]
							pixel = toPixel(point, extent, resolution)
							ctx.lineTo(pixel[0], pixel[1])
						}
					}
				}
				ctx.fillStyle = color
				ctx.strokeStyle = color
				ctx.closePath()
				ctx.fill()
				ctx.stroke()
			})

			// 绘制气压标识
			if (data.pressure) {
				let { HL_max, HL_min } = data.pressure
				pressureMarkInCanvas(HL_max, ctx, 'H', extent, resolution)
				pressureMarkInCanvas(HL_min, ctx, 'L', extent, resolution)
			}

			// 边界裁剪
			if (data.isClip) {
				let bound = data.bound
				clip(bound, ctx, extent, resolution)
			}

			return canvas
		}
	})

	const index = data.index || 1
	let imageVector = new ImageLayer({
		source: source,
		opacity: canvasAlpha,
		zIndex: index
	})

	return {
		name: layerName,
		layer: imageVector,
		index
	}
}

export default turfIrregularContourf
