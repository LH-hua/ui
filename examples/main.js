import Vue from 'vue'
import router from './router'

import './styles/index.less'
import App from './App'

// 项目UI
import suncereui from '../src/index'
Vue.use(suncereui)


// 代码在线编辑器  https://www.npmjs.com/package/vue-code-view
import CodeView from 'vue-code-view'
Vue.use(CodeView)

import demoBlock from './components/demo-block.vue'
Vue.component('demo-block', demoBlock)

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
