/*----------------------------------------------------------------------
| 全局的信息配置
|-----------------------------------------------------------------------
*/

export default {
	/*----------------------------------------------------------------------
    | 公共的信息 默认配置
    |-----------------------------------------------------------------------
    */

	/**
    * @msg 上传文件配置
    ----------------------------------------------------------------*/
	uploadFiles: {
		image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
		video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
		audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
		document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx'],
		getAll() {
			return [...this.uploadFiles.image, ...this.uploadFiles.video, ...this.uploadFiles.document]
		}
	},

	/**
    * @msg 信息文字
    ----------------------------------------------------------------*/
	msg: {
		emptyText: '暂无数据',
		errorText: '数据异常'
	}
}
