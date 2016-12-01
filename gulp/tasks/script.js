var gulp = require('gulp'),
	browserSync = require('browser-sync'),          //自动刷新浏览器
  	concat = require('gulp-concat'),				//合并文件
  	uglify = require('gulp-uglify'),				//压缩js
	filePath = require("../filepath");


gulp.task("build:js", function() {
	var jsLists = [];
	for(var i = 0;i < config.length;i++){
		jsLists.push(filepath._COMPONENT_FORPATH + config[i] + "/" + config[i] + ".js");
	}
	return gulp.src(jsLists)
		.pipe(concat('wepayui.js'))
		.pipe(uglify())
		.pipe(gulp.dest(filepath._JS_TOPATH))
		.pipe(browserSync.reload({stream: true}))
		.pipe(rename(function (path) {
			path.basename += '.min';
		}))
        .pipe(gulp.dest(filepath._JS_TOPATH));
});