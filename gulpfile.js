
var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var browserify = require('browserify');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');

var paths = {
  build: './build/',
  src: './src/',
  img: 'img/',
  css: 'css/',
  font: 'font/',
  less: 'less/',
  js: 'js/',
  boo: 'node_modules/bootstrap/dist/',
};

// Delete the build folder
gulp.task('clean', function() {
  return del([paths.build]);
});

// Change server port for prod version
gulp.task('server', function() {
  gulp.src([paths.src + 'server.js'])
    .pipe(replace('3000', '3001'))
    .pipe(gulp.dest(paths.build));
  });

//Browserifying required javascript
gulp.task('browserify', function() {
  return browserify(paths.src + paths.js + 'index.js')
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(gulp.dest(paths.src + paths.js));
});

//Minify javascript avec move files
gulp.task('js', function(){
  return gulp.src(paths.src + paths.js + 'bundle.min.js')
  .pipe(uglify())
  .pipe(gulp.dest(paths.build + paths.js))
});

// Moving processing LESS files
gulp.task('less', function () {
  return gulp.src(paths.src + paths.less + '*.less')
    .pipe(less())
    .pipe(gulp.dest(paths.src + paths.css));
});

// Moving NODES CSS files
gulp.task('css', function(){
  gulp.src(paths.boo + 'css/bootstrap.min.css')
  .pipe(gulp.dest(paths.src + paths.css))
  gulp.src(paths.boo + 'css/bootstrap.min.css.map')
  .pipe(gulp.dest(paths.src + paths.css))
});

// Minifying CSS
gulp.task('minify', function() {

  gulp.src(paths.src + paths.css + '*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.build + paths.css));

  gulp.src(paths.src + paths.css + '*.map')
    .pipe(gulp.dest(paths.build + paths.css))
});

// Moving images
gulp.task('img', function(){
  gulp.src(paths.src + paths.img + '/*')
  .pipe(gulp.dest(paths.build + paths.img))
});

// Moving fonts
gulp.task('font', function(){
  gulp.src(paths.src + paths.font + '/*')
  .pipe(gulp.dest(paths.build + paths.font))
});

// Moving html
gulp.task('html', function(){
  gulp.src(paths.src + '/*.html')
  .pipe(gulp.dest(paths.build))
});

// Complete build in order
gulp.task('build', function() {
  runSequence( 'clean', ['server', 'browserify', 'css', 'less', 'img', 'font', 'html'], 'minify', 'js')
});
