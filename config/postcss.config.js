module.exports = {
	map: false,
	plugins: [
		require('autoprefixer')(),
		require('cssnano')({
			reduceidents: false,
			reduceIdents: false,
		})
	]
}
