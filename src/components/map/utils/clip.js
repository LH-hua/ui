import { fromLonLat } from 'ol/proj'
import { toPixel } from '../utils/coordinate'

// 数据处理, 保留边界多边形内的部分
function clip(bound, ctx, extent, resolution) {
	const clipData = bound
	ctx.globalCompositeOperation = 'destination-in' //全局合成操作
	ctx.beginPath()
	for (let i = 0; i < clipData.features.length; i++) {
		const feature = clipData.features[i]
		for (let j = 0; j < feature.geometry.coordinates.length; j++) {
			const polygon = feature.geometry.coordinates[j]
			for (let k = 0; k < polygon.length; k++) {
				const points = polygon[k]
        let point = points[0]
				let pixel = toPixel(point, extent, resolution)
				ctx.moveTo(pixel[0], pixel[1])
				for (let l = 1; l < points.length; l++) {
					point = points[l]
					pixel = toPixel(point, extent, resolution)
					ctx.lineTo(pixel[0], pixel[1])
				}
			}
		}
	}
	ctx.fill()
}

export default clip
