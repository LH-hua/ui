import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import colorPickup from '../utils/color-pickup'
import windBarb from '../utils/wind-barb'
import windUtil from '../utils/wind'
import { toPixel } from '../utils/coordinate'

function makerCanvas(data, colorbar, map) {
	if (!data.data) throw new Error('数据不能为空')

	const zoom = 8
	const layerName = data.name || data.type
	const source = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			let canvas = document.createElement('canvas')
			canvas.width = size[0]
			canvas.height = size[1]
			let ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)

			let currentZoom = map.getView().getZoom()
			const ratio = (currentZoom - zoom) / zoom
			const fontSize = 12 * (1 + ratio)
			const valSize = 15 * (1 + ratio)
			for (const point of data.data) {
				let pixel = toPixel([point.lon, point.lat], extent, resolution)
				// 一般情况下，绘制点位名称和数值
				if (point.type == 'normal' || !point.type) {
					// 绘制数值
					const color = colorPickup(point.value, colorbar)
					if (color) {
						ctx.fillStyle = color
					}
					ctx.font = valSize + 'px 微软雅黑'
					ctx.textAlign = 'center'
					ctx.textBaseline = 'middle'
					ctx.fillText(point.value, pixel[0], pixel[1])

					if (currentZoom >= 8) {
						// 绘制点位名称
						ctx.font = fontSize + 'px 微软雅黑'
						ctx.fillStyle = '#999'
						ctx.textAlign = 'center'
						ctx.textBaseline = 'middle'
						ctx.fillText(point.name, pixel[0], pixel[1] + 20)
					}
				} else if (point.type == 'wind') {
					// 绘制风羽
					ctx.lineWidth = 2
					// 根据风速确定颜色
					const color = colorPickup(point.value[0], colorbar)
					if (color) {
						ctx.fillStyle = color
						ctx.strokeStyle = color
					}
					// 转换为水平向量和垂直向量
					const wind = windUtil.decompose(point.value[0], point.value[1])
					ctx.save()
					ctx.translate(pixel[0], pixel[1])
					ctx.beginPath()
					ctx.moveTo(0, 0)
					// 计算风向弧度
					ctx.rotate(Math.atan2(-wind[1], wind[0]))
					// 根据风速级别绘制风羽
					windBarb().drawWindbarb(ctx, windUtil.getWindLevel(point.value[0]), ratio)
					ctx.stroke()
					ctx.restore()

					if (currentZoom >= 8) {
						// 绘制点位名称
						ctx.font = fontSize + 'px 微软雅黑'
						ctx.fillStyle = '#999'
						ctx.textAlign = 'center'
						ctx.textBaseline = 'middle'
						ctx.fillText(point.name, pixel[0], pixel[1] + 20)
					}
				}
			}

			return canvas
		}
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

export default makerCanvas
