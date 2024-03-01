import { fromLonLat } from 'ol/proj'
import { toPixel } from '../utils/coordinate'

function pressureMark(data, ctx, map, text) {
	if (!data || data.length == 0) return

	data.forEach(ele => {
		let point = [ele.lon, ele.lat]
		point = fromLonLat(point)
		let pixel = map.getPixelFromCoordinate(point)

		ctx.fillText(text, pixel[0], pixel[1])
		ctx.fillStyle = 'red'
		ctx.font = '14px bold sans-serif'
	})
}

function pressureMarkInCanvas(data, ctx, text, extent, resolution) {
	if (!data || data.length == 0) return

	data.forEach(ele => {
		let point = [ele.lon, ele.lat]
		let pixel = toPixel(point, extent, resolution)

		ctx.fillText(text, pixel[0], pixel[1])
		ctx.fillStyle = 'red'
		ctx.font = '14px bold sans-serif'
	})
}

export { pressureMark, pressureMarkInCanvas }
