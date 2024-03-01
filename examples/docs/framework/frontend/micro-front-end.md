# 微前端升级指南
&nbsp;
## **市面主流微前端框架对比**

|              | qiankun.js乾坤                                               | icestark飞冰                                                 | single-spa                                                   | micro-app                                                    |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 特点分析     | 基于 single-spa 二次封装，开箱即用配置简单且各种接入框架文档成熟，有大量的上线应用案例，社区活跃，易用性及完备性高，可开发环境调试子应用 | 类似于 single-spa 思想实现，对React 技术栈友好，很多问题的解决方案都是针对react环境，只支持线上环境调试或本地部署后调试子应用，社会面使用广泛度和社区活跃度不如qiankun | 单应用微前端鼻祖，但文档不友好，配置写法复杂，不能开箱即用，需要二次封装，接入成本高 | 一款基于WebComponent的思想的微前端框架，从组件化的思维实现微前端，使用简单，接入成本低，使用浏览器和js新特性customElement进行渲染，浏览器版本要求高，文档相对完善，但社区活跃度和社会面应用广泛度不高，遇到问题难以在论坛找到解决方案，不够成熟。 |
| 出品         | 阿里巴巴                                                     | 阿里巴巴                                                     | 国外single-spa团队                                           | 京东                                                         |
| 渲染触发原理 | 基于路由监听、手动渲染                                       | 基于路由监听、手动渲染                                       | 基于路由监听                                                 | customElement自定义html标签                                  |

**综合以上方案对比之后，通过结合我们公司当前已有的技术框架，再对比各种框架维护度，技术成熟度，社区活跃度，文档完善度，浏览器兼容性等方面，最后确定采用了 `qiankun` 基座式的微前端开发方案，原因如下：**

- 1、各种框架接入文档完善，不偏向某一个框架，案例丰富，版本发展相对稳定。
- 2、改造成本低，对现有公司现有框架工程侵入度、业务线迁移成本也较低。
- 3、和原有开发模式基本没有不同，开发人员学习成本较低。
- 4、qiankun 的微前端有多年使用场景以及 Issue 问题解决积累，社区也比较活跃，在踩坑的路上更容易自救～

&nbsp;

> qiankun文档 https://qiankun.umijs.org/zh/guide/getting-started

&nbsp;

## **使用建议**

我们建议业务模块**小于等于3个**用模块依赖的接入方式，**大于3个**使用微前端接入方式，以降低单个业务系统的代码量和包大小。

&nbsp;

## **qiankun.js乾坤原理**

主项目设置渲染基座，通过网络请求不同的IP端口下的子项目的app实例，渲染在主项目基座上来实现微前端架构模式，并非传统的iframe嵌入模式。

![](https://ldbbs.ldmnq.com/bbs/topic/attachment/2023-2/d029115b-4d97-4e47-a027-35535491962b.png)

&nbsp;

## **结构**

1个主应用+多个子应用模块

&nbsp;

## **空白项目设置教程（非sys框架）**

1、主应用注册子应用（主应用先npm安装qiankun）

```javascript
// main.js
import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  //子应用1
  {
    name: 'vue-sub-app-1',     // 子项目名称
    entry: '//localhost:9001', // 应用访问ip端口
    container: '#vueSubApp',   // 主项目渲染子项目的基座元素id名称
    activeRule: ['#/sub-app-1'], // 激活子应用的路径标识
  },
  //子应用2
  {
    name: 'vue-sub-app-2',
    entry: '//localhost:9002', // 应用访问ip端口
    container: '#vueSubApp',
    activeRule: ['#/sub-app-2'],
  },
]);

start();
```

2、设置跳转路径，如

```html
<router-link to="/sub-app-1/sub-app-main">跳转微应用1</router-link>
<router-link to="/sub-app-2/sub-app-2-main">跳转微应用2</router-link>
```

3、**子应用**main.js设置

```javascript
let instance = null;
function render() {
  // props 组件通信
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app') // 这里是挂载到自己的HTML中，基座会拿到这个挂载后的HTML，将其插入进去
}

if (!window.__POWERED_BY_QIANKUN__) { // 如果是独立运行，则手动调用渲染
  render();
}

if (window.__POWERED_BY_QIANKUN__) { // 如果是qiankun使用到了，则会动态注入路径
  window.__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 根据 qiankun 的协议需要导出 bootstrap/mount/unmount
export async function bootstrap() {
  console.log('微应用1启动!');
}

export async function mount(props) {
  render(props);
}

export async function unmount() {
  instance.$destroy();
}

export async function update(props) {
  console.log('update props', props);
}
```

4、**子应用**的vue.config.js添加下面配置

```javascript
const name = 'vue-sub-app' // 对应主应用注册的name
const isProd = process.env.NODE_ENV === 'production'
const vueConfig = {
  publicPath: isProd ? '正式服务器ip' : '开发服务器ip（//localhost:8035）',
  configureWebpack: {
    output: {
      library: `${name}`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  devServer: {
    port: 8035, // 每个应用端口不能一样
    headers: {
      'Access-Control-Allow-Origin': '*' // 允许开发服务器跨域
    }
  }
}
```

5、部署服务器nginx设置

```nginx
#子应用访问必须设置跨域头，主应用可不用设置
server {
    listen       xxxx;
    server_name  XXXX;

    location / {
        root   C:\Users\xxxxxxx;
        index  index.html index.htm;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow_Credentials' 'true';
        add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';
    }
}
```

&nbsp;   

## **结合旭诚sys框架的微应用配置教程**

![文件01](https://tucdn.wpon.cn/2023/01/30/4007da727c760.png)

1、安装最新版本的suncere-sys基础库

2、主应用安装依赖```yarn add qiankun```

3、在主应用和子应用的extend.js最后一行里面配置添加上 ```microApp: true```，主应用和子应用的```microAppType```不一样，如果不是微应用接入请去掉这两行。

```javascript
expand.js

// 主应用
expand = {
  microApp: true,
  microAppType: 'main'
}

// 子应用
expand = {
  microApp: true,
  microAppType: 'child'
}
```

4、**主应用**的main.js配置注册应用及其路由

```javascript
import SuncereSys, { render } from '@suncereltd/suncere-sys/src/index'
import { registerMicroApps, start,addGlobalUncaughtErrorHandler } from 'qiankun'
import { Message } from 'ant-design-vue'
const isProd = process.env.NODE_ENV === 'production'

addGlobalUncaughtErrorHandler((event) => {
  // console.log('微应用错误日志', event)
  if (event.type === 'error' && event.error.appOrParcelName) {
    const errorApp = event.error.appOrParcelName
    Message.error(`应用${errorApp}加载失败，请检查应用是否可用！`)
  }
})

registerMicroApps(
  // 注册微应用
  [
    {
      name: 'vue-sub-app', // 子应用名称1
      entry: isProd ? '正式服务器ip1' : '//localhost:8035', // 应用访问ip端口（根据配置切换正式或开发服务器ip）
      container: '#subApp', // 主应用渲染子应用的基座元素id名称
      activeRule: ['#/timing-task'], // 激活子应用的路径标识，填该项目下view文件夹所有第一层路径名
    },
    {
      name: 'vue-sub-app-2', // 子应用名称2
      entry: isProd ? '正式服务器ip2' : '//localhost:8036', // 应用访问ip端口
      container: '#subApp', // 主应用渲染子应用的基座元素id名称
      activeRule: ['#/map/map-index'], // 激活子应用的路径标识，填该项目下view文件夹所有第一层路径名
    }
  ]
)

start()
render()

// 以上代码要写在组件注册之前

// Vue.use() 等等组件库注册写在后面

```

5、在**集成系统**模块-**应用管理**页面添加所有注册的应用，接入类型选择```微应用接入```，强调主应用和通过依赖包引入的应用必须选择`模块接入`的方式。

6、**子应用**的main.js配置  

```javascript
import SuncereSys, { render } from '@suncereltd/suncere-sys'

// 微应用设置
if (window.__POWERED_BY_QIANKUN__) { // 如果是qiankun使用到了，则会动态注入路径
  window.__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
// 如果是独立运行，则手动调用渲染
if (!window.__POWERED_BY_QIANKUN__) {
  console.log('应用独立运行')
  render()
}
// 如果是微应用
export const bootstrap = async function () {
  console.log('微应用bootstrap!')
}
export const mount = async function (props) {
  console.log('微应用mount!')
  render(props)
}

export const unmount = async function () {
  console.log('微应用unmount!')
  window.vm.$destroy()
}
```

7、**子应用**的vue.config.js添加下面配置

```javascript
const appName = 'vue-sub-app'// 对应主应用注册的name
const devServer = '//localhost:9001'
const devServerPort = 9001
const proServer = '//localhost:8556'
const isProd = process.env.NODE_ENV === 'production'
const publicPath = isProd ? proServer : devServer

const vueConfig = {
  publicPath: publicPath,

  configureWebpack: {
    output: {
      library: `${appName}`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${appName}`
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
        publicPath: publicPath
      })

    const fontRule = config.module.rule('fonts')
    fontRule.uses.clear()
    fontRule
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/fonts/[name].[hash:8].[ext]',
        publicPath: publicPath
      })
      .end()

    const imgRule = config.module.rule('images')
    imgRule.uses.clear()
    imgRule
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/img/[name].[hash:8].[ext]',
        publicPath: publicPath
      })
      .end()
  },

  devServer: {
    port: devServerPort, // 每个应用端口不能一样
    headers: {
      'Access-Control-Allow-Origin': '*' // 允许开发服务器跨域
    }
  },
}
```

8、部署服务器nginx设置

```nginx
#子应用 访问必须设置跨域头，主应用可不用设置
server {
    listen       xxxx;
    server_name  XXXX;

    location / {
        root   C:\Users\xxxxxxx;
        index  index.html index.htm;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow_Credentials' 'true';
        add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';
    }
}
```


&nbsp;

## **主应用和子应用通信与信息共享（三种方式）**

+ • （父传子）由于父子应用独立不关联，如果子应用想用主应用的组件或公共方法等数据，可以通过```main.js```里面的应用注册函数通过```props```属性传递，子应用的main.js里面的```mount```函数接收，所以传到子应用的组件和vuex模块需要用在子应用的vue先注册再使用。

主应用main.js

```javascript
// 举例有个共享组件GlobalBtn需要传递到子应用，通过props应用注册属性传入
import GlobalBtn from '@/components/global-btn.vue'
const shareComponent = [
  GlobalBtn，
  组件2，
  组件3
]

// vuex模块传递
import bigScreen from './store/modules/big-screen'
const storeModule = [
  {
    name: 'bigScreen',
    module: bigScreen
  }
]

registerMicroApps(
  // 注册微应用
  [
    {
      name: 'vue-sub-app', // 子项目名称
      entry: isProd ? '//localhost:8556' : '//localhost:8035', // 不同的访问ip端口
      container: '#subApp', // 主项目渲染子项目的基座元素id名称
      activeRule: ['#/timing-task'], // 激活子应用的路径标识
      props: {
        shareComponent,
        storeModule
      }
    },
  ]
)
```

子应用main.js

```javascript
export const mount = async function (props) {
  // 接受主应用传过来的数据props
  console.log('微应用mount!', props)
  
    
  // 子应用全局注册主应用的组件
  if (props.shareComponent && Array.isArray(props.shareComponent)) {
    props.shareComponent.forEach(item => {
      Vue.component(item.name, item)
    })
  }

  // 注意，有共享组件的先注册组件再调用系统渲染函数，注意顺序
  render(props)

  // 子应用注册store模块
  if (props.storeModule && Array.isArray(props.storeModule)) {
    props.storeModule.forEach(item => {
      window.vm.$store.registerModule(item.name, item.module)
    })
  }
}
```

+ • localStorage/sessionStorage共享，因为微应用是统一渲染在主应用的域名下，所以存储信息共用。

+ • 父子互相通信（eventHub发布订阅模式）。

主应用新建eventHub文件

```javascript
class EventHub {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!eventName) {
      console.error('请传入事件名称！')
      return
    }
    if (typeof callback !== 'function') {
      console.error(`请传入事件${eventName}的回调函数！`)
      return
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }

  emit(eventName, ...args) {
    if (!eventName) {
      console.error('请传入事件名称！')
      return
    }
    if (Array.isArray(this.events[eventName])) {
      this.events[eventName].forEach(item => {
        item.apply(this, args)
      })
    } else {
      console.log(`请先添加${eventName}事件监听！`)
    }
  }

  un(eventName) {
    delete this.events[eventName]
  }

  unAll() {
    this.events = {}
  }
}
const eventHub = new EventHub()

window.eventHub = eventHub
```

主应用main.js中引入

```javascript
import './eventHub'
```

子应用向父应用传消息，父传子反过来一样，但前提是父子应用已经加载过

```javascript
// 子应用项目里任何地方都可向父应用触发消息
window.eventHub.emit('自定义事件名称','任意数据')

// 父应用项目里main.js可监听子应用的消息
window.eventHub.on('自定义事件名称', (data) => {
  // data为emit第二个参数传递的数据
  console.log('主应用监听',data)
})
```

&nbsp;


## **注意事项**

1、默认情况下多个项目部署到不同端口的服务器IP上；如果需要主应用和子应用部署到同一个IP和端口的服务器上，则需要把主应用`main.js`的注册入口`entry`、子应用的`vue.config.js`文件的`publicPath`变量写具体的应用路径下

2、子项目需要在vue.config.js修改配置打包成umd库格式。

3、子应用的反向代理服务器访问路径需要设置允许跨域。

   ```nginx
   server {
       listen       8556;
       server_name  localhost;
   
       location / {
           root   C:\Users\xxxxxxx;
           index  index.html index.htm;
           add_header 'Access-Control-Allow-Origin' '*';
           add_header 'Access-Control-Allow_Credentials' 'true';
           add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
           add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';
       }
   }
   ```

4、主应用安装qiankun.js完成注册子应用后，子应用无需再安装qiankun.js依赖包，子应用只需要在自己的main.js导出 `bootstrap`、`mount`、`unmount` 三个生命周期钩子，以供主应用在适当的时机调用。

5、主应用路由注册与子应用路由对应，例如：

```javascript
// 主应用注册填的激活路由标识，填该项目下view文件夹所有第一层路径名
activeRule: ['#/sub-app-1']

// 子应用的路由配置就应该以/sub-app-1为开头如
path: '/sub-app-1/sub-app-main'

```

6、主应用的代理接口要配置完全部子应用的所有接口代理，否则接口无法访问。

7、子应用打包配置的的library名与主应用注册的name要相同。

8、sys框架微应用的触发路径activeRule要设置成项目views文件夹下第一层的所有目录或文件名。

9、vue.config.js的publicPath要配置成服务器路径才能成功找对应的静态资源，如开发就设置成localhost:8036。

10、应用管理页面添加了微应用，主应用的main.js要注册对应的应用，不然会导致跳转白屏。

11、如果需要在应用里面配置另外一个应用里面的页面，需要到`菜单管理`页面配置对应页面所属的包名和对应的接入方式，如果需要完整地切换到另外一个应用，则需要填上改页面的应用代码！


