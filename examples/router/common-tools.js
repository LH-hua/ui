const commontools = [
	{
		label: '第三方工具',
		name: 'common-tools',
		path: '/common-tools',
		redirect: '/common-tools/intro',
		items: [
			{
				name: 'tools-intro',
				path: '/common-tools/intro',
				label: '第三方工具总览',
				type: 'pages'
			},
			{
				name: 'nacos',
				path: '/common-tools/middleware/nacos',
				label: '中间件使用指南',
				items: [
					{
						name: 'nacos',
						path: '/common-tools/middleware/nacos',
						label: 'Nacos'
					},
					{
						name: 'xxl-job',
						path: '/common-tools/middleware/xxl-job',
						label: 'XXL-JOB'
					}
				]
			},
			{
				name: 'git',
				path: '/common-tools/develop-tools/git',
				label: '开发工具、运行环境',
				items: [
					{
						name: 'git',
						path: '/common-tools/develop-tools/git',
						label: 'Git'
					},
					{
						name: 'Fork',
						path: '/common-tools/develop-tools/fork',
						label: 'Fork'
					},
					{
						name: 'vs',
						path: '/common-tools/develop-tools/vs',
						label: 'Visual Studio'
					},
					{
						name: 'vscode',
						path: '/common-tools/develop-tools/vscode',
						label: 'Visual Studio Code'
					},
					{
						name: 'nvm',
						path: '/common-tools/develop-tools/nvm',
						label: 'nvm'
					},
					{
						name: 'jdk',
						path: '/common-tools/develop-tools/jdk',
						label: 'jdk'
					},
					{
						name: 'navicat',
						path: '/common-tools/develop-tools/navicate',
						label: 'Navicat'
					}
				]
			},
			{
				name: 'keytool',
				path: '/encryption/keytool',
				label: '在线加解密',
				type: 'pages'
			}
		]
	}
]

export default commontools
