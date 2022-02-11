"use strict";

const { src, dest, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');

const jsFiles = [
    './node_modules/phaser/dist/phaser.min.js',
    './src/js/placement.js',
    './src/js/main.js'
];

const jsDev = () => src(jsFiles)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(dest('./dist/js/'));

const imgDev = () => src('./src/img/**/*.*')
    .pipe(plumber())
    .pipe(dest('./dist/img/'));

const browser = () => {
    browserSync.init({
        proxy: 'http://phasertest.local',

        files: [
            './**/*.html',
            './**/*.js',
        ]
    });
    watch(['./src/**/*.js'], jsDev);
    watch(['./src/img/**/*.*'], imgDev);
}

exports.dev = parallel(jsDev, imgDev, browser);