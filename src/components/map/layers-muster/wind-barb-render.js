import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import * as d3 from 'd3'
import windBarb from '../utils/wind-barb'
import windUtil from '../utils/wind'
import bilinear from '../utils/bilinear'
import clip from '../utils/clip'

// 风场风矢渲染
function windBarbRender(data, width, height, openLayer) {
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
			const currentZoom = Math.round(openLayer.view.getZoom())
			let canvas = document.createElement('canvas')
			canvas.width = size[0]
			canvas.height = size[1]
			let ctx = canvas.getContext('2d')
			ctx.scale(pixelRatio, pixelRatio)

			let indexResolution = Math.pow(2, 4 - currentZoom) * data.renderFactor
			let ii = height - 1,
				ia = 0,
				ji = width - 1,
				ja = 0
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

      // 处理地图zoom级别较小时，地图移动风羽变化问题
      if (indexResolution > 1) {
				ii = 0
				ji = 0
			}

			// 设置风羽线条粗细、颜色
			ctx.lineWidth = 1
			ctx.fillStyle = '#3d3a38'
			ctx.strokeStyle = '#3d3a38'
			let windBarber = windBarb().init(14)
			let bilinearer = bilinear().init(d3.range(0, width), d3.range(0, height))
			for (let i = ii; i <= ia; i += indexResolution) {
				for (let j = ji; j <= ja; j += indexResolution) {
					bilinearer.train(j, i)
					let point = [bilinearer.predict(data.lons), bilinearer.predict(data.lats)]
					point = fromLonLat(point)
					let pixel = openLayer.map.getPixelFromCoordinate(point)
					let u = bilinearer.predict(uData),
						v = bilinearer.predict(vData)
					if (u && v) {
						// 绘制风羽
						ctx.save()
						ctx.translate(pixel[0], pixel[1])
						ctx.beginPath()
						ctx.moveTo(0, 0)
						// 计算风向弧度
						ctx.rotate(Math.atan2(-u, -v))
						// 根据风速级别绘制风羽
						windBarber.drawWindbarb(ctx, windUtil.getWindLevel(windUtil.synthesis(u, v)[0]))
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

export default windBarbRender
