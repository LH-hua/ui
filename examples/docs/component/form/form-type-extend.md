# 表单类型扩展

目前UI框架的表单组件有两种`s-form-modal`, `s-form-grop`,所以想要在实际项目中扩展表单项的类型，需在main.js中向这两个表单组件全局注册类型以及对应类型的自定义组件。

&nbsp;

## 扩展自定义类型函数
FormModal, FormGrop组件有个`registerCustomType(type, componentName, component)`注册类型函数。

函数参数解释：

`type`: String （自定义表单项类型）

`componentName`: String （组件名字）

`component`: VueCompenent (vue组件)

&nbsp; 

##  在main.js注册
```
// 引入表单组件FormModal, FormGrop
import SuncereUI, { FormModal, FormGrop } from '@suncereltd/suncere-ui'
// 引入要注册的自定义组件
import customComponent from 'xxx'

// 注册自定义的表单配置项类型type，组件必须emit('change')事件或实现v-model指令
FormModal.registerCustomType('custom', customComponent.name, customComponent)
FormGrop.registerCustomType('custom', customComponent.name, customComponent)

//注意，这里使用必须要在vue.use(SuncereUI)之后执行才能覆盖原来的表单组件，实现自定义类型扩展
Vue.use(FormModal)
Vue.use(FormGrop)

```

&nbsp; 

## 实际使用
```
<s-form-modal :form-items="formItems"></s-form-modal>

const formItems = [
  {
    id: 'custom',
    type: 'custom',
    label: '自定义类型',
    rules: [{
      required: true,
      validator: (rule, value, callback) => {
        console.log('自定义校验', value)
        if (!value) {
          callback(new Error('数据不能为空'))
        }
      }
    }],
    //对自定义组件传属性
    customOptions: {
      'abc': '组件属性1',

      //对自定义组件传监听事件，自定义组件emit了什么事件可以在这里监听
      on: {
        change: () => {
          console.log('改变')
        },
        xxx: () => {}
      }
    }
  }
]
```
&nbsp; 



## 注意

1、自定义的表单类型组件必须实现value和emit('change')事件或实现v-model双向数据绑定，这样校验器才生效，表单的getForm()方法才能获取到组件值。

2、`Vue.use(FormModal)`, `Vue.use(FormGrop)`必须要在`Vue.use(SuncereUI)`之后注册才能正确扩展。