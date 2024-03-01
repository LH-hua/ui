function CanvasLayer(options) {
	this.options = options || {}
	this.paneName = this.options.paneName || 'labelPane'
	this.zIndex = this.options.zIndex || 0
	this._map = options.map
	this._lastDrawTime = null
	this.show()
}

CanvasLayer.prototype.initialize = function () {
	const canvas = (this.canvas = document.createElement('canvas'))
	const ctx = (this.ctx = this.canvas.getContext('2d'))
	canvas.style.cssText = 'position:absolute;' + 'left:0;' + 'top:0;' + 'z-index:' + this.zIndex + ';'
	this.adjustSize()
	this.adjustRatio(ctx)
	this._map.getViewport().appendChild(canvas)
	const that = this
	this._map.getView().on('propertychange', function () {
		canvas.style.display = 'none'
	})
	this._map.on('moveend', function () {
		canvas.style.display = ''
		that.adjustSize()
		that._draw()
	})
	return this.canvas
}

CanvasLayer.prototype.adjustSize = function () {
	const size = this._map.getSize()
	const canvas = this.canvas
	canvas.width = size[0]
	canvas.height = size[1]
	canvas.style.width = canvas.width + 'px'
	canvas.style.height = canvas.height + 'px'
}

CanvasLayer.prototype.adjustRatio = function (ctx) {
	const backingStore =
		ctx.backingStorePixelRatio ||
		ctx.webkitBackingStorePixelRatio ||
		ctx.mozBackingStorePixelRatio ||
		ctx.msBackingStorePixelRatio ||
		ctx.oBackingStorePixelRatio ||
		ctx.backingStorePixelRatio ||
		1
	const pixelRatio = (window.devicePixelRatio || 1) / backingStore
	const canvasWidth = ctx.canvas.width
	const canvasHeight = ctx.canvas.height
	ctx.canvas.width = canvasWidth * pixelRatio
	ctx.canvas.height = canvasHeight * pixelRatio
	ctx.canvas.style.width = canvasWidth + 'px'
	ctx.canvas.style.height = canvasHeight + 'px'
	ctx.scale(pixelRatio, pixelRatio)
}

CanvasLayer.prototype.draw = function () {
	const self = this
	const args = arguments
	clearTimeout(self.timeoutID)
	self.timeoutID = setTimeout(function () {
		self._draw()
	}, 15)
}

CanvasLayer.prototype._draw = function () {
	const map = this._map
	const size = map.getSize()
	const center = map.getView().getCenter()
	if (center) {
		const pixel = map.getPixelFromCoordinate(center)
		this.canvas.style.left = pixel[0] - size[0] / 2 + 'px'
		this.canvas.style.top = pixel[1] - size[1] / 2 + 'px'
		this.options.update && this.options.update.call(this)
	}
}

CanvasLayer.prototype.getContainer = function () {
	return this.canvas
}

CanvasLayer.prototype.show = function () {
	this.initialize()
	this.canvas.style.display = 'block'
}

CanvasLayer.prototype.hide = function () {
	this.canvas.style.display = 'none'
}

CanvasLayer.prototype.setZIndex = function (zIndex) {
	this.canvas.style.zIndex = zIndex
}

CanvasLayer.prototype.getZIndex = function () {
	return this.zIndex
}

export default CanvasLayer