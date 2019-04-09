
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');


var dir = {
    styles: {
        src: 'src/sass/*.+(scss|sass)',
        project: 'production/css'
    }
}; 

function serv() {
    browserSync.init({
        server: "./"
    });
}

function watch(){
    gulp.watch(dir.styles.src, style);
    gulp.watch('./*.html').on('change',browserSync.reload);
}

function style() {
    return gulp.src(dir.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest(dir.styles.project))
        .pipe(browserSync.stream());

}

var server = gulp.parallel(serv, watch);

gulp.task('default', server);