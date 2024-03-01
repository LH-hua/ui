# XXL_JOB

---

`XXL-JOB` XXL-JOB是一个分布式任务调度平台。它主要分为两部分：调度中心，任务执行器。安装包地址：[XXL-JOB-2.3.0](http://10.10.204.156:8001/第三方工具/01中间件/xxljob/安装包/xxl-job-admin-2.3.0.jar)

&nbsp;

## 1. 安装

### 1.1 环境准备

XXL-JOB是java开发的应用，依赖java环境，请先安装 `jdk-1.8`，jdk安装请见 [第三方工具-开发工具、运行环境-jdk](http://10.10.204.156:8000/#/common-tools/develop-tools/jdk) 。

&nbsp;

### 1.2 上传

（1）在服务器上创建一个xxlJob文件夹，将xxlJob程序包上传到新建的文件里

### 1.3 启动脚本编写

在xxlJob目录里面编写java工程启动脚本，注意配置信息根据项目修改，如数据库连接

Linux下, 通过以下命令创建启动脚本文件:

```shell
vi start.sh
```

脚本内容如下：

```shell
# start.sh
#!/bin/sh
port="-Dserver.port=8012"
datasourceUrl="-Dspring.datasource.url=jdbc:mysql://xxx:3306/suncere_auth_system?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8&autoReconnect=true&failOverReadOnly=false"
datasourceUserName="-Dspring.datasource.username=xxx"
datasourcePassword="-Dspring.datasource.password=xxx"
datasourceDriver="-Dspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver"
databaseId="-Dmybatis.configuration.database-id=mysql"
nohup java $port $datasourceUrl $datasourceUserName $datasourcePassword $datasourceDriver $databaseId -jar -Xms1024m -Xmx2048m ./xxl-job-admin-2.3.0.jar > ./log2.txt &

```

> 备注：因shell脚本在linux运行的特殊性，$这个字符要慎用，因为这个字符在linux上是一个特殊字符，如果使用了该字符脚本运行是会出现参数值不对的错误，例如：redisPassword="-Dspring.redis.password=suncere$123"里面的suncere$123，当脚本运行时suncere$123会被解析成suncere23，从而导致redis的密码错误。

Windows下先右键新增text文件，文件名称改为start，后缀名改为cmd

脚本内容如下

```shell
title xxl-job-admin-2.3.0.jar
set datasourceUrl="-Dspring.datasource.url=jdbc:mysql://xxx:3306/suncere_auth_system?serverTimezone=UTC&characterEncoding=utf-8"
set datasourceUserName="-Dspring.datasource.username=xxx"
set datasourcePassword="-Dspring.datasource.password=xxx"
set datasourceDriver="-Dspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver"
set databaseId="-Dmybatis.configuration.database-id=mysql"
java %datasourceUrl% %datasourceUserName% %datasourcePassword% %datasourceDriver% %databaseId% -jar -Xms1024m -Xmx2048m ./xxl-job-admin-2.3.0.jar --server.port=8012

```

以上启动脚本均以mysql数据库示例，如使用其他数据库，需要修改脚本中的数据库连接字符串、数据库驱动等

达梦数据库修改内容如下：
```
-Dspring.datasource.url=jdbc:dm://ip地址:端口号/模式名称
-Dspring.datasource.username=用户名
-Dspring.datasource.password=密码
-Dspring.datasource.driver-class-name=dm.jdbc.driver.DmDriver
-Dmybatis.configuration.database-id=dm
```

金仓数据库修改内容如下：
```
-Dspring.datasource.url=jdbc:kingbase8://ip地址:端口号/模式名称
-Dspring.datasource.username=用户名
-Dspring.datasource.password=密码
-Dspring.datasource.driver-class-name=com.kingbase8.Driver
-Dmybatis.configuration.database-id=Kingbase
```
