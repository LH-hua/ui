import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { transform } from 'ol/proj'
import colorPickup from '../utils/color-pickup'
import clip from '../utils/clip'
import bilinear from '../utils/bilinear'
import * as d3 from 'd3'

// 色块图层渲染
function regulationPixelRender(data, width, height, extentData, colorbar, canvasAlpha, map) {
	if (!data.data) throw new Error('数据不能为空')

	const layerName = data.name || data.type
	const source = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			let canvas = document.createElement('canvas')
			canvas.width = size[0]
			canvas.height = size[1]
			let ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)
			let w = 3,
				m = 1
			let wi = (extentData[2] - extentData[0]) / (width - 1)
			let hi = (extentData[3] - extentData[1]) / (height - 1)
			let bilinearer = bilinear().init(d3.range(0, width), d3.range(0, height))
			for (let x = m; x < size[0]; x += w) {
				for (let y = m; y < size[1]; y += w) {
					const point = transform([extent[0] + resolution * x, extent[3] - resolution * y], 'EPSG:3857', 'EPSG:4326')
					if (point[0] >= extentData[0] && point[0] <= extentData[2] && point[1] >= extentData[1] && point[1] <= extentData[3]) {
						let z = initCanvasData(point[0], point[1], extentData, wi, hi, data, bilinearer)
						if (z === null) {
							ctx.fillStyle = 'rgb(0,0,0,0)'
						} else {
							ctx.fillStyle = colorPickup(z, colorbar, data.isGradient)
						}

						ctx.fillRect(x - m, y - m, w, w)
					}
				}
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

// 解析图片数据
function initCanvasData(lng, lat, extent, wi, hi, data, bilinearer) {
	// canvas画图从左上角开始，所以是最大纬度，最小经度
	const i = Math.floor((extent[3] - lat) / hi)
	const j = Math.floor((lng - extent[0]) / wi)
  bilinearer.train(j, i)
	let z = bilinearer.predict(data.data)
  return z
}

export default regulationPixelRender
