const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const main_entry = 'src/js/index.js'
const dist_directory = 'dist'
const html_title = 'Tic Tac Toe!'
const html_dist_filename = 'index.html'
const html_src_template = 'src/index-template.html'

module.exports = {
	mode: 'production',
	entry: {
		app: path.resolve(__dirname, main_entry),
	},
	output: {
		path: path.resolve(__dirname, dist_directory),
		publicPath: '',
		filename: '[name]-[contenthash].js',
		clean: true,
		assetModuleFilename: (pathData) => {
			const filepath = path
				.dirname(pathData.filename)
				.split('/')
				.slice(1)
				.join('/')
			return `${filepath}/[name].[hash][ext][query]`
		},
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, dist_directory),
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: html_title,
			filename: html_dist_filename,
			template: html_src_template,
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
		],
	},
}
