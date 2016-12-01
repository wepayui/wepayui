var gulp = require('gulp'),
	filePath = require("../filepath"),
	browserSync = require('browser-sync'),          //自动刷新浏览器
	yargs = require('yargs').argv;
gulp.task('build:wepayui', [
	"build:less",
	"build:img",
	"build:js",
	"build:font",
]);
gulp.task('release', ['build:wepayui']);

gulp.task('watch', ['release'], function () {
    gulp.watch(filePath._STYLE_FORPATH + '**/*', ['build:less']);
    gulp.watch(filePath._COMPONENT_FORPATH + '**/*.less', ['build:less']);
    gulp.watch(filePath._COMPONENT_FORPATH + '**/*.?(png|jpg|gif)', ['build:img']);
    gulp.watch(filePath._COMPONENT_FORPATH + '**/*.ttf', ['build:font']);
    gulp.watch(filePath._COMPONENT_FORPATH + '**/*.js', ['build:js']);
});
