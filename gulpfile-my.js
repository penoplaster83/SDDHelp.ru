
const { src, dest, watch, parallel, series } = require('gulp');
const gulp = require('gulp'),
    // watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync").create(),

    reload = browserSync.reload;
    sass.compiler = require('node-sass');

const path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img',
    fonts: 'build/fonts/',
    svg: 'build/svg/'
  },

  src: { // исходники
    html: 'src/html/*.html', 
    js: 'src/js/main.js',
    style: 'src/scss/*.scss',
    img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    fonts: 'src/fonts/**/*.*',
    svg: 'src/svg/**/*.*'
},

watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: 'src/html/index.html',
    js: 'src/js/**/*.js',
    style: 'src/scss/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    svg: 'src/svg/**/*.*'
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

function html_task() {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
};

function style_task() {
  return gulp.src(path.src.style) //Выберем наш style.scss
      .pipe(sourcemaps.init()) //То же самое что и с js
      .pipe(sass()) //Скомпилируем
      .pipe(prefixer()) //Добавим вендорные префиксы
      .pipe(cssmin()) //Сожмем
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.css)) //И в build
      .pipe(browserSync.stream());
};

function image_task() {
  return gulp.src(path.src.img) //Выберем наши картинки
      .pipe(imagemin({ //Сожмем их
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()],
          interlaced: true
      }))
      .pipe(gulp.dest(path.build.img)) //И бросим в build
      .pipe(reload({stream: true}));
};

function fonts_task() {
  return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
};

function svg_task() {
  return gulp.src(path.src.svg)
      .pipe(gulp.dest(path.build.svg))
};

gulp.task('html-t', html_task);
gulp.task('style-t', style_task);
gulp.task('image-t', image_task);
gulp.task('svg-t', svg_task);
gulp.task('fonts-t', fonts_task);

gulp.task('build',
  gulp.series(
    html_task, 
    style_task, 
    image_task,
    svg_task,
    fonts_task)
  );

  // gulp.task('serve', function () {
  //   browserSync(config);
  // });

  // {
  //   server: {
  //       baseDir: "./build"
  //   },
  //   tunnel: true,
  //   host: 'localhost',
  //   port: 9000,
  //   logPrefix: "Frontend_Devil"
  // };

  gulp.task('serve', done => {
    browserSync.init({
      server: "./build",
      tunnel: true
    });

    // gulp.watch("build/scss/*.scss", ['sass']);
    // gulp.watch("build/html/*.html").on('change', browserSync.reload);
    
    browserSync.watch('build/**/*.*').on('change', browserSync.reload)
    done();
  });

// function watch_task(){
//   watch([path.watch.html], function(event, cb) {
//       gulp.start('html-t');
//   });
//   watch([path.watch.style], function(event, cb) {
//     gulp.start('style-t');
//   });
//   // watch([path.watch.js], function(event, cb) {
//   //     gulp.start('js-t');
//   // });
//   watch([path.watch.img], function(event, cb) {
//     gulp.start('image-t');
//   });
//   watch([path.watch.fonts], function(event, cb) {
//     gulp.start('fonts-t');
//   });
// };

// watch(path.watch.html, style_task);
// gulp.task('default', gulp.series (watch, gulp.parallel(styles, scripts, images),

//     function (done) { done(); }    
// ));

// gulp.task('watch', function() {
//   gulp.watch(path.watch.html, html_task);
//   gulp.watch(path.watch.style, style_task);
//   gulp.watch(path.watch.svg, svg_task);
//   gulp.watch(path.watch.image, image_task)
// });

gulp.task('watch', done => {
  gulp.watch(path.watch.html, html_task);
  gulp.watch(path.watch.style, style_task);
  gulp.watch(path.watch.svg, svg_task);
  gulp.watch(path.watch.image, image_task);
  done();
});

gulp.task('default', gulp.series(
  'build',
  gulp.parallel('serve', 'watch')
));