'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const reload = require('browser-sync').reload;
const config = require('../../config.js');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const scss = require('postcss-scss');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const runSequence = require('run-sequence');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const src = config.getSrc();
const dest = config.getDest();

const styleLintConfig = {
    "rules": {
        "block-no-empty": true,
        "color-no-invalid-hex": true,
        "declaration-colon-space-after": "always",
        "declaration-colon-space-before": "never",
        "function-comma-space-after": "always",
        "function-url-quotes": "double",
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-name-no-vendor-prefix": true,
        "max-empty-lines": 5,
        "number-leading-zero": "never",
        "number-no-trailing-zeros": true,
        "property-no-vendor-prefix": true,
        "selector-list-comma-space-before": "never",
        "selector-list-comma-newline-after": "always",
        "selector-no-id": true,
        "string-quotes": "double",
        "value-no-vendor-prefix": true
    }
};

gulp.task('styles', function () {
    runSequence(['sprite', 'build:styles']);
});

gulp.task('build:styles', () => {
    const processors = [
        autoprefixer({
            browsers: ['last 3 versions', 'IE 8'],
            cascade: false
        }),
        cssnano()/*,
        stylelint(styleLintConfig),
        reporter()*/
    ];

    return gulp.src(src.styles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss(processors, {syntax: scss}))
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.styles))
        .pipe(reload({stream: true}));
});
