
/* 前后向轨迹线 */
import { Feature, Overlay } from "ol";
import * as Style from "ol/style";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Point, LineString } from "ol/geom";
import { transform } from "ol/proj";
import { merge } from 'lodash'
import './point.css'
import { unByKey } from 'ol/Observable';
import arrowIcon from '../images/arrow.svg'
import CanvasLayer from './canvas-layer'

function flatten(arr) {  //数组偏平化方法
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

/* trajectoryLine         向前轨迹线
 *  @map                  地图对象 (必填)
 *  @parameter            Object
 *     lineData           线段数据 (必填)      Array
 *     pointData          圆点数据 (必填)      Array
 *     styles             线段/圆点样式  ( 可选配置 ) Object
 *     highAltitude       线段展示的高空值
 *     overlayHtmlFun     展示圆点的信息 ( 可选配置 )  Function  外部可接收到一个坐标参数，需要返回一个html结构的字符串
 */

class TrajectoryLine {
  constructor(map, parameter = {}) {
    this.map = map //地图对象

    const defaultParams = {
      lineData: [],
      pointData: [],
      styles: {
        //线段样式
        lineColor: '#1296DB',
        lineWidth: 6,

        // 圆点样式
        pointColor: '#fff',
        pointSize: 2
      },
      highAltitude: {
        text: '',
        position: 0
      },
      setPointOverlayHtml: (e) => '<div></div>',
      setLineOverlayHtml: (e) => '<div></div>',
      animationType: 'arrow',
      arrowOption: {
        icon: arrowIcon,
        scale: 0.04,
        color: '#fff'
      },
      streamerOption: {
        fillStyle: 'rgba(255,255,255,0.8)',
        shadowColor: 'rgba(255,255,255,0.8)',
        shadowBlur: 6
      }
    }

    this.lineId = 'trajectory_line_' + Math.random()
    this.pointId = 'trajectory_point_' + Math.random()

    let params = merge(defaultParams, parameter) //合并对象

    this.index = params.index || 1
    this.styles = params.styles //线段和圆点样式

    this.lineData = params.lineData // 要绘制的线段数据
    this.highAltitude = params.highAltitude //线段展示的高空值

    this.pointData = params.pointData // 要绘制的定位点数据
    this.pointLayers = null // 点位图层
    this.lineLayer = null
    this.lastPointOverlay = null
    this.hoverOverlays = []
    this.style = null //定位点样式层
    this.radio = params.radio
    this.animationType = params.animationType // 轨迹线动画类型
    this.arrowOption = params.arrowOption
    this.streamerOption = params.streamerOption

    const RandomId = len => Math.random().toString(36).substr(3, len)
    this.overlayId = RandomId(10) // 显示圆点信息的图层id
    this.setOverlayHtml = params.setOverlayHtml // 设置圆点信息的图层结构
    this.setPointOverlayHtml = params.setPointOverlayHtml // 设置圆点信息的图层结构
    this.setLineOverlayHtml = params.setLineOverlayHtml // 设置线段信息的图层结构

    this.width = this.map.getSize()[0]
		this.height = this.map.getSize()[1]

    // 动画图层
    this.animationLayer = null
    this.animationCtx = null
    if(this.animationType === 'streamer') {
      this.animationLayer = new CanvasLayer({ map: this.map })
      this.animationCtx = this.animationLayer.canvas.getContext('2d')
      // 动画图层重绘事件
      this.animationMoveEvent = this.map.on('moveend', evt => {
        if(this.animationLayer && this.animationCtx) {
          this.animationCtx.fillStyle = 'rgba(0,0,0,.93)'
        }
      })
    }

    // 绘制轨迹线
    this.renderLine()
    this.renderPoint()
    // 地图的hover事件
    this.postrenderEvent = null
    this.pointerMoveEvent = this.map.on('pointermove', this.onMapHandle.bind(this))

    this.lineToolTipsLayer = null
    this.pointToolTipsLayer = null
    return this
  }
  //渲染路径线段
  renderLine() {
    let layer = new VectorLayer({})
    let source = new VectorSource()
    layer.setSource(source)
    layer.setZIndex(this.index)
    layer.id = this.lineId // 添加id用于重新渲染时清除旧图层
    this.map.addLayer(layer)

    let opt = this.CoordinateTransform(this.lineData)

    let feature = new Feature({
      geometry: new LineString(opt),
      name: this.lineId,
      id: this.lineId
    })
    source.addFeature(feature)

    let offset = 0.001
    const _this = this

    // 流光动画时，每次绘制重置canvas，避免上一次绘制的痕迹遗留
    if (this.animationCtx) {
      this.animationCtx.fillStyle = 'rgba(0,0,0,.93)'
    }

    let stylesFunction = function () {
      let resolution = _this.map.getView().getResolution() //分辨率:一个像素代表的距离
      let geometry = feature.getGeometry() //几何对象:空间坐标信息等
      let length = geometry.getLength() //长度:线几何对象的长度
      let radio = _this.radio || (function () {
        if(_this.animationType === 'streamer') return 1 // 流光效果时，默认一条线段只有一个动画
        let r = (30 * resolution) / length //间隔分之一 分割了多少段
        r = r < 0.002 ? 0.002 : r
        return r
      })()

      // 若箭头出现闪烁可调小此值
      let dradio = 0.05 //在EPSG:4326下可以设置dradio=10000  该值设置太小会导致拐弯处 箭头方向错误
      // 线段样式
      let styles = [
        new Style.Style({
          stroke: new Style.Stroke({
            color: _this.styles.lineColor,
            width: _this.styles.lineWidth
          })
        })
      ]
      // 添加箭头样式
      for (let i = 0; i <= 1; i += radio) {
        let fracPos = i + offset
        if (fracPos > 1) fracPos -= 1
        let location = geometry.getCoordinateAt(fracPos)
        geometry.forEachSegment(function (start, end) {
          let dx1 = end[0] - location[0]
          let dy1 = end[1] - location[1]
          let dx2 = location[0] - start[0]
          let dy2 = location[1] - start[1]
          if (dx1 != dx2 && dy1 != dy2) {
            if (Math.abs(dradio * dx1 * dy2 - dradio * dx2 * dy1) <= 0.001) {
              let dx = end[0] - start[0]
              let dy = end[1] - start[1]
              let rotation = Math.atan2(dy, dx) // 得到箭头方向角
              if (rotation) {
                // 动画效果
                const animationStyle = _this.animationType === 'streamer' ? _this.createStreamerAnimationStyle(location)
                  : _this.createArrowAnimationStyle(location, rotation)
                styles.push(animationStyle)
              }
            }
          }
        })
      }
      return styles
    }

    this.postrenderEvent = layer.on('postrender', evt => {
      feature.setStyle(stylesFunction)

      let resolution = _this.map.getView().getResolution() //分辨率:一个像素代表的距离
      let geometry = feature.getGeometry() //几何对象:空间坐标信息等
      let length = geometry.getLength() //长度:线几何对象的长度

      offset += resolution / length
      if (offset > 1) offset -= 1
    })
    this.lastPointInfo()
    this.lineLayer = layer
  }
  // 箭头动画
  createArrowAnimationStyle(location, rotation){
    return new Style.Style({
      geometry: new Point(location),
      image: new Style.Icon({
        src: this.arrowOption.icon,
        scale: this.arrowOption.scale, //0.15
        rotateWithView: false,
        color: this.arrowOption.color,
        rotation: -rotation
      })
    })
  }
  // 流光动画效果
  createStreamerAnimationStyle(location){
    return new Style.Style({
      geometry: new Point(location),
      renderer:(geometry, state) => {
        const prev = this.animationCtx.globalCompositeOperation
        this.animationCtx.globalCompositeOperation = 'destination-in'
        this.animationCtx.fillRect(0, 0, this.width, this.height)
        this.animationCtx.globalCompositeOperation = prev

        this.animationCtx.save();
        this.animationCtx.fillStyle = this.streamerOption.fillStyle;
        this.animationCtx.shadowColor = this.streamerOption.shadowColor;
        this.animationCtx.shadowBlur = this.streamerOption.shadowBlur;
        this.animationCtx.beginPath();
        this.animationCtx.arc(geometry[0], geometry[1], 3, 0, Math.PI * 2, true);
        this.animationCtx.fill();
        this.animationCtx.closePath();
        this.animationCtx.restore();
      }
    })
  }
  //最后一个点位显示高空信息
  lastPointInfo() {
    if (!this.highAltitude) return
    //创建dom元素
    const body = document.getElementsByTagName('body')[0]
    let div = document.createElement('div')
    const RandomId = len => Math.random().toString(36).substr(3, len)
    let id = '_' + RandomId(5)
    div.setAttribute('id', id)
    body.appendChild(div)

    let overlay = document.getElementById(id)
    //获取到最后一个点位的坐标
    let { position } = this.highAltitude
    let index = position == 0 ? this.lineData.length - 1 : 0
    let lastArr = this.CoordinateTransform(this.lineData[index])
    //渲染图层
    let overlayLayer = new Overlay({
      element: overlay,
      position: lastArr,
      positioning: 'center-center',
      stopEvent: false,
      zIndex: this.index
    })
    let parentDom = overlayLayer.getElement().parentNode
    parentDom.style.zIndex = -1
    this.map.addOverlay(overlayLayer)

    //样式和展示的信息
    let info = this.highAltitude
    const color = this.styles.lineColor
    const wrap = 'width: 12px;height: 12px;border-radius: 50%;'

    overlayLayer.getElement().innerHTML = ` <div style="position: relative;">
                                                    <div style="background:${color};${wrap};position: relative;">
                                                        <div class="spread_pulse spread_pulser" style="border-color:${color}"></div>
                                                        <div class="spread_pulse1 spread_pulser" style="border-color:${color}"></div>
                                                    </div>
                                                    <span style="position: absolute;left: 18px;top:-6px;color:${color};">${info.text}</span>
                                                </div>`

    this.lastPointOverlay = overlayLayer
  }
  //绘制定位点
  renderPoint() {
    //触发重新渲染时清掉旧图层
    this.pointLayers = null
    //定位点的样式
    this.style = new Style.Style({
      image: new Style.Circle({
        radius: this.styles.pointSize,
        fill: new Style.Fill({
          color: this.styles.pointColor
        }),
        stroke: new Style.Stroke({
          color: this.styles.pointColor,
          size: 1
        })
      })
    })
    //图层数据源
    this.pointLayers = this.layers()


  }
  //圆点数据源处理函数
  layers() {
    let layers = []
    for (let i = 0; i < this.pointData.length; i++) {
      let layer = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(this.CoordinateTransform(this.pointData[i])),
              id: this.pointId,
              name: this.pointId,
            })
          ]
        }),
        style: this.style,
        zIndex: this.index
      })
      layer.id = this.pointId,
      layers.push(layer)
    }

    return layers
  }
  //地图hover事件圆点展示处理函数
  onMapHandle(e) {
    // 获取地图中的图层
    let feature = this.map.forEachFeatureAtPixel(e.pixel, (f, l) => {
      return f
    })

    if (this.lineToolTipsLayer) {
      this.map.removeOverlay(this.lineToolTipsLayer)
    }
    if (this.pointToolTipsLayer) {
      this.map.removeOverlay(this.pointToolTipsLayer)
    }


    //鼠标移入到线图层
    if (feature && feature.values_.id === this.lineId) {
      let ele = document.createElement('div')
      if (this.lineToolTipsLayer) {
        this.map.removeOverlay(this.lineToolTipsLayer)
      }
      this.lineToolTipsLayer = new Overlay({
        element: ele,
        position: e.coordinate,
        positioning: 'center-right',
        stopEvent: false,
        zIndex: this.index
      })
      let coord = transform(e.coordinate, 'EPSG:3857', "EPSG:4326");
      this.lineToolTipsLayer.getElement().innerHTML = this.setLineOverlayHtml([coord[0].toFixed(6), coord[1].toFixed(6)])
      this.lineToolTipsLayer.getElement().style.cursor = 'pointer'
      this.map.addOverlay(this.lineToolTipsLayer)
    }
    //鼠标移入到线点图层
    if (feature && feature.values_.id === this.pointId) {
      let ele = document.createElement('div')
      if (this.pointToolTipsLayer) {
        this.map.removeOverlay(this.pointToolTipsLayer)
      }
      this.pointToolTipsLayer = new Overlay({
        element: ele,
        position: e.coordinate,
        positioning: 'center-right',
        stopEvent: false,
        zIndex: this.index
      })
      let coord = transform(e.coordinate, 'EPSG:3857', "EPSG:4326");
      this.pointToolTipsLayer.getElement().innerHTML = this.setPointOverlayHtml([coord[0].toFixed(6), coord[1].toFixed(6)])
      this.pointToolTipsLayer.getElement().style.cursor = 'pointer'
      this.map.addOverlay(this.pointToolTipsLayer)
    }

    //如果有传入点位数据&&鼠标移入到线图层
    if (feature && !feature.id_) {
      let pointOpt = this.CoordinateTransform(this.pointData)
      let target = feature.geometryChangeKey_.target.flatCoordinates //得到当前移入的点位
      let arr = flatten(pointOpt)
      let isHave = false //移入的坐标是否包含在当前的线段

      for (let attr of [target[0]]) {
        isHave = arr.some(val => {
          return val == attr
        })
      }

      if (this.pointLayers) {
        return
      }
      //图层数据源
      if (isHave) {
        //表示只渲染当前坐标图层的点位
        this.pointLayers = this.layers()
        this.pointLayers.forEach(ele => {
          this.map.addLayer(ele)
        })
      }
    } else {
      // 鼠标离开图层点
      // this.showOverlay()
      this.map.getTargetElement().style.cursor = ''
      if (!this.pointLayers) {
        return
      }
      for (let i = 0; i < this.pointLayers.length; i++) {
        this.pointLayers[i].getSource().clear()
        this.map.removeLayer(this.pointLayers[i])
      }
      this.hoverOverlays.forEach(item => {
        this.map.removeLayer(item)
      })
      this.pointLayers = null
    }
  }
  //鼠标划入显示圆点和信息
  showOverlay(center, coordinate) {
    let overlay = document.getElementById(this.overlayId)
    if (!overlay) {
      const body = document.getElementsByTagName('body')[0]
      let div = document.createElement('div')
      div.setAttribute('id', this.overlayId)
      body.appendChild(div)
    }
    if (!center) {
      if (overlay) {
        overlay.style.display = 'none'
      }
      return
    }
    overlay.style.display = 'block'
    //设置dom元素在地图中的位置
    let overlayLayer = new Overlay({
      element: overlay,
      position: center,
      positioning: 'center-right',
      stopEvent: false,
      zIndex: this.index
    })
    this.map.addOverlay(overlayLayer)
    //设置鼠标滑到点位展示的html内容
    const coord = transform(coordinate, 'EPSG:3857', 'EPSG:4326')
    overlayLayer.getElement().innerHTML = this.setOverlayHtml([coord[0].toFixed(6), coord[1].toFixed(6)])
    this.hoverOverlays = [...this.hoverOverlays, overlayLayer]
  }
  //清除轨迹线
  clear() {
    Array.isArray(this.pointLayers) && this.pointLayers.forEach(item => {
      this.map.removeLayer(item)
    })
    this.lineLayer && this.map.removeLayer(this.lineLayer)
    this.lastPointOverlay && this.map.removeOverlay(this.lastPointOverlay)
    // 移除动画图层
    this.animationLayer && this.animationLayer.hide() && this.map.removeOverlay(this.animationLayer)
    this.animationCtx && (this.animationCtx.fillStyle = 'rgba(0,0,0,.93)') && (this.animationCtx = null)
    unByKey(this.pointerMoveEvent)
    unByKey(this.postrenderEvent)
  }
  //判断鼠标是否移到当前点位范围，由于事件获取到的像素和渲染点位的像素值有偏差所以设定范围值确保能实时触发显示
  pointRange(arr, pixel) {
    let it = false
    let range = 2 //范围值
    arr.forEach(item => {
      let pix = this.map.getPixelFromCoordinate(item) //得到坐标在屏幕的像素值
      let pixelArr = [Math.round(pix[0]), Math.round(pix[1])] //四舍五入取整数
      let yMin = pixelArr[0] - range
      let yMax = pixelArr[0] + range
      let xMin = pixelArr[1] - range
      let xMax = pixelArr[1] + range
      if (pixel[0] >= yMin && pixel[0] <= yMax && pixel[1] >= xMin && pixel[1] <= xMax) {
        it = true
      }
    })
    return it
  }
  //对数据坐标进行统一转化的方法
  CoordinateTransform(array) {
    const projection = ['EPSG:4326', 'EPSG:3857']
    if (!Array.isArray(array)) return
    let arr = []
    array.forEach(item => {
      if (Array.isArray(item)) {
        arr.push(transform(item, projection[0], projection[1]))
      } else {
        arr = transform(array, projection[0], projection[1])
      }
    })
    return arr
  }
}
export default TrajectoryLine