import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import * as d3 from 'd3'
import { pressureMarkInCanvas } from './pressure-mark'
import clip from '../utils/clip'
import bilinear from '../utils/bilinear'

// 等值线渲染
function contourRender(data, width, height, map) {
	if (!data.data) throw new Error('数据不能为空')
	if (!data.lons) throw new Error('经度集合不能为空')
	if (!data.lats) throw new Error('纬度集合不能为空')
	if (!data.step) throw new Error('等值线渲染必须设置步长!')

	let contours = d3
		.contours()
		.size([width, height])
		.smooth(true)
		.thresholds(d3.range(data.min, data.max, data.step))(data.data)

	const zoom = 8

	const layerName = data.name || data.type
	const source = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			let canvas = document.createElement('canvas')
			canvas.width = size[0]
			canvas.height = size[1]
			let ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)
			ctx.fillStyle = 'rgb(0,72,186)'
			ctx.strokeStyle = 'rgb(0,72,186)'
			ctx.font = '14px  Arial'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'

			let currentZoom = map.getView().getZoom()
			const ratio = (currentZoom - zoom) / zoom
			let count = 30 * (1 - ratio)
			count = count < 5 ? 5 : count

			let bilinearer = bilinear().init(d3.range(0, width), d3.range(0, height))
			contours.forEach(geometry => {
				ctx.beginPath()
				for (let i = 0; i < geometry.coordinates.length; i++) {
					let polygon = geometry.coordinates[i]
					for (let j = 0; j < polygon.length; j++) {
						let points = polygon[j]
						if (points.length < count) continue
						bilinearer.train(points[0][0] - 0.5, points[0][1] - 0.5)
						let point = [bilinearer.predict(data.lons), bilinearer.predict(data.lats)]
						point = fromLonLat(point)
						let pixel = map.getPixelFromCoordinate(point)
						ctx.moveTo(pixel[0], pixel[1])
						for (let k = 1; k < points.length; k++) {
							bilinearer.train(points[k][0] - 0.5, points[k][1] - 0.5)
							point = [bilinearer.predict(data.lons), bilinearer.predict(data.lats)]
							point = fromLonLat(point)
							pixel = map.getPixelFromCoordinate(point)
							ctx.lineTo(pixel[0], pixel[1])
						}
					}
				}
				ctx.stroke()
				for (let i = 0; i < geometry.coordinates.length; i++) {
					let polygon = geometry.coordinates[i]
					for (let j = 0; j < polygon.length; j++) {
						let points = polygon[j]
						if (points.length <= count) continue
						let textIndex = Math.floor(points.length / 2)
						bilinearer.train(points[textIndex][0] - 0.5, points[textIndex][1] - 0.5)
						let point = [bilinearer.predict(data.lons), bilinearer.predict(data.lats)]
						point = fromLonLat(point)
						let pixel = map.getPixelFromCoordinate(point)
						ctx.clearRect(pixel[0] - 16, pixel[1] - 10, 32, 20)
						ctx.fillText(geometry.value, pixel[0], pixel[1])
					}
				}
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
		},
		ratio: 1
	})

	const index = data.index || 1
	let imageVector = new ImageLayer({
		source: source,
		zIndex: index
	})

	return {
		name: layerName,
		layer: imageVector,
		index
	}
}

export default contourRender
