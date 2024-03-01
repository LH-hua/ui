import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import * as d3 from 'd3'
import bilinear from '../utils/bilinear'
import windUtil from '../utils/wind'
import clip from '../utils/clip'

// 风场箭头渲染
function windArrowRender(data, width, height, openLayer) {
	let uData = [],
		vData = []
	if (data.uv === true) {
		for (let i = 0, k = 0; i < height; i++) {
			for (let j = 0; j < width; j++, k++) {
				uData[k] = data.data[k]
				vData[k] = data.data2[k]
			}
		}
	} else {
		// 风向、风速到U、V的转换
		for (let i = 0, k = 0; i < height; i++) {
			for (let j = 0; j < width; j++, k++) {
				// 剔除无效数据
				if (data.data[k] === undefined || data.data2[k] === undefined) {
					uData[k] = undefined
					vData[k] = undefined
				} else {
					const wind = windUtil.decompose(data.data[k], data.data2[k])
					uData[k] = -wind[0]
					vData[k] = -wind[1]
				}
			}
		}
	}
	const layerName = data.name || data.type
	const source = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			let canvas = document.createElement('canvas')
			canvas.width = size[0]
			canvas.height = size[1]
			let ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)
			ctx.lineWidth = 0.8
			ctx.fillStyle = 'rgb(76,173,252)'
			ctx.strokeStyle = 'rgb(76,173,252)'
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
      const unitLength = data.unitLength || 5
			for (let i = ii; i <= ia; i += indexResolution) {
				for (let j = ji; j <= ja; j += indexResolution) {
					bilinearer.train(j, i)
					let point = [bilinearer.predict(data.lons), bilinearer.predict(data.lats)]
					point = fromLonLat(point)
					let pixel = openLayer.map.getPixelFromCoordinate(point)
					let u = bilinearer.predict(uData),
						v = bilinearer.predict(vData)

					if (u && v) {
						ctx.save()
						ctx.translate(pixel[0], pixel[1])
						ctx.beginPath()
						ctx.moveTo(0, 0)
						ctx.translate(u * unitLength, -v * unitLength)
						ctx.lineTo(0, 0)
						ctx.stroke()
						ctx.beginPath()
						ctx.moveTo(0, 0)
						ctx.rotate(Math.atan2(-v, u))
						ctx.lineTo(0, -4)
						ctx.lineTo(10, 0)
						ctx.lineTo(0, 4)
						ctx.fill()
						ctx.restore()
					}
				}
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
    zIndex: index
	})

	// 保存当前图层
	return {
		name: layerName,
		layer: imageVector,
		index
	}
}

export default windArrowRender
