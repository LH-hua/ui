export default [
	{
		label: '通用组件',
		name: 'component',
		path: '/component',
		redirect: '/component/form/form-input',
		items: [
			{
				name: 'formItem',
				path: '/component/form/form-input',
				redirect: '/component/form/form-input',
				label: '表单项',
				items: [
					{
						name: 'formInput',
						path: '/component/form/form-input',
						label: '输入框'
					},
					{
						name: 'formInputNumber',
						path: '/component/form/form-input-number',
						label: '数字输入框'
					},
					{
						name: 'formRadio',
						path: '/component/form/form-radio',
						label: '单选框'
					},
					{
						name: 'formCheckbox',
						path: '/component/form/form-checkbox',
						label: '多选框'
					},
					{
						name: 'newformDatePicker',
						path: '/component/form/new-form-date-picker',
						label: '日期选择框'
					},
					{
						name: 'formSelect',
						path: '/component/form/form-select',
						label: '下拉选择'
					},
					{
						name: 'formMultiple',
						path: '/component/form/form-multiple',
						label: '下拉多选择'
					},
					{
						name: 'formCascader',
						path: '/component/form/form-cascader',
						label: '级联选择'
					},
					{
						name: 'TreeSelect',
						path: '/component/form/tree-select',
						label: '树形站点选择器'
					},
					{
						name: 'formStationSelect',
						path: '/component/form/form-stationSelect',
						label: '站点选择器'
					},
					{
						name: 'formIcon',
						path: '/component/form/form-icon',
						label: '图标下拉选择'
					},
					{
						name: 'formSlots',
						path: '/component/form/form-slots',
						label: '自定插槽'
					}
				]
			},
			// 表单组件
			{
				name: 'form',
				path: '/component/form/form-grop',
				redirect: '/component/form/form-grop',
				label: '表单组件',
				items: [
					{
						name: 'baseForm',
						path: '/component/form/form-grop',
						label: '搜索表单',
						desc: '基础表单'
					},
					{
						name: 'formModal',
						path: '/component/form/form-modal',
						label: '列表表单'
					},
					{
						name: 'formTypeExtend',
						path: '/component/form/form-type-extend',
						label: '表单项类型扩展'
					},
					// 竖向布局、级联表单
					{
						name: 'cascades-form',
						path: '/component/cascades-form/cascades-form',
						label: '级联表单',
						desc: '级联表单'
					}
				]
			},
			// 表格组件
			{
				name: 'table',
				path: '/component/table',
				redirect: '/component/table/base-table',
				label: '表格组件',
				items: [
					{
						name: 'baseTable',
						path: '/component/table/base-table',
						label: '基础表格'
					},
					{
						name: 'emptyTable',
						path: '/component/table/empty-table',
						label: '空表格'
					},
					{
						name: 'extraTable',
						path: '/component/table/extra-table',
						label: '表格顶部、底部的插槽'
					},
					{
						name: 'funTable',
						path: '/component/table/fun-table',
						label: '选项框选择和分页功能'
					},
					{
						name: 'collapseTable',
						path: '/component/table/collapse-table',
						label: '表格合并'
					},
					{
						name: 'domTable',
						path: '/component/table/dom-table',
						label: '表格自定义html'
					}
				]
			},
			// 基础类型组件
			{
				name: 'base',
				path: '/component/base',
				redirect: '/component/base/svg-carousel',
				label: '数据展示',
				items: [
					{
						name: 'svg-carousel',
						path: '/component/base/svg-carousel',
						label: '图片列表播放'
					},
					{
						name: 'timeaxi',
						path: '/component/base/timeaxi',
						label: '时间轴'
					},
					{
						name: 'calendar',
						path: '/component/base/calendar',
						label: '日历'
					},
					{
						name: 'modal',
						path: '/component/base/modal',
						label: '弹出框'
					},
					// 图例组件
					{
						name: 'normal-legend',
						path: '/component/legend/normal-legend',
						label: '图例示例',
						desc: '图例组件'
					},
					{
						name: 'legend-position',
						path: '/component/legend/legend-position',
						label: '图例位置调整'
					}
				]
			},

			// 图表组件
			{
				name: 'chart',
				desc: 'Echart图表',
				path: '/component/chart',
				redirect: '/component/chart/examples-echart',
				label: 'Echart图表',
				items: [
					{
						name: 'examples-echart',
						desc: 'Echart图表',
						type: 'pages',
						path: '/component/chart/examples-echart',
						label: '基础图表'
					},
					{
						name: 'chartConfiguration',
						path: '/component/echart/chart-configuration',
						label: 'Echart 文档配置'
					}
				]
			},

			// 地图组件
			{
				name: 'map',
				path: '/component/map',
				redirect: '/component/map/base-layer',
				label: '地图组件',
				items: [
					{
						name: 'base-layer',
						path: '/component/map/base-layer',
						label: '基础地图'
					},
					{
						name: 'turf-regulation-contourf',
						path: '/component/map/turf-regulation-contourf',
						label: '污染分布图-矩形场'
					},
					{
						name: 'turf-irregular-contourf',
						path: '/component/map/turf-irregular-contourf',
						label: '污染分布图-模型扇形场'
					},
					{
						name: 'regulation-pixel-render',
						path: '/component/map/regulation-pixel-render',
						label: '污染分布图-矩形场-像素渲染'
					},
					{
						name: 'irregular-pixel-render',
						path: '/component/map/irregular-pixel-render',
						label: '污染分布图-模型扇形场-像素渲染'
					},
					{
						name: 'contour',
						path: '/component/map/contour',
						label: '等值线-矩形场'
					},
					{
						name: 'contour-render',
						path: '/component/map/contour-render',
						label: '等值线-模型扇形场'
					},
					{
						name: 'wind-barb',
						path: '/component/map/wind-barb',
						label: '风矢风场-矩形场'
					},
					{
						name: 'wind-barb-render',
						path: '/component/map/wind-barb-render',
						label: '风矢风场-模型扇形场'
					},
					{
						name: 'wind-arrow',
						path: '/component/map/wind-arrow',
						label: '箭头风场-矩形场'
					},
					{
						name: 'wind-arrow-render',
						path: '/component/map/wind-arrow-render',
						label: '箭头风场-模型扇形场'
					},
					{
						name: 'wind-particle',
						path: '/component/map/wind-particle',
						label: '粒子风场-json'
					},
					{
						name: 'wind-particle-image',
						path: '/component/map/wind-particle-image',
						label: '粒子风场-图片'
					},
					{
						name: 'image-layer',
						path: '/component/map/image-layer',
						label: '图片图层'
					},
					{
						name: 'marker-layer',
						path: '/component/map/marker-layer',
						label: '点位图层'
					},
					{
						name: 'geojson-layer',
						path: '/component/map/geojson-layer',
						label: '地理围栏'
					},
					{
						name: 'trajectory-layer',
						path: '/component/map/trajectory-layer',
						label: '轨迹线图层'
					},
					{
						name: 'distributed-layer',
						path: '/component/map/distributed-layer',
						label: '分布式流向图层'
					},
					{
						name: 'heat-layer',
						path: '/component/map/heat-layer',
						label: '热力网格'
					}
					// // {
					// // 	name: 'draw-layer',
					// // 	path: '/component/map/draw-layer',
					// // 	label: '绘制圆、线'
					// // }
				]
			},
			{
				name: 'public',
				path: '/component/public/',
				redirect: '/component/snippet/regular',
				label: '公共方法',
				items: [
					{
						name: 'regular',
						path: '/component/snippet/regular',
						label: '全局方法'
					},
					{
						name: 'directive',
						path: '/component/snippet/directive',
						label: '指令'
					}
				]
			}
		]
	}
]