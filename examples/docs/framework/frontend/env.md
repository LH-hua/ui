# 前端开发环境准备

---

目前公司前端技术栈使用 `Vue.js 2.6.14`，Vue 开发依赖于 `Nodejs` 环境，进行前端开发需要先安装 nodejs，nodejs 统一使用 `16.14.2` 版本，但为了方便版本切换和管理，请不要直接安装 nodejs，推荐通过以下插件进行 Nodejs 版本管理。

> 项目里面的vue以及vue的插件库版本一定要对应，不然会运行报错！！（版本号前记得去掉小箭头^）
```
"vue": "2.6.14",
"vue-template-compiler": "2.6.14",
"core-js": "3.22.5"
```

&nbsp;

## Nodejs 版本管理工具 - nvm

``nvm(node version manager )``是``Nodejs``的版本管理工具。由于不同的项目中的依赖包安装可能会受``Nodejs``版本影响，这就需要我们在不同的项目下使用不同的``node``版本。

nvm就是一个比较好用nodejs管理工具，可以方便地切换nodejs版本。

安装和使用教程请查阅：[nvm下载安装及使用](http://10.10.204.156:8000/#/common-tools/develop-tools/nvm)

&nbsp;
&nbsp;

---

## 包源管理工具 - nrm

``nrm(npm registry manager )``是``npm``的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在``npm`` 源间切换。

公司内部也有私有的 npm 源，使用 nrm 可以快速的进行私有源和公开源的切换，方便的进行管理，在安装组件库的时候也不需要声明当前包源。

> nrm 的安装和使用请参考：[nrm安装与配置](https://www.jianshu.com/p/94d084ce6834)

`nrm` 安装完成之后，使用以下命令添加私有包源：

```shell
nrm add suncereltd http://10.10.10.163:8081/repository/npm-group/
```

使用以下命令使用私有包源

```shell
nrm use suncereltd
```
