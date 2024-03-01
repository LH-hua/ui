# 介绍

---

`suncere-ui` 是一款基于 `Vue.js 2.6.14` 的前端 UI 组件库，在 `ant-vue-design 1.7.8` UI框架基础上 进行二次开发

## 特性

- 基于 `Vue` 开发的 UI 组件
- 使用 npm + webpack + babel 的工作流，支持 ES2015
- 提供友好的 API，可灵活的使用组件

## 浏览器支持

> 现代浏览器, 不包含IE11及以下

&nbsp;

# 快速上手

---

进行以下操作之前，请确保安装了 `Nodejs` 环境，并且已经安装了 yarn 工具

> Nodejs 统一使用 `16.14.2` 版本，请安装 [前端环境准备](http://10.10.204.156:8000/#/framework/frontend/env) 中提到的 `nvm` 插件，使用 `nvm` 进行管理 Nodejs 环境管理

yarn 工具在 Nodejs 环境安装完毕之后，通过以下命令进行安装：

```shell
npm install -g yarn
```

&nbsp;

接下来跟随以下的步骤，快速上手组件库的使用。

1、安装

```bash
yarn add @suncereltd/suncere-ui --registry=http://10.10.10.163:8081/repository/npm-group/

# 若使用nrm包源管理插件，请切换到私有包源，直接安装即可
yarn add @suncereltd/suncere-ui
```

2、配置

在 ``main.js`` 配置使用suncere-ui

```ts
import suncereui from '@suncereltd/suncere-ui'
Vue.use(suncereui)
```

3、使用

安装、配置之后，即可在vue文件中全局使用suncere-ui中的组件

```vue
<template>
  <s-time-axis :range="range" @change="onTimeAxisChange"></s-time-axis>
</template>
```
