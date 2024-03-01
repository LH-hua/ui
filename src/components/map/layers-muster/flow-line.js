import { Image as ImageLayer } from 'ol/layer'
import { ImageCanvas } from 'ol/source'
import { fromLonLat } from 'ol/proj'

// 流动线效果

function getPointList(from, to) {
  let points = [[from[0], from[1]], [to[0], to[1]]];
  let ex = points[1][0];
  let ey = points[1][1];
  points[3] = [ex, ey];
  points[1] = getOffsetPoint(points[0], points[3]);
  points[2] = getOffsetPoint(points[3], points[0]);
  points = smoothSpline(points, false);
  // 修正最后一点在插值产生的偏移  
  points[points.length - 1] = [ex, ey];
  return points;
};

function getOffsetPoint(start, end) {
  var distance = getDistance(start, end) / 3; // 除以 3？  
  var angle, dX, dY;
  var mp = [start[0], start[1]];
  var deltaAngle = -0.2; // 偏移 0.2 弧度  
  if (start[0] != end[0] && start[1] != end[1]) {
    // 斜率存在  
    var k = (end[1] - start[1]) / (end[0] - start[0]);
    angle = Math.atan(k);
  } else if (start[0] == end[0]) {
    // 垂直线  
    angle = (start[1] <= end[1] ? 1 : -1) * Math.PI / 2;
  } else {
    // 水平线  
    angle = 0;
  }
  if (start[0] <= end[0]) {
    angle -= deltaAngle;
    dX = Math.round(Math.cos(angle) * distance);
    dY = Math.round(Math.sin(angle) * distance);
    mp[0] += dX;
    mp[1] += dY;
  } else {
    angle += deltaAngle;
    dX = Math.round(Math.cos(angle) * distance);
    dY = Math.round(Math.sin(angle) * distance);
    mp[0] -= dX;
    mp[1] -= dY;
  }
  return mp;
};

function smoothSpline(points, isLoop) {
  var len = points.length;
  var ret = [];
  var distance = 0;
  for (var i = 1; i < len; i++) {
    distance += getDistance(points[i - 1], points[i]);
  }
  var segs = distance / 2;
  segs = segs < len ? len : segs;
  for (var i = 0; i < segs; i++) {
    var pos = i / (segs - 1) * (isLoop ? len : len - 1);
    var idx = Math.floor(pos);
    var w = pos - idx;
    var p0;
    var p1 = points[idx % len];
    var p2;
    var p3;
    if (!isLoop) {
      p0 = points[idx === 0 ? idx : idx - 1];
      p2 = points[idx > len - 2 ? len - 1 : idx + 1];
      p3 = points[idx > len - 3 ? len - 1 : idx + 2];
    } else {
      p0 = points[(idx - 1 + len) % len];
      p2 = points[(idx + 1) % len];
      p3 = points[(idx + 2) % len];
    }
    var w2 = w * w;
    var w3 = w * w2;

    ret.push([interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
  }
  return ret;
};

function interpolate(p0, p1, p2, p3, t, t2, t3) {
  var v0 = (p2 - p0) * 0.5;
  var v1 = (p3 - p1) * 0.5;
  return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
};

function getDistance(p1, p2) {
  return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
};

export default class flowLineRender {
  constructor(data, map) {
    // console.log('data', data)
    // 经纬度转换到地图坐标系格式
    this.data = data.lineData
    this.map = map;
    this.allPointLineData = []
    this.animationCtx = null
    this.lineCtx = null
    this.canvasSize = []
    this.i = 0
    this.id = Math.random()

    // 流动线速度间隔，值越大，速度越慢
    this.speedIntervel = data.speedIntervel || 16 //ms  
    this.lineWidth = data.lineWidth || 5
    this.lineColor = data.lineColor || "#ffd17a"
    this.flowLineWidth = data.flowLineWidth || 5 // 线宽
    this.flowLineColor = data.flowLineColor || "#ffffda"  //线颜色
    this.flowLineTrail = data.flowLineTrail || 0.98  // 线尾部拖动
    this.isCut = data.isCut || false //是否切分
    let visibleFun = (zoom) => zoom > 5
    let fontSizeFun = (zoom) => {
      return 14
    }
    this.index = data.index || 1
    if (data.tooltip) {
      this.tooltip = {
        fontSize: data.tooltip.fontSize || fontSizeFun,
        fontColor: data.tooltip.fontColor || "#fff",
        text: data.tooltip.text || '',
        backgroundColor: data.tooltip.backgroundColor || "rgba(0,0,0,0.5)",
        visible: visibleFun || data.tooltip.visible
      }
    }


    this.createLayers()
    this.render()

    return this.layers
  }

  // 切分
  cutLine(lineData) {
    let allPointLineData = []
    lineData.forEach((item, index) => {
      if (!lineData[index + 1]) return
      let temp = getPointList(lineData[index], lineData[index + 1])
      allPointLineData = [...allPointLineData, ...temp]
    })
    allPointLineData.push(lineData[lineData.length - 1])
    return allPointLineData
  }

  createLayers() {
    const self = this
    const source = new ImageCanvas({
      canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
        // 初始化canvas
        let canvas = document.createElement('canvas')
        canvas.width = size[0]
        canvas.height = size[1]
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        let ctx = canvas.getContext('2d')
        self.lineCtx = ctx
        ctx.scale(pixelRatio, pixelRatio)

        //转换到地图的坐标系
        let lineData = this.data.map(item => {
          let point = fromLonLat(item)
          let pixel = this.map.getPixelFromCoordinate(point)
          return pixel
        });

        //是否切分
        if (self.isCut) {
          self.allPointLineData = self.cutLine(lineData)
        } else {
          self.allPointLineData = lineData
        }

        // 添加线
        self.allPointLineData.forEach((item, index) => {
          if (!self.allPointLineData[index + 1]) return
          ctx.beginPath();
          ctx.strokeStyle = self.lineColor;
          ctx.lineWidth = self.lineWidth;

          ctx.moveTo(self.allPointLineData[index][0], self.allPointLineData[index][1]);
          ctx.lineTo(self.allPointLineData[index + 1][0], self.allPointLineData[index + 1][1]);
          ctx.stroke();
        })

        // 添加标签
        self.addTooltip()

        return canvas
      },
      ratio: 1
    })

    const sourceDynamic = new ImageCanvas({
      canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
        let canvas = document.createElement('canvas')
        self.canvasSize = size
        canvas.width = size[0]
        canvas.height = size[1]
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        let ctx = canvas.getContext('2d')
        ctx.scale(pixelRatio, pixelRatio)
        self.animationCtx = ctx


        return canvas
      },
      ratio: 1
    })

    let imageVector = new ImageLayer({
      source: source,
      zIndex: this.index
    })
    let imageVector2 = new ImageLayer({
      source: sourceDynamic,
      zIndex: this.index
    })

    // 保存当前图层
    this.layers = [
      {
        name: 'flow-line',
        layer: imageVector,
        index: this.index
      },
      {
        name: 'flow-line-dy',
        layer: imageVector2,
        index: this.index
      }
    ]
  }

  addTooltip() {
    let ctx = this.lineCtx
    let self = this
    // 添加标签
    let centerPointer = self.allPointLineData[Math.ceil(self.allPointLineData.length / 2)]
    let text = self.tooltip.text
    let isShowText = false
    let zoom = self.map.getView().getZoom()

    if (typeof (self.tooltip.visible) === 'function') {
      isShowText = self.tooltip.visible(zoom) || false
    } else {
      isShowText = self.tooltip.visible
    }

    if (text && isShowText) {
      let fontSize = 14

      if (typeof (self.tooltip.fontSize) === 'function') {
        fontSize = self.tooltip.fontSize(zoom)
      } else {
        fontSize = self.tooltip.fontSize
      }

      // console.log('字体变化',zoom,fontSize)
      ctx.font = `${fontSize}px Microsoft YaHei`;
      ctx.fillStyle = self.tooltip.backgroundColor;
      const { width } = ctx.measureText(text);
      ctx.fillRect(centerPointer[0] - width / 2, centerPointer[1], width + 8, fontSize + 6);
      ctx.fillStyle = self.tooltip.fontColor;
      ctx.textBaseline = 'top';
      ctx.fillText(text, centerPointer[0] - (width / 2) + 4, centerPointer[1] + 4)
    }
  }

  render() {
    const self = this
    function draw() {
      self.animationCtx.strokeStyle = self.flowLineColor;//设置线条颜色
      self.animationCtx.lineWidth = self.flowLineWidth;//设置线条颜色

      self.animationCtx.fillStyle = `rgba(8, 15, 219, ${self.flowLineTrail})`;//设置填充区域颜色为白色，透明度0.7，用于将区域渐变为透明
      if (self.i === self.allPointLineData.length - 1) self.i = 0

      //对区域内图像进行透明化渐变
      self.animationCtx.globalCompositeOperation = "destination-in";// 在新绘制的区域中显示原图像。只有新绘制的区域内的原图像部分会被显示，新区域是透明的。
      self.animationCtx.fillRect(0, 0, self.canvasSize[0], self.canvasSize[1]);// 填充区域，将目标图像逐渐透明化
      self.animationCtx.globalCompositeOperation = "source-over";

      //绘制直线
      self.animationCtx.beginPath();

      //上一个点
      self.animationCtx.moveTo(self.allPointLineData[self.i][0], self.allPointLineData[self.i][1]);
      self.i++
      //下一个点
      self.animationCtx.lineTo(self.allPointLineData[self.i][0], self.allPointLineData[self.i][1]);
      self.animationCtx.stroke();

    }

    setInterval(() => {
      draw()
      this.map.render()
    }, self.speedIntervel);
  }

}


