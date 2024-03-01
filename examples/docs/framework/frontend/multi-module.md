# 模块集成

----

系统可以作为单系统发布，也可以作为多系统模块集成到一起使用。前提是已安装`SuncereSys`和`SuncereUI`

&nbsp;

## 多系统应用模块集成

举例：有项目A，项目B，项目C三个同层级的系统项目，如果需要项目B，项目C集成到项目A中

| --projectA

|
 --projectB

|
 --projectC

&nbsp;

集成步骤如下：

1、在projectA的package.json中添加其他项目依赖

```json
dependencies: {
  "projectB": "file:../projectB",
  "projectB": "file:../projectB",
}
```

&nbsp;

2、执行安装命令（如果根目录下存在`yarn.lock`文件，先删除此文件，再执行安装）

```shell
yarn install
```

&nbsp;

3、在projectA的`extend.js`文件内`view`字段进行路由配置

```js
// 关联其他项目系统模块的页面视图
export const expand = {
  views: function (packName, item) {
    const pack = [item.businessSystemPackage, packName]
    // 项目B，根据后台配置的应用名匹配对应的项目文件夹名下的页面名称
    if (pack.indexOf('projectB') !== -1) {
      return import('projectB/src/views' + item.url)
    }
    // 项目C
    if (pack.indexOf('projectC') !== -1) {
      return import('projectC/src/views' + item.url)
    }
  }
}
```

&nbsp;

4、运行项目A，登录后台，在`集成系统`应用模块里面，打开`应用管理`页面，添加项目A、项目B和项目C作为子系统应用，添加应用包名应为项目的文件夹名

例如：项目B的项目文件夹名称为`projectB`，则包名就是`projectB`。

&nbsp;

5、在`字典管理`页面，`平台配置项`字段点击`添加明细`，在`LOGIN_LAYOUT`设置数据值为1，这样系统登录后就进入选择应用模块选择的界面，该页面将列出所有应用模块选择。（如果不想进入应用模块选择界面，则将`LOGIN_LAYOUT`设置数据值为0，然后在`应用管理`里面设定一个默认进入的应用`编辑-是否默认-是`）

&nbsp;

6、如果项目A需要用到项目B的组件或工具方法的话，则需要在项目B的根目录下的`index.js`配置安装方法，在项目A的`main.js`中引入安装项目B。

举例：项目B的根目录下编辑`index.js`（如无可新增index.js文件）

```js
import TreeTable from 'vue-table-with-tree-grid'

const install = Vue => {
  if (install.installed) return

  Vue.component('tree-table', TreeTable)
}

export default {
  install
}

```

项目A的`main.js`里面引入安装项目B，项目A就可以使用项目B提供的TreeTable组件了

```js
import Vue from 'vue'
import projectB from 'projectB'

Vue.use(projectB)
```

&nbsp;

7、不同的项目之间集成如果定义的全局方法名一样时会发生同名覆盖的问题，导致页面报错
  比如：项目A和项目B同时在全局注册了名为 `this.$info` 的全局方法/属性

  解决方法1: 在集成系统项目中引入文件进行合并

  ```js
  import Vue from 'vue'
  import airInfo from '@suncereltd/suncere-air/src/config'
  import config from './config'
  import { merge } from 'lodash'
  Vue.prototype.$info = merge(airInfo, config)
  ```

  该解决方式同样存在问题：内部存在同名方法还是会有覆盖问题，我们不推荐这么做；

  我们应该从集成的思想上就去规避这样的问题，比如每个不同的项目在注册全局的方法或属性时应当加上前缀 如大气系统：`$airInfo`; 如水系统：`$waterInfo`


&nbsp;


8、子系统的$store undefined的问题；原因：集成时sys系统库的store覆盖了子系统的$store导致了子系统的store丢失
  解决：在子系统中进行vuex模块动态注册 `registerModule`
  示例：
  ``` js
  // 在子系统中动态注册
  import airBase from './store/modules/air-base'

  window.vm.$store.registerModule('airBase', airBase)  // 固定写法；必须使用window.vm.$store
  ```

&nbsp;

9、运行项目执行命令`yarn run serve`，打包执行命令`yarn run build`

&nbsp;

## 单系统应用模块集成

例如项目A，只需集成SuncereSys的系统管理应用模块，则确保已经在`main.js`中引入`SuncereUI`和`SuncereSys`

1、运行项目A，登录后台，在`应用管理`页面，添加应用项目A（projectA）。

2、在`菜单管理`页面，向应用projectA添加子菜单，然后再将集成系统的所有子菜单挪到projectA应用的菜单下，然后在`应用管理`页面将`集成系统`应用改为`不启用`。

3、在`字典管理`页面，`平台配置项`字段点击`添加明细`，在`LOGIN_LAYOUT`设置数据值为0，这样系统登录后就直接进入管理页面了。

4、运行执行命令 `yarn run serve`，打包执行命令`yarn run build`。
