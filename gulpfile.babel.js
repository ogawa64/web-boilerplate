'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
import data from 'gulp-data';
import rename from 'gulp-rename';
import del from 'del';
import plumber from 'gulp-plumber';
import imageMin from 'gulp-imagemin';
import checkFileSize from 'gulp-check-filesize';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';

/**
* @param env 環境変数 development, production
* @param documentRoot ドキュメントルートディレクトリ ./src, ./htdocs
*/
const env = process.env.NODE_ENV;
const d = (()=>{
	if(env === 'development') return './src/';
	else if(env === 'production') return './htdocs/';
});
const documentRoot = d();


/**
* @desc pugをトランスパイルするタスク
*/
gulp.task('pug', ()=>{
	return gulp.src(['./src/**/*.pug','!./src/**/_*.pug'])
  .pipe(plumber())
  .pipe(data((file)=>{
		const metaData = require('./src/common/template/config/page.json');
		const filePath = file.path.split('\\').join('/');
		const fileName = filePath.split('src')[1].replace('.pug', '.html');
		return metaData[fileName];
	}))
  .pipe(data(()=>{return require('./src/common/template/config/site.json');}))
	.pipe(pug({
		pretty: true,
		basedir: 'src'
	})).on('error',(err)=>{if(err) throw err;})
	.pipe(gulp.dest(documentRoot));
});

/**
* @desc ファイル変更を監視するタスク
*/
gulp.task('watch', ()=>{
  gulp.watch('./src/**/*.pug', gulp.task('pug'));
});

/**
* @desc srcディレクトリの中身をhtdocsディレクトリに複製するタスク
*/
gulp.task('check-ampcss', (cb)=>{
	return gulp.src('htdocs/common/css/index-amp.css')
  .pipe(checkFileSize({
    fileSizeLimit: 50000
  }));
});

/**
* @desc htdocsディレクトリの全ファイルを削除するタスク
*/
gulp.task('crean-all', (cb)=>{
	return del(['htdocs/**/*'], cb);
});

/**
* @desc htdocsディレクトリの開発ファイルを削除するタスク
*/
gulp.task('crean-dev', (cb)=>{
	return del([
		'.htaccess',
		'htdocs/**/*.pug',
		'htdocs/common/template',
		'htdocs/common/css/stylus',
		'htdocs/common/js/entries',
		'htdocs/common/js/module',
	], cb);
});

/**
* @desc srcディレクトリの中身をhtdocsディレクトリに複製するタスク
*/
gulp.task('copy', (cb)=>{
	return gulp.src('src/**/*',{base:'src'})
  .pipe(gulp.dest('htdocs/'), cb);
});

/**
* @desc htdocsディレクトリの画像を圧縮するタスク
*/
gulp.task('imagemin', (cb)=>{
	return gulp.src('htdocs/**/*.{png,jpg}',{base:'src'})
	.pipe(plumber())
	.pipe(imageMin([
		pngquant({ quality: '65-80' }),
		mozjpeg({ quality: 80, progressive: true })
	]))
	.pipe(gulp.dest('htdocs/'), cb);
});
