'use strict';

import gulp from 'gulp';
import ejs from 'gulp-ejs';
import nunjucksRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import rename from 'gulp-rename';
import del from 'del';
import plumber from 'gulp-plumber';

/**
	* @param env 環境変数 development, production
	* @param documentRoot ドキュメントルートディレクトリ ./src, ./httpdocs
 */
const env = process.env.NODE_ENV;
const d = (()=>{
	if(env === 'development') return './src/';
	else if(env === 'production') return './httpdocs/';
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
 * @desc httpdocsディレクトリの全ファイルを削除するタスク
 */
gulp.task('crean-all', (cb)=>{
	return del(['httpdocs/**/*'], cb);
});

/**
 * @desc httpdocsディレクトリの開発ファイルを削除するタスク
 */
gulp.task('crean-dev', (cb)=>{
	return del([
		'.htaccess',
		'httpdocs/**/*.njk',
		'httpdocs/common/template',
		'httpdocs/common/css/preprocessor',
		'httpdocs/common/js/entries',
		'httpdocs/common/js/module',
	], cb);
});

/**
 * @desc srcディレクトリの中身をhttpdocsディレクトリに複製するタスク
 */
gulp.task('copy', (cb)=>{
	return gulp.src('src/**/*',{base:'src'})
		.pipe(gulp.dest('httpdocs/'), cb);
});
