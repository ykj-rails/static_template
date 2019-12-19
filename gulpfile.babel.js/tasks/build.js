import gulp from 'gulp'
import pug from 'gulp-pug'
import plumber from 'gulp-plumber'
import stylus from 'gulp-stylus'
import rupture from 'rupture'
import mqpacker from 'css-mqpacker'
import sortCSSmq from 'sort-css-media-queries'
import autoprefixer from 'autoprefixer'
import imagemin from 'gulp-imagemin'
import imageminPng from 'imagemin-pngquant'
import imageminJpg from 'imagemin-jpeg-recompress'
import imageminGif from 'imagemin-gifsicle'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackConfig from '../../webpack.config.build'
import vinylYamlData from 'vinyl-yaml-data'
import deepExtend from 'deep-extend-stream'
import postcss from 'gulp-postcss'
import del from 'del'
import paths from '../config'

let locals = {}

export const yamlBuild = () => {
  locals = {}
  return gulp
    .src(paths.yaml_src)
    .pipe(plumber())
    .pipe(vinylYamlData())
    .pipe(deepExtend(locals))
}

export const webpackBuild = () => {
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(paths.js_build))
}

export const imageCleanBuild = () => {
  return del(paths.img_build + '**/*.*')
}

export const imgBuild = () => {
  return gulp
    .src(paths.img_src + '**/*.+(jpg|jpeg|png|gif)')
    .pipe(
      imagemin([
        imageminPng(),
        imageminJpg({
          quality: 'low'
        }),
        imageminGif()
      ])
    )
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img_build))
}

export const svgCopyBuild = () => {
  return gulp.src(paths.img_src + '*.svg').pipe(gulp.dest(paths.img_build))
}

export const iconFontCopyBuild = () => {
  return gulp
    .src(paths.dest + 'iconfont/*.*')
    .pipe(gulp.dest(paths.iconfont_build))
}

export const webFontCopyBuild = () => {
  return gulp
    .src(paths.dest + 'webfont/*.*')
    .pipe(gulp.dest(paths.webfont_build))
}

export const jsLibCopyBuild = () => {
  return gulp
    .src(paths.dest + 'js/lib/**/*.js')
    .pipe(gulp.dest('build/js/lib/'))
}

export const stylusBuild = () => {
  return gulp
    .src(paths.stylus_src)
    .pipe(plumber())
    .pipe(
      stylus({
        use: [rupture()],
        compress: true,
        'include css': true
      })
    )
    .pipe(
      postcss([
        mqpacker({
          sort: sortCSSmq
        }),
        autoprefixer({
          remove: false,
          grid: true
        })
      ])
    )
    .on('error', err => {
      console.log(err.message)
    })
    .pipe(gulp.dest(paths.stylus_build))
}

export const pugBuild = () => {
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
    .pipe(gulp.dest(paths.build))
}

export const delBuild = () => {
  return del(paths.build + 'webfont/*.css')
}
