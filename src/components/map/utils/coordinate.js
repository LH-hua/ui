import { fromLonLat } from 'ol/proj'

/**
 *
 * @param {*} point 经纬度数组, [经度、纬度]
 * @param {*} extent 当前canvas的投影坐标范围
 * @param {*} resolution 当前canvas的转换率
 * @returns 经纬度在当前canvas中的像素位置
 */
function toPixel(point, extent, resolution) {
  const p = fromLonLat(point)
	const pixel = [(p[0] - extent[0]) / resolution - 0.5, (extent[3] - p[1]) / resolution - 0.5]
	return pixel
}

export { toPixel }
