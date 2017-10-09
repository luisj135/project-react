const gulp = require('gulp');
const babel = require('gulp-babel');
const async = require('async');
const include = require('gulp-include');
const rename = require('gulp-rename');
const del = require('del');
// const path = require('path');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const sassGlobing = require('node-sass-globbing');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const lint = require('gulp-eslint');
const lintConfig = require('./eslint.config.js');
const twig = require('gulp-twig');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const browserSync = require('browser-sync').create('MSL');
const reload = browserSync.reload;


gulp.task('clean:all', () => {
  return del([
    'assets/**/*.*'
  ]);
});

gulp.task('sync:site', () => {
  var serverConf = {
    serve: {
      baseDir: './public'
    },
    open: false,
    injectChanges: true
  };
  browserSync.init(serverConf);
});

gulp.task('files_material_css', () =>
  gulp.src('src/material/**/*.css')
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(reload({stream: true}))
);

gulp.task('files_material_js', () =>
  gulp.src('src/material/**/*.js')
    .pipe(gulp.dest('./public/assets/js/'))
    .pipe(reload({stream: true}))
);

gulp.task('imagenes', () =>
  gulp.src('src/images/*.*')
    .pipe(gulp.dest('./public/assets/images/'))
    .pipe(reload({stream: true}))
);

gulp.task('prod:styles', () => {
  gulp.src('src/css/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: require('node-normalize-scss').includePaths,
      importer: sassGlobing
    })
    .on('error', sass.logError))
    .pipe(autoprefixer()) // Config file: ./browserslist
    .pipe(cleanCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('dev:styles', () =>
  gulp.src('src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded', // 'uncompressed',
      includePaths: require('node-normalize-scss').includePaths,
      importer: sassGlobing
    })
    .on('error', sass.logError))
    .pipe(autoprefixer()) // Config file: ./browserslist
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(reload({stream: true}))
);

gulp.task('dev:scripts', () =>
  gulp.src(['src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(include())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename({basename: 'bundle'}))
    .on('error', (err) => {
      gutil.log(gutil.colors.red('[Compilation Error]'));
      gutil.log(gutil.colors.red(err.message));
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/js/'))
    .pipe(reload({stream: true}))
);

gulp.task('prod:scripts', () => {
  gulp.src(['src/js/main.js'])
    .pipe(plumber())
    .pipe(include())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename({basename: 'bundle'}))
    .on('error', (err) => {
      gutil.log(gutil.colors.red('[Compilation Error]'));
      gutil.log(gutil.colors.red(err.message));
    })
    .pipe(minify({
      ext: {
        src: '.debug.js',
        min: '.js'
      },
      exclude: ['tasks'],
      ignoreFiles: []
    }))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(reload({stream: true}));
});

gulp.task('fonts', () =>
  gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('./public/assets/fonts/'))
    .pipe(reload({stream: true}))
);


// Build
gulp.task('dev:build', ['clean:all', 'dev:styles', 'files_material_css', 'files_material_js', 'imagenes', 'dev:scripts', 'fonts']);
gulp.task('prod:build', ['clean:all', 'prod:styles', 'files_material_js', 'files_material_js', 'imagenes', 'prod:scripts', 'fonts']);

// Sync
gulp.task('sync', ['sync:site']);

// Watch
gulp.task('dev:watch', () => {
  gulp.watch('src/css/**/*.scss', ['dev:styles']);
  gulp.watch('src/js/**/*.js', ['lint', 'dev:scripts']);
  gulp.watch('src/fonts/**/*.*', ['fonts']);
  gulp.watch('src/images/**/*.*', ['imagenes']);
});

/*
gulp.task('dev:watch:html', () => {
  gulp.watch('html/*.html', () => {
    reload();
  });
});
*/

gulp.task('default', ['dev:build', 'sync', 'dev:watch']);
// gulp.task('dev', ['dev:build', 'sync:site:proxy', 'dev:watch', 'dev:watch:html']);
gulp.task('server', ['dev:build', 'dev:watch']);
gulp.task('prod', ['prod:build']);
