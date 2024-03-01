/**
 * 自定义 正则验证类
 * 正则参考的网址 https://github.com/any86/any-rule/blob/master/packages/www/src/RULES.js
 * rule 正则规则
 * msg  提示信息
 */
export const validRule = {
	zh: {
		rule: /^[\u4e00-\u9fa5]+$/,
		msg: '请输入中文' // 只能输入中文
	},
	en: {
		rule: /^[a-zA-Z]*$/,
		msg: '请输入英文' // 只能输入英文
	},
	number: {
		rule: /^\+?[1-9]\d*$/,
		msg: '请输入数字' // 只能输入正整数
	},
	enNum: {
		rule: /^[a-zA-Z0-9]*$/,
		msg: '只能输入包含英文、数字' // 英文、数字
	},
	url: {
		rule: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
		msg: '请输入正确的网址', // 网址(url,支持端口和"?+参数"和"#+参数)
		examples: ['www.qq.com', 'https://baidu.com', '360.com:8080/vue/#/a=1&b=2']
	},

	urlPort: {
		rule: /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/,
		msg: '请输入带有端口号的网址', // 必须带端口号的网址(或ip)
		examples: ['https://www.qq.com:8080', '127.0.0.1:5050', 'baidu.com:8001', 'http://192.168.1.1:9090']
	},

	base64: {
		rule: /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i,
		msg: '请选择正确的base64格式',
		examples: ['data:image/gif;base64,xxxx==']
	},

	identity: {
		rule: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
		msg: '请输入正确的身份证号码' // 身份证号码
	},

	postal: {
		rule: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/,
		msg: '请输入正确的邮政编码', // 邮政编码(中国)
		examples: ['734500', '100101']
	},

	creditCode: {
		rule: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
		msg: '请输入正确统一社会信用代码', // 统一社会信用代码
		examples: ['91230184MA1BUFLT44', '92371000MA3MXH0E3W']
	},

	creditCode_loose: {
		rule: /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/,
		msg: '请输入正确统一社会信用代码', // 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
		examples: ['91230184MA1BUFLT44', '92371000MA3MXH0E3W']
	},

	bankCard: {
		rule: /^[1-9]\d{9,29}$/,
		msg: '请输入正确银行卡号', // 银行卡号（10到30位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）
		examples: [6234567890, 6222026006705354217]
	},

	phone: {
		rule: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[014-9])|(?:5[0-35-9])|(?:6[25-7])|(?:7[0-8])|(?:8[\d])|(?:9[0-35-9]))\d{8}$/,
		msg: '请输入正确的号码' // 手机号码11位
	},
	email: {
		rule: /^\w+@[\da-z\.-]+\.([a-z]{2,6}|[\u2E80-\u9FFF]{2,3})$/,
		msg: '请输入正确的邮箱'
	}
}

export default {
	//根据校验规则名称获取对于的校验规则用于表单校验
	getRule(name) {
		if (!name) return

		if (validRule[name]) {
			return { pattern: validRule[name].rule, message: validRule[name].msg }
		} else {
			throw new Error(`暂无“${name}”校验规则！`)
		}
	},
	//校验数据
	testRule(val = '', ruleName = '') {
		if (!ruleName) throw '请传入规则名称！'
		return validRule[ruleName].rule.test(val)
	}
}
