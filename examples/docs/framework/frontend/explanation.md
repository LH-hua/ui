# 组件搭建说明

---

## 1、环境准备

```
# 本地开发环境要求
node.js: 16+

# yarn查看或按照
查看yarn版本: yarn -v
全局安装yarn: npm install -g yarn

# 克隆本仓库
# 从以下地址获取git仓库链接，若无权限请先通过邮件向配置管理人员申请权限
# http://git.suncereltd.cn:7018/summary/SuncereEnv-UI.git

$ git clone http://xxxxx@git.suncereltd.cn:7018/r/SuncereEnv-UI.git

# 或者使用 yarn
$ yarn install

# 启动开发服务器
$ yarn dev
```

&nbsp;

## 2、组件开发

### 2.1 规范

#### 2.1.1 包引用规范

工程中的npm包引用必须指定明确的版本, 正确方式如`"vue-router": "4.0.12"`，不要以`"vue-router": "^4.0.12"`引用。


> 明确版本可以避免第三方依赖包升级之后导致的变更引起bug，如有需要升级版本的包，有组件库维护人员统一升级

&nbsp;

#### 2.1.2 目录结构

> 按照项目工程规划，组件源码全部放在``/src``目录下，按照以下目录结构组织。

```
    |-- src
      |-- assets // 静态资源
        |-- css
        |-- images
      |-- components // 组件d代码
        |-- xxxx // 按组件功能类型划分文件夹
      |-- config // 全局配置文件夹
      |-- directives // 自定义指令文件夹
      |-- utils // 全局工具类文件夹
      |-- index.js
```
&nbsp;

#### 2.1.3 代码组织

组件相关代码放在``/src/components``文件夹下，根据组件功能名称进行划分文件夹，文件夹内部再根据需要划分目录结构。
当前组件根文件夹下需包含``export.js``，用于导出当前组件

    |--components
    |---- button // 组件文件夹
    |------ button.vue // 组件源码, src文件夹可能有多个文件，按实际情况自行组织，有其他当前组件依赖的子组件时也放在这里
    |------ export.js // 组件导出文件

&nbsp;

#### 2.1.4 命名规范

```
* 文件夹命名：文件夹采用kebab-case格式命名
* 文件命名：文件统一采用kebab-case格式命名
* 方法命名：Function以camelCase格式命名
* 类：类以PascalCase格式命名
* 属性命名：Prop以camelCase格式命名, Prop传值时以kebab-case格式命名
* 组件名称: 组件名称以kebab-case格式命名
* 所有``json`` 对象的字段使用 ``camelCase``命名规范
```

&nbsp;

### 2.2 组件创建

在 src/components 创建一个文件夹存放组件相关的 .vue 文件和 .js 文件，其中根目录下必须有``export.js``文件

![文件01](/examples/assets/img/baseImg/stuct.png)

一个组件开发完成后，需在``export.js``文件中将其导出。
一般如下：

```js
import OpenLayer from './open-layer.vue'

export default {
  // 组件实例
  module: OpenLayer,
  // 组件的名称  会动态添加前缀
  name: 'map',
  // 组件的描述
  desc: 'openLayer地图'
}

```
&nbsp;

### 2.3 组件文档

#### 2.3.1 示例文档创建

在 examples/docs/component 创建组件的使用文档，examples/docs/component 文件夹下的目录结构尽量与 src/components文件夹保持一致，一般一个组件一个md文档，但组件功能较多时，需针对不同功能进行拆分说明

如有使用示例需要用到静态文件，可直接在当前组件示例文件夹下添加assets文件夹存放静态资源

![文件01](/examples/assets/img/baseImg/doc-stuct.png)

&nbsp;

#### 2.3.2 目录配置

在 examples/nav.config.js 配置访问的地址

如下：

```json
{
  name: 'turf-regulation-contourf',
  path: '/component/map/turf-regulation-contourf',
  label: '污染分布图-矩形场'
}
```

如果需要增加上方一级菜单，请在 navData 中增加一个节点，如下：

```json
{
  label: '公共方法',
  name: 'snippet',
  path: '/snippet',
  redirect: '/snippet/regular',
  items: [
    {
      name: 'regular',
      path: '/snippet/regular',
      label: '全局方法'
    },
    {
      name: 'directive',
      path: '/snippet/directive',
      label: '指令'
    }
  ]
}
```

如果在左侧菜单栏需要划分目录层级，请在第一个菜单节点中加上desc字段，如下：

```json
{
  name: 'base-layer',
  path: '/component/map/base-layer',
  label: '基础地图',
  desc: '地图组件'
}
```

左侧菜单栏仅支持二级目录

&nbsp;

----------

## 3. 如何发布

> 一旦项目中的组件有进行修改更新，当前组件文档站点也必须进行更新，保证当前文档与在用的组件包版本一致。

发布当前文档项目步骤如下：

1、在当前项目目录下，通过``cmd``, 或者``vs code``等IDE运行指令`yarn build`

2、执行上述指令之后，会在工程根目录中生成一个``suncere-ui``文件夹，该文件夹为发布之后的文件，只需将其拷贝到服务器上对应的位置即可

3、修改``package.json``文件中的版本
  ```json
  {
    "version": "****"
  }
  ```

4、执行以下命令`yarn publish`发布npm包。