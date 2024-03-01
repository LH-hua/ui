### 点位图层

::: demo

```html
<div class="marker-layer" style="height:626px">
  <s-map
    ref="map"
    mapkey="map4"
    :map-options="mapOptions"
    :background-options="backgroudOptions"
    :marker-datas="markers"
  ></s-map>
  <s-legend :legend-id="'marker'" :gradient="false" :legend="legend"></s-legend>
  <div ref="popup" class="map-pop">
      <div class="left-panel-close pop-close" @click="onClosePopup">
          x
      </div>
      <div class="map-pop-title">
        <p>{{ selectedMarker.stationName }}</p>
        <span>更新时间：{{ selectedMarker.routineQueryTime }}</span>
      </div>
      <div class="pop-info">
        <ul>
          <li>
            <strong>区域：</strong>
            {{ selectedMarker.areaName }}
          </li>
          <li>
            <strong>经度：</strong>
            {{ selectedMarker.stationLng }}
          </li>
          <li>
            <strong>纬度：</strong>
            {{ selectedMarker.stationLat }}
          </li>
        </ul>
        <ul>
          <li>
            <strong>质量等级：</strong>
            {{ selectedMarker.qualityVal }}
          </li>
        </ul>
      </div>
    </div>
</div>
<script>
import { Overlay } from 'ol'
export default {
  data() {
    return {
      mapOptions: {
        extent: [73.502355, 18.211691, 135.09567, 53.563269],
        center: [105.057161, 37.968493],
        zoom: 4.5,
        maxZoom: 11,
        minZoom: 4
      },
      backgroudOptions: [
        {
          type: 'customImage',
          sourceUrl: 'http://10.10.204.111:8080/geoserver/wms',
          sourceLayer: 'StandardMap',
          index: 0
        },
        {
          type: 'customImage',
          sourceUrl: 'http://10.10.204.111:8080/geoserver/wms',
          sourceLayer: 'StandardMapPoint',
          index: 999
        }
      ],
      datas: require('./assets/marker-layers/data.json'),
      markers: {
        index: 1,
        data: [],
        markerIconsFunc: this.markerStyle,
        events: [
          {
            type: 'click',
            listener: this.onAddMarkerPopup
          }
        ]
      },
      loadingPopup: false,
      popup: null,
      selectedMarker:{
        stationName: '',
        routineQueryTime: '',
        areaName: '',
        stationLng: '',
        stationLat: '',
        itemName: '',
        monValue: '',
        qualityVal: '',
        primaryPollutantVal: ''
      },
      legend: {
          name: 'AQI',
          legends: [
            {
              labelId: 1,
              labelName: '优',
              colorLevel: 'rgb(0, 228, 0)'
            },
            {
              labelId: 2,
              labelName: '良',
              colorLevel: 'rgb(255, 225, 0)'
            },
            {
              labelId: 3,
              labelName: '轻度',
              colorLevel: 'rgb(255, 126, 0)'
            },
            {
              labelId: 4,
              labelName: '中度',
              colorLevel: 'rgb(255, 0, 0)'
            },
            {
              labelId: 5,
              labelName: '重度',
              colorLevel: 'rgb(153, 0, 76)'
            },
            {
              labelId: 6,
              labelName: '严重',
              colorLevel: 'rgb(126, 0, 35)'
            }
          ]
        }
    }
  },
  methods: {
      markerStyle(container, marker, geometry, map) {
          const extent = map.getView().calculateExtent(map.getSize())
          const coordinates = geometry.flatCoordinates
          if (
            coordinates[0] >= extent[0] &&
            coordinates[0] <= extent[2] &&
            coordinates[1] >= extent[1] &&
            coordinates[1] <= extent[3]
          ) {
            const zoom = map.getView().getZoom()
            const value = marker.value
            const pollutant = this.routineItems.filter(r => r.key == 'aqi')[0]
            this.selectedMarker.ItemName = pollutant.name

            let result = pollutant.level.findIndex(o => o >= value)
            result = result < 0 ? 0 : result
            const cls = `t-bg-${result}`
            const brc = `t-br-${result}`
            if (zoom > 7) {
              container.innerHTML = `
              <div>
                <div class="marker_marker_1AA ${cls}" style="color:black;font-size:16px;">
                <div class="marker_arrow_18U ${brc}"></div>${value}</div>
                <div style="margin-top: 6px; padding: auto 10px;height:22px;text-align:center;line-height:22px;border: 1px solid #ddd;border-radius: 2px; background: rgba(255,255,255,0.8)">
                  ${marker.stationName}
                  <i style="color:red;font-style:normal;">${marker.controlLevelText}<i>
                </div>
              </div>`
            } else {
              container.innerHTML = `
            <div>
                <div class="marker_marker_1AA_circle ${cls}" style="color:black;font-size:16px;">
              </div>`
            }
          } else {
            container.innerHTML = ''
          }
      },
      //向marker的click事件添加popup
      onAddMarkerPopup(marker, geometry) {
          const pollutant = this.routineItems.filter(r => r.key == 'aqi')[0]
          let index = pollutant.level.findIndex(o => o >= marker.value)
          index = index < 0 ? 0 : index - 1
          let quality = this.legend.legends[index].labelName
          quality = index > 1 ? quality + '污染' : quality
          this.selectedMarker =  {
              stationName: marker.stationName,
              routineQueryTime: '2022-10-10 10:00:00',
              areaName: marker.areaName,
              stationLng: marker.lng,
              stationLat: marker.lat,
              itemName: 1,
              monValue: marker.value,
              qualityVal: quality
            }
            const coordinates = geometry.getCoordinates()
            this.$refs.map.addPopup({
              el:this.$refs.popup,
              coord:coordinates
            })
      },
      //移除popup
      onClosePopup() {
        this.$refs.map.removePopup()
      },
      getPollutantCodeInfos(datetype) {
            const o3Name = datetype && datetype === 'hour' ? 'O₃' : 'O₃_8h'
            const o3Key = datetype && datetype === 'hour' ? 'a35598' : 'a35599'
            const o3Level = datetype && datetype === 'hour' ? [-1, 160, 200, 300, 400, 800, 1000] : [-1, 100, 160, 215, 265, 800, 1000]

            return [
              { name: 'AQI', key: 'aqi', level: [-1, 50, 100, 150, 200, 300, 500] },
              { name: 'PM₂.₅', key: 'a34004', level: [-1, 35, 75, 115, 150, 250, 350], unit: 'μg/m³' },
              { name: 'PM₁₀', key: 'a34002', level: [-1, 50, 150, 250, 350, 420, 500], unit: 'μg/m³' },
              { name: o3Name, key: o3Key, level: o3Level, unit: 'μg/m³' },
              { name: 'NO₂', key: 'a21004', level: [-1, 100, 200, 700, 1200, 2340, 3090], unit: 'μg/m³' },
              { name: 'SO₂', key: 'a21026', level: [-1, 150, 500, 650, 800, 1600, 2100], unit: 'μg/m³' },
              { name: 'CO', key: 'a21005', level: [-1, 5, 10, 35, 60, 90, 120], unit: 'mg/m³' }
            ]
        }
    },
    computed: {
        routineItems() {
            return this.getPollutantCodeInfos('hour')
        }
    },
    mounted(){
      const aqis = this.datas.filter(d => d.PollutantCode == 'aqi')
      this.markers.data = aqis.map(s =>  {
          return {
            lng: s.StationLng,
            lat: s.StationLat,
            value: s.MonValue,
            uniqueCode: s.UniqueCode,
            areaName: s.AreaName,
            stationName: s.StationName,
            controlLevelText: s.ControlLevelText
          }
      })
    }
}
</script>
<style lang="less">
.marker-layer {
  position: relative;
  .legendRegion {
    .legend {
      right: 15px;
      bottom: 15px;
    }
  }
}
.map-pop{
  display:none;
  position: relative;
  background:#fff;
  padding:10px;
  z-index: 9999;

  &::after{
    position:absolute;
    bottom:-10px;
    left:50%;
    transform:translateX(-50%);
    content:'';
    width: 10px;
    height: 10px;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: #fff transparent transparent transparent;
  }
  .pop-close{
    position:absolute;
    right:10px;
    top:2px;
    font-size:20px;
    cursor:pointer
  }
}
.marker_marker_1AA {
  width: 36px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border-radius: 4px;
  margin: auto;
  z-index:1

  .marker_arrow_18U {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    position: absolute;
    margin-left: -6px;
    left: 50%;
    top: 24px;
    z-index:1
  }
  .t-br-0 {
    border-top-color: #7e8477;
  }
  .t-br-1 {
    border-top-color: #00e400;
  }
  .t-br-2 {
    border-top-color: #ffe100;
  }

  .t-br-3 {
    border-top-color: #ff7e00;
  }

  .t-br-4 {
    border-top-color: #ff0000;
  }

  .t-br-5 {
    border-top-color: #99004c;
  }

  .t-br-6 {
    border-top-color: #99004c;
  }
}

.marker_marker_1AA_circle {
  border-radius: 50%;
  width: 14px;
  height: 14px;
  margin: auto;
  border: 2px solid #fff;
  box-shadow: 1px 1px 2px #666;
  z-index:1
}

.t-bg-0 {
  background-color: #7e8477;
}
.t-bg-1 {
  background-color: #00e400;
}
.t-bg-2 {
  background-color: #ffe100;
}

.t-bg-3 {
  background-color: #ff7e00;
}

.t-bg-4 {
  background-color: #ff0000;
}

.t-bg-5 {
  background-color: #99004c;
}

.t-bg-6 {
  background-color: #7e0023;
}
</style>
```

:::

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| markerDatas | 点位配置 | Object | — | — |

### markerDatas

| 参数 | 说明 | 类型   | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| index | 图层层级 | Number | — | — |
| data  | 点位数据 | Array  | | — |
| markerIconsFunc | 点位图标生成回调函数 | function(div, marker, geometry, map) | | |
| events | 点位图标事件 | Array | | |

### markerDatas.data

| 参数  | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| lng | 点位经度 | Number | — | — | |
| lat | 点位纬度 | Number  | | — | |
| uniqueCode | 点位唯一码 | String | | | 用于生成点位图标的id，不可重复 |

### markerDatas.events

| 参数  | 说明 | 类型   | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| type | 事件类型 | String | — | — | |
| listener | 回调函数 | function | | — | |

### 添加popup方法

`this.$refs.map.addPopup(option)`
| 参数  | 说明 | 类型   | 可选值 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| el | popup的dom元素 | String | — | — | （必填）|
| coord | 坐标 | Array | | — |（必填） |
| positioning | 位置 | String |'bottom-center' | — |（非必填） |
| offset | popup偏移 | Array |[0, -10]| — | （非必填）|
| zIndex | popup层级 | Number |999 | — | （非必填）|
### 移除popup方法

`this.$refs.map.removePopup()`
