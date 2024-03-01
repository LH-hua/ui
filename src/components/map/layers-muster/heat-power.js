import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { transform } from 'ol/proj'
import * as utils from '../../../utils/index'

// 熱力色块接收数据进行数据格式转换
function heatPower(data, gradient, canvasAlpha, view) {
	// 根据传入的经纬度数据算出栅格场边界
	const coefficient = data.coefficient || 0.1
	const degits = coefficient.toString().split('.')[1].length
	const datas = data.source // 数据格式例：[{lng:123,lat:10,value:150}]
	const lats = datas.map(s => utils.sixRound(s.lat, degits))
	const lngs = datas.map(s => utils.sixRound(s.lng, degits))
	const latMax = lats == null || lats.length == 0 ? 0 : Math.max(...lats)
	const lonMax = lngs == null || lngs.length == 0 ? 0 : Math.max(...lngs)
	const latMin = lats == null || lats.length == 0 ? 0 : Math.min(...lats)
	const lonMin = lngs == null || lngs.length == 0 ? 0 : Math.min(...lngs)
	let extent = [lonMin, latMin, lonMax, latMax]

	// 根据固定间隔，算出栅格场大小
	const width = utils.sixRound((lonMax - lonMin) / coefficient + 1, 0)
	const height = utils.sixRound((latMax - latMin) / coefficient + 1, 0)

	// 存放所有格子
	let allCellValue = []
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			allCellValue[j + i * width] = -1
		}
	}

	for (let i = 0; i < datas.length; i++) {
		let x = Math.floor((datas[i].lng - extent[0]) / coefficient)
		let y = Math.floor((extent[3] - datas[i].lat) / coefficient)
		allCellValue[x + y * width] = datas[i].value
	}

	let d = Object.assign(data, { data: allCellValue })
	// 执行渲染
	return heatPowerRender(d, width, height, extent, gradient, canvasAlpha, coefficient, view)
}

// 热力色块渲染函数
function heatPowerRender(data, width, height, extentData, gradient, canvasAlpha, coefficient, view) {
	const layerName = data.name || data.type
	const shadowBlur = data.shadowBlur || 20
	const shadowColor = data.shadowColor || 'rgba(240,240,50)'
	const strokeStyle = data.strokeStyle || '#ffffff'
	const relativeZoom = data.relativeZoom || 7.959114316553863
	const relativeRectWidth = data.relativeRectWidth || 27
	const relativeRectHeight = data.relativeRectHeight || 31
	const source = new ImageCanvas({
		canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
			let canvas = document.createElement('canvas')
			canvas.width = size[0]
			canvas.height = size[1]

			let ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)
			ctx.globalAlpha = 0.6
			let zoom = view.getZoom()
			let indexResolution = Math.pow(2, zoom - relativeZoom)
			let w = indexResolution * relativeRectWidth
			let h = indexResolution * relativeRectHeight
			for (let x = extentData[0]; x < extentData[2]; x += coefficient) {
				for (let y = extentData[1]; y < extentData[3]; y += coefficient) {
					const point = [x, y]
					const poit3857 = transform(point, 'EPSG:4326', 'EPSG:3857')
					const pixelx = (poit3857[0] - extent[0]) / resolution
					const pixely = (extent[3] - poit3857[1]) / resolution
					let z = initData(point[0], point[1], extentData, coefficient, coefficient, width, data)

					//  默认 按AQI渐变  绘制颜色块
					for (let k = 1, l = 0; k < gradient.length; l = k++) {
						if (z >= 0 && z <= gradient[k].value) {
							const t = (gradient[k].value - z) / (gradient[k].value - gradient[l].value)
							const r = gradient[k].r - Math.round(t * (gradient[k].r - gradient[l].r))
							const g = gradient[k].g - Math.round(t * (gradient[k].g - gradient[l].g))
							const b = gradient[k].b - Math.round(t * (gradient[k].b - gradient[l].b))
							ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ')'
							ctx.shadowBlur = shadowBlur
							ctx.shadowColor = shadowColor
							ctx.strokeStyle = strokeStyle
							break
						} else {
							ctx.fillStyle = `rgba(0,0,0,0)`
							ctx.strokeStyle = `rgba(0,0,0,0)`
						}
					}
					ctx.fillRect(pixelx, pixely, w, h)
					ctx.strokeRect(pixelx, pixely, w, h)
				}
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
		index: index
	}
}

function initData(lng, lat, extent, wi, hi, width, data) {
	// canvas画图从左上角开始，所以是最大纬度，最小经度
	const i = Math.floor((lng - extent[0]) / wi)
	const j = Math.floor((extent[3] - lat) / hi)
	return data.data[i + j * width]
}

export default heatPower
