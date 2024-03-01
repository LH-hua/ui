# 前端性能优化指南
----
本指南主要针对解决实际项目中的性能优化问题，优化页面加载速度。

&nbsp;

## 1、删除不用的图片，组件等文件。

一些不用的资源，css，组件等文件也会一并打包，增加包大小，然后请求加载的时候会加载这些资源，会拖慢加载速度。

可使用`unused-webpack-plugin`webpack插件对无引用文件检测，配置好后运行项目即可在CMD控制台看到无引用的文件，我们对检测出来的文件应确保不再使用后谨慎删除！

插件安装`yarn add unused-webpack-plugin --dev` 

```
const path = require('path')
const UnusedWebpackPlugin = require('unused-webpack-plugin')

const vueConfig = {
  configureWebpack: {
    plugins: [
      // 分析没有引用的文件
      new UnusedWebpackPlugin({
        directories: [path.join(__dirname, 'src')],
        root: path.join(__dirname, '../')
      })
    ],
  }
}
```

&nbsp;

## 2、nginx配置HTTP2协议

如果有条件，可以将服务器传输协议由`HTTP1.1`升级到`HTTP2`，此项配置需要在`nginx`服务器配置；

`HTTP2`相比于`HTTP1`协议在传输效率上有很大的提升，支持多路复用（一个TCP连接可以一次发送和接受多个请求），请求响应首部压缩，二进制分帧传输数据（效率更高）。

&nbsp;

## 3、nginx配置开启gzip传输格式

gzip为一种压缩文件格式，如果传输的资源里面有gzip压缩文件，将会以gzip格式传输到浏览器，然后浏览器会自动解压为我们所需的原始文件，相比于普通传输可以大幅提升传输效率，降低资源加载时间。开启配置如下：

```
http {
  #开启gzip
  gzip on;

  #是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;

  #启用gzip压缩的最小文件，小于设置值的文件将不会压缩
  gzip_min_length 1k;

  gzip_proxied any;

  #gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
  gzip_comp_level 6;

  #设置压缩所需要的缓冲区大小
  gzip_buffers 16 8k;

  #设置gzip的版本
  gzip_http_version 1.1;

  #进行压缩的文件类型。javascript有多种形式，后面的图片压缩不需要的可以自行删除
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

&nbsp;

## 4、前端项目打包配置开启gzip打包（nginx需开启gzip传输）

前端实际项目可使用`compression-webpack-plugin`webpack插件对打包文件压缩成gzip格式，需要在对于的vue.config.js里面进行配置，如下：

插件安装`yarn add compression-webpack-plugin@5.0.1 --dev` 

```
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const vueConfig = {
  configureWebpack: {
    plugins: [
      // 打包gzip（插件配置使用文档https://www.npmjs.com/package/compression-webpack-plugin）
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,  //要处理的文件格式
        threshold: 10240,  //仅处理大于10240字节的文件
        minRatio: 0.8
      })
    ],
  }
}
```

&nbsp;

## 5、压缩js文件

前端实际项目可使用`terser-webpack-plugin`webpack插件对JavaScript文件进行压缩混淆，去除空格，注释，debugger和console，降低js文件大小，需要在对于的vue.config.js里面进行配置，如下：

插件安装`yarn add terser-webpack-plugin@4.2.3 --dev` 

```
const TerserPlugin = require('terser-webpack-plugin')

const vueConfig = {
  configureWebpack: {
    plugins: [
      // 压缩js代码（插件配置使用文档https://www.npmjs.com/package/terser-webpack-plugin）
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          warnings: false,
          compress: {
            drop_console: true, // 去除console
            drop_debugger: true, // 去除debugger
            pure_funcs: ['console.log']
          },
          sourceMap: true 
        }
      }),
    ],
  }
}
```

&nbsp;

## 6、去除生产环境的sourceMap 

项目打包之后js文件夹中，会自动生成一些map文件，即sourceMap资源映射文件，存的是打包前后的代码位置，方便开发使用，这个占用相当一部分空间。配置文件关闭`productionSourceMap`属性。

```
const vueConfig = {
  // 确保此属性为false
  productionSourceMap: false,
}
```
&nbsp;

## 7、去除资源预加载标签的prefetch属性

vue-cli脚手架默认开启了`prefetch`，当我们项目很大时，这个就成了首屏加载的最大元凶了。

先简单了解一下 preload 与 prefetch：

preload 与 prefetch 都是一种资源预加载机制；

preload 是预先加载资源，但并不执行，只有需要时才执行它；

prefetch 是意图预获取一些资源，以备下一个导航/页面使用；

preload 的优先级高于 prefetch。

```
const vueConfig = {
  chainWebpack: config => {
    // 移除 prefetch(预取) 插件
    config.plugins.delete('prefetch')
  }
}
```
&nbsp;

## 8、分析项目打包后各文件占比

项目可使用`webpack-bundle-analyzer`webpack插件进行打包文件占比分析，然后针对性的对相应文件进行优化。配置如下：

插件安装`yarn add webpack-bundle-analyzer --dev` 

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const vueConfig = {
  configureWebpack: {
    plugins: [
      // 打包分析工具
      new BundleAnalyzerPlugin()
    ],
  }
}
```
