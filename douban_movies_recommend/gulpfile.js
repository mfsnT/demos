var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer')
var clean = require('gulp-clean')
var cssnano = require('gulp-cssnano')
var less = require('gulp-less')
var livereload = require('gulp-livereload')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector')
var uglify = require('gulp-uglify')
var runSequence = require('run-sequence')
var webpack = require('webpack-stream')

gulp.task('css', function () {
  return gulp.src('./src/less/*.less')
             .pipe(plumber())
             .pipe(less())
             .pipe(cssnano())
             .pipe(autoprefixer({
              browsers: ['last 3 versions'],
              cascade: false
             }))
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest('./dist/css'))
             .pipe(rev())
             .pipe(gulp.dest('./dist/asset/css'))
             .pipe(rev.manifest())
             .pipe(gulp.dest('./dist/asset/css'))
})

gulp.task('js', function () {
  return gulp.src('./src/js/main.js')
             .pipe(plumber())
             .pipe(webpack(require('./webpack.config.js')))
             .pipe(uglify())
             .pipe(gulp.dest('./dist/js'))
             .pipe(rev())
             .pipe(gulp.dest('./dist/asset/js'))
             .pipe(rev.manifest())
             .pipe(gulp.dest('./dist/asset/js'))
})

gulp.task('html', function () {
  return gulp.src('./index.html')
             .pipe(livereload())
})

gulp.task('clean:css', function () {
  return gulp.src(['./dist/css/*.css', './dist/asset/css/*.css'], {read: false})
             .pipe(clean())
})

gulp.task('clean:js', function () {
  return gulp.src(['./dist/js/*.js', './dist/asset/js/*.js'], {read: false})
             .pipe(clean())
})

gulp.task('revCollector', function () {
  return gulp.src(['./dist/asset/**/*.json', './index.html'])
         .pipe(revCollector({replaceReved: true}))
         .pipe(gulp.dest('./'))
});

gulp.task('default', function () {
  livereload.listen()

  gulp.watch('./src/less/*.less', function () {
    runSequence('clean:css', 'css', 'revCollector')
  })

  gulp.watch('./src/js/main.js', function () {
    runSequence('clean:js', 'js', 'revCollector')
  })

  gulp.watch('./index.html', ['html'])
})

