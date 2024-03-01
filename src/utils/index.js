import moment from 'moment'

/**
 * 同步属性
 * @params target 目标对象
 * @params source 源对象
 */
export const copyProperties = function (target, source) {
	if (!target || !source) {
		const err = {
			err: '目标对象或者源对象不能为空'
		}
		throw err
	}
	for (const key in target) {
		target[key] = this.isNull(source[key]) ? target[key] : source[key]
	}
	return target
}

/**
 * 获取图片base64数据
 * @author Sea
 * @param {string} domId
 * @param {function} callback 回调
 */
export const getImgBase64 = function (domId, callback) {
	const file = document.querySelector('#' + domId).files[0]
	// 验证图片格式
	if (
		(file.name && file.name.indexOf('.jpg') >= 0) ||
		file.name.indexOf('.png') >= 0 ||
		file.name.indexOf('.PNG') >= 0 ||
		file.name.indexOf('.jpeg') >= 0 ||
		file.name.indexOf('.gif') >= 0
	) {
		const reader = new FileReader() // 本地预览

		reader.onload = function () {
			callback(reader.result)
		}
		reader.readAsDataURL(file) // Base64
	}
}

/**
 * 对象按字母排序
 * @author Sea
 * @param {object} obj 参数
 */
export const objKeySort = function (obj) {
	// 创建一个新的对象，用于存放排好序新对象
	const newkey = Object.keys(obj).sort()

	// 创建一个新的对象，用于存放排好序的键值对
	const newObj = {}

	for (let i = 0; i < newkey.length; i++) {
		newObj[newkey[i]] = obj[newkey[i]] // 向新创建的对象中按照排好的顺序依次增加键值对
	}

	return newObj
}

/**
 * @msg 下载文件
 */
export const downloadFile = function (data, name = moment().format('YYYY-MM-DD HH:mm') + '文件下载') {
	const blob = new Blob([data])
	const url = window.URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = name // 下载后文件名
	document.body.appendChild(link)
	link.click() // 点击下载
	link.remove() // 下载完成移除元素
	window.URL.revokeObjectURL(link.href) // 用完之后使用URL.revokeObjectURL()释放；
}

/**
 *  @msg 下载图片
 */
export const downloadImg = function (imgUrl, name = moment().format('YYYY-MM-DD HH:mm') + '图片.png') {
	let image = new Image()
	// 解决跨域 Canvas 污染问题
	image.setAttribute('crossOrigin', 'anonymous')
	image.onload = function () {
		let canvas = document.createElement('canvas')
		canvas.width = image.width
		canvas.height = image.height
		let context = canvas.getContext('2d')
		context.drawImage(image, 0, 0, image.width, image.height)
		let url = canvas.toDataURL('image/png') //得到图片的base64编码数据
		let a = document.createElement('a') // 生成一个a元素
		let event = new MouseEvent('click') // 创建一个单击事件
		a.download = name // 设置图片名称
		a.href = url // 将生成的URL设置为a.href属性
		a.dispatchEvent(event) // 触发a的单击事件
	}
	image.src = imgUrl
}

/**
 *  @msg  保留小数点（非四舍五入）
 *  @param {val} 值
 *  @param {fixed} 小数点
 *  @example   numberToFixed(25.198726354, 1);    ==> 25.1
 */
export const numberToFixed = function (val, fixed) {
	return (Math.pow(10, fixed) * val) / Math.pow(10, fixed)
}

/**
 *  @msg  给十位数的数字 前面 加 0
 *  @example   numberToFixed(25.198726354, 1);    ==> 25.1
 */
export const numberToTenAddZero = function (val) {
	let str = val.toString()
	if (str.length > 1) return val
	return 0 + str
}

/**
 *  @msg 判断是否为空
 *  @param {type} 值
 *  @param {fixed} 小数点
 *  @example   isNull(12);    ==> false
 */
export const isNull = function (val) {
	if (typeof val === 'boolean') {
		return false
	}
	if (typeof val === 'number') {
		return false
	}
	if (val instanceof Array) {
		if (val.length === 0) {
			return true
		}
	} else if (val instanceof Object) {
		if (JSON.stringify(val) === '{}') {
			return true
		}
	} else {
		if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') {
			return true
		}
		return false
	}
	return false
}

/**
 * @msg 判断是否二维数组
 * @param {array} arr 数组
 * @example   isTwoArray([[12]]); ==> false
 */
export const isTwoArray = function (arr) {
	let state = false
	const rowNum = arr.length
	if (!rowNum) {
		return state
	}

	const colNum = arr[0]
	if (colNum && Array.isArray(colNum)) {
		state = true
	}

	return state
}

/** 在某个区间随机一个整数
 * @param min 最小值
 * @param max 最大值
 * @return {number}
 */
export const randomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 *遍历树
 * @param {Array} tree
 * @param {Function} func
 */
export const foreachInTree = function (tree, func) {
	if (tree) {
		tree.forEach(node => {
			func(node)
			if (node.children) {
				foreachInTree(node.children, func)
			}
		})
	}
}

/**
 *深拷贝对象
 * @param {Array} tree
 * @param {Function} func
 */
export const deepCopyObject = function (obj) {
	// 只拷贝对象
	if (typeof obj !== 'object' || obj == null) return
	// 根据obj的类型判断是新建一个数组还是一个对象
	let newObj = obj instanceof Array ? [] : {}
	for (let key in obj) {
		// 遍历obj,并且判断是obj的属性才拷贝
		if (obj.hasOwnProperty(key)) {
			// 判断属性值的类型，如果是对象递归调用深拷贝
			newObj[key] = typeof obj[key] === 'object' ? copyObject(obj[key]) : obj[key]
		}
	}
	return newObj
}

/**
 * 获取对象中指定路径的属性值
 * @param {Object} obj 对象
 * @param {String} path 对象路径
 */
export const getObjValByPath = function (obj, path) {
	const props = path.split('.')
	let res = obj
	props.forEach(p => (res = res[p]))
	return res
}

/**
 * 设置浏览器tab标签名称
 * @param {String} title 名称
 */
export const setDocumentTitle = function (title) {
	window.document.title = title || ''
}

/**
 * @description 拷贝到剪切板
 * @param {String} content 内容
 */
export const copy = function (content) {
	return new Promise(resolve => {
		let copyInput = document.createElement('textarea')
		copyInput.value = content
		copyInput.setAttribute('id', 'b-copy-temp')
		document.body.appendChild(copyInput)
		copyInput.select() // 选择对象
		let result = document.execCommand('Copy') // 执行浏览器复制命令
		copyInput.style.display = 'none'
		document.body.removeChild(document.getElementById('b-copy-temp'))
		resolve(result)
	})
}

/**
 * 节流函数，(限制函数的执行频率)返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param immediate 是否立即执行 true 则先调用，false不先调用
 * @return {function}             返回客户调用函数
 */
export const throttle = function (func, wait, immediate) {
	let timeoutID
	let lastExec = 0

	function wrapper() {
		const self = this
		const elapsed = Number(new Date()) - lastExec
		const args = arguments

		function clearExistingTimeout() {
			if (timeoutID) {
				clearTimeout(timeoutID)
			}
		}

		function clear() {
			timeoutID = undefined
		}

		function exec() {
			lastExec = Number(new Date())
			func.apply(self, args)
		}

		if (immediate && !timeoutID) {
			exec()
		}
		clearExistingTimeout()
		if (immediate === undefined && elapsed > wait) {
			exec()
		} else {
			timeoutID = setTimeout(immediate ? clear : exec, immediate === undefined ? wait - elapsed : wait)
		}
	}

	return wrapper
}

/**
 * 防抖函数
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @return {function}             返回客户调用函数
 */
export const debounce = function (func, wait) {
	let timer = null
	return function (...args) {
		const self = this
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		timer = setTimeout(() => {
			func.call(self, ...args)
		}, wait)
	}
}

/**
 * 精确获取值类型
 *
 * @param  {any} val        回调函数
 * 返回对于的值类型字符串 如string，boolean，number等
 */
export const getType = function (val) {
	return Object.prototype.toString.call(val).replace('[object ', '').replace(']', '').toLocaleLowerCase()
}

/**
 * 返回一个水印canvas
 */
export const createWatermarkCanvas = function (str) {
	let waterMarkText = str || 'water-mark'
	let canvas = document.createElement('canvas')
	let ctx = canvas.getContext('2d')
	canvas.width = canvas.height = 100
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.globalAlpha = 0.08
	ctx.font = '20px Microsoft Yahei'
	ctx.translate(50, 50)
	ctx.rotate(-Math.PI / 4)
	ctx.fillText(waterMarkText, 0, 0)
	return canvas
}

/**
 * 是否为object类型
 */
export const isObject = function (obj) {
	return typeof obj === 'object' && obj !== null
}

/**
 * 判断是否为数字
 */
export const isNumber = function(obj) {
  return typeof obj === 'number' && !isNaN(obj)
}

/**
 * 是否为数字或者可转换为数字的字符串
 * @param {*} obj
 * @returns
 */
export const isNumberParseable = function(obj){
  return !(parseFloat(obj).toString() === 'NaN')
}

// 判定对象数组相等
export const isEqual = function (obj1, obj2) {
	// 两个数据有任何一个不是对象或数组
	if (!isObject(obj1) || !isObject(obj2)) {
		// 值类型(注意：参与equal的一般不会是函数)
		return obj1 === obj2
	}
	// 如果传的两个参数都是同一个对象或数组
	if (obj1 === obj2) {
		return true
	}

	// 两个都是对象或数组，而且不相等
	// 1.先比较obj1和obj2的key的个数，是否一样
	const obj1Keys = Object.keys(obj1)
	const obj2Keys = Object.keys(obj2)
	if (obj1Keys.length !== obj2Keys.length) {
		return false
	}

	// 如果key的个数相等,就是第二步
	// 2.以obj1为基准，和obj2依次递归比较
	for (let key in obj1) {
		// 比较当前key的value  --- 递归
		const res = isEqual(obj1[key], obj2[key])
		if (!res) {
			return false
		}
	}

	// 3.全相等
	return true
}

/**
 * 获取区间范围，如近一周，近三个月，后一个月等
 * @param days 为负值时往前，正为之后的日期
 * @param mode
 * @returns {*}
 */
export const rangeTime = function (days, format = 'YYYY-MM-DD') {
	const startDate = new Date()
	const endDate = new Date()
	if (days < 0) {
		startDate.setTime(startDate.getTime() + 3600 * 1000 * 24 * days)
	} else {
		endDate.setTime(endDate.getTime() + 3600 * 1000 * 24 * days)
	}
	const startDateStr = moment(startDate).format(format)
	const endDateStr = moment(endDate).format(format)
	// console.log(startDateStr, endDateStr)
	return {
		startDate,
		endDate,
		startDateStr,
		endDateStr
	}
}

/**
 * 时间格式化
 * @param time
 * @param format
 */
export const parseTime = function (time, format = 'YYYY-MM-DD HH:mm:ss') {
	return moment(time).format(format)
}

/**
 * 滚动置顶动画
 * @param {*} num 值
 * @param {*} decimalPlaces 修约位数
 * @returns
 */
export const scrollTop = function (el, from = 0, to, duration = 500, endCallback) {
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame =
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				return window.setTimeout(callback, 1000 / 60)
			}
	}
	const difference = Math.abs(from - to)
	const step = Math.ceil((difference / duration) * 50)

	function scroll(start, end, step) {
		if (start === end) {
			endCallback && endCallback()
			return
		}

		let d = start + step > end ? end : start + step
		if (start > end) {
			d = start - step < end ? end : start - step
		}

		if (el === window) {
			window.scrollTo(d, d)
		} else {
			el.scrollTop = d
		}
		window.requestAnimationFrame(() => scroll(d, end, step))
	}

	scroll(from, to, step)
}

/**
 * 四舍六入修约
 * @param {*} num 值
 * @param {*} decimalPlaces 修约位数
 * @returns
 */
export const sixRound = function (num, decimalPlaces) {
	const d = decimalPlaces || 0
	const m = Math.pow(10, d)
	const n = +(d ? num * m : num).toFixed(8)
	const i = Math.floor(n)
	const f = n - i
	const e = 1e-8
	const r = f > 0.5 - e && f < 0.5 + e ? (i % 2 == 0 ? i : i + 1) : Math.round(n)
	return d ? r / m : r
}


// 监听事件
export const on = function (element, event, handler) {
	if (document.addEventListener) {
		if (element && event && handler) {
			element.addEventListener(event, handler, false)
		}
	} else {
		if (element && event && handler) {
			element.attachEvent('on' + event, handler)
		}
	}
}

// 移除事件
export const off = function (element, event, handler) {
	if (document.removeEventListener) {
		if (element && event && handler) {
			element.removeEventListener(event, handler, false)
		}
	} else {
		if (element && event && handler) {
			element.detachEvent('on' + event, handler)
		}
	}
}

// 监听一次事件
export const once = function (el, event, fn) {
	const listener = function () {
		if (fn) {
			fn.apply(this, arguments)
		}
		off(el, event, listener)
	}
	on(el, event, listener)
}

export const trim = function (string) {
	return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

// 是否有class类名
export const hasClass = function (el, cls) {
	if (!el || !cls) return false
	if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
	if (el.classList) {
		return el.classList.contains(cls)
	} else {
		return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
	}
}

// 添加class
export const addClass = function (el, cls) {
	if (!el) return
	let curClass = el.className
	let classes = (cls || '').split(' ')

	for (let i = 0, j = classes.length; i < j; i++) {
		let clsName = classes[i]
		if (!clsName) continue

		if (el.classList) {
			el.classList.add(clsName)
		} else if (!hasClass(el, clsName)) {
			curClass += ' ' + clsName
		}
	}
	if (!el.classList) {
		el.className = curClass
	}
}

// 移除一个class样式
export const removeClass = function (el, cls) {
	if (!el || !cls) return
	let classes = cls.split(' ')
	let curClass = ' ' + el.className + ' '

	for (let i = 0, j = classes.length; i < j; i++) {
		let clsName = classes[i]
		if (!clsName) continue

		if (el.classList) {
			el.classList.remove(clsName)
		} else if (hasClass(el, clsName)) {
			curClass = curClass.replace(' ' + clsName + ' ', ' ')
		}
	}
	if (!el.classList) {
		el.className = trim(curClass)
	}
}

// 实现真正意义的四舍五入
export const toFixed = function toFixed(number, length) {
  return Math.round(Math.pow(10, length) * number) / Math.pow(10, length)
}