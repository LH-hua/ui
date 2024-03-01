# 项目模板下载

1、全局安装`suncere-cli`工具
```
npm i suncere-cli -g --registry=http://10.10.10.163:8081/repository/npm-group/

# 若使用nrm包源管理插件，请切换到私有包源，直接安装即可
npm i suncere-cli -g
```

&nbsp;

2、打开命令行工具，执行命令
```
suncere-cli create
```
接着按照提示输入项目名称，选择模板`suncere-project-template(vuecli-antd1.4-vue2.6)`，等待下载成功即可，下载成功后可选择是否为此项目安装依赖（如选是即执行`yarn instal`命令安装依赖）。

注意： 此项目模板已添加`SuncereUI`和`SuncereSys`依赖，因此无需再手动加入依赖。

&nbsp;

3、项目根目录的`vue.config.js`配置后台接口代理

```
devServer: {
  port: 8000,
  proxy: {
    '/api/': {
      target: 'http://xxx.xxx',  // 需要配置实际项目api接口IP地址
      ws: false,
      changeOrigin: true
    }
  }
}
```

&nbsp;

4、`yarn run serve`运行模板。

&nbsp;

# 项目模板主要文件目录结构规范说明

如果项目模板里面没有所提及的目录或文件时，新建相关的文件目录需统一按此规范结构来命名

```
-src
| --assets（资源文件夹）
| --config（配置文件夹）
| --api（统一管理api请求的文件夹）
| --components（公共组件文件夹）
   | -- componentA（组件A文件夹）
   | -- componentB（组件B文件夹）
| --store（vuex文件夹）
   | --index.js（vuex注册和初始化）
   | --getters.js（vuex的getters文件）
   | --modules（vuex模块文件夹）
      | --moduleA.js（vuex模块A）
| --utils（公共工具方法文件夹）
| --views（页面视图文件夹）
   | --pageA（举例页面A文件夹）
      | -- index.vue（页面A的具体文件）
   | --pageB（举例页面B文件夹）
      | -- index.vue（页面B的具体文件）
|-extend.js（项目配置扩展文件）
|-index.js（作为依赖文件导出的文件）
|-main.js（项目运行主入口）
-vue.config.js（vuecli配置文件）
-package.json（依赖模块管理文件）
```

