/*----------------------------------------------------------------------
|
需求：给整个页面添加背景水印

思路：
使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
将其设置为背景图片，从而实现页面或组件水印效果
|-----------------------------------------------------------------------
*/

function addWaterMarker(params, parentNode) {
	// 水印文字，父元素，字体，文字颜色
	const canvasEl = document.createElement('canvas')
	parentNode.appendChild(canvasEl)
	canvasEl.width = params.width
	canvasEl.height = params.height
	canvasEl.style.display = 'none'
	const canvas = canvasEl.getContext('2d')
	canvas.rotate((params.angle * Math.PI) / 180)
	canvas.font = params.font
	canvas.fillStyle = params.fontColor
	canvas.textAlign = 'left'
	canvas.textBaseline = 'Middle'
	canvas.fillText(params.text, canvasEl.width / 10, canvasEl.height / 2)
	parentNode.style.backgroundImage = 'url(' + canvasEl.toDataURL('image/png') + ')'
}

const waterMarker = {
	bind: function (el, binding) {
		let params = {
			text: binding.value.text || '水印',
			font: binding.value.font || '16px Microsoft JhengHei',
			fontColor: binding.value.fontColor || 'rgba(180, 180, 180, 0.3)',
			width: binding.value.width || 200,
			height: binding.value.height || 150,
			angle: binding.value.angle || -30
		}
		addWaterMarker(params, el)
	}
}

export default waterMarker
