import { transform } from 'ol/proj'
import { Point } from 'ol/geom'
import { Overlay } from 'ol'

class Marker {
	constructor(data, map, param = {}) {
		this._data = data
		this._map = map
		this._param = param
		this.essFactor = {
			dom: [],
			layer: []
		}
	}

	build() {
		this.remove()

		let datas = this._data || []
		if (datas.length < 0) return

		const index = this._param.index || 1
		datas.forEach(marker => {
			// 遍历点位数据，构建地图上的点
			const point = transform([marker.lng, marker.lat], 'EPSG:4326', 'EPSG:3857')

			// 点位信息中必须包含唯一编码uniqueCode
			const id = 'text_' + marker.uniqueCode
			const lay = document.getElementById(id)
			const geometry = new Point(point, 'XY')

			if (lay) {
				// 通过回调函数构建点位内容
				if (this._param.markerIconsFunc) {
					this._param.markerIconsFunc(lay, marker, geometry, this._map)
				}
				return
			}

			const body = document.getElementsByTagName('body')[0]
			const div = document.createElement('div')
			div.setAttribute('id', id)
			body.appendChild(div)
			const overlay = document.getElementById(id)

			const overlayLayer = new Overlay({
        id: marker.uniqueCode,
				element: overlay,
				position: geometry.flatCoordinates,
				positioning: 'top-center',
				stopEvent: false,
				opacity: 1,
			})

			// 通过回调函数构建点位内容
			if (this._param.markerIconsFunc) {
				this._param.markerIconsFunc(overlay, marker, geometry, this._map)
				// 地图缩放重新渲染点位
				const event = this._map.on('moveend', () => {
					this._param.markerIconsFunc(overlay, marker, geometry, this._map)
				})

				// 点位事件
				if (this._param.events && this._param.events.length > 0) {
					this._param.events.forEach(event => {
						overlay.addEventListener(event.type, () => {
							const args = arguments
							event.listener(marker, geometry, args)
						})
					})
				}

				const idList = this.essFactor.dom
				if (!idList.includes(id)) {
					this.essFactor.dom.push(id)
					this.essFactor.layer.push({
						layer: overlayLayer,
						event: event
					})
				}
				this._map.addOverlay(overlayLayer)
				// 设置当前overlay的图层层级
				overlay.style.setProperty('z-index', index)
				overlay.parentNode.style.setProperty('z-index', index)
			}
		})

		// 降低显示层级
		const overlayContainer = document.getElementsByClassName('ol-overlaycontainer')
		if (overlayContainer) {
			for (const item of overlayContainer) {
				item.style.setProperty('z-index', index, 'important')
			}
		}
	}

	update(data, param = {}) {
		this._data = data
		this._param = param
		this.build()
	}

	remove() {
		const { dom, layer } = this.essFactor
		if (this._map) {
			dom.forEach((ele, i) => {
				const lay = document.getElementById(ele)
				this._map.removeOverlay(layer[i].layer)
				this._map.un(layer[i].event.type, layer[i].event.listener)
				lay && lay.remove()
			})
			this.essFactor.dom = []
			this.essFactor.layer = []
		}
		// 降低显示层级
		const overlayContainer = document.getElementsByClassName('ol-overlaycontainer')
		if (overlayContainer) {
			for (const item of overlayContainer) {
				item.style.setProperty('z-index', 0)
			}
		}
	}
}

export default Marker
