const hljs = require('highlight.js')

const cheerio = require('cheerio')
const markdown = require('markdown-it')
const componentIndex = 0
const path = require('path')
const renderHighlight = function (str, lang) {
	if (!(lang && hljs.getLanguage(lang))) {
		return ''
	}

	return hljs.highlight(lang, str, true).value
}

const renderMd = function (html, fileName) {
	const $ = cheerio.load(html, {
		decodeEntities: false,
		lowerCaseAttributeNames: false,
		lowerCaseTags: false
	})
	let componenetsString = ''
	let id = 0
	let styleStr = ''

	$('style').each((index, item) => {
		styleStr += $(item).html()
	})

	$('div.kv-demo').each((index, item) => {
		let componentName = `env-demo${id}`
		let vueTeml = renderVueTemplate($(item).html(), componentName)

		$(item).replaceWith(`<template slot="source"><${componentName} /></template>`)

		componenetsString += `${JSON.stringify(componentName)}: ${vueTeml},`
		id++
	})

	let pageScript = `<script>
      export default {
        name: "component-doc${componentIndex}",
        components: {
          ${componenetsString}
        }
      }
    </script>`

	let htmlStr = $.html()
	const result = `<template> <div class="env-box env-${fileName}">${htmlStr}</div> </template> \n  ${pageScript} \n  <style lang="less"  >${styleStr}</style>`

	return result
}

const renderVueTemplate = function (content, componentName) {
	let $ = cheerio.load(content, {
		decodeEntities: false
	})

	let $style = $('style')
	$style.remove()

	let $script = $('script')
	let componentOptionsStr = ''
	if ($script) {
		let execResult = /export[\s]+?default[\s]*?{([\s\S]*)}/.exec($script.html())
		componentOptionsStr = execResult ? execResult[1] : ''
	}

	$script.remove()

	let templateExecResult = /^\s*<template>([\s\S]*)<\/template>\s*$/.exec($.html())

	let templateStr = ''
	templateStr = templateExecResult ? templateExecResult[1] : $.html()

	let componentStr = `{template: \`<div class="${componentName}">${templateStr}</div>\`,${componentOptionsStr}}`
	return componentStr
}

const parser = markdown('default', {
	// 主要给markdown中不在demo::中的代码高亮
	highlight: renderHighlight
})
const ensureVPre = function (markdown) {
	if (markdown && markdown.renderer && markdown.renderer.rules) {
		const rules = ['code_inline', 'code_block', 'fence']
		const rendererRules = markdown.renderer.rules
		rules.forEach(function (rule) {
			if (typeof rendererRules[rule] === 'function') {
				const saved = rendererRules[rule]
				rendererRules[rule] = function () {
					return saved.apply(this, arguments).replace(/(<pre|<code)/g, '$1 v-pre')
				}
			}
		})
	}
}
ensureVPre(parser)

const defaultRender = parser.renderer.rules.fence
parser.renderer.rules.fence = (tokens, idx, options, env, self) => {
	const token = tokens[idx]
	// 判断该 fence 是否在 :::demo 内
	const prevToken = tokens[idx - 1]
	const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/)
	if (token.info === 'html' && isInDemoContainer) {
		return `<template slot="highlight">
					${defaultRender(tokens, idx, options, env, self)}
				</template>`
	}

	return `<div class="code-common">${defaultRender(tokens, idx, options, env, self)}</div>`
}

// 给table增加样式
parser.renderer.rules.table_open = function () {
	return '<table class="table">'
}

// ```code`` 给这种样式加个class code_inline
const code_inline = parser.renderer.rules.code_inline
parser.renderer.rules.code_inline = function (...args) {
	args[0][args[1]].attrJoin('class', 'code_inline')
	return code_inline(...args)
}

parser.use(require('markdown-it-container'), 'demo', {
	validate(params) {
		return params.trim().match(/^demo\s*(.*)$/)
	},
	// 把demo代码放到div.kv-demo里面
	render(tokens, idx) {
		const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)

		if (tokens[idx].nesting === 1) {
			const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
			// 先把demo中的代码放到demo-block的之中，然后程序继续render fence，按照上面的fence规则渲染出代码部分，作为隐藏的查看代码。
			return `<demo-block><div  class="kv-demo">${content}</div>`
		}
		return '</demo-block>'
	}
})

module.exports = function (source) {
	this.cacheable && this.cacheable()
	const { resourcePath = '' } = this
	const fileName = path.basename(resourcePath, '.md')
	// @符号在markdown中是特殊符号
	source = source.replace(/@/g, '__at__')

	const content = parser.render(source).replace(/__at__/g, '@')

	const result = renderMd(content, fileName)
	return result
}
