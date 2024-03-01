// 风速风向分解为水平垂直分量
const decompose = (ws, wd) => {
	// 风速风向转换为水平竖直分量
	const angle = (wd / 180) * Math.PI
	const x = ws * Math.cos(angle)
	const y = ws * Math.sin(angle)
	return [x, y]
}

//水平垂直分量合成风速风向
function synthesis(u, v) {
	// 水平竖直分量转换为风速
	const ws = Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2))
  const wd = Math.atan2(v, u)
  return [ws, wd]
}

// 划分风力等级
const getWindLevel = (windSpeed) => {
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

export default {
	decompose,
	synthesis,
	getWindLevel
}

