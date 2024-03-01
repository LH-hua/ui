<template>
	<div style="height: 100%">
		<div :id="mapkey" ref="olmap" style="width: 100%; height: 100%; background: #b5cfff"></div>
	</div>
</template>
<script>
import 'ol/ol.css'
import { Map, View, Overlay } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer, Image as ImageLayer } from 'ol/layer'
import { Vector, ImageStatic, ImageWMS } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { transform, transformExtent } from 'ol/proj'
import XYZ from 'ol/source/XYZ'
import geojsonStyle from './geojson-style'
import TrajectoryLine from './plugIn/trajectory-line'
import DistributedFlow from './plugIn/distributed-flow.js'
import { debounce } from 'lodash'
import Zoom from 'ol/control/Zoom'
import { defaults as defaultControls } from 'ol/control'
import { unByKey } from 'ol/Observable'

import {
	heatPower,
	regulationPixelRender,
	contour,
	windArrow,
	windParticle,
	irregularPixelRender,
	contourRender,
	windArrowRender,
	drawWindParticle,
	turfRegulationContourf,
	turfIrregularContourf,
	makerCanvas,
	windBarbRender,
	windBarb,
	Marker,
	flowLineRender
} from './layers-muster'
import { Fill, Stroke, Style, Icon, Text, Circle } from 'ol/style'

export default {
	props: {
		// 地图基础配置
		// 地图元素id
		mapkey: {
			type: String,
			default() {
				return 'map'
			}
		},
		// 坐标系
		projection: {
			default() {
				return 'EPSG:3857'
			}
		},
		externalView: {
			type: Object,
			default() {
				return null
			}
		},
		// 底图选项
		mapOptions: {
			type: Object,
			default() {
				return {
					// 中心点坐标
					center: [116.3683244, 39.915085],
					// 当前缩放级别
					zoom: 5,
					//是否显示缩放工具
					showZoom: false,
					// 最小缩放级别
					minZoom: 2,
					// 最大缩放级别
					maxZoom: 18
				}
			}
		},
		// 底图配置
		// 数组项的结构为: { type: '', sourceUrl: '', sourceType: '', sourceLayer: '' }
		// 其中type可为 thirdPart(百度、天地图、高德等第三方地图)、customImage(自定义地图)
		// sourceType 在自定义地图时有用
		backgroundOptions: {
			type: Array,
			required: true,
			default() {
				return []
			}
		},
		// 数据图层配置
		// 统一的配置
		dataLayerOption: {
			type: Object,
			default() {
				return {
					// 图片对应的像素
					width: 720,
					height: 360,
					// 边界
					extent: [105.289759, 28.161339, 110.198876, 32.201187],
					bound: ''
				}
			}
		},
		// 图层数据
		// { type: '', url: '', index: '', name: '',   }
		layerDatas: {
			type: Array,
			default() {
				return []
			}
		},
		// 数据解析方式
		// 回调函数，传入参数r, g, b
		dataAnalysisFunc: {
			type: Function
		},
		// 点位图层数据，数组
		// 数组对象格式为: { lng: Number, lat: Number, ... }
		// lng、lat为必要的属性
		markerDatas: {
			type: Object,
			default() {
				return {
					datas: [],
					// 点位图标回调函数
					// 入参为点位的feature, 包含了markerDatas中点位的所有信息
					markerIconsFunc: null
				}
			}
		},
		// { "geoJson": [], geoJsonStyle: "", index: 1 }
		geoJsonOptions: {
			type: [Object, Array],
			default() {
				return {
					geoJson: [],
					geoJsonStyle: geojsonStyle,
					hoverHighlight: false,
					hoverHighlightStyle: []
				}
			}
		},
		// { "imageUrl": "", imageBound: "", index: 1 }
		imageOptions: {
			type: Object,
			default() {
				return null
			}
		},
		windParticleOptions: {
			type: Object,
			default() {
				return {
					enableWind: false,
					data: []
				}
			}
		},
		//向前轨迹线
		trajectoryConfigure: {
			type: Array,
			default: () => null
		},
		//分布式流向图
		distributedConfigure: {
			type: Object,
			default: () => null
		}
	},
	data() {
		return {
			// 地图对象
			map: null,
			// 视图对象
			view: null,
			// 地图底图图层缓存集合
			backLayers: null,
			imageLayer: null,
			windyLayer: null,
			// 各种canvas图层缓存集合
			layers: [],
			// 点位弹出框缓存对象
			markerLayer: null,
			// 地理围栏图层
			geojsonLayer: [],
			//popup弹出层
			popup: null,
			geoJsonLayerHandler: null,

			// 轨迹线实例
			trajectoryLineInstances: [],

			bigmapZoomHandle: undefined,
			bigmapLayer: undefined,
			bigmapSource: undefined,
			distributed: null
		}
	},

	methods: {
		/*----------------------------------------------------------------------
      | 初始化地图 配置
      |-----------------------------------------------------------------------
      */
		initMap() {
			// 初始化视图
			this.initView()

			// 添加底图图层
			this.map = new Map({
				target: this.mapkey,
				view: this.view,
				controls: defaultControls({
					zoom: this.mapOptions.showZoom,
					zoomOptions: {
						zoomInTipLabel: '放大',
						zoomOutTipLabel: '缩小'
					}
				})
			})

			this.initBackgroudLayer()

			this.initGeoLayer()

			// 渲染图片图层, 直接叠加图片
			if (this.imageOptions) {
				this.buildImageLayer()
			}

			// 渲染点位
			if (this.markerDatas) {
				this.buildMarkerLayer()
			}

			//渲染向前轨迹线图
			if (this.trajectoryConfigure && this.trajectoryConfigure.length > 0) {
				this.trajectoryRender()
			}
			//渲染分布式流向图
			if (this.distributedConfigure) {
				this.distributedRender()
			}

			// 渲染数据图层
			this.initDataLayers()

			// 渲染风粒子动画
			if (this.windParticleOptions && this.windParticleOptions.enableWind) {
				this.refreshWind()
			}

			let that = this
			let count = 0
			this.map.on('moveend', function (e) {
				count++
				if (count <= 1) {
					return
				}
				let zoom = that.map.getView().getZoom() //获取当前地图的缩放级别
				let map_center = that.map.getView().getCenter()
				that.$emit('mapMoveend', zoom, map_center)
			})
		},
		// 渲染当前视图
		initView() {
			// 多窗口地图联动的情况下，需要外部传入视图，共用一个视图
			if (this.externalView) {
				this.view = this.externalView
			} else {
				this.view = new View({
					projection: this.projection,
					center: transform(this.mapOptions.center, 'EPSG:4326', 'EPSG:3857'),
					zoom: this.mapOptions.zoom,
					minZoom: this.mapOptions.minZoom,
					maxZoom: this.mapOptions.maxZoom
				})
			}
		},
		/*----------------------------------------------------------------------
      | 渲染地图 图层
      |-----------------------------------------------------------------------
      */
		// 渲染底图
		initBackgroudLayer() {
			// 移除所有图层
			if (!this.map) return
			if (this.backLayers && this.backLayers.length > 0) {
				this.backLayers.forEach(layer => this.map.removeLayer(layer))
				if (this.bigmapZoomHandle) {
					unByKey(this.bigmapZoomHandle)
				}
			}

			this.backLayers = []
			for (let option of this.backgroundOptions) {
				const index = option.index || 1
				if (option.type === 'BigMap') {
					// 保存当前bigmap选型信息，用于后续缩放后比较
					const source = (this.bigmapSource = this.judgeBigMapOption(option))
					const layer = (this.bigmapLayer = new TileLayer({
						type: 'BigMap',
						source: new XYZ({
							url: source.url,
							crossOrigin: 'anonymous'
						}),
						zIndex: index,
						className: option.className || null
					}))
					this.backLayers.push(layer)
					this.map.addLayer(layer)
				}

				// 第三方底图
				if (option.type === 'thirdPart') {
					const layer = new TileLayer({
						type: 'thirdPart',
						source: new XYZ({
							url: option.sourceUrl,
							crossOrigin: 'anonymous'
						}),
						zIndex: index,
						className: option.className || null
					})
					this.backLayers.push(layer)
					this.map.addLayer(layer)
				}

				if (option.type === 'customImage') {
					const layer = new ImageLayer({
						type: 'customImage',
						source: new ImageWMS({
							ratio: 1,
							url: option.sourceUrl,
							crossOrigin: 'anonymous',
							params: {
								FORMAT: 'image/png',
								VERSION: '1.1.1',
								STYLES: '',
								LAYERS: option.sourceLayer,
								exceptions: 'application/vnd.ogc.se_inimage'
							}
						}),
						zIndex: index
					})
					this.backLayers.push(layer)
					this.map.addLayer(layer)
				}
			}
			// 如果存在bigmap自定义离线地图时，需要添加地图缩放事件，用于根据缩放级别切换图层
			if (this.backgroundOptions.filter(b => b.type === 'BigMap').length > 0) {
				this.bigmapZoomHandle = this.map.on('moveend', e => {
					this.updateBigmapLayer()
				})
			}
		},
		// 判断当前缩放级别使用哪个地图地址
		judgeBigMapOption(option) {
			const zoom = this.view.getZoom()
			for (let source of option.sources) {
				if (source.max > zoom && source.min <= zoom) {
					return source
				}
			}
		},
		// 地图缩放，重新判断bigmap地图地址
		updateBigmapLayer() {
			const bigmapOption = this.backgroundOptions.find(b => b.type === 'BigMap')
			if (bigmapOption) {
				const source = this.judgeBigMapOption(bigmapOption)
				if (source) {
					if (this.bigmapLayer && this.bigmapSource) {
						if (source.max !== this.bigmapSource.max || source.min !== this.bigmapSource.min) {
							this.bigmapLayer.setSource(
								new XYZ({
									url: source.url,
									crossOrigin: 'anonymous'
								})
							)
							this.bigmapSource = source
						}
					}
				}
			}
		},
		// 渲染数据图层
		initDataLayers: debounce(function () {
			// 移除所有图层
			if (!this.map) return
			this.removeOlWind('windParticle')
			this.layers.map(item => this.map.removeLayer(item.layer))
			this.layers = []

			// 重新渲染图层
			if (!this.$utils.isNull(this.layerDatas)) {
				this.layerDatas.map(e => {
					this.buildCanvasLayer(e)
				})
			}
		}, 150),
		// 绘制 canvas 图层
		buildCanvasLayer(data) {
			let width = data.width || this.dataLayerOption.width
			let height = data.height || this.dataLayerOption.height
			//根据类型绘制 气象效果
			let extentData = data.extent || this.dataLayerOption.extent
			data.bound = data.bound || this.dataLayerOption.bound
			let canvasAlpha = data.canvasAlpha == undefined && data.canvasAlpha !== 0 ? 1 : data.canvasAlpha
			let colorbar = data.gradient || this.dataLayerOption.gradient

			let type = data.type || data.name
			// 不需要图片数据的类型
			if (type === 'heatPower' || type === 'makerCanvas' || type === 'flowLineRender') {
				let aggregate = {
					// 热力网格渲染
					heatPower: () => heatPower(data, colorbar, canvasAlpha, this.view),
					makerCanvas: () => makerCanvas(data, colorbar, this.map),
					flowLineRender: () => new flowLineRender(data, this.map)
				}
				let layer = aggregate[type]()
				this.buildMapLayer(layer)
				return
			}

			// 清空图片数据
			data.data = []
			// 判断是否有数据(图片)
			let url = null
			let code = null
			if (data.url) {
				if (typeof data.url === 'string') {
					url = data.url
					code = data.code
				} else if (Array.isArray(data.url) && data.url.length > 0) {
					url = data.url[0]
					code = data.code[0]
				}
			}

			// 判断是否存在解析函数, 否则使用默认函数
			const func = data.dataAnalysisFunc || this.dataAnalysisFunc || this.dataAnalysis

			// 需要经纬度数组的类型
			const lonlatTypes = [
				'irregularPixelRender',
				'contourRender',
				'windArrowRender',
				'windBarbRender',
				'contour',
				'turfRegulationContourf',
				'turfIrregularContourf',
				'windBarb',
				'windParticle',
				'windArrow',
				'regulationPixelRender'
			]
			if (lonlatTypes.indexOf(type) > -1) {
				let mapView = { map: this.map, view: this.view }
				let aggregater = {
					// 不规则栅格场像素方式污染分布图渲染
					irregularPixelRender: () => irregularPixelRender(data, width, height, colorbar, canvasAlpha, mapView),
					// 规则栅格场像素方式污染分布图渲染
					regulationPixelRender: () => regulationPixelRender(data, width, height, extentData, colorbar, canvasAlpha, this.map),
					// 规则栅格场等值线方式污染分布图渲染
					turfRegulationContourf: () => turfRegulationContourf(data, width, height, extentData, colorbar, canvasAlpha, this.map),
					// 不规则栅格场等值线方式污染分布图渲染
					turfIrregularContourf: () => turfIrregularContourf(data, width, height, colorbar, canvasAlpha, this.map),
					// 不规则栅格场等值线渲染
					contourRender: () => contourRender(data, width, height, this.map),
					// 规则栅格场等值线渲染
					contour: () => contour(data, width, height, extentData, this.map),
					// 不规则栅格场箭头风场渲染
					windArrowRender: () => windArrowRender(data, width, height, mapView),
					// 规则栅格场【箭头】风场渲染
					windArrow: () => windArrow(data, width, height, extentData, this.map),
					// 不规则栅格【风矢】风场渲染
					windBarbRender: () => windBarbRender(data, width, height, mapView),
					// 规则栅格场【风矢】风场渲染
					windBarb: () => windBarb(data, width, height, extentData, this.map),
					// 【粒子效果】风场渲染
					windParticle: () => windParticle(data, width, height, extentData, this.view)
				}

				this.resolve(url, code, func, d1 => {
					data.data = d1
					if (
						type == 'irregularPixelRender' ||
						type == 'regulationPixelRender' ||
						type == 'contourRender' ||
						type == 'contour' ||
						type == 'turfRegulationContourf' ||
						type == 'turfIrregularContourf'
					) {
						let layer = aggregater[type]()
						this.buildMapLayer(layer)
					}
					if (type == 'windArrowRender' || type == 'windArrow' || type == 'windBarbRender' || type == 'windBarb' || type == 'windParticle') {
						// 获取第二组数据: 风向数据
						if (Array.isArray(data.url) && data.url.length > 0 && data.url[1]) {
							this.resolve(data.url[1], data.code[1], func, d2 => {
								data.data2 = d2
								// 绘制风场
								let layer = aggregater[type]()
								this.buildMapLayer(layer)
							})
						}
					}
				})
				return
			}
		},
		// 点位图层
		buildMarkerLayer() {
			const { data, ...params } = this.markerDatas
			if (!this.markerLayer) {
				this.markerLayer = new Marker(data, this.map, params)
				this.markerLayer.build()
			} else {
				this.markerLayer.update(data, params)
			}
		},

		// 图层添加
		buildMapLayer(res) {
			if (Array.isArray(res)) {
				res.forEach(item => {
					this.map.addLayer(item.layer)
					this.layers.push({
						name: item.name,
						layer: item.layer
					})
				})
			} else {
				this.map.addLayer(res.layer)
				this.layers.push({
					name: res.name,
					layer: res.layer
				})
			}
		},
		initGeoLayer() {
			this.geojsonLayer.forEach(layer => {
				this.map.removeLayer(layer)
			})
			this.geojsonLayer = []
			//如果传进来的geoJsonOptions是个数组
			if (Array.isArray(this.geoJsonOptions)) {
				this.geoJsonOptions.forEach(item => {
					this.buildGeojsonLayer(item)
				})
			} else if (this.geoJsonOptions && this.geoJsonOptions.geoJson.length > 0) {
				this.buildGeojsonLayer(this.geoJsonOptions)
			}
		},
		buildGeojsonLayer(geoJsonOptions) {
			// console.log('geoJsonOptions', geoJsonOptions)
			const index = geoJsonOptions.index || 1
			geoJsonOptions.geoJson.forEach(json => {
				const source = new Vector({
					features: new GeoJSON({
						featureProjection: 'EPSG:3857',
						dataProjection: 'EPSG:4326'
					}).readFeaturesFromObject(json, {
						featureProjection: 'EPSG:3857',
						dataProjection: 'EPSG:4326'
					})
				})

				const vectorLayer = new VectorLayer({
					projection: 'EPSG:4326',
					source: source,
					style: geoJsonOptions.geoJsonStyle || geojsonStyle,
					zIndex: index
				})
				this.geojsonLayer = [...this.geojsonLayer, vectorLayer]
				this.map.addLayer(vectorLayer)
			})

			//geo地图图层鼠标hover高亮设置
			if (geoJsonOptions && geoJsonOptions.hoverHighlight) {
				let defaultHighlightStyle = [
					new Style({
						stroke: new Stroke({
							color: '#6e88b9',
							width: 3
						}),
						fill: new Fill({
							color: 'rgba(24, 144, 255, 0.5)'
						})
					})
				]
				// TODO: 是否可以将事件直接加到图层上，而不是加到地图
				// TODO: 是否需要开发定制化事件响应函数
				this.geoJsonLayerHandler = this.map.on('pointermove', e => {
					this.defaultGeoJsonLayerHandler(e, defaultHighlightStyle)
				})
			} else {
				if (this.geoJsonLayerHandler) {
					this.map.un(this.geoJsonLayerHandler.type, this.geoJsonLayerHandler.listener)
				}
			}
		},
		buildImageLayer() {
			if (this.imageLayer) {
				this.map.removeLayer(this.imageLayer)
			}
			const index = this.imageOptions.index || 1
			const layer = new ImageLayer({
				source: new ImageStatic({
					url: this.imageOptions.imageUrl,
					crossOrigin: 'anonymous',
					imageExtent: transformExtent(this.imageOptions.imageBound, 'EPSG:4326', 'EPSG:3857')
				}),
				zIndex: index
			})
			this.imageLayer = layer
			this.map.addLayer(layer)
		},

		// 渲染风向图
		refreshWind: function () {
			const layerName = this.windParticleOptions.name || 'windParticle'
			this.removeOlWind(layerName)
			const index = this.windParticleOptions.index == null ? 1 : this.windParticleOptions.index
			let layer = drawWindParticle(this.windParticleOptions.data, layerName, index, this.view, this.windParticleOptions.option)
			this.buildMapLayer(layer)
		},
		stopWind() {
			// 移除粒子图层
			if (!this.map) return
			const layerName = this.windParticleOptions.name || 'windParticle'
			this.removeOlWind(layerName)
		},
		removeOlWind(layerName) {
			const windLayerIndex = this.layers.findIndex(l => l.name == layerName)
			if (windLayerIndex > -1) {
				const windLayer = this.layers[windLayerIndex]
				this.map.removeLayer(windLayer.layer)
				const renderer = windLayer.layer.getRenderer()
				if (renderer && renderer.oRender) {
					const executors = renderer.oRender.executors
					Object.keys(executors).forEach(key => {
						const wind = executors[key]
						if (wind) {
							wind.clearCanvas()
						}
					})
				}
				this.layers.splice(windLayerIndex, 1)
			}
		},
		//渲染向前轨迹线
		trajectoryRender() {
			this.trajectoryLineInstances.forEach(item => {
				item.clear()
			})
			this.trajectoryLineInstances = []

			for (let i = 0; i < this.trajectoryConfigure.length; i++) {
				this.trajectoryLineInstances = [...this.trajectoryLineInstances, new TrajectoryLine(this.map, this.trajectoryConfigure[i])]
			}
		},
		//渲染分布式流向图
		distributedRender() {
			let { data, mapJson, option } = this.distributedConfigure
			if (this.distributed) {
				this.distributed.ADLayer.clear()
			}
			this.distributed = new DistributedFlow(this.map, data, mapJson, option)
		},
		//添加popup
		addPopup({ el, coord, positioning = 'bottom-center', offset = [0, -10], zIndex = 999 }) {
			if (el && coord && coord.length == 2) {
				this.popup = new Overlay({
					element: el,
					positioning: positioning,
					stopEvent: false,
					offset: offset,
					zIndex: zIndex
				})
				this.popup.element.style.zIndex = zIndex
				el.style.display = 'block'
				this.popup.setPosition(coord)
				this.map.addOverlay(this.popup)
			} else {
				console.error('请正确传入popup配置项')
			}
		},
		removePopup() {
			this.map.removeOverlay(this.popup)
		},

		/*----------------------------------------------------------------------
      |  数据处理
      |-----------------------------------------------------------------------
      */
		// 获取图片数据
		resolve(url, code, analysisFunc, callBack) {
			const image = new Image()
			image.src = url
			image.onload = () => {
				const data = []
				const canvas = document.createElement('canvas')
				canvas.width = image.width
				canvas.height = image.height
				const ctx = canvas.getContext('2d')
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

				for (let i = 0, k = 0; i < canvas.height; i++) {
					for (let j = 0; j < canvas.width; j++, k++) {
						const r = imageData[k * 4]
						const g = imageData[k * 4 + 1]
						const b = imageData[k * 4 + 2]
						const a = imageData[k * 4 + 3]

						data[k] = analysisFunc(r, g, b, a, code)
					}
				}
				callBack(data)
			}
		},
		// 默认图片数据转换方式
		dataAnalysis(r, g, b) {
			return r * 256 * 256 + g * 256 + b
		},

		// 重置地图
		resetMap() {
			// this.initDataLayers()
			// TODO: 地图移除重新生成map对象会导致其他图层消失的bug，待处理
			// 不要重置地图不能直接把map对象重置
			document.getElementById(this.mapkey).firstChild.remove()
			this.initMap()
		},
		setMoveend(zoom, center) {
			this.map.getView().animate({
				center: center, //平移后的像素坐标转投影坐标
				duration: 300,
				zoom: zoom
			})
		},

		moveTo(option) {
			this.map.getView().animate({
				center: option.center ? transform(option.center, 'EPSG:4326', 'EPSG:3857') : null,
				//平移后的像素坐标转投影坐标
				duration: option.duration || 500,
				zoom: option.zoom || 5
			})
		},
		getLayer(feature, map) {
			const layers = map.getLayers().array_
			let overlays = this.map.getOverlays().array_
			for (let i = 0; i < layers.length; i++) {
				const source = layers[i].getSource()
				if (source instanceof Vector) {
					const features = source.getFeatures()
					if (features.length > 0) {
						for (let j = 0; j < features.length; j++) {
							if (features[j] === feature) {
								return layers[i]
							}
						}
					}
				}
			}
			for (let i = 0; i < overlays.length; i++) {
				const source = overlays[i].getSource()
				if (source instanceof Vector) {
					const features = source.getFeatures()
					if (features.length > 0) {
						for (let j = 0; j < features.length; j++) {
							if (features[j] === feature) {
								return overlays[i]
							}
						}
					}
				}
			}
			return null
		},
		defaultGeoJsonLayerHandler(e, defaultHighlightStyle) {
			let features = this.map.getFeaturesAtPixel(e.pixel, { hitTolerance: 1 })
			const styleFunc = this.geoJsonOptions.geoJsonStyle || geojsonStyle
			const index = this.geoJsonOptions.index || 1
			this.geojsonLayer.forEach(item => {
				const feature = item.getSource().getFeatures()
				let defaultStyle = styleFunc(feature[0])
				feature[0].setStyle(defaultStyle)
				item.setZIndex(index)
			})
			if (features.length > 0) {
				const style = this.geoJsonOptions.hoverHighlightStyle || defaultHighlightStyle
				features[0].setStyle(style)
				const layer = this.getLayer(features[0], this.map)
				layer.setZIndex(index + 1)
			}
		},
		/*----------------------------------------------------------------------
       | 内容导出
       |-----------------------------------------------------------------------
       */
		getMap() {
			return this.map
		},
		getView() {
			return this.view
		}
	},
	watch: {
		imageOptions() {
			this.buildImageLayer()
		},
		markerDatas: {
			deep: true,
			handler() {
				this.buildMarkerLayer()
			}
		},
		windParticleOptions() {
			if (this.windParticleOptions && this.windParticleOptions.enableWind) {
				this.refreshWind()
			} else {
				this.stopWind()
			}
		},
		externalView() {
			this.initView()
			this.map.setView(this.view)
		},
		mapOptions: {
			deep: true,
			handler() {
				this.initView()
				this.map.setView(this.view)
			}
		},
		dataLayerOption() {
			this.initDataLayers()
		},
		layerDatas() {
			this.initDataLayers()
		},
		trajectoryConfigure: {
			deep: true,
			handler() {
				this.trajectoryRender()
			}
		},
		distributedConfigure: {
			deep: true,
			handler() {
				this.distributedRender()
			}
		},
		backgroundOptions: {
			deep: true,
			handler() {
				this.initBackgroudLayer()
			}
		},
		geoJsonOptions: {
			deep: true,
			handler() {
				this.initGeoLayer()
			}
		}
	},
	mounted() {
		this.initMap()
	}
}
</script>
<style>
.timeline {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}

.box {
	float: left;
}

.ol-scale-value {
	top: 24px;
	right: 8px;
	position: absolute;
}

.ol-zoom-value {
	top: 40px;
	right: 8px;
	position: absolute;
}

.canvasMap {
	position: absolute;
	z-index: 2;
	pointer-events: none;
	top: 0;
	left: 0;
}

.ol-overlaycontainer-stopevent {
	position: absolute;
	z-index: 999999 !important;
}

.map-reverse-color {
	filter: invert(90%) hue-rotate(0deg);
}
</style>
