var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var sass            = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');


// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });
    gulp.watch("app/sass/*.sass", gulp.parallel('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
});





// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('app/sass/*.+(sass|scss)')
        .pipe(sass())
	    .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest("production/css"))
        .pipe(browserSync.stream());
});








gulp.task('default', gulp.parallel('serve','sass'));