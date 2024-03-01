export default [
	{
		label: '更新日志',
		name: 'update-log',
		path: '/update-log',
		redirect: '/update-log/CONTRIBUTING',
		items: [
			{
				name: 'CONTRIBUTING',
				path: '/update-log/CONTRIBUTING',
				label: '更新日志说明'
			},
      {
        name: 'middleware-log',
        path: '/update-log/MIDDLEWARE',
        label: '中间件更新日志',
      },
			{
				name: 'ui-log',
				path: '/update-log/frontend/ui-log',
				label: '前端更新日志',
				desc: '前端更新',
				items: [
					{
						name: 'ui-log',
						path: '/update-log/frontend/ui-log',
						label: 'suncere-ui更新日志'
					},
					{
						name: 'sys-log',
						path: '/update-log/frontend/sys-log',
						label: 'suncere-sys更新日志'
					}
				]
			}
		]
	}
]
