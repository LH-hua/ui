import CascadesForm from './cascades-form'
import CascadesFormItem from './cascades-form-item.vue'
import CascadesFormCollapse from './cascades-form-collapse.vue'

export default [
	{
		// 组件实例
		module: CascadesForm,
		// 组件的名称  会动态添加前缀
		name: 'cascades-form',
		// 组件的描述
		desc: '竖向级联选择表单'
	},
	{
		// 组件实例
		module: CascadesFormItem,
		// 组件的名称  会动态添加前缀
		name: 'cascades-form-item',
		// 组件的描述
		desc: '竖向级联选择表单项'
	},
	{
		// 组件实例
		module: CascadesFormCollapse,
		// 组件的名称  会动态添加前缀
		name: 'cascades-form-collapse',
		// 组件的描述
		desc: '竖向级联选择表单项-收缩'
	}
]
