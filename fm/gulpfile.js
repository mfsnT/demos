var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var less = require('gulp-less');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');

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
         .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
         .pipe(plumber())
         .pipe(uglify())
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest('./dist/js'));
});

gulp.task('rev', function () {
  return gulp.src(['./dist/css/*.min.css', './dist/js/*.min.js'])
         .pipe(rev())
         .pipe(gulp.dest('./dist/asset'))
         .pipe(rev.manifest())
         .pipe(gulp.dest('./dist/asset'))

})

gulp.task('revCollector', function () {
  return gulp.src(['./dist/asset/*.json', 'fm.html'])
         .pipe(revCollector({replaceReved: true}))
         .pipe(gulp.dest('./'));
});

gulp.task('clean:css', function () {
  return gulp.src(['./dist/css/*.css'], {read: false})
         .pipe(clean());
});

gulp.task('clean:js', function () {
  return gulp.src(['./dist/js/*.js'], {read: false})
         .pipe(clean());
});

gulp.task('clean:rev', function () {
  return gulp.src('./dist/asset/*', {read: false})
         .pipe(clean());
});

gulp.task('default', function () {
  gulp.watch('./src/less/*.less', function () {
    runSequence('clean:rev', 'clean:css', 'css', 'rev', 'revCollector');
  });

  gulp.watch('./src/js/*.js', function () {
    runSequence('clean:rev', 'clean:js', 'js', 'rev', 'revCollector');
  })
})