/* components/index.js */
// 引入组件
import openImg from './index.vue'

// install方法,以供Vue.use()注册使用
const install = (Vue, option) => {
	// 创建构造器,生成一个Vue实例
	const componentInstance = Vue.extend(openImg)
	// 定义实例化对象
	let currentComponent = null
	// 对象实例化,将组件挂载到body下
	const initInstance = () => {
		currentComponent = new componentInstance()
		let componentEL = currentComponent.$mount().$el
		document.body.appendChild(componentEL)
	}
	// 定义用户使用的方法,挂在到Vue
	Vue.prototype.$openImg = {
		show(opt) {
			initInstance()
			return currentComponent.show(opt)
		}
	}
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	install,
	// 组件实例
	module: openImg,
	// 组件的名称  会动态添加前缀
	name: 'open-img',
	// 组件的描述
	desc: '图片放大器',
	// 组件的全局注入
	isInjection: true
}
