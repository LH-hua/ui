import Vue from 'vue'
import Router from 'vue-router'
import navConf from './nav.config.js'

Vue.use(Router)

let routes = []

Object.keys(navConf).forEach(header => {
	routes = routes.concat(navConf[header])
})

let addComponent = (router, group) => {
	router.forEach(route => {
    if (route.items) {
      route.items = route.items.map(item => {
        item = {
          ...item,
          meta: {
            parent: route.name,
            group: group ? group : ''
          }
        }
        return item
      })
			addComponent(route.items, route.name)
			routes = routes.concat(route.items)
		} else {
			if (route.type === 'pages') {
				route.component = r => require.ensure([], () => r(require(`../pages${route.path}.vue`)))
				return
			}
			route.component = r => require.ensure([], () => r(require(`../docs${route.path}.md`)))
		}
	})
}
addComponent(routes)

routes.push({
  path: '/',
  redirect: 'home'
})


export default new Router({
	routes: routes
})
