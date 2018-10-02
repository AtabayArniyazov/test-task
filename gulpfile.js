const gulp = require('gulp');
const sass = require('gulp-sass');
const image = require('gulp-image');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');

gulp.task('image', function () {
    gulp.src('./src/assets/img/*')
        .pipe(image())
        .pipe(gulp.dest('./build/assets/img'));
});

gulp.task('fonts', function () {
    gulp.src('./src/assets/fonts/**')
        .pipe(gulp.dest('./build/assets/fonts/'));
});

gulp.task('pug', function () {
    gulp.src('./src/pages/index.pug')
        .pipe(pug())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./build'));
});

gulp.task('imagesvg', function () {
    gulp.src('./src/assets/svg/*')
        .pipe(image())
        .pipe(gulp.dest('./build/assets/svg'));
});

gulp.task('dist', function () {
    gulp.src('./dist/**')
        .pipe(gulp.dest('./build/dist'));
});

gulp.task('sass', function () {
    return gulp.src('./src/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%']))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./build/styles'));
 });
gulp.task('scripts', function() {
    gulp.src('./src/**/*.js')
      .pipe(gulp.dest('./build'));
});
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './build/'
        }
    })
});

gulp.task('watch', ['scripts', 'sass', 'pug', 'dist', 'image', 'imagesvg', 'fonts', 'browserSync'], function () {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/img/*', ['image']);
    gulp.watch('./src/svg/*', ['imagesvg']);
    gulp.watch('./src/fonts/*', ['fonts']);
    gulp.watch('./src/**/*.pug', ['pug']);
    gulp.watch('./src/**/*.js', ['scripts']);
    gulp.watch('build/*.html', browserSync.reload);
    gulp.watch("./build/**/*.css").on("change", browserSync.reload);
    gulp.watch('./build/**/*.js').on("change", browserSync.reload);
});

gulp.task('default', ['watch', 'image']);