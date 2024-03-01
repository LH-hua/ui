import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { toLonLat } from 'ol/proj'
import clip from '../utils/clip'
import bilinear from '../utils/bilinear'
import * as d3 from 'd3'

// 风场 箭头渲染
function windArrow(data, width, height, extentData, map) {
	const layerName = data.name || data.type
	// let skipStep = data.skipStep || 1
	// let wit = width / skipStep
	// let het = height / skipStep
	const windSource = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			const canvas = document.createElement('canvas')
			canvas.width = Math.round(size[0])
			canvas.height = Math.round(size[1])
			const ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)
			ctx.lineWidth = 0.8
			ctx.fillStyle = 'rgb(76,173,252)'
			ctx.strokeStyle = 'rgb(76,173,252)'
			if (data.length != 0) {
				let w = 30
        const unitLength = data.unitLength || 5
				// 横向和纵向的坐标间隔
				let wi = (extentData[2] - extentData[0]) / (width - 1)
				let hi = (extentData[3] - extentData[1]) / (height - 1)

        let bilinearer = bilinear().init(d3.range(0, width), d3.range(0, height))
				for (let i = 0; i < canvas.height; i += w) {
					for (let j = 0; j < canvas.width; j += w) {
						const coordinate = map.getCoordinateFromPixel([j, i])
						const point = toLonLat(coordinate)
						if (point[0] >= extentData[0] && point[0] <= extentData[2] && point[1] >= extentData[1] && point[1] <= extentData[3]) {
							let wind = getWind(point[0], point[1], extentData, wi, hi, data, bilinearer)
							ctx.save()
							ctx.translate(j, i)
							ctx.beginPath()
							ctx.moveTo(0, 0)
							ctx.translate(wind[0] * unitLength, -wind[1] * unitLength)
							ctx.lineTo(0, 0)
							ctx.stroke()
							ctx.beginPath()
							ctx.moveTo(0, 0)
							ctx.rotate(Math.atan2(-wind[1], wind[0]))
							ctx.lineTo(0, -3)
							ctx.lineTo(8, 0)
							ctx.lineTo(0, 3)
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
			}
			return canvas
		},
		ratio: 1
	})

  const index = data.index || 1
	const windArrow = new ImageLayer({
		source: windSource,
		zIndex: index
	})

	// 保存当前图层
	return {
		name: layerName,
		layer: windArrow,
		index
	}
}

// 获取风速风向数据，并进行向量分解，得到水平、垂直分量
function getWind(lng, lat, extent, wi, hi, data, bilinearer) {
	// 根据区域 绘制网格
	const i = Math.floor((extent[3] - lat) / hi)
	const j = Math.floor((lng - extent[0]) / wi)
	// const bilinearer = bilinear()
  bilinearer.train(j, i)
	// 风速
	// const d1 = bilinearer.bilinearInterpolate(
	// 	(lng - extent[0]) / wi - j,
	// 	(extent[3] - lat) / hi - i,
	// 	data.data[i][j],
	// 	data.data[i + 1][j],
	// 	data.data[i][j + 1],
	// 	data.data[i + 1][j + 1]
	// )
  const d1 = bilinearer.predict(data.data)
	// 风向
	// const d2 = bilinearer.bilinearInterpolate(
	// 	(lng - extent[0]) / wi - j,
	// 	(extent[3] - lat) / hi - i,
	// 	data.data2[i][j],
	// 	data.data2[i + 1][j],
	// 	data.data2[i][j + 1],
	// 	data.data2[i + 1][j + 1]
	// )
  const d2 = bilinearer.predict(data.data2)
	if (data.uv === true) {
		return [d1, d2]
	} else {
		// 风速风向转换为水平竖直分量
		const angle = (d2 / 180) * Math.PI
		const x = d1 * Math.cos(angle)
		const y = d1 * Math.sin(angle)
		return [x, y]
	}
}

export default windArrow
