// import { transform } from 'ol/proj'
// import { Point } from 'ol/geom'
// import { Overlay } from 'ol'
// import WebGLPointsLayer from 'ol/layer/WebGLPoints';
// import { GeoJSON } from 'ol/format'
// import { Vector } from 'ol/source'
// import geojsonStyle from '../geojson-style'
// import Feature from 'ol/Feature';

// // WebGL高性能点位渲染
// class WebglMarker {
//   constructor(data, map, param = {}) {
//     console.log('WebglMarker', data, map, param)
//     this._data = data
//     this._map = map
//     this._param = param
//     this.essFactor = {
//       dom: [],
//       layer: []
//     }

//     //webgl点位图层
//     this.webGLPointsLayer = null
//     this.allPointsFeatures = []
//     //点位弹出层
//     this.overlayLayer = null
//   }


//   render() {
//     this.webGLPointsLayer = new WebGLPointsLayer({
//       source: new Vector(),
//       disableHitDetection: false,
//       zIndex: 10,
//       id: 'WebGLPointsLayer',
//       style: {
//         symbol: {
//           symbolType: 'image',
//           src: require('../../../assets/images/marker.png'),
//           size: [18, 28],
//           rotateWithView: false,
//           offset: [0, 9],
//           opacity: 0.3
//         },
//       }
//     })

//     console.log('this.webGLPointsLayer', this.webGLPointsLayer)

//     this._map.addLayer(this.webGLPointsLayer);

//     Array.isArray(this._data) && this._data.forEach((marker, i) => {
//       const point = transform([marker.lng, marker.lat], 'EPSG:4326', 'EPSG:3857')
//       // 创建feature
//       let geometry = new Point(point, 'XY')
//       let feature = new Feature({
//         geometry: geometry,
//         data: marker,
//       });
//       // 设置ID
//       let id = 'text_' + marker.uniqueCode
//       feature.setId(id);
//       feature.setStyle(geojsonStyle(feature));
//       this.allPointsFeatures.push(feature);


//       // if (document.getElementById(overlayId)) return
//       // const body = document.getElementsByTagName('body')[0]
//       // const div = document.createElement('div')
//       // div.setAttribute('id', id)
//       // body.appendChild(div)
//       // const overlayEle = document.getElementById(id)
//       // if (this._param.markerIconsFunc) {
//       //   this._param.markerIconsFunc(overlayEle, marker, geometry, this._map)
//       // }
//       // this.overlayLayer = new Overlay({
//       //   id: id,
//       //   element: overlayEle,
//       //   position: geometry.flatCoordinates,
//       //   positioning: 'center-center',
//       //   stopEvent: false,
//       //   opacity: 1,
//       // })
//       // this._map.addOverlay(this.overlayLayer)

//       // const index = this._param.index || 1
//       // // 设置当前overlay的图层层级
//       // overlayEle.style.setProperty('z-index', index)
//       // overlayEle.parentNode.style.setProperty('z-index', index)

//       // // 添加点位事件
//       // if (this._param.events && this._param.events.length > 0) {
//       //   this._param.events.forEach(event => {
//       //     overlayEle.addEventListener(event.type, () => {
//       //       event.listener(marker, geometry)
//       //     })
//       //   })
//       // }
//     })
//     // 批量添加feature
//     this.webGLPointsLayer.getSource().addFeatures(this.allPointsFeatures);


//     // this.addMarkerEvents()
//   }

//   // 图标弹出层
//   addMarkerEvents() {
//     this._map.on('pointermove', e => {
//       //鼠标在feature范围之上
//       const feature = this._map.forEachFeatureAtPixel(e.pixel, feature => feature);
//       // console.log('鼠标移动', feature)
//       this.overlayLayer && this._map.removeOverlay(this.overlayLayer)
//       if (feature) {

//       }
//     })
//   }



//   clear() {
//     this.webGLPointsLayer.getSource()
//       .getFeatures()
//       .forEach((feature) => {
//         this.webGLPointsLayer.getSource().removeFeature(feature);
//       });
//     this.allPointsFeatures = []
//     this.map.removeLayer(this.webGLPointsLayer);
//   }


//   build() {
//     this.remove()

//     let datas = this._data || []
//     if (datas.length < 0) return

//     const index = this._param.index || 1
//     datas.forEach(marker => {
//       // 遍历点位数据，构建地图上的点
//       const point = transform([marker.lng, marker.lat], 'EPSG:4326', 'EPSG:3857')

//       // 点位信息中必须包含唯一编码uniqueCode
//       const id = 'text_' + marker.uniqueCode
//       const lay = document.getElementById(id)
//       const geometry = new Point(point, 'XY')

//       if (lay) {
//         // 通过回调函数构建点位内容
//         if (this._param.markerIconsFunc) {
//           this._param.markerIconsFunc(lay, marker, geometry, this._map)
//         }
//         return
//       }

//       const body = document.getElementsByTagName('body')[0]
//       const div = document.createElement('div')
//       div.setAttribute('id', id)
//       body.appendChild(div)
//       const overlay = document.getElementById(id)

//       const overlayLayer = new Overlay({
//         id: marker.uniqueCode,
//         element: overlay,
//         position: geometry.flatCoordinates,
//         positioning: 'top-center',
//         stopEvent: false,
//         opacity: 1,
//       })

//       // 通过回调函数构建点位内容
//       if (this._param.markerIconsFunc) {
//         this._param.markerIconsFunc(overlay, marker, geometry, this._map)
//         // 地图缩放重新渲染点位
//         const event = this._map.on('moveend', () => {
//           this._param.markerIconsFunc(overlay, marker, geometry, this._map)
//         })

//         // 点位事件
//         if (this._param.events && this._param.events.length > 0) {
//           this._param.events.forEach(event => {
//             overlay.addEventListener(event.type, () => {
//               const args = arguments
//               event.listener(marker, geometry, args)
//             })
//           })
//         }

//         const idList = this.essFactor.dom
//         if (!idList.includes(id)) {
//           this.essFactor.dom.push(id)
//           this.essFactor.layer.push({
//             layer: overlayLayer,
//             event: event
//           })
//         }
//         this._map.addOverlay(overlayLayer)
//         // 设置当前overlay的图层层级
//         overlay.style.setProperty('z-index', index)
//         overlay.parentNode.style.setProperty('z-index', index)
//       }
//     })

//     // 降低显示层级
//     const overlayContainer = document.getElementsByClassName('ol-overlaycontainer')
//     if (overlayContainer) {
//       for (const item of overlayContainer) {
//         item.style.setProperty('z-index', index, 'important')
//       }
//     }



//   }

//   update(data, param = {}) {
//     this._data = data
//     this._param = param
//     this.build()
//   }

//   remove() {
//     const { dom, layer } = this.essFactor
//     if (this._map) {
//       dom.forEach((ele, i) => {
//         const lay = document.getElementById(ele)
//         this._map.removeOverlay(layer[i].layer)
//         this._map.un(layer[i].event.type, layer[i].event.listener)
//         lay && lay.remove()
//       })
//       this.essFactor.dom = []
//       this.essFactor.layer = []
//     }
//     // 降低显示层级
//     const overlayContainer = document.getElementsByClassName('ol-overlaycontainer')
//     if (overlayContainer) {
//       for (const item of overlayContainer) {
//         item.style.setProperty('z-index', 0)
//       }
//     }
//   }
// }

// export default WebglMarker
