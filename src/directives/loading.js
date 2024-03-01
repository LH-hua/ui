import vue from 'vue'
import Loading from '../components/loading/loading.vue'

const Mask = vue.extend(Loading)

//蒙版操作更新
const toggleLoading = function (el, binding) {
	if (binding.value) {
		vue.nextTick(() => {
			if (binding.modifiers.fullscreen) {
				//全屏情况下
				//el.instance.fullscreen = true;
				//document.body.style.overflow = "hidden";
				document.body.appendChild(el.mask)
			} else {
				//el.instance.fullscreen = false;
				//非全屏情况下
				let height = el.clientHeight //当前元素高度
				//给蒙版赋值
				el.mask.style.top = '0px'
				el.mask.style.height = height + 'px'
				el.mask.style.width = '100%'
				el.appendChild(el.mask)
			}
		})
	} else {
		//移除节点
		el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask)
		// el.instance && el.instance.$destroy()
	}
}

const loading = {
	//只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
	bind(el, binding) {
		// 在绑定了v-loading指令的元素上添加loading-text属性，
		el.style.position = 'relative'
    if(!el.style.height){
      el.style.height = '100%'
    }
		let params = {
			background: el.getAttribute('loading-background') || 'rgba(255,255,255,.8)',
			color: el.getAttribute('loading-color') || '#1c84f0',
			text: el.getAttribute('loading-text') || '加载中…',
			fontSize: el.getAttribute('loading-font-size') || 16,
			zIndex: el.getAttribute('loading-z-index') || 9,
			fullscreen: !!binding.modifiers.fullscreen
		}
		const mask = new Mask({
			el: document.createElement('div'),
			data: params
		})
		// el.instance = mask //将mask存入
		// console.log('el', el.instance)
		el.mask = mask.$el //dom存入，方便获取
		toggleLoading(el, binding)
	},
	update(el, binding) {
		if (binding.oldValue !== binding.value) {
			toggleLoading(el, binding)
		}
	}
}

export default loading
