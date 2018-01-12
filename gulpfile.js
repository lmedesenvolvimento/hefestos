const gulp = require('gulp');
const del = require('del');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const webserver = require('gulp-webserver');

gulp.task('vendor', () => {
    return gulp.src([
        './node_modules/lodash/lodash.js',
        './node_modules/moment/moment.js',
        './node_modules/moment/locale/pt-br.js',
        './node_modules/string/dist/string.js',
        './node_modules/jquery/dist/jquery.js',
        './node_modules/plyr/dist/plyr.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-i18n/angular-locale_pt-br.js',
        './node_modules/angular-aria/angular-aria.js',
        './node_modules/angular-touch/angular-touch.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-messages/angular-messages.js',
        './node_modules/angular-material/angular-material.js',
        './node_modules/angular-carousel/dist/angular-carousel.js',
        './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        './node_modules/@uirouter/angularjs/release/stateEvents.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./js/'));
})

gulp.task('clean', () => {
  return del('dist/**/*', 'dist/')
})

gulp.task('core', () => {
    return gulp.src('./scripts/core/**')
    .pipe(concat('core.js'))
    .pipe(gulp.dest('./js/'));
})

gulp.task('javascript', () => {
    return gulp.src([
        './scripts/index.js',
        './scripts/components/**/*.js',
        './scripts/directives/**/*.js',
        './scripts/controllers/**/*.js',
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js/'));
})

gulp.task('scripts', () => {
    gulp.start('vendor')
    gulp.start('core')
    gulp.start('javascript')
});

gulp.task('sass', () => {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({
          includePaths: ["./node_modules/flexboxgrid-sass/"]
        } ).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', () => {
    watch('sass/**/*.scss', () => {
        gulp.start('sass');
    });

    watch('scripts/**/*.js', () => {
        gulp.start('scripts');
    });
});

gulp.task('copy', ()=> {
  gulp.src([
    'index.html',
    'config.json'
  ]).pipe(gulp.dest('./dist'));

  gulp.src('./css/*.css').pipe(gulp.dest('./dist/css'));
  gulp.src('./js/*.js').pipe(gulp.dest('./dist/js'));
  gulp.src('./fonts/*').pipe(gulp.dest('./dist/fonts'));
  gulp.src('./layout/*').pipe(gulp.dest('./dist/layout'));
  gulp.src('./templates/**/*.html').pipe(gulp.dest('./dist/templates'));
  gulp.src('./topicos/**/*.html').pipe(gulp.dest('./dist/topicos'));
})

gulp.task('build', ['sass','scripts'],()=> {
  gulp.start('copy')
});

gulp.task('default', () => {
    gulp.start('sass');
    gulp.start('scripts');
    gulp.start('watch');
});
