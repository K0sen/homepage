var gulp            = require('gulp');
var cleanCSS        = require('gulp-clean-css');
var autoprefixer    = require('gulp-autoprefixer');
var gcmq            = require('gulp-group-css-media-queries');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass');

var config = {
    root: './',
    html: {
        src: "*.html"
    },
    css: {
        watch: 'assets/css/scss/*.scss',
        src: 'assets/css/scss/*.scss',
        dest: 'assets/css/'
    }
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: config.root
    });

    gulp.watch(config.root + config.css.watch, ['sass']);
    gulp.watch(config.root + config.html.src).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(config.root + config.css.watch)
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest(config.root + config.css.dest))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);