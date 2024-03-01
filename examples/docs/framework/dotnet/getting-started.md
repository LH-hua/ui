# 创建新的解决方案

---

## 包源配置

如开发环境未配置公司私有包源管理地址，请先配置包源管理

打开 vs , 在上方的菜单中选择 工具 -> nuget包管理器 -> 程序包管理器设置

![alt](../../../assets/img/framework/dotnet/package-source.png)

选择程序包源，添加一个配置，自定义名称，源地址为：`http://10.10.204.172:8081/repository/nuget-group/`

![alt](../../../assets/img/framework/dotnet/set-package-source.png)

填写完成记得勾选，然后点击确定。

## 项目工程模板

### 1、NuGet 包安装方式

```bash
dotnet new --install Suncere.Template
```

### 2、模板文件安装方式

- 下载 模板文件压缩包并解压，如：SuncereTemplate.zip

- 进入解压后的根目录

- 输入以下命令进行安装

```bash
dotnet new --type solution -i .
```

## 卸载模板

- 输入以下命令，显示安装的模板列表

```bash
dotnet new --uninstall
```

- 根据提示，删除对应模板即可

```bash
dotnet new --uninstall Suncere.Template
```

## 使用模板创建项目

> 项目名称请使用 `Suncere.<微服务名>` 格式

1、命令行创建

```bash
dotnet new SuncereTemplate -n <项目名>
```

2、Visual Studio 2022

## 创建新项目

使用模板创建项目 Suncere.Sample，（使用实际的项目名称替换 Sample）如下图所示

![创建新项目](https://s3.328888.xyz/2022/08/15/hONDN.png)

![配置新项目](https://s3.328888.xyz/2022/08/15/hOjgB.png)

## 解决方案结构

解决方案具有分层结构，并包含单元测试项目，如下图所示

![解决方案结构](https://s3.328888.xyz/2022/08/15/huDPB.png)

# 运行解决方案

## 修改配置文件

复制粘贴 Suncere.Sample.HttpApi.Host 项目中的 appsettings.json 文件，并重命名为 appsettings.Development.json，appsettings.json 用于生产环境，appsettings.Development.json 用于开发环境，appsettings.Development.json 只保存在本地，不上传到 Git 仓库，如下图所示

![复制配置文件](https://s3.328888.xyz/2022/08/15/h4HaI.png)

修改 ConnectionStrings 节点中的连接字符串，默认数据库为 MySql

```json
"ConnectionStrings": {
    "Default": "Server=10.10.10.122;Port=3308;Database=suncere_sample; User=root;Password=1qasw2!@;character set=utf8;Max Pool Size=200;Min Pool Size=3;pooling=true;Connection Lifetime=0"
}
```

修改 nacos 节点中的 ServerAddress、Namespace、ServiceName

```json
"nacos": {
    "ServerAddresses": [ "http://10.10.204.165:8848" ],
    "DefaultTimeOut": 15000,
    "Namespace": "Suncere.Sample",
    "ListenInterval": 1000,
    "ServiceName": "suncere-sample",
    "GroupName": "DEFAULT_GROUP",
    "ClusterName": "DEFAULT",
    "Weight": 100,
    "RegisterEnabled": true,
    "InstanceEnabled": true,
    "PreferredNetworks": "", // select an IP that matches the prefix as the service registration IP
    "UserName": "nacos",
    "Password": "nacos",
    "AccessKey": "",
    "SecretKey": "",
    "ConfigUseRpc": false, // 为true时，通过 gRPC 去和 nacos server 交互，nacos 2.x版本要设置为true
    "NamingUseRpc": false, // 为true时，通过 gRPC 去和 nacos server 交互, nacos 2.x版本要设置为true
    "LBStrategy": "WeightRandom", //WeightRandom WeightRoundRobin
    "Metadata": {
      "aa": "bb",
      "cc": "dd"
    }
}
```

为避免开发环境和测试环境相互干扰，请将 `appsettings.json` 文件复制一份，命名为 `appsettings.Development.json`，将`appsettings.Development.json` 中nacos配置的权重更改为 `1` ，`appsettings.Development.json` 只保存在本地，不上传到 Git 仓库，一般情况下开发环境只修改`appsettings.Development.json`，不修改 `appsettings.json`

![alt](../../../assets/img/framework/dotnet/appsettings-develop.png)

## 修改常量值

修改 Suncere.Sample.Domain.Shared 项目中的 BaseSharedConst 类中的常量

```csharp
/// <summary>
/// 应用名称，请根据不同应用修改
/// </summary>
public const string AppName = "Sample";

/// <summary>
/// 微服务注册名称
/// </summary>
public const string ServiceName = "suncere-sample";

/// <summary>
/// api url 模板，请根据不同应用修改
/// </summary>
public const string ApiUrlTemplate = "api/sample/[controller]";
```

## 修改日志配置

修改 Suncere.Sample.HttpApi.Host 项目中的 serilog.json 文件，根据 Seq 使用教程获取并修改 Serilog 节点中的 serverUrl、apiKey

```json
"Serilog": {
    "WriteTo": [
      {
        "Name": "Seq", // 配置seq日志记录器
        "Args": {
          "outputTemplate": "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] [{CorrelationId}] {Message:lj}{NewLine}{Exception}",
          "serverUrl": "http://10.10.204.165:5341", // seq api 地址
          "apiKey": "gV5HmVyYMA5YPDh8doXW" // api key
        }
      }
    ],
    "MinimumLevel": { // 配置日志最小级别，这里的级别是本地应用的级别，写入seq时会被Api key中配置的级别再次过滤
      "Default": "Information",
      "Override": {
        "Microsoft": "Information",
        "System": "Information",
        "Microsoft.EntityFrameworkCore": "Information"
      }
    }
}
```

## 修改应用端口

修改 Suncere.Sample.HttpApi.Host 项目中的 launchSettings.json 文件，修改 profiles 节点中的 applicationUrl 中的端口号

```json
"profiles": {
    "Suncere.Sample.HttpApi.Host": {
      "commandName": "Project",
      "applicationUrl": "http://0.0.0.0:45678",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
}
```

## 运行应用程序

右键 Suncere.Sample.HttpApi.Host 项目，将该项目设为启动项目，然后键入 Ctrl + F5，运行应用程序，之后使用浏览器打开 http://localhost:45678（45678为上面修改的端口号）

![运行应用程序](https://s3.328888.xyz/2022/08/16/hMIwg.png)

可以在 `Nacos` 相应命名空间下的服务列表看到相应的服务，可以在 `Seq` 上看到日志输出

即当前服务开发环境搭建完成，可以进行正常开发了
