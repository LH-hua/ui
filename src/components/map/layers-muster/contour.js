import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import * as d3 from 'd3'
import { pressureMarkInCanvas } from './pressure-mark'
import clip from '../utils/clip'

// 等值线图层渲染
function contour(data, width, height, extentData, map) {
	if (!data.data) throw new Error('数据不能为空')
	if (!data.step) throw new Error('等值线渲染必须设置步长!')

	const layerName = data.name || data.type

	let min = data.min
	let max = data.max
	let step = data.step

	//等高线
	let wit = width
	let het = height
	let contours = d3
		.contours()
		.size([wit, het])
		.smooth(true)
		.thresholds(d3.range(min, max, step))(data.data)

	// console.log(contours)

	const zoom = 8

	const contourSource = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			const canvas = document.createElement('canvas')
			canvas.width = Math.round(size[0])
			canvas.height = Math.round(size[1])
			const ctx = canvas.getContext('2d')
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

			let wi = (extentData[2] - extentData[0]) / (wit - 1)
			let hi = (extentData[3] - extentData[1]) / (het - 1)
			// ctx.strokeStyle = 'rgb(255,0,0)'
			// contours.forEach(geometry => {
			// 	ctx.beginPath()
			// 	for (let i = 0; i < geometry.coordinates.length; i++) {
			// 		const polygon = geometry.coordinates[i]
			// 		for (let j = 0; j < polygon.length; j++) {
			// 			const points = polygon[j]
			// 			// if (points.length < count) continue
			// 			let point = [extentData[0] + points[0][0] * wi, extentData[3] - points[0][1] * hi]
			// 			point = fromLonLat(point)
			// 			let pixel = map.getPixelFromCoordinate(point)
			// 			ctx.moveTo(pixel[0], pixel[1])
			// 			for (let k = 1; k < points.length; k++) {
			// 				point = [extentData[0] + points[k][0] * wi, extentData[3] - points[k][1] * hi]
			// 				point = fromLonLat(point)
			// 				pixel = map.getPixelFromCoordinate(point)
			// 				ctx.lineTo(pixel[0], pixel[1])
			// 			}
			// 		}
			// 	}
			// 	ctx.stroke()
			// 	for (let i = 0; i < geometry.coordinates.length; i++) {
			// 		const polygon = geometry.coordinates[i]
			// 		for (let j = 0; j < polygon.length; j++) {
			// 			const points = polygon[j]
			// 			if (points.length < count) continue
			// 			const textIndex = Math.floor(points.length / 2)
			// 			let point = [extentData[0] + points[textIndex][0] * wi, extentData[3] - points[textIndex][1] * hi]
			// 			point = fromLonLat(point)
			// 			const pixel = map.getPixelFromCoordinate(point)
			// 			ctx.clearRect(pixel[0] - 16, pixel[1] - 10, 32, 20)
			// 			ctx.fillText(geometry.value, pixel[0], pixel[1])
			// 		}
			// 	}
			// })

			// ctx.strokeStyle = 'rgb(0,72,186)'
			contours.forEach(geometry => {
				ctx.beginPath()
				for (let i = 0; i < geometry.coordinates.length; i++) {
					const polygon = geometry.coordinates[i]
					for (let j = 0; j < polygon.length; j++) {
						const points = polygon[j]
						let tpoints = []
						tpoints[0] = points[0]
						for (let k = 1, l = 1; k < points.length; k++) {
							if ((points[k][0] - points[k - 1][0]) * (points[k][0] - points[k - 1][0]) + (points[k][1] - points[k - 1][1]) * (points[k][1] - points[k - 1][1]) > 0.01) {
								tpoints[l++] = points[k]
							}
						}
						const length = tpoints.length - 1
						if (length < count) {
							continue
						}
						let midpoints = []
						for (let k = 0; k < length; k++) {
							midpoints[k] = [(tpoints[k][0] + tpoints[k + 1][0]) * 0.5, (tpoints[k][1] + tpoints[k + 1][1]) * 0.5]
						}
						let midpoint = [extentData[0] + midpoints[midpoints.length - 1][0] * wi, extentData[3] - midpoints[midpoints.length - 1][1] * hi]
						midpoint = fromLonLat(midpoint)
						midpoint = map.getPixelFromCoordinate(midpoint)
						ctx.moveTo(midpoint[0], midpoint[1])
						for (let k = 0; k < length; k++) {
							let point = [extentData[0] + tpoints[k][0] * wi, extentData[3] - tpoints[k][1] * hi]
							point = fromLonLat(point)
							point = map.getPixelFromCoordinate(point)
							midpoint = [extentData[0] + midpoints[k][0] * wi, extentData[3] - midpoints[k][1] * hi]
							midpoint = fromLonLat(midpoint)
							midpoint = map.getPixelFromCoordinate(midpoint)
							ctx.quadraticCurveTo(point[0], point[1], midpoint[0], midpoint[1])
						}
					}
				}
				ctx.stroke()
				for (let i = 0; i < geometry.coordinates.length; i++) {
					const polygon = geometry.coordinates[i]
					for (let j = 0; j < polygon.length; j++) {
						const points = polygon[j]
						if (points.length < count) continue
						const textIndex = Math.floor(points.length / 2)
						let point = [extentData[0] + points[textIndex][0] * wi, extentData[3] - points[textIndex][1] * hi]
						point = fromLonLat(point)
						const pixel = map.getPixelFromCoordinate(point)
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
	const contourLayer = new ImageLayer({
		source: contourSource,
		zIndex: index
	})

	return {
		name: layerName,
		layer: contourLayer,
		index
	}
}

export default contour
