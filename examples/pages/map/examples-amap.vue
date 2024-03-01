<!--
 * @Author: your name
 * @Date: 2022-04-08 15:55:18
 * @LastEditTime: 2022-04-08 17:51:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Suncere-UI\examples\pages\map\examples-amap.vue
-->
<template>
	<div>
		<examplesView type="amap" :dataSource="dataSource"></examplesView>
	</div>
</template>
<script>
import examplesView from '../../components/examples-view'
export default {
	//要用到哪些子组件
	components: { examplesView },
	//组件私有数据（必须是function，而且要return对象类型）
	data() {
		return {
			dataSource: [
				{
					title: '基础高德地图',
					subtitle: 'amap',
					list: [
						{
							image: require('../../assets/img/examples-image/amap/baseMap.jpg'),
							title: '地图基础创建',
							params: {
								folder: 'base',
								fileName: 'baseMap'
							}
						}
					]
				}
			]
		}
	},
	//父组件传递过来的数据（两种方式声明：1.数组 2.对象）
	props: {},
	//计算属性
	computed: {},
	//监听
	watch: {},
	//生命周期钩子：组件实例完成创建之后调用
	created() {},
	//生命周期钩子：组件实例渲染完成时调用
	mounted() {},
	//函数集，自己封装，便于开发使用
	methods: {}
}
</script>
<style lang="less" scoped></style>
