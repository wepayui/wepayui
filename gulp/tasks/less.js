var gulp = require('gulp'),
    less = require('gulp-less'),					//编译less
	postcss = require('gulp-postcss'),              //postcss
	autoprefixer = require('autoprefixer'),         //使用postcss自动补充css属性的浏览器后缀
    notify = require('gulp-notify'),				//提示报错信息
	plumber = require('gulp-plumber')  				//处理管道崩溃问题
    concat = require('gulp-concat'),				//合并文件
    cleanCSS = require('gulp-clean-css'),           //自动压缩CSS
    rename = require('gulp-rename'),                //重新命名
    sourcemaps = require('gulp-sourcemaps'),        //sourcemaps
    header = require('gulp-header'),                //为组件首行添加说明
    browserSync = require('browser-sync'),          //自动刷新浏览器
	util = require("../libs/util"),					//辅助函数
	filepath = require("../filepath"),				//全局路径
	config = util.paseJSON(filepath._JSON_FORPATH), //用户配置的组件
	pkg = require('../../package.json')             //wepay版本信息

//版本信息
var cssHeader = [
'/*!',
' * WePayUI v<%= pkg.version %> (<%= pkg.homepage %>)',
' * Copyright <%= new Date().getFullYear() %> Tencent, Inc.',
' * Licensed under the <%= pkg.license %> license',
' * Component : [' + config + ']',
' */',
''].join('\n');

//合并less
gulp.task("build:less", function() {
	var lessLists = ["./src/components/base/reset.less"];//默认添加reset组件
	for(var i = 0;i < config.length;i++){
		var componentJson = filepath._COMPONENT_FORPATH + config[i] + "\\package.json";
		var style = util.paseJSON(componentJson).style;
		lessLists.push(filepath._COMPONENT_FORPATH + config[i] + "\\" + style);
	}
	return gulp.src(lessLists)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
		.pipe(concat('wepayui.less'))
		.pipe(less())
		.pipe(postcss([autoprefixer]))
		.pipe(header(cssHeader, { pkg : pkg } ))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(filepath._CSS_TOPATH))
		.pipe(browserSync.reload({stream: true}))
		.pipe(cleanCSS())
    	.pipe(rename(function (path) {
			path.basename += '.min';
		}))
        .pipe(gulp.dest(filepath._CSS_TOPATH))
        .pipe(browserSync.reload({stream: true}))
});
