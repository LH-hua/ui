import { Feature } from 'ol'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector } from 'ol/source'
import { Circle } from 'ol/geom'
import { transform, METERS_PER_UNIT } from 'ol/proj'
import { getDistance } from 'ol/sphere'
/*
    @map      地图对象
    @center   中心点坐标   Array
    @radiu    半径        Number
*/
class DrawCircleInMeter {

    constructor() {
        this.feature = null
        this.layerID = 'GIRCLE'
    }

    render(map, center, radius) {
        const view = map.getView()
        const projection = view.getProjection()
        const resolutionAtEquator = view.getResolution()

        const _center = center // 中心点

        const pointResolution = projection.getPointResolutionFunc_(resolutionAtEquator, _center)
        const resolutionFactor = resolutionAtEquator / pointResolution
        // 半径以米为单位
        const _radius = (radius / METERS_PER_UNIT.m) * resolutionFactor

        const point = transform(_center, 'EPSG:4326', 'EPSG:3857')
        const circle = new Circle(point, _radius)
        const circleFeature = new Feature(circle)

        this.feature = circleFeature
        this._addLayer(circleFeature,map)

    }
    // 判断圆形内部是否存在当前坐标
    isIntersects(coordinate){
        if(!coordinate || !this.feature) return
        const _coordinate = transform(coordinate, 'EPSG:4326', 'EPSG:3857')
        const feature = this.feature

        const _is = feature.getGeometry().intersectsCoordinate(_coordinate)

        return _is
    }
    // 根据经纬度换算距离值(米)
    calcDistance(coordinate,site){
        let distance = 0
        // const _coordinate = transform(coordinate, 'EPSG:4326', 'EPSG:3857')
        // const _site = transform(site, 'EPSG:4326', 'EPSG:3857')

        distance += getDistance(coordinate,site)
        return distance
    }

    _addLayer(feature,map){
        this._clear(map)
        const _feature = feature
        const _map = map

        const vectorSource = new Vector({ projection: 'EPSG:4326' })
        vectorSource.addFeature(_feature)
        const vectorLayer = new VectorLayer({
            source: vectorSource
        })
        vectorLayer.id = this.layerID
        const layersArray = _map.getLayers()
		layersArray.insertAt(2, vectorLayer)
    }

    _clear(map){
        const layers = map.getLayers().array_
        const id = this.layerID
        for (let i = 0; i < layers.length; i++) {
            const element = layers[i]
            if(element.id == id){
                map.removeLayer(element)
            }
        }
    }

}
export default DrawCircleInMeter