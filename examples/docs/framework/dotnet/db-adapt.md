# 数据库适配

---

关系型数据库是我们日常开发中最常见的数据持久化技术，为避免不同数据库切换带来的问题和成本，我们采用orm框架进行数据库访问，不面向数据库开发，不使用sql脚本。

我们的业务具有以下特点：

    1. 存在一些基础表，这些基础表为单表，表与表之间有关联关系，属于典型的关系模型

    2. 存在一些监测数据表，这些表数据量大，通常需要按一定规则进行分表

基于第一种情况，我们选择ef core框架进行基础表的管理，基于第二种情况，在不适应第三方数据库中间件的情况，需要orm能够能满足分表分库的基本需求，又由于目前国产化的发展趋势，需要要求orm能够兼容国产数据库，所以选择了FreeSql.

框架采用两套ORM框架，分别为 EF core和FreeSql。

- EF Core 作为主要的orm,管理基础库表。

- FreeSql 作为 EF Core 的补充，主要应对分表分库的监测数据，框架对分表规则分表规则进行了封装，并基于FreeSql进行了实现。支持通过json文件自定义分表字段，分表的解析方式。目前支持按`时间`、`时间+字符串表达式` 两种方式进行分表。

&nbsp;

## 1. EF core 使用

待补充

&nbsp;

## 2. 分表需求

如若项目需要使用分表，可引用 Suncere.Abp.FreeSql 包

1、于仓储层创建 freeSql 工程；

创建方式请参考 Abp 官方文档，Abp 版本使用 3.1

链接：[Abp官方文档](https://docs.abp.io/zh-Hans/abp/3.1/Getting-Started-AspNetCore-Application)

2、安装 Suncere.Abp.FreeSql 包；

3、根据数据库类型，安装对应的 NuGet 扩展包

|  数据库   | NuGet  | 描述 |
|  ----  | ----  |----  |
| DaMeng  | Suncere.Abp.FreeSql.DaMeng | 达梦 |
| HanGao  | Suncere.Abp.FreeSql.HanGao | 瀚高 |
| MySql  | Suncere.Abp.FreeSql.MySql | MySql |
| Oracle  | Suncere.Abp.FreeSql.Oracle | Oracle |
| PostgreSQL  | Suncere.Abp.FreeSql.Pg | PostgreSQL |
| Sqlite  | Suncere.Abp.FreeSql.Sqlite | Sqlite |
| SqlServer  | Suncere.Abp.FreeSql.SqlServer | SqlServer |

4、配置

（1）在 FreeSqlModule 类中添加特性 [DependsOn(typeof(SuncereAbpFreeSqlMySqlModule))]

（2）ConfigureServices 函数中增加数据库服务配置

```C
[DependsOn(typeof(SuncereAbpFreeSqlMySqlModule))]
public class FreeSqlModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        // 通过 FreeSqlConnectionOptions 配置数据库类型
        Configure<FreeSqlConnectionOptions>(options =>
        {
            // 默认数据库
            options.UseMySql("ConnectionStringName");
        });
    }
}
```

5、分表规则

(1) 按 `时间` 分表

待补充

(2) 按 `时间+ 字符串表达式` 分表
在启动项目中，创建 subsetting.json 配置文件，内容如下：

```json
{
  // DO实体类全名称
  "Suncere.AirBase.ObservationData.ObservationDataDO": {
    // 分表规则 Suncere.Abp.Data.DateExpressionSubRule 为按照某一时间字段进行分表
    "SubRuleType": "Suncere.Abp.Data.DateExpressionSubRule",
    // 分表依据-时间字段
    "SubRoute": "TimePoint",
    // 分表规则设置
    "DateExpressionRules": [
      {
        // 需要进行分表的表名
        "Expressions": [ "station_hour_act", "station_hour_std" ],
        // 分表规则，边界
        "Rules": [
          {
            // 分表后缀，符合规则自动进行表名拼接，如 station_hour_act_201501
            "Suffix": "201501",
            // 开始时间戳
            "StartTimeStamp": 1420041600,
            // 结束时间戳
            "EndTimeStamp": 1422719999
          },
          {
            "Suffix": "201502",
            "StartTimeStamp": 1422720000,
            "EndTimeStamp": 1425139199
          },
          {
            "Suffix": "201503",
            "StartTimeStamp": 1425139200,
            "EndTimeStamp": 1427817599
          }
      }
    ]
  }
}
```

6、FreeSql在项目中的使用

注入 IFreeSqlSession，即可进行CRUD操作

```C
private readonly IFreeSqlSession _freeSqlSession;
```

分表使用以下扩展

```C
public static ISelect<T> SubTableWhere<T>(this ISelect<T> select, Expression<Func<T, bool>> exp, IExtensionExpression extension = null)

public static IInsert<T> SubTableInsert<T>(this IFreeSql freeSql, T source, IExtensionExpression extension = null)

public static int SubTableInsertMany<T>(this IFreeSql freeSql, IEnumerable<T> source, IExtensionExpression extension = null)

public static int SubTableUpdate<T>(this IFreeSql freeSql, Expression<Func<T, bool>> exp, Action<IUpdate<T>> action, IExtensionExpression extension = null)

public static int SubTableDelete<T>(this IFreeSql freeSql, Expression<Func<T, bool>> exp, Action<IDelete<T>> action = null, IExtensionExpression extension = null)
```
