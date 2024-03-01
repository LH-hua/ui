# 全局方法

封装常用的方法，通过`this.$xxx.xxx()`来调用。

---

## **表单校验器**

通过`this.$validator.xxx()`来调用。

目前内置以下 ruleName 规则名称：

- zh（是否是中文）
- en（是否是英文）
- number（是否是正整数）
- enNum（只能输入包含英文、数字）
- url（网址）
- urlPort（带有端口号的网址）
- base64（base64 格式）
- identity（身份证号码）
- postal（邮政编码）
- creditCode（统一社会信用代码）
- creditCodeLoose（统一社会信用代码(宽松匹配)(15 位/18 位/20 位数字/字母)）
- bankCard（银行卡号）
- phone（手机号码）
- email（邮箱）

&nbsp;

### **`$validator.getRule(ruleName)`**

参数

`ruleName`（String）规则名称

返回

```
例如
{
	pattern: /^[\u4e00-\u9fa5]+$/,
	message: '请输入中文'
}
```

&nbsp;

### **`$validator.testRule(value,ruleName)`**

参数

`value`（String）要测试的值

`ruleName`（String）规则名称

返回

`true` or `false `(Boolean)是否匹配规则

&nbsp;

---

## **公共方法函数**

通过`this.$utils.xxx()`来调用

&nbsp;

### **`$utils.copyProperties(target, source)`**

同步属性

参数

`target`（Object）目标对象

`source`（Object）源对象

返回

(Object)

&nbsp;

### **`$utils.getImgBase64(domId, callback)`**

获取图片的 base64 字符串

参数

`domId`（String）文件上传 dom 标签 id

`callback`（Function）回调函数

返回

通过回调函数返回 base64 字符串 (String)

&nbsp;

### **`$utils.objKeySort(obj)`**

对象属性排序（正序）

参数

`obj`（Object）对象值

返回

排序好的对象（Object）

&nbsp;

### **`$utils.isNull(val)`**

判断值是否为空

参数

`val`值

返回

`true` or `false `(Boolean)是否为空

&nbsp;

### **`$utils.isTwoArray(arr)`**

判断值是否为二维数组

参数

`arr`数组值

返回

`true` or `false `(Boolean)是否二维数组

&nbsp;

### **`$utils.downloadFile(data, name)`**

通过二进制流下载文件

参数

`data`（Blob）文件二进制流

`name`（String）文件名

返回

无返回，直接调用浏览器下载文件

&nbsp;

### **`$utils.downloadImg(imgUrl, name)`**

通过图片地址下载图片

参数

`imgUrl`（String）图片地址

`name`（String）图片文件名

返回

无返回，直接调用浏览器下载图片

&nbsp;

### **`$utils.numberToFixed(val, fixed)`**

保留小数点（非四舍五入）

参数

`val`（Number）数值

`fixed`（Number）保留多少位小数点

返回

（Number）数值

&nbsp;

### **`$utils.numberToTenAddZero(val)`**

小于 10 的数字文本加 0，1 处理成“01”

参数

`val`（Number）数值

返回

（Number|String）数值

&nbsp;

### **`$utils.randomInt(min, max)`**

获取随机数值

参数

`min`（Number）最小值

`max`（Number）最大值

返回

随机数值（Number）

&nbsp;

### **`$utils.deepCopyObject(obj)`**

对象深拷贝方法

参数

`obj`（Object）对象

返回

深拷贝后的对象值（Object）

&nbsp;

### **`$utils.getObjValByPath(obj, path)`**

通过对象访问路径来获取值

参数

`obj`（Object）对象

`path`（Object）对象值访问路径 如：'a.b.c'

返回

对象值

&nbsp;

### **`$utils.setDocumentTitle(title)`**

设置浏览器 tab 标签名称

参数

`title`（string）标题

返回

无

&nbsp;

### **`$utils.copy(content)`**

拷贝到剪切板

参数

`content`（any）要拷贝的内容

返回

无

&nbsp;

### **`$utils.throttle(func, wait, immediate)`**

节流函数，限制函数的执行频率，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行

参数

`func`（function）要节流的函数

`wait`（number）毫秒

`immediate`（boolean）是否立刻执行

返回

节流后的业务函数

&nbsp;

### **`$utils.debounce(func, wait)`**

防抖函数，对连续触发的函数在最后一次调用的 wait 时间后调用

参数

`func`（function）要防抖的函数

`wait`（number）毫秒

返回

防抖处理后的业务函数

&nbsp;

### **`$utils.getType(val)`**

精确获取值类型

参数

`val`（any）值

返回

string、number、array 等类型字符串

&nbsp;

### **`$utils.createWatermarkCanvas(content)`**

创建一个带有水印的 canvas

参数

`content`（string|number）水印内容

返回

返回一个带有水印的 canvas

&nbsp;

### **`$utils.isObject(obj)`**

检测是否为 object 类型

参数

`obj`（object|array）值

返回

`true` or `false`

&nbsp;

### **`$utils.isEqual(obj1, obj2)`**

检测两个对象 or 数组值是否相等

参数

`obj`（object|array）值

返回

`true` or `false`

&nbsp;

### **`$utils.scrollTop(el, from, to, duration, endCallback)`**

带动画效果的滚动置顶

参数

`el`（HTMLElement）dom 元素

返回

无

&nbsp;

### **`$utils.sixRound(num, decimalPlaces)`**

四舍六入

参数

`num`（number）数值
`decimalPlaces`（number）位数

返回

无

&nbsp;

### **`$utils.parseTime(time, format)`**

格式化时间（默认格式 YYYY-MM-DD HH:mm:ss）

参数

`time`（date）时间
`format`（string）格式

返回

格式化后的时间字符串

&nbsp;

### **`$utils.rangeTime(days, format)`**

获取区间范围，如近一周，近三个月，后一个月等（默认格式 YYYY-MM-DD）

参数

`numdays`（number）天数，为负值时往前，正为之后的日期
`format`（string）格式

返回

{
 startDate:'',
 endDate:'',
 startDateStr:'',
 endDateStr:''
}

&nbsp;
