'use strict'

// gulp.task("default", function () {
//   return gulp.src("app/js/*.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist"));
// });

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

    sass.compiler = require('node-sass');

var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img',
    fonts: 'build/fonts/'
  },

  src: { // исходники
    html: 'src/html/*.html', 
    js: 'src/js/main.js',
    style: 'src/scss/*.scss',
    img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    fonts: 'src/fonts/**/*.*'
},

watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/scss/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
},
clean: './build'
};

var config = {
  server: {
      baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};

gulp.task('html:build', function () {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  return gulp.src(path.src.style) //Выберем наш style.scss
      .pipe(sourcemaps.init()) //То же самое что и с js
      .pipe(sass()) //Скомпилируем
      .pipe(prefixer()) //Добавим вендорные префиксы
      .pipe(cssmin()) //Сожмем
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.css)) //И в build
      .pipe(reload({stream: true}));
});