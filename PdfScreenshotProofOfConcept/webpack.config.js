//const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		'index': ["@babel/polyfill", './Scripts/src/index.js'],
	},
	output: {
		path: path.resolve(__dirname, 'Scripts/dist'),
		filename: '[name].js'
	},
	resolve: {
		extensions: [".js", ".jsx", ".json", ".css", ".scss", ".sass"],
	},
	//target: 'node',
	target: ['web', 'es5'],
	module: {
		rules: [
			{
				use: {
					loader: 'babel-loader'
				},
				test: /\.(js|jsx)$/,
				exclude: /node_modules/ // exclude node_modules folder from being transpiled by babel
			},
			{
				test: /\.png/,
				type: 'asset/resource'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.css$/i,
				use: [
					"css-loader",
				],
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					'url-loader?limit=10000&mimetype=application/font-woff'
				]
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					'file-loader'
				]
			},
		]
	},
}
