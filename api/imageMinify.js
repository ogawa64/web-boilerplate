const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['src/**/*.{jpg,png}'], 'httpdocs', {
	plugins: [
		imageminMozjpeg({ quality: 80 }),
		imageminPngquant({ quality: '65-80' })
	]
}).then(()=>{console.log('Minified image files.');});
