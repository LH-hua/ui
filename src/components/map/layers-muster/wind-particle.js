import { WindLayer } from 'ol-wind'

// 风场
export function windParticle(data, width, height, extentData, view) {
    const layerName = data.name || data.type
    const index = data.index || 1
    const result = getWindJson(width, height, extentData, data)
    return drawWindParticle(result, layerName, index, view, data.option)
}

// 绘制风粒子图层
export function drawWindParticle(data, layerName, index, view, option) {
    const opt = {
			speed: 2,
			lineWidth: 2,
			paths: 2000,
			...option
		}
    const windLayer = new WindLayer(data, {
        forceRender: false,
        windOptions: {
            velocityScale: val => {
                const zoom = view.getZoom()
                return 1 / opt.speed / Math.pow(2, zoom)
            },
            // eslint-disable-next-line no-unused-vars
            colorScale: () => {
                return '#FFF'
            },
            generateParticleOption: false,
            ...opt
        }
    })

    windLayer.setZIndex(index)
    // 保存当前图层
    return {
        name: layerName,
        layer: windLayer,
        index
    }
}

function getWindJson(width, height, extentData, data) {
    // 横向和纵向的坐标间隔
    let wi = (extentData[2] - extentData[0]) / (width - 1)
    let hi = (extentData[3] - extentData[1]) / (height - 1)
    const u = {
        header: {
            parameterCategory: 2,
            parameterNumber: 2,
            nx: width,
            ny: height,
            lo1: extentData[0],
            la1: extentData[1],
            lo2: extentData[2],
            la2: extentData[3],
            dx: wi,
            dy: hi
        },
        data: []
    }
    const v = {
        header: {
            parameterCategory: 2,
            parameterNumber: 3,
            nx: width,
            ny: height,
            lo1: extentData[0],
            la1: extentData[1],
            lo2: extentData[2],
            la2: extentData[3],
            dx: wi,
            dy: hi
        },
        data: []
    }
    if (data.uv === true) {
      for (let i = 0; i < height; i++) {
				for (let j = 0; j < width; j++) {
					u.data.push(data.data[i * width + j])
					v.data.push(data.data2[i * width + j])
				}
			}
    }
    else {
      for (let i = 0; i < height; i++) {
				for (let j = 0; j < width; j++) {
          const ws = data.data[i * width + j]
          const wd = data.data2[i * width + j]
          const r = (wd / 180) * Math.PI
					u.data.push(-ws * Math.sin(r))
					v.data.push(-ws * Math.cos(r))
				}
			}
    }
    return [u, v]
}
