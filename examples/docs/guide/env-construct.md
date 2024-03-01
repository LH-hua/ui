# 新员工开发环境搭建指南

---

## 1. 开发工具安装

+ ### 1.1 代码版本管理 Git + Fork


- 公司目前大部分项目代码管理使用 Git 版本管理系统，搭建有内部 Git 服务器，为了之后能够快速得融入公司开发管理体系，也为了统一相关工具的使用，新员工需要做以下事情：

      (1) 申请内部 Git 仓库账号
          以邮件的方式发送给配置管理人员，抄送你的主管人员，邮件需说明申请账号人员、事由，如需开通某个项目代码权限，请说明 项目Git库路径、权限范围。

      (2) 安装 Git
          Git 安装教程请阅读 [第三方工具—开发工具、运行环境— Git](http://10.10.204.156:8000/#/common-tools/develop-tools/git) 。

      (3) 安装可视化的Git管理工具——Fork
          Fork 安装使用教程请阅读 [第三方工具—开发工具、运行环境— Fork](http://10.10.204.156:8000/#/common-tools/develop-tools/fork) 。
&nbsp;

+ ### 1.2 Visual Studio 2019 或 2022

- Visual Studio（简称VS）是.net开发人员最常用的集成开发环境（IDE），最常用的开发工具。安装教程请阅读 [第三方工具—开发工具、运行环境— Visual Studido](http://10.10.204.156:8000/#/common-tools/develop-tools/vs)

&nbsp;

+ ### 1.3 Visual Studio Code

- Visual Studio Code是微软公司的开源的一款轻量级IDE，支持插件扩展，用户可以通过安装各种以支持开发语言环境。在我们公司现行技术栈下，我们一般将其作为前端开发IDE。安装教程请阅读 [第三方工具—开发工具、运行环境— Visual Studido](http://10.10.204.156:8000/#/common-tools/develop-tools/vscode)

&nbsp;

+ ### 1.4 数据库连接工具

- 日常开发中必不可少地需要连接数据库查看数据情况，目前公司推荐统一使用navicate进行数据库访问，开发人员可通过阅读以下教程 [第三方工具—开发工具、运行环境— Navicat](http://10.10.204.156:8000/#/common-tools/develop-tools/navicate) 进行工具安装。

&nbsp;

## 2. 前端环境安装

+ ### 2.1 Nodejs安装

- 目前公司前端技术栈使用 `Vue.js 2.6.14`，Vue 开发依赖于 `Nodejs` 环境，进行前端开发需要先安装 Nodejs，Nodejs 统一使用 `16.14.2` 版本，但为了方便版本切换和管理，请不要直接安装 Nodejs，推荐通过 `nvm` 插件进行 Nodejs 版本管理。

- `nvm` 安装和使用请阅读以下教程： [第三方工具—开发工具、运行环境— nvm](http://10.10.204.156:8000/#/common-tools/develop-tools/nvm)

&nbsp;

+ ### 2.2 私有包源配置

- 公司内部搭建了私有的 npm 源，为方便不同 npm 包源之间的切换和管理，前端开发请按照包源管理工具 `nrm`。

- 安装和使用教程请见：[前端开发指南—环境准备](http://10.10.204.156:8000/#/framework/frontend/env)
