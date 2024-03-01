// 拾色器
function colorPickup(z, colorbar, isGradient) {
	if (colorbar.length > 0) {
		if (isGradient) {
			// 按颜色渐变  绘制颜色块
			for (let k = 1, l = 0; k < colorbar.length; l = k++) {
				if (z <= colorbar[k].value) {
					const t = (colorbar[k].value - z) / (colorbar[k].value - colorbar[l].value)
					const r = colorbar[k].r - Math.round(t * (colorbar[k].r - colorbar[l].r))
					const g = colorbar[k].g - Math.round(t * (colorbar[k].g - colorbar[l].g))
					const b = colorbar[k].b - Math.round(t * (colorbar[k].b - colorbar[l].b))
					return 'rgb(' + r + ',' + g + ',' + b + ')'
				}
			}
		} else {
			// 默认 按固定等级  绘制颜色块
			const letfOpenInterval = colorbar[0].open
			const rightOpenInterval = colorbar[colorbar.length - 1].open
			let color = null
			// 左边开区间
			if (letfOpenInterval) {
				for (let k = 0; k < colorbar.length; k++) {
					if (z <= colorbar[k].value) {
						const r = colorbar[k].r
						const g = colorbar[k].g
						const b = colorbar[k].b
						const a = colorbar[k].a
						color = 'rgba(' + r + ',' + g + ',' + b + ',' + (a !== undefined ? a : 255) + ')'
						break
					}
				}
			} else {
				// 左边闭区间
				for (let k = 1, l = 0; k < colorbar.length; l = k++) {
					if (z <= colorbar[k].value) {
						const r = colorbar[l].r
						const g = colorbar[l].g
						const b = colorbar[l].b
						const a = colorbar[l].a
						color = 'rgba(' + r + ',' + g + ',' + b + ',' + (a !== undefined ? a : 255) + ')'
						break
					}
				}
			}
			// 右边开区间
			if (rightOpenInterval && color == null) {
				const item = colorbar[colorbar.length - 1]
				color = 'rgba(' + item.r + ',' + item.g + ',' + item.b + ',' + (item.a !== undefined ? item.a : 255) + ')'
			}
			return color
		}
	}
}

export default colorPickup