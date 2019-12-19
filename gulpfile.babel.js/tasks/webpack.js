import gulp from 'gulp'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackConfig from '../../webpack.config'
import browserSync from 'browser-sync'
import paths from '../config'

export const compileJs = () => {
  return gulp
    .src(paths.js_src)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(paths.js_dest))
    .pipe(browserSync.stream())
}
