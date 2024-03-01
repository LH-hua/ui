# 微信小程序开发流程指南

----
整体流程可查看微信官方介绍`https://developers.weixin.qq.com/miniprogram/introduction/#小程序注册`


&nbsp;

## 前期准备

1、**公众号注册**。先到微信公众平台注册小程序公众号`https://mp.weixin.qq.com/`，一个小程序公众号代表一个小程序，企业微信公众号可以关联多个小程序公众号。

2、**信息补充**。小程序类型分为个人小程序和企业小程序，如某些服务类目需要企业资质的则需补充完整对应的企业信息，否则小程序在发布审核阶段不会通过，企业小程序认证需要300元/年的认证费用。具体类目请查看`https://developers.weixin.qq.com/miniprogram/product/material/`

3、**成员添加**。在公众号-成员管理一栏添加对应权限的微信号（运营者、开发者、数据分析者）。

4、**开发工具下载安装**。在官网下载安装微信小程序开发者工具`https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html`。

5、**服务域名准备**。点击 公众号平台-开发管理-开发设置页面，设置服务器域名（域名必须备案且需要使用https），后端服务需要部署到此域名，小程序端才能正确发送接收接口请求。开发工具调试可不用域名https访问接口，需要在开发工具右上角详情-本地设置勾选不校验合法域名即可；如需体验版小程序也不校验域名，则需要打开小程序右上方点击开启开发调试模式。

6、**开发准备**。打开微信开发者工具，新建项目，每一个小程序项目需要配置对应小程序公众号的AppID(小程序ID)，可在小程序平台-开发管理-开放设置页面看到。

&nbsp;

## 开发限制

1、**代码大小限制**。每个小程序主包/分包的总代码资源大小不能超过2M，每个小程序主包支持多个分包加载，主包+分包总大小不能超过20M。

2、**体验版限制**。打开体验版需要添加成员，如果不是项目成员，则需要添加至体验成员一栏。

3、**个人版小程序限制**。无法使用webview组件打开第三方内嵌网页，无法使用普通二维码打开微信小程序的指定页面，无法获取用户手机号，不支持支付功能，不支持社区业务功能等。

4、**业务设计限制**。不能一打开小程序就要求用户注册登录才能使用小程序，需要展示一部分功能，然后引导用户注册/登录。

&nbsp;

## 发布审核限制

1、具体审核规则请看`https://developers.weixin.qq.com/miniprogram/product/reject.html`

&nbsp;

## 开发文档

1、小程序开发指南介绍`https://developers.weixin.qq.com/miniprogram/dev/api/`

2、小程序组件文档`https://developers.weixin.qq.com/miniprogram/dev/component/`

3、小程序API文档`https://developers.weixin.qq.com/miniprogram/dev/api/`
