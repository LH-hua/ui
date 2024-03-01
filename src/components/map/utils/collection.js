const gridFeatureCollection = function(data) {
	const vals = []
	const n = data.data.length
	const m = data.data[0].length
	for (let i = 0; i < n; i++)
		for (let j = 0; j < m; j++) {
			const z = data.data[i][j]
			vals.push(z)
		}
	return vals
}

export { gridFeatureCollection }