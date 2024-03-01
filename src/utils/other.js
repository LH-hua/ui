

/** @msg 创建高德地图
 */
export const browserCreateAmpJs = function (v, k, plugins) {
	v = v || '2.0'
	k = k || '6d171a2de85ccef625df889f05534721'
	plugins = plugins || [
		'ElasticMarker',
		'AMap.MouseTool',
		'AMap.PolyEditor',
		'AMap.MarkerClusterer',
		'AMap.RangingTool',
		'AMap.DistrictSearch',
		'AMap.OverView',
		'AMap.DistrictLayer',
		'AMap.CustomLayer'
	]
	if (window.AMap) {
		// 已经加载成功，不重复加载
		return new Promise(resolve => {
			resolve(window.AMap)
		})
	}
	const loadMap = new Promise(function (resolve, reject) {
		window.init = function () {
			resolve(AMap)
		}
		let script = document.createElement('script')
		script.type = 'text/javascript'
		script.async = true
		script.src = `//webapi.amap.com/maps?v=${v}&key=${k}&plugin=${plugins}&callback=init`
		script.onerror = reject
		document.head.appendChild(script)
	})
	const loadMapUI = new Promise(function (resolve, reject) {
		let script2 = document.createElement('script')
		script2.type = 'text/javascript'
		script2.async = true
		script2.src = '//webapi.amap.com/ui/1.0/main-async.js'
		script2.onerror = reject
		script2.onload = function () {
			//onload必须写在最后
			resolve('success')
		}
		document.head.appendChild(script2)
	})
	return Promise.all([loadMap, loadMapUI])
		.then(function (result) {
			return result[0]
		})
		.catch(e => {
			console.log(e)
		})
}

/**
 * 构建树结构(以parentId=0为根)
 * @param {} dataList
 */
export const buildTree = function (dataList) {
	const tree = []
	if (dataList) {
		const copyList = dataList.slice(0)
		defaultOptions(copyList)
		for (let i = 0; i < copyList.length; i++) {
			for (let j = 0; j < copyList.length; j++) {
				let p = copyList[j]
				if (copyList[i].parentId === p.id) {
					if (!p.children) {
						p.children = []
					}
					copyList[i].parent = p
					p.children.push(copyList[i])
				}
			}
			if (copyList[i].parentId == 0) {
				tree.push(copyList[i])
			}
		}
	}
	return tree
}

/**
 * 构建树结构
 * @param {*} dataList
 * @param {*} isOptions
 */
export const buildTreeV2 = function (dataList, isOptions = true) {
	const tree = []
	if (dataList) {
		const copyList = dataList.slice(0)
		if (isOptions) {
			defaultOptions(copyList)
		}
		handleTree(copyList, tree)
	}
	return tree
}

/**
 * 构建树形结构方法
 * @param dataList  数据集合
 * @param callback  回调函数
 * @returns {*[]}
 */
export const buildTreeV3 = function (dataList, callback = mp) {
	const tree = []
	if (dataList) {
		const copyList = dataList.slice(0)
		for (let i = 0; i < copyList.length; i++) {
			callback(copyList[i])
		}
		handleTree(copyList, tree)
	}
	return tree
}

/**
 * 根据指定树形作为父节点构建树
 * @param dataList          数据集合
 * @param parentIdItemName  用于记录父级id的属性名称
 * @param itemName          属性名称
 * @param isOptions         是否不使用默认属性
 * @returns {*[]}
 */
export const buildTreeByItem = function (dataList, parentIdItemName, itemName, isOptions = true) {
	const tree = []
	if (dataList) {
		const copyList = dataList.slice(0)
		if (isOptions) {
			defaultOptions(copyList)
		}
		handleTreeByItem(copyList, tree, parentIdItemName, itemName)
	}
	return tree
}

/**
 * 根据指定树形作为父节点构建左侧树形结构
 * @param dataList  数据集合
 * @param itemName  属性名称
 * @param callback  回调函数
 * @returns {*[]}
 */
export const buildLeftSideTreeByItem = function (dataList, parentIdItemName, itemName, callback = mp) {
	const tree = []
	if (dataList) {
		const copyList = dataList.slice(0)
		for (let i = 0; i < copyList.length; i++) {
			callback(copyList[i])
		}
		handleTreeByItem(copyList, tree, parentIdItemName, itemName)
	}
	return tree
}

/**
 * 给数据集合设置默认属性
 * @param copyList  数据集合
 * @returns {*[]}
 */
export const defaultOptions = function (copyList) {
	for (let i = 0; i < copyList.length; i++) {
		copyList[i].title = copyList[i].name
		copyList[i].key = copyList[i].id
		copyList[i].value = copyList[i].id
		copyList[i].disabled = false
	}
}

/**
 * 默认处理树形数据方法
 * @param copyList  数据集合
 * @returns {*[]}
 */
export const handleTree = function (copyList, tree) {
	for (let i = 0; i < copyList.length; i++) {
		for (let j = 0; j < copyList.length; j++) {
			let p = copyList[j]
			if (copyList[i].parentId === p.id) {
				copyList[i].parent = p
				if (typeof p.children === 'undefined') {
					p.children = []
				}
				p.children.push(copyList[i])
			}
		}
	}
	copyList.forEach(element => {
		if (!element.parent) {
			tree.push(element)
		}
		element.parent = {}
	})
}

/**
 * 根据指定属性设置属性数据方法
 * @param copyList          数据集合
 * @param parentIdItemName  父级标记名称
 * @param itemName          子级标记名称
 * @returns {*[]}
 */
export const handleTreeByItem = function (copyList, tree, parentIdItemName, itemName) {
	for (let i = 0; i < copyList.length; i++) {
		for (let j = 0; j < copyList.length; j++) {
			let p = copyList[j]
			if (copyList[i][parentIdItemName] === p[itemName]) {
				copyList[i].parent = p
				if (typeof p.children === 'undefined') {
					p.children = []
				}
				p.children.push(copyList[i])
			}
		}
	}
	copyList.forEach(element => {
		if (!element.parent) {
			tree.push(element)
		}
		element.parent = {}
	})
}


/**
 *  按区域划分树，子节点属于多个区域时，节点key值相同。
 * @param {*} data 原始数据
 */
export const filterStationTreeData = function (data) {
	const copyList = JSON.parse(JSON.stringify(data))
	for (let i = 0; i < data.length; i++) {
		const node = data[i]
		const parent = copyList.filter(item => item.id === node.parentId)
		if (node.level > 1) {
			if (node.level === 2) {
				node.id = `${node.parentId}_${node.id}`
			} else if (node.level === 3) {
				node.id = `${node.parentId}_${node.id}`
				node.parentId = `${parent[0].parentId}_${parent[0].id}`
			} else {
				node.parentId = `${parent[0].parentId}_${parent[0].id}`
			}
		}
	}
	return data
}



