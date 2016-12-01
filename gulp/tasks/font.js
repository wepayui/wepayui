var gulp = require('gulp'),
	browserSync = require('browser-sync'),          //自动刷新浏览器
	filePath = require("../filepath");

gulp.task('build:font', function (){
	for(var i = 0;i < config.length;i++){
		gulp.src(filePath._COMPONENT_FORPATH + config[i] + "/" + "*.ttf")
		.pipe(gulp.dest(filepath._FONT_TOPATH))
		.pipe(browserSync.reload({stream: true}));
	}
});
