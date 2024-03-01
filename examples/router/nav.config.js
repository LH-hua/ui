import commontools from './common-tools.js'
import frameworks from './framework.js'
import components from './components.js'
import specialTopic from './special-topic.js'
import updateLog from './update-log.js'
import guide from './guide.js'

export default {
	/*----------------------------------------------------------------------
	|  nav 导航头数据
	|-----------------------------------------------------------------------
	*/
	navData: [
		{ label: '首页', name: 'home', path: '/home', type: 'pages' },
    ...guide,
		...frameworks,
		...components,
    ...specialTopic,
		...commontools,
    ...updateLog,
		{ label: '代码预览', name: 'codeView', path: '/codeView', type: 'pages', hide: true }
	]
}
