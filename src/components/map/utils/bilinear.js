function bilinear() {
	let x, y, ix0, ix1, iy0, iy1, dx0, dx1, dy0, dy1
	let bilinear = {}
	bilinear.init = function(a, b) {
		x = a
		y = b
		return bilinear
	}

	bilinear.train = function(xi, yi) {
		ix0 = 0
		let iLimit = x.length - 1
		for (let i = 1; i < iLimit; i++) {
			if (x[i] < xi) {
				ix0 = i
			}
		}
		ix1 = x.length - 1
		for (let i = x.length - 2; i > 0; i--) {
			if (x[i] > xi) {
				ix1 = i
			}
		}
		iy0 = 0
		iLimit = y.length - 1
		for (let i = 1; i < iLimit; i++) {
			if (y[i] < yi) {
				iy0 = i
			}
		}
		iy1 = y.length - 1
		for (let i = y.length - 2; i > 0; i--) {
			if (y[i] > yi) {
				iy1 = i
			}
		}
		let x0 = x[ix0],
			x1 = x[ix1]
		let y0 = y[iy0],
			y1 = y[iy1]
		dx0 = (xi - x0) / (x1 - x0)
		dx1 = (x1 - xi) / (x1 - x0)
		dy0 = (yi - y0) / (y1 - y0)
		dy1 = (y1 - yi) / (y1 - y0)
		return bilinear
	}

	bilinear.predict = function(t) {
		return t[ix0 + iy0 * x.length] * dx1 * dy1 + t[ix1 + iy0 * x.length] * dx0 * dy1 + t[ix0 + iy1 * x.length] * dx1 * dy0 + t[ix1 + iy1 * x.length] * dx0 * dy0
	}

	// 双线性插值
	// t 经度序号, 插值点位经度
	// e 纬度序号, 插值点位纬度
	// a 00, 左上角数值
	// i 01, 左下角数值
	// s 10, 右上角数值
	// l 11, 右下角数值
	bilinear.bilinearInterpolate = function(t, e, a, i, s, l) {
		let r = 1 - t,
			n = 1 - e,
			o = r * n,
			c = t * n,
			d = r * e,
			h = t * e
		return a * o + i * d + s * c + l * h
	}

	return bilinear
}

export default bilinear
