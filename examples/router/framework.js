export default [
	{
		label: '自研软件资产',
		name: 'framework',
		path: '/framework',
		redirect: '/framework/intro',
		items: [
			{
				name: 'framework-intro',
				path: '/framework/intro',
				label: '自研软件资产总览',
				type: 'pages'
			},
			{
				name: 'env-deployment',
				path: '/framework/global/env-deployment',
				label: '微服务框架',
				items: [
					{
						name: 'env-deployment',
						path: '/framework/global/env-deployment',
						label: '环境准备'
					}
				]
			},
			{
				name: 'env',
				path: '/framework/frontend/env',
				label: '前端开发指南',
				items: [
					{
						name: 'env',
						path: '/framework/frontend/env',
						label: '环境准备',
						desc: '前端环境准备'
					},
					{
						name: 'start',
						path: '/framework/frontend/start',
						label: '快速上手',
						desc: 'SuncereUI'
					},
					{
						name: 'explanation',
						path: '/framework/frontend/explanation',
						label: '组件搭建说明'
					},
					{
						name: 'intro',
						path: '/framework/frontend/intro',
						label: '快速上手',
						desc: 'SuncereSys'
					},
          {
						name: 'app-config',
						path: '/framework/frontend/app-config',
						label: '应用配置'
					},
          {
						name: 'menu-config',
						path: '/framework/frontend/menu-config',
						label: '菜单配置'
					},
					{
						name: 'config',
						path: '/framework/frontend/config',
						label: '扩展配置'
					},
					{
						name: 'multi-module',
						path: '/framework/frontend/multi-module',
						label: '模块集成'
					},
          {
            name: 'micro-front-end',
            path: '/framework/frontend/micro-front-end',
            label: '微前端升级指南',
            desc: '微前端升级指南'
          },
					{
						name: 'performance-optimization',
						path: '/framework/frontend/performance-optimization',
						label: '前端性能优化指南',
						desc: '实际项目'
					},
          {
						name: 'wechat-miniprogram',
						path: '/framework/frontend/wechat-miniprogram',
						label: '微信小程序开发流程指南',
						desc: '小程序开发'
					}
				]
			},
			{
				name: 'fun-intro',
				path: '/framework/dotnet/fun-intro',
				label: '后端开发指南',
				items: [
					{
						name: 'fun-intro',
						path: '/framework/dotnet/fun-intro',
						label: '框架介绍',
						desc: '教程'
					},
					{
						name: 'getting-started',
						path: '/framework/dotnet/getting-started',
						label: '入门教程'
					},
					{
						name: 'application-development',
						path: '/framework/dotnet/application-development',
						label: '应用开发'
					},
					{
						name: 'db-adapt',
						path: '/framework/dotnet/db-adapt',
						label: '数据库适配',
						desc: '组件'
					}
				]
			},
			{
				name: 'onlineInterfaceDoc',
				path: '/framework/global/onlineInterfaceDoc',
				label: '中间件部署指南',
				items: [
          {
            name: 'onlineInterfaceDoc',
            path: '/framework/global/onlineInterfaceDoc',
            label: '在线接口文档'
          },
					{
						name: 'gateway',
						path: '/framework/global/gateway',
						label: '网关工程部署'
					},
					{
						name: 'auth',
						path: '/framework/global/auth',
						label: '鉴权工程部署'
					},
          {
            name: 'note',
            path: '/framework/global/note',
            label: '部署注意事项'
          }
				]
			}
		]
	}
]
