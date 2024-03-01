<h1 align="center">Suncere-UI 环保大数据框架</h1>

## 项目下载和运行

- 安装依赖

```
npm install
```

- 开发模式运行

```
npm run dev
```

- 编译项目

```
npm run build:js  打包脚本
npm run build:style  打包样式
```

- 发布到私服

```
npm login -registry http://10.10.10.163:8081/repository/npm-host/
npm publish -registry=http://10.10.10.163:8081/repository/npm-host/
```

安装问题：

- 1.yarn 命令未安装时通过运行以下命令进行安装

```
npm install -g yarn
```
