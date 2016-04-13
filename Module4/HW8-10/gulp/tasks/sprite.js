'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const spritesmith = require('gulp.spritesmith');
const config = require('../../config');

const src = config.getSrc();
const dest = config.getDest();


gulp.task('sprite', (cb) => {
    let done = {
        scss : false,
        img : false
    };

    let spriteData = gulp.src(src.sprite)
        .pipe(spritesmith({
            imgName: '../img/sprite.png',
            cssName: '_sprite.scss',
            cssVarMap: function(sprite) {
                sprite.name = 'sprite-' + sprite.name;
            },
            algorithm: 'binary-tree'
        }));

    spriteData.css
        .pipe(gulp.dest(src.scssPath))
        .on('end', finish('scss'));

    spriteData.img
        .pipe(plumber())
        .pipe(gulp.dest(dest.img))
        .on('end', finish('img'));

    function finish (key) {
        return function () {
            done[key] = true;

            if (done.scss && done.img) {
                cb();
            }
        }
    }
});