'use strict';

import gulp from 'gulp';
import ejs from 'gulp-ejs';
import nunjucksRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import rename from 'gulp-rename';

/**
	* @param env 環境変数 development, production
	* @param documentRoot ドキュメントルートディレクトリ ./src, ./httpdocs
 */
const env = process.env.NODE_ENV;
const dir = (()=>{
	if(env === 'development') return './src/';
	else if(env === 'production') return './httpdocs/';
});
const documentRoot = dir();

/**
 * @desc ejsをトランスパイルするタスク
 */
gulp.task('ejs', ()=>{
	return gulp.src(['src/**/*.ejs','!./src/**/_*.ejs'])
	.pipe(ejs({msg: 'transpiling ejs.....'})).on('error',(err)=>{if(err) throw err;})
	.pipe(rename({ extname: '.html'} ))
	.pipe(gulp.dest(documentRoot));
});


/**
 * @desc nunjucksをトランスパイルするタスク
 */
gulp.task('nunjucks', ()=>{
	return gulp.src(['src/**/*.njk','!./src/**/_*.njk'])
	.pipe(data(()=>{return require('./src/common/template/config/site.json');}))
	.pipe(nunjucksRender({
		path: ['src/common/template/'],
		envOptions: {
			autoescape: false
		},
	})).on('error',(err)=>{if(err) throw err;})
	.pipe(gulp.dest(documentRoot));
});

gulp.task('watch', ()=>{
	gulp.watch('src/**/*.njk', gulp.task('nunjucks'));
})
