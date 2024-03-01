import 'ol/ol.css'
import { Feature } from 'ol'
import { Fill, Stroke, Style } from 'ol/style'
import { Draw, Modify, Snap } from 'ol/interaction'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { transform } from 'ol/proj'
import { LineString } from 'ol/geom'

class DrawLine {
    constructor() {
        this.map = null
        this.layer = null

        this.draw = null
        this.snap = null
    }
    /*  用户自定义绘制线条
     *  @map 地图对象
     *  @callback  Function  绘制结束触发函数
     */
    render(map,callback) {
        this.map = map
        this.clearLayer()
        this.clearEvent()
        const source = new VectorSource()
        this.layer = new VectorLayer({
            source,
            style: this._style()
        })
        this.map.addLayer(this.layer)
        const modify = new Modify({ source })
        this.map.addInteraction(modify)

        this.addInteractions(source,callback)
    }

    addInteractions(source,callback) {
        this.draw = new Draw({
            source,
            type: 'LineString',
            maxPoints: 2
        })
        this.map.addInteraction(this.draw)
        this.snap = new Snap({ source })
        this.map.addInteraction(this.snap)

        // 绘制结束事件
        this.draw.on('drawend', (e) => {

            const arr = e.target.sketchCoords_
            const coords = arr.map(item=>transform(item, 'EPSG:3857','EPSG:4326' ))
            const _px = e.target.downPx_

            if(callback && typeof callback=='function'){
                callback({ coords, _px })
            }
            this.clearEvent()
        })
    }
    // 线条样式
    _style(){
        const style = new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 2,
            })
        })
        return style
    }
    // 清除图层
    clearLayer(){
        this.layer && this.map.removeLayer(this.layer)
    }
    // 清除绘制交互
    clearEvent(){
        if(this.draw || this.snap){
            this.map.removeInteraction(this.draw)
            this.map.removeInteraction(this.snap)
        }
    }

    // 根据坐标绘制线条
    coordinateToLine(map,coordinate){
        this.map = map
        this.clearLayer()
        const opt = coordinate.map(item=>transform(item, 'EPSG:4326','EPSG:3857' ))

        const source = new VectorSource()
        const feature = new Feature({
            geometry: new LineString(opt),
            name:'coordinateToLine'
        })
        source.addFeature(feature)

        this.layer = new VectorLayer({ source,style: this._style() })
        this.map.addLayer(this.layer)
    }
    // 根据坐标获取像素
    getPixel(coordinate){
        const opt = transform(coordinate, 'EPSG:4326','EPSG:3857' )
        const _px = this.map.getPixelFromCoordinate(opt)
        return _px
    }

}

export default DrawLine
