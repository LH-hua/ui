import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import * as d3 from 'd3'
import { pressureMarkInCanvas } from './pressure-mark'
import colorPickup from '../utils/color-pickup'
import bilinear from '../utils/bilinear'
import clip from '../utils/clip'

// 像素渲染
function irregularPixelRender(data, width, height, colorbar, canvasAlpha, openLayer) {
	if (!data.data) throw new Error('数据不能为空')
	if (!data.lons) throw new Error('经度集合不能为空')
	if (!data.lats) throw new Error('纬度集合不能为空')

	const layerName = data.name || data.type
	const source = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			let canvas = document.createElement('canvas')
			canvas.width = size[0]
			canvas.height = size[1]
			let ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)
			ctx.globalAlpha = canvasAlpha
			let zoom = openLayer.view.getZoom()
			let indexResolution = Math.pow(2, 4 - zoom) * data.renderFactor
			let ii = height - 1,
				ia = 0,
				ji = width - 1,
				ja = 0

			let bilinearer = bilinear().init(d3.range(0, width), d3.range(0, height))
			for (let i = 0, k = 0; i < height; i++) {
				for (let j = 0; j < width; j++, k++) {
					let point = [data.lons[k], data.lats[k]]
					point = fromLonLat(point)
					if (point[0] >= extent[0] && point[0] <= extent[2] && point[1] >= extent[1] && point[1] <= extent[3]) {
						if (i < ii) ii = i
						if (i > ia) ia = i
						if (j < ji) ji = j
						if (j > ja) ja = j
					}
				}
			}
			if (ii > 0) ii -= 1
			if (ia < height - 1) ia += 1
			if (ji > 0) ji -= 1
			if (ja < width - 1) ja += 1
			for (let i = ii; i <= ia; i += indexResolution) {
				for (let j = ji; j <= ja; j += indexResolution) {
					bilinearer.train(j, i)
					let point = [bilinearer.predict(data.lons), bilinearer.predict(data.lats)]
					point = fromLonLat(point)
					let pixel = openLayer.map.getPixelFromCoordinate(point)
					let z = bilinearer.predict(data.data)
					if (z === null) {
						ctx.fillStyle = 'rgb(0,0,0,0)'
					} else {
						ctx.fillStyle = colorPickup(z, colorbar, data.isGradient)
					}
					ctx.fillRect(pixel[0] - 1, pixel[1] - 1, 3, 3)
				}
			}

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
		},
		ratio: 1
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

export default irregularPixelRender
