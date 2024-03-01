export default [
	{
		label: '专题场景',
		name: 'special-topic',
		path: '/special-topic',
		items: [
			{
				name: 'air-topic',
				path: '/special-topic/air-topic',
				// redirect: '/component/map/marker-layer',
				label: '大气专题',
				items: [
					// {
					// 	name: 'marker-layer',
					// 	path: '/component/map/marker-layer',
					// 	label: '点位图层',
					// 	desc: 'GIS'
					// },
					// {
					// 	name: 'turf-regulation-contourf',
					// 	path: '/component/map/turf-regulation-contourf',
					// 	label: '污染分布图-矩形场'
					// },
					// {
					// 	name: 'regulation-pixel-render',
					// 	path: '/component/map/regulation-pixel-render',
					// 	label: '污染分布图-矩形场-像素渲染'
					// },
					// {
					// 	name: 'contour',
					// 	path: '/component/map/contour',
					// 	label: '等值线-矩形场'
					// },
					// {
					// 	name: 'wind-barb',
					// 	path: '/component/map/wind-barb',
					// 	label: '风矢风场-矩形场'
					// },
					// {
					// 	name: 'wind-arrow',
					// 	path: '/component/map/wind-arrow',
					// 	label: '箭头风场-矩形场'
					// }
				]
			},
			{
				name: 'forecast-topic',
				path: '/special-topic/forecast-topic',
				// redirect: '/component/map/turf-irregular-contourf',
				label: '预报专题',
				items: [
					// {
					// 	name: 'turf-irregular-contourf',
					// 	path: '/component/map/turf-irregular-contourf',
					// 	label: '污染分布图-模型扇形场',
					// 	desc: 'GIS'
					// },
					// {
					// 	name: 'irregular-pixel-render',
					// 	path: '/component/map/irregular-pixel-render',
					// 	label: '污染分布图-模型扇形场-像素渲染'
					// },
					// {
					// 	name: 'contour-render',
					// 	path: '/component/map/contour-render',
					// 	label: '等值线-模型扇形场'
					// },
					// {
					// 	name: 'wind-barb-render',
					// 	path: '/component/map/wind-barb-render',
					// 	label: '风矢风场-模型扇形场'
					// },
					// {
					// 	name: 'wind-arrow-render',
					// 	path: '/component/map/wind-arrow-render',
					// 	label: '箭头风场-模型扇形场'
					// },
					// {
					// 	name: 'wind-particle',
					// 	path: '/component/map/wind-particle',
					// 	label: '粒子风场-json'
					// },
					// {
					// 	name: 'wind-particle-image',
					// 	path: '/component/map/wind-particle-image',
					// 	label: '粒子风场-图片'
					// },
					// {
					// 	name: 'image-layer',
					// 	path: '/component/map/image-layer',
					// 	label: '源清单分布'
					// },
					// {
					// 	name: 'trajectory-layer',
					// 	path: '/component/map/trajectory-layer',
					// 	label: '污染轨迹图'
					// },
					// {
					// 	name: 'distributed-layer',
					// 	path: '/component/map/distributed-layer',
					// 	label: '污染贡献图'
					// },
					// {
					// 	name: 'heat-layer',
					// 	path: '/component/map/heat-layer',
					// 	label: '污染扩散图'
					// }
				]
			},
			{
				name: 'water-topic',
				path: '/special-topic/water-topic',
				label: '水环境专题',
				items: []
			},
			{
				name: 'ai-topic',
				path: '/special-topic/ai-topic',
				label: 'ai算法专题',
				redirect: '/special-topic/ai/drainage-monitoring',
				items: [
					{
						name: 'drainage-monitoring',
						path: '/special-topic/ai/drainage-monitoring',
						label: '排水监测',
						desc: '图像识别'
					},
					{
						name: 'floater-monitoring',
						path: '/special-topic/ai/floater-monitoring',
						label: '水面漂浮物监测'
					},
					{
						name: 'smoke-identification',
						path: '/special-topic/ai/smoke-identification',
						label: '烟气与喷淋识别'
					},
					{
						name: 'vehicle-identification',
						path: '/special-topic/ai/vehicle-identification',
						label: '车辆识别统计'
					},
					{
						name: 'move-monitoring',
						path: '/special-topic/ai/move-monitoring',
						label: '移动侦测'
					},
					{
						name: 'intrusion-monitoring',
						path: '/special-topic/ai/intrusion-monitoring',
						label: '异常入侵监测'
					},
					{
						name: 'face-recognition',
						path: '/special-topic/ai/face-recognition',
						label: '人脸拍照识别'
					},
					{
						name: 'abnormal-behavior-monitoring',
						path: '/special-topic/ai/abnormal-behavior-monitoring',
						label: '异常行为监测'
					},
					{
						name: 'button-status',
						path: '/special-topic/ai/button-status',
						label: '设备灯按钮状态监测'
					},
					{
						name: 'door-status',
						path: '/special-topic/ai/door-status',
						label: '门开关状态监测'
					},
					{
						name: 'key-events-shooting',
						path: '/special-topic/ai/key-events-shooting',
						label: '关键事件拍摄取证'
					},
					{
						name: 'voice-distinguish',
						path: '/special-topic/ai/voice-distinguish',
						label: '声纹识别与声音分类',
						desc: '音频算法'
					},
					{
						name: 'abnormal-data-review',
						path: '/special-topic/ai/abnormal-data-review',
						label: '异常数据审核',
						desc: '数据挖掘'
					},
					{
						name: 'air-forecast',
						path: '/special-topic/ai/air-forecast',
						label: '空气质量预测'
					}
				]
			},
			{
				name: 'configure-topic',
				path: '/special-topic/configure-topic',
				label: '组态专题',
				redirect: '/special-topic/configure/intro',
				items: [
					{
						name: 'configure-intro',
						path: '/special-topic/configure/intro',
						label: '快速集成'
					}
				]
			}
		]
	}
]