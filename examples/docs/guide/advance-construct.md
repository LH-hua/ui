# 开发人员学习指南

---

本页面旨在结合流行技术、公司技术栈、公司业务，为开发人员提供一些持续进行技术学习的路线参考。

&nbsp;
&nbsp;

## 前端

---

### 1. 入门

以下为前端入门级必需掌握的技术，点击链接可进入相应的网站，只要涉及前端功能开发的人员都要将以下网站的内容看一遍（Ant-Vue-Design、Echarts 除外，可在使用的时候查阅文档）

- [ES6](https://es6.ruanyifeng.com/): 于2015年正式发布的JavaScript语言的标准。

- [Css](https://www.w3cschool.cn/css/): 一种描述 HTML 文档样式的语言, 告诉浏览器应该如何显示 HTML 元素。

- [HTML](https://www.w3cschool.cn/html/): 超文本标记语言，是一种用于创建网页的标准标记语言。

- [Vue](https://cn.vuejs.org/v2/guide/): 一款流行的JavaScript前端框架，一款 [MVVM](https://zhuanlan.zhihu.com/p/439724486) 框架。

- [Ant-Vue-Design](https://1x.antdv.com/docs/vue/introduce-cn/): 一款由蚂蚁金服开源的前端ui组件库。

- [Echarts](https://echarts.apache.org/zh/index.html): 一款数据可视化展示工具库。

&nbsp;

### 2. 进阶

进阶阶段逐渐开始考虑前端工程内在的东西，如打包编译、框架构建、框架性能等，进入这个阶段的开发人员应能指导前端项目的全生命周期流程，熟悉常用的前端工程插件，基本上具备个人建站的能力，结合公司业务，还应该掌握大部分的 GIS 技术。

- [Less](https://less.bootcss.com/): 一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。Less 可以运行在 Node 或浏览器端。

- [Vue-Router](https://router.vuejs.org/zh/): Vue 框架路由插件。

- [Vuex](https://vuex.vuejs.org/zh/): Vue 框架状态管理插件。

- [Vue-Cli](https://cli.vuejs.org/zh/): vue 框架的命令行插件，用于管理 vue 工程生命周期。

- [Openlayers](https://openlayers.org/): 一个专为Web GIS 客户端开发提供的JavaScript 类库包，用于实现标准格式发布的地图数据访问。

- [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial): HTML5中新增的标签用于在网页实时生成图像，并且可以操作图像内容，是一个可以用JavaScript操作的位图（bitmap）。

- [Nodejs基础](https://www.runoob.com/nodejs/nodejs-tutorial.html): 可以只看前几节，了解 Nodejs 和 npm 即可，后续持续了解 Nodejs 各种插件。

- [Webpack](https://www.webpackjs.com/): 一个用于前端资源加载、打包的 Nodejs 插件。

- [Babel](https://www.babeljs.cn/): 一个用于 JavaScript 编译的 Nodejs 插件。

- [Eslint](https://eslint.bootcss.com/)：一个用于 javascript 、 jsx 代码检测、规范化的 Nodejs 插件。

- [Nginx 反向代理](https://www.runoob.com/w3cnote/nginx-setup-intro.html): 一个高性能的HTTP和反向代理web服务器。

&nbsp;

### 3. 深入

- [TypeScript](https://www.tslang.cn/): 一个开源的编程语言，通过在JavaScript的基础上添加静态类型定义构建而成。

- [Nodejs深入](http://nodejs.cn/learn): 一个基于 Chrome V8 引擎的 JavaScript 运行环境。

- [Jest](https://www.jestjs.cn/): 一个 用于进行前端单元测试的 JavaScript 测试框架。

- [Mock](http://mockjs.com/): 一个 用于前端生成模拟数据，实施前后端分离开发的工具。

&nbsp;

## 后端

---

### 1. 入门

以下为后端入门级必需掌握的技术，点击链接可进入相应的网站。

- [C#基础](https://docs.microsoft.com/zh-cn/dotnet/csharp/)：C# 基本语法，必需掌握 `集合`、`Linq`、`泛型`、`异步Task`等。

- [T-Sql](https://www.w3cschool.cn/t_sql/)：基本的Sql脚本语法。

- [.Net Core 3.1:WebApi章节](https://docs.microsoft.com/zh-cn/aspnet/core/web-api/?view=aspnetcore-3.1)：.Net Core WebApi开发官方教程。

- [EF Core](https://docs.microsoft.com/zh-CN/ef/core/get-started/overview/first-app?tabs=netcore-cli)：微软官方数据访问ORM，通过官方教程可了解ORM的基本概念和使用方式。

- [ABP](https://docs.abp.io/zh-Hans/abp/3.3)

### 2. 进阶

- [.Net Core 3.1](https://docs.microsoft.com/zh-cn/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-3.1)：.Net Core完整教程，最少通过该教程理解 .Net 管道模型、中间件、选型系统(options)、依赖注入、缓存系统、日志系统、配置系统、文件系统、异常处理等。若能将整个教程文档看完并理解，在.Net领域基本能达到接近高级的水平。

    - 扩展:

      - [.Net 6](https://docs.microsoft.com/zh-cn/aspnet/core/?view=aspnetcore-6.0)：我们公司还未升级.Net SDK，但对于.Net技术栈而言，.Net 6已不是新奇的东西了，有兴趣跟随.Net迭代脚步的开发人员可以自行了解。

- [单元测试]()

- [Linux基础](http://www.yunweipai.com/33769.html)：随着.Net跨平台，需要了解一些Linux基础知识，知道怎么在shell中去做一些基本操作，以应对在Linux部署应用的情况。

- [Nginx](https://www.runoob.com/w3cnote/nginx-setup-intro.html)：一个高性能的HTTP和反向代理web服务器。

- [领域驱动设计]()：理解领域驱动设计思想。

- [微服务架构基础]()：了解微服务基本概念和基础思想，以及技术应用的背景。

### 3. 深入
