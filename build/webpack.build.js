const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const fs = require('fs')

const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = {
	mode: process.env.NODE_ENV,
	entry: './examples/main.js',
	output: {
		path: path.resolve(process.cwd(), './suncere-ui'),
		publicPath: process.env.CI_ENV || '',
		filename: '[name].[hash:7].js',
		chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
	},
	// externals: {
	// 	vue: 'Vue',
	// 	'ant-design-vue': 'AntDesignVue',
	// 	'vue-router': 'VueRouter',
	// 	'vue-code-view': 'VueCodeView',
	// 	'highlight.js': 'Highlight.js',
	// 	lodash: 'Lodash',
	// 	jquery: 'jQuery'
	// },
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.jsx'],
		modules: ['node_modules'],
		alias: {
			vue$: path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
		}
	},
	devServer: {
		host: '0.0.0.0',
		port: 9898,
		publicPath: '/',
		hot: true
	},
	performance: {
		hints: false
	},
	stats: {
		children: false
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|babel|es6)$/,
				include: process.cwd(),
				// exclude: config.jsexclude,
				loader: 'babel-loader'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						preserveWhitespace: false
					}
				}
			},
			{
				test: /\.(less|css)$/,
				exclude: '/node_modules',
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'less-loader',
						options: {
							importLoaders: 1,
							javascriptEnabled: true
						}
					}
				]
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: 'vue-loader'
					},
					{
						loader: path.resolve(__dirname, './markdown-loader/index.js')
					}
				]
			},
			{
				test: /\.(mp4|svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: path.posix.join('static', '[name].[hash:7].[ext]'),
							esModule: false
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './examples/index.html',
			filename: './index.html'
		}),

		new ProgressBarPlugin(),
		new VueLoaderPlugin(),

		new webpack.LoaderOptionsPlugin({
			vue: {
				compilerOptions: {
					preserveWhitespace: false
				}
			}
		}),
		// 忽略moment.js中的本地化包
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	],
	optimization: {
		minimizer: []
	},
	devtool: 'source-map'
}

module.exports = webpackConfig
