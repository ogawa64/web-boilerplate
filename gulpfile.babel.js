'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
// import stylus from 'gulp-stylus';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import data from 'gulp-data';
import rename from 'gulp-rename';
import del from 'del';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import purgecss from 'gulp-purgecss';
import imageMin from 'gulp-imagemin';
import checkFileSize from 'gulp-check-filesize';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';

sass.compiler = require('node-sass');

/**
* @param env 環境変数 development, production
* @param documentRoot ドキュメントルートディレクトリ ./src, ./htdocs
*/
const env = process.env.NODE_ENV;
const documentRoot = env === 'production' ? './htdocs/' : './src/';

/**
* @desc pugをトランスパイルするタスク
*/
gulp.task('pug', ()=>{
	return gulp.src([`${documentRoot}**/*.pug`,`!${documentRoot}**/_*.pug`])
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
* @desc stylusをコンパイルするタスク
*/
// gulp.task('stylus',() => {
//   return gulp.src([`${documentRoot}**/*.styl','!${documentRoot}**/_*.styl`])
//   .pipe(plumber())
//   .pipe(sourcemaps.init())
//   .pipe(stylus({
//     lineos: true,
//     'include css': true
//   })).on('error',(err)=>{if(err) throw err;})
//   .pipe(sourcemaps.write())
//   .pipe(gulp.dest(documentRoot));
// });

/**
* @desc sassをコンパイルするタスク
*/
gulp.task('sass',() => {
  return gulp.src([
    `${documentRoot}**/*.sass`,`!${documentRoot}**/_*.sass`,
    `${documentRoot}**/*.scss`,`!${documentRoot}**/_*.scss`
  ])
  .pipe(plumber())
  .pipe(sassGlob())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .on('error',(err)=>{if(err) throw err;})
  .pipe(sourcemaps.write())
  .pipe(rename(path => {
    path.dirname += '/../' // src/common/css/ディレクトリに書き出したいため
  }))
  .pipe(gulp.dest(documentRoot));
});


/**
* @desc CSSからHTMLで使用されていないセレクタを除くタスク
*/
gulp.task('purgecss', (cb) => {
  return gulp.src('htdocs/**/*.css')
  .pipe(plumber())
  .pipe(purgecss({
    content: ['htdocs/**/*.html'],
    css: ['htdocs/**/*.css']
  }))
  .pipe(gulp.dest('htdocs/'), cb);
});

/**
* @desc ファイル変更を監視するタスク
*/
gulp.task('watch', () => {
  gulp.watch('./src/**/*.pug', gulp.task('pug'));
  // gulp.watch('./src/**/*.styl', gulp.task('stylus'));
  gulp.watch(['./src/**/*.sass','./src/**/*.scss'], gulp.task('sass'));
});

/**
* @desc srcディレクトリの中身をhtdocsディレクトリに複製するタスク
*/
gulp.task('check-ampcss', (cb) => {
	return gulp.src('htdocs/common/css/index-amp.css')
  .pipe(checkFileSize({
    fileSizeLimit: 50000
  }), cb);
});

/**
* @desc htdocsディレクトリの全ファイルを削除するタスク
*/
gulp.task('crean-all', (cb) => {
	return del(['htdocs/**/*'], cb);
});

/**
* @desc htdocsディレクトリの開発ファイルを削除するタスク
*/
gulp.task('crean-dev', (cb) => {
	return del([
		'.htaccess',
		'htdocs/**/*.pug',
		'htdocs/common/template',
    // 'htdocs/common/css/stylus',
    'htdocs/common/css/sass',
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
