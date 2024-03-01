import gifshot from './gifshot'

const defuatParams = {
	gifWidth: 678,
	gifHeight: 678,
	images: [],
	interval: 1,
	numFrames: 10,
	frameDuration: 1,
	fontWeight: 'normal',
	fontSize: '16px',
	fontFamily: 'sans-serif',
	fontColor: '#ffffff',
	textAlign: 'center',
	textBaseline: 'bottom',
	sampleInterval: 10,
	numWorkers: 2
}
class GifCreator {
	constructor(params, filename = '未命名', imgId) {
		// 图片配置
		this.configure = Object.assign({ ...defuatParams }, params)

		// 导出图片的文件名
		this.filename = filename
		// 需要渲染的img标签id
		this.imgId = imgId || ''

		this.image = null
	}
	createGIF(callback) {
		gifshot.createGIF(this.configure, obj => {
			if (!obj.error) {
				this.image = obj.image
				this.downloadGif(this.filename)
				callback()
				if (this.image && this.imgId) {
					const img = document.getElementById(this.imgId)
					img.src = this.image
				}
			} else {
				callback()
			}
		})
	}
	// 导出gif图
	downloadGif(filename = '未命名') {
		if (!this.image) return
		const path = this._dataURLtoFile(this.image, filename)

		const link = document.createElement('a')
		const blob = new Blob([path], { type: 'application/vnd.ms-excel' })
		link.style.display = 'none'
		link.href = URL.createObjectURL(blob)
		link.download = `${filename}.gif` //下载的文件名
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}
	// base64转化为文件流
	_dataURLtoFile(dataurl, filename) {
		const arr = dataurl.split(',')

		const mime = 'image/gif'
		const bstr = atob(arr[1])
		let n = bstr.length
		const u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		return new File([u8arr], filename, { type: mime })
	}
}

export default GifCreator
