import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { toLonLat } from 'ol/proj'
import clip from '../utils/clip'
import bilinear from '../utils/bilinear'
import windBarb from '../utils/wind-barb'
import windUtil from '../utils/wind'
import * as d3 from 'd3'

// 风场 风矢渲染
function WindBarb(data, width, height, extentData, map) {
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
			if (data.length != 0) {
				let w = 30,
					v = 5
				// 横向和纵向的坐标间隔
				// let wi = (extentData[2] - extentData[0]) / (wit - 1)
				// let hi = (extentData[3] - extentData[1]) / (het - 1)
        let wi = (extentData[2] - extentData[0]) / (width - 1)
				let hi = (extentData[3] - extentData[1]) / (height - 1)

				ctx.lineWidth = 1
				ctx.fillStyle = '#3d3a38'
				ctx.strokeStyle = '#3d3a38'
				let windBarber = windBarb().init(14)
				// 处理地图zoom级别较小时，地图移动风羽变化问题
				let ii = Math.round(extent[3] / resolution) % w
				let ji = Math.round(extent[0] / resolution) % w

        let bilinearer = bilinear().init(d3.range(0, width), d3.range(0, height))
				for (let i = ii; i < canvas.height; i += w) {
					for (let j = -ji; j < canvas.width; j += w) {
						const coordinate = map.getCoordinateFromPixel([j, i])
						const point = toLonLat(coordinate)
						if (point[0] >= extentData[0] && point[0] <= extentData[2] && point[1] >= extentData[1] && point[1] <= extentData[3]) {
							const wind = getWind(point[0], point[1], extentData, wi, hi, data, bilinearer)
							// 绘制风羽
							ctx.save()
							ctx.translate(j, i)
							ctx.beginPath()
							ctx.moveTo(0, 0)
							// 计算风向弧度
							ctx.rotate(Math.atan2(-wind[0], -wind[1]))
							// 根据风速级别绘制风羽
							windBarber.drawWindbarb(ctx, windUtil.getWindLevel(windUtil.synthesis(wind[0], wind[1])[0]))
							ctx.stroke()
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
	const WindBarb = new ImageLayer({
		source: windSource,
		zIndex: index
	})

	// 保存当前图层
	return {
		name: layerName,
		layer: WindBarb,
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
		const wind = windUtil.decompose(d1, d2)
		return [-wind[0], -wind[1]]
	}
}

export default WindBarb
