var gulp=require('gulp');
var less=require('gulp-less');
//var cssnano=require('gulp-cssnano');
var browserSync=require('browser-sync');
var reload=browserSync.reload;
/*1.less编译，压缩，合并没有必要-因为预处理可以导包*/
gulp.task('style', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
/*4.html压缩*/
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(browserSync.reload({
            stream:true
        }))
});
/*5.添加服务器*/

gulp.task('serve', function () {
    browserSync({server: {
        //baseDir:['./index.html']  //改变index的路径
    }}, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('less/*.less',['style']);
    gulp.watch('*.html',['html']);
});



























