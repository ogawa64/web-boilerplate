const path = require('path');
const glob = require('glob');

const entries = glob.sync('../src/common/js/entries/*.js');

module.exports = (env, argv) => {
	const mode = argv.mode; // "development" or "production"
	const baseDir = (mode === 'production') ? '..\/httpdocs\/' : '..\/src\/';

	return {
		mode: argv.mode || 'production',
		entry: {
			index: path.resolve(__dirname, `../src/common/js/entries/`),
		},
		output: {
			path: path.resolve(__dirname, `${baseDir}common/js/`),
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: [['@babel/preset-env', {modules: false}]]
						}
					}]
				}
			]
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /node_modules/,
						name: 'vendor',
						chunks: 'initial',
						enforce: true
					}
				}
			}
		}
	}
}
