function drawWindArrows(param, api, speed, direction) {
	return {
		type: 'path',
		shape: {
			pathData: windArrow(getWindLevel(direction)), // 返回绘制的 SVG
			x: -18 / 2,
			y: -18 / 2,
			width: 20,
			height: 20
		},
		rotation: getWindLevel(speed), //角度
		position: api.coord([api.value(0), api.value(1)]),
		style: api.style({
			fill: null,
			stroke: '#555',
			lineWidth: 1.5
		})
	}
}
// 画风力 level 风级别
function windArrow(level) {
	// 绘制SVG图层
	let path = []
	// The stem and the arrow head
	path = ['M', 0, 7, 'L', -1.5, 7, 0, 10, 1.5, 7, 0, 7, 0, -10]
	if (level === 0) {
		// 静风使用圆圈表示
		path = ['M', 6.123233995736766e-16, 10, 'A', 10, 10, 0, 1, 1, 0.009999998333339817, 9.999995000000418, 'Z']
	}
	if (level === 1) {
		path.push('M', 0, -8, 'L', 4, -8) // short line
	}

	if (level === 2) {
		path.push('M', 0, -8, 'L', 4, -8) // short line
	} else if (level >= 3) {
		path.push(0, -10, 7, -10) // long line
	}
	if (level === 4) {
		path.push('M', 0, -7, 'L', 4, -7)
	} else if (level >= 5) {
		path.push('M', 0, -7, 'L', 7, -7)
	}
	if (level === 5) {
		path.push('M', 0, -4, 'L', 4, -4)
	} else if (level >= 6) {
		path.push('M', 0, -4, 'L', 7, -4)
	}
	if (level === 7) {
		path.push('M', 0, -1, 'L', 4, -1)
	} else if (level >= 8) {
		path.push('M', 0, -1, 'L', 7, -1)
	}

	return path.join(' ')
}
// 划分风力等级
function getWindLevel(windSpeed) {
	if (windSpeed >= 0 && windSpeed <= 0.2) {
		return 0
	} else if (windSpeed > 0.2 && windSpeed <= 1.5) {
		return 1
	} else if (windSpeed > 1.5 && windSpeed <= 3.3) {
		return 2
	} else if (windSpeed > 3.3 && windSpeed <= 5.4) {
		return 3
	} else if (windSpeed > 5.4 && windSpeed <= 7.9) {
		return 4
	} else if (windSpeed > 7.9 && windSpeed <= 10.7) {
		return 5
	} else if (windSpeed > 10.7 && windSpeed <= 13.8) {
		return 6
	} else if (windSpeed > 13.8 && windSpeed <= 17.1) {
		return 7
	} else if (windSpeed > 17.1 && windSpeed <= 20.7) {
		return 8
	} else if (windSpeed > 20.7 && windSpeed <= 24.4) {
		return 9
	} else if (windSpeed > 24.4 && windSpeed <= 28.4) {
		return 10
	} else if (windSpeed > 28.4 && windSpeed <= 32.6) {
		return 11
	} else if (windSpeed > 32.6) {
		return 12
	}
}
// 二位数组解压
function arrToZip(arr) {
	let left = []
	let right = []
	let offset = []

	for (let i = 0; i < arr.length; i++) {
		const item = arr[i]
		left.push(item[0])
		right.push(item[1])
		offset.push(0)
	}
	return [left, right, offset]
}
// 绘制箭头
function renderArrow(param, api, data, index) {
	const dims = {
		time: 0,
		windSpeed: 1,
		R: 2,
		index: 3
	}
	const point = api.coord([api.value(dims.time), api.value(dims.index)])

	return {
		type: 'path',
		shape: {
			pathData: windWinyArrow(getWindLevel(api.value(dims.windSpeed))), // 返回绘制的 SVG
			x: -18 / 2,
			y: -18 / 2,
			width: 20,
			height: 20
		},
		invisible: arrowInterval(param.dataInsideLength, param.dataIndex),
		rotation: ((360 - api.value(dims.R)) / 180) * Math.PI, //弧度，这里需要将角度转弧度
		position: point,
		style: api.style({
			fill: null,
			stroke: '#555',
			lineWidth: 1.5
		})
	}
}
// 绘制风箭头
function windWinyArrow(level) {
	// 绘制SVG图层
	let path = []
	// The stem and the arrow head
	path = ['M', 0, 7]
	if (level === 0) {
		path.push(0, -10, 1, -10) // 风矢直杆
	}
	if (level === 1) {
		path.push(0, -10, 5, -10, 'M', 0, -7, 'L', 0, -7)
	}
	if (level === 2) {
		path.push(0, -10, 10, -10, 'M', 0, -7, 'L', 0, -7)
	}

	if (level === 3) {
		path.push(0, -10, 10, -10, 'M', 0, -7, 'L', 5, -7)
	}

	if (level === 4) {
		path.push(0, -10, 10, -10, 'M', 0, -7, 'L', 10, -7)
	}

	if (level === 5) {
		path.push(0, -10, 10, -10, 'M', 0, -7, 'L', 10, -7, 'M', 0, -4, 'L', 5, -4)
	}

	if (level === 6) {
		path.push(0, -10, 10, -10, 'M', 0, -7, 'L', 10, -7, 'M', 0, -4, 'L', 10, -4)
	}

	if (level === 7) {
		path.push(0, -10, 10, -10, 'M', 0, -7, 'L', 10, -7, 'M', 0, -4, 'L', 10, -4, 'M', 0, -1, 'L', 5, -1)
	}

	if (level >= 8) {
		path.push(0, -10, 10, -10, 'M', 0, -7, 'L', 10, -7, 'M', 0, -4, 'L', 10, -4, 'M', 0, -1, 'L', 10, -1)
	}

	return path.join(' ')
}
//  箭头的分割
function arrowInterval(allNum, numIndex) {
	// false 代表 显示 true 代表不显示
	let status = false

	if (allNum <= 10) return status

	if (numIndex == 0) {
		status = true
	} else {
		status = numIndex % 5 == 0 ? false : true
	}
	return status
}
export { drawWindArrows, windArrow, getWindLevel, arrToZip, renderArrow }
