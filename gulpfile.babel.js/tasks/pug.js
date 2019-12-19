import gulp from 'gulp'
import pug from 'gulp-pug'
import plumber from 'gulp-plumber'
import vinylYamlData from 'vinyl-yaml-data'
import deepExtend from 'deep-extend-stream'
import pugInheritance from 'gulp-pug-inheritance'
import filter from 'gulp-filter'
import browserSync from 'browser-sync'
import paths from '../config'

let locals = {}

export const yaml = () => {
  locals = {}
  return gulp
    .src(paths.yaml_src)
    .pipe(plumber())
    .pipe(vinylYamlData())
    .pipe(deepExtend(locals))
}

export const compilePugAll = () => {
  return gulp
    .src(paths.pug_src)
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
        locals: locals
      })
    )
    .on('error', err => {
      console.log(err.message)
    })
    .pipe(gulp.dest(paths.dest))
}

export const compilePug = () => {
  return gulp
    .src(paths.pug_src, {
      since: gulp.lastRun(compilePug)
    })
    .pipe(plumber())
    .pipe(
      pugInheritance({
        basedir: 'src/pug',
        skip: 'node_modules'
      })
    )
    .pipe(
      filter(function(file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative)
      })
    )
    .pipe(
      pug({
        pretty: true,
        locals: locals
      })
    )
    .on('error', err => {
      console.log(err.message)
    })
    .pipe(gulp.dest('dest'))
    .pipe(browserSync.stream())
}
