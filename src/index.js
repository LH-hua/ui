/**
 * ui框架, ant-design-vue
 */
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '../src/assets/css/antd/index.less'

/*----------------------------------------------------------------------
| 引入 自定义的指令
|-----------------------------------------------------------------------
*/

/* @msg 基础指令
----------------------------------------------------------------*/
import copy from './directives/copy' // 复制文本
import debounce from './directives/debounce' // 延迟点击
import watermarker from './directives/waterMarker' // 水印
import loading from './directives/loading' // 加载

// 自定义指令
const directives = {
  copy,
  debounce,
  watermarker,
  loading
}

//引入封装方法
import * as utils from './utils/index'
import validator from './utils/validator'
import moment from 'moment'
import { capitalize } from 'lodash'
import VueLazyload from 'vue-lazyload'


//外部注入自定义表单配置项type
import formModal from './components/form/model/form-modal/form-modal.vue'
import formGrop from './components/form/model/form-grop/form-grop.vue'
export const FormModal = {
  ...formModal,
  registerCustomType(type, componentName, component) {
    this.components.formItem.components = {
      ...this.components.formItem.components,
      [componentName]: component
    }
    this.components.formItem.methods = {
      ...this.components.formItem.methods,
      [`render${capitalize(type)}`]: (h, props, item = this.formOptions) => {
        return h('a-form-item', props.itemProps, [h(componentName, props.customProps)])
      }
    }
  },
  install: (Vue) => {
    Vue.component('s-form-modal', formModal)
  }
}
export const FormGrop = {
  ...formGrop,
  registerCustomType(type, componentName, component) {
    this.components.formItem.components = {
      ...this.components.formItem.components,
      [componentName]: component
    }
    this.components.formItem.methods = {
      ...this.components.formItem.methods,
      [`render${capitalize(type)}`]: (h, props, item) => {
        return h('a-form-item', props.itemProps, [h(componentName, props.customProps)])
      }
    }
  },
  install: (Vue) => {
    Vue.component('s-form-grop', formGrop)
  }
}


// 引入封装组件 require.context .自动化导入文件夹下的组件 自动注册
// 读取文件夹内容  动态引入自定义组件
const requireComponents = require.context('./components', true, /\export.js$/)

// 动态 引入自定义指令
const install = Vue => {
  if (install.installed) return

  // 注册ui框架
  Vue.use(Antd)
  // 图片懒加载插件
  Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/images/empty-img.png'),
    loading: require('./assets/images/loading-img.gif'),
    attempt: 1
  })

  // 全局注册的组件
  requireComponents.keys().forEach(fileName => {
    // 组件实例
    const reqExample = requireComponents(fileName).default

    if (utils.getType(reqExample) === 'array') {
      reqExample.forEach(item => {
        // 截取路径作为组件名前缀  例如 路径 "/Base-Componts/..." 截取 "/"符号的 并转小写  base
        // 加上组件定义的名称 reqExample.name    组件全名就变成  base-amap
        // const reqComName = `${fileName.match(/(?<=\/)[^/]+(?=\-)/i)[0].toLowerCase()}-${reqExample.name}`
        const reqComName = `s-${item.name}`

        // 组件全局挂载
        Vue.component(reqComName, item.module)
        // 组件的全局注入
        if (item.isInjection) {
          Vue.use(item)
        }
      })
    }
    else {
      // 截取路径作为组件名前缀  例如 路径 "/Base-Componts/..." 截取 "/"符号的 并转小写  base
      // 加上组件定义的名称 reqExample.name    组件全名就变成  base-amap
      // const reqComName = `${fileName.match(/(?<=\/)[^/]+(?=\-)/i)[0].toLowerCase()}-${reqExample.name}`
      const reqComName = `s-${reqExample.name}`

      // 组件全局挂载
      Vue.component(reqComName, reqExample.module)

      // 组件的全局注入
      if (reqExample.isInjection) {
        Vue.use(reqExample)
      }
    }
  })

  // 全局注册的指令
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })

  // 封装 全局方法
  Vue.prototype.$utils = utils
  // 封装 全局校验规则
  Vue.prototype.$validator = validator
  // 全局时间插件
  Vue.prototype.$moment = moment
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
