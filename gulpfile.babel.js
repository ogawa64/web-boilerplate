'use strict';

import gulp from 'gulp';
import ejs from 'gulp-ejs';
import nunjucksRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import rename from 'gulp-rename';
import del from 'del';
import plumber from 'gulp-plumber';
import imageMin from 'gulp-imagemin';
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
 * @desc ejsをトランスパイルするタスク
 */
gulp.task('ejs', ()=>{
	return gulp.src(['src/**/*.ejs','!./src/**/_*.ejs'])
		.pipe(ejs({msg: 'transpiling ejs.....'})).on('error',(err)=>{if(err) throw err;})
		.pipe(rename({ extname: '.html'}))
		.pipe(gulp.dest(documentRoot));
});


/**
 * @desc nunjucksをトランスパイルするタスク
 */
gulp.task('nunjucks', ()=>{
	return gulp.src(['./src/**/*.njk','!./src/**/_*.njk'])
		.pipe(data(()=>{return require('./src/common/template/config/site.json');}))
		.pipe(nunjucksRender({
			path: ['src/common/template/'],
			envOptions: {
				autoescape: false
			},
		})).on('error',(err)=>{if(err) throw err;})
		.pipe(gulp.dest(documentRoot));
});

/**
 * @desc ファイル変更を監視するタスク
 */
gulp.task('watch', ()=>{
	gulp.watch('./src/**/*.njk', gulp.task('nunjucks'));
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
		'htdocs/**/*.njk',
		'htdocs/common/template',
		'htdocs/common/css/preprocessor',
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
			pngquant({ quality: [.65, .8] }),
			mozjpeg({ quality: 80, progressive: true })
		]))
		.pipe(gulp.dest('htdocs/'), cb);
});
