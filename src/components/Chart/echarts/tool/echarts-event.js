/* 传入参数 图片名字 echarts对象 */
export function saveImg(param) {
	// 获取画布图表地址信息

	const imgUrl = param.chart._api.getDataURL({
		type: 'jpeg',
		pixelRatio: 1,
		backgroundColor: '#fff'
	})

	// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
	if (window.navigator.msSaveOrOpenBlob) {
		// 截取base64的数据内容（去掉前面的描述信息，类似这样的一段：data:image/png;base64,）并解码为2进制数据
		let bstr = atob(imgUrl.split(',')[1])
		// 获取解码后的二进制数据的长度，用于后面创建二进制数据容器
		let n = bstr.length
		// 创建一个Uint8Array类型的数组以存放二进制数据
		let u8arr = new Uint8Array(n)
		// 将二进制数据存入Uint8Array类型的数组中
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		// 创建blob对象
		let blob = new Blob([u8arr])
		// 调用浏览器的方法，调起IE的下载流程
		window.navigator.msSaveOrOpenBlob(blob, 'echarts下载' + '.jpg')
	} else {
		//类似chrome浏览器创建一个a标签并使用a标签的href属性下载
		let tempA = document.createElement('a')
		tempA.download = param.fileName + '.jpg'
		tempA.href = imgUrl
		document.body.appendChild(tempA)
		tempA.click()
		document.body.removeChild(tempA)
	}
}

// 下载csv文件
export function exportCsv(params) {
	let { chart, fileName, csvExportData } = params

	let isExternal = false // 判断是否使用外部函数接收数据
	if (csvExportData && typeof csvExportData == 'function') {
		isExternal = true
	}
	const { exportData, exportTitle } = isExternal ? csvExportData(chart) : dataToJson(chart)

	let row = '',
		csvData = ''
	for (const title of exportTitle) {
		row += '"' + title + '",'
	}
	csvData += row + '\r\n' // 添加换行符号
	for (const item of exportData) {
		row = ''
		for (let key in item) {
			row += '"' + item[key] + '",'
		}
		csvData += row + '\r\n' // 添加换行符号
	}
	if (!csvData) return
	let alink = document.createElement('a')
	// 解决中文乱码的问题，标识该字节流的字节序
	let _utf = '\uFEFF'
	const bw = browser()
	if (bw['edge'] || !bw['ie']) {
		// Blob IE>=10 都支持，不能作为判断依据
		if (window.Blob && window.URL && window.URL.createObjectURL) {
			// DOMStrings会被编码为UTF-8，utf-8保存的csv格式要让Excel正常打开的话，必须加入在文件最前面加入BOM(Byte order mark)
			const csvDataBlob = new Blob([_utf + csvData], {
				type: 'text/csv'
			})
			//会产生一个类似 blob:http://localhost:8083/5a2d03ec-cbdf-4ea9-be0c-f837ed35a9be 这样的URL字符串,
			//可以像使用普通 URL 那样使用它，比如用在 img.src 上。
			alink.href = URL.createObjectURL(csvDataBlob)
		}
		document.body.appendChild(alink)
		alink.setAttribute('download', fileName + '.csv')
		alink.click()
		document.body.removeChild(alink)
	} else if (bw['ie'] >= 10) {
		const csvDataBlob = new Blob([_utf + csvData], {
			type: 'text/csv'
		})
		navigator.msSaveBlob(csvDataBlob, fileName + '.csv')
	}
}

// echarts数据对象处理成json
function dataToJson(chart) {
	let params = chart._api.getOption()
	let xAxis = [] // x轴或y轴数据(一般是日期)
	if (params.xAxis || params.yAxis) {
		xAxis = params.xAxis[0].data || params.yAxis[0].data || []
	}
	// 多系列数据 name and value
	let series = params.series[0].value ? params.series : params.series[0].data

	let value = series.map(item => item.value)

	// value子项为数组的进行一维处理且取数组第一项
	value.forEach((item, i) => {
		item.forEach((ele, sub) => {
			if (Array.isArray(ele)) {
				ele.length = 1
				value[i][sub] = value[i][sub].toString() * 1
			}
		})
	})

	const seriesName = series.map(item => item.name)

	let valueLength = value.map(item => item.length)
	let max = Math.max.apply(null, valueLength) // 获取value数组中最大的长度
	xAxis = xAxis.length > 0 ? xAxis : new Array(max).fill('') // 以饼图数据为例做适配

	const exportTitle = [' ', ...seriesName] // 表头数据
	let exportData = [] // 表项
	xAxis.forEach(item => {
		exportData.push({
			date: item
		})
	})

	let obj = {}
	seriesName.forEach((item, sub) => {
		obj[item] = value[sub]
		exportData.forEach((ele, i) => {
			ele[item] = obj[item][i]
		})
	})

	return {
		exportData,
		exportTitle
	}
}

// 浏览器判断
function browser() {
	let Sys = {}
	let ua = navigator.userAgent.toLowerCase()
	let s
	;(s = ua.indexOf('edge') !== -1 ? (Sys.edge = 'edge') : ua.match(/rv:([\d.]+)\) like gecko/))
		? (Sys.ie = s[1])
		: (s = ua.match(/msie ([\d.]+)/))
		? (Sys.ie = s[1])
		: (s = ua.match(/firefox\/([\d.]+)/))
		? (Sys.firefox = s[1])
		: (s = ua.match(/chrome\/([\d.]+)/))
		? (Sys.chrome = s[1])
		: (s = ua.match(/opera.([\d.]+)/))
		? (Sys.opera = s[1])
		: (s = ua.match(/version\/([\d.]+).*safari/))
		? (Sys.safari = s[1])
		: 0
	return Sys
}
