const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['htdocs/**/*.{jpg,png}'], 'htdocs/**/*', {
	plugins: [
		imageminMozjpeg({ quality: 80 }),
		imageminPngquant({ quality: [.65,.8] })
	]
}).then(()=>{console.log('Minified image files.');});
