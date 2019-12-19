import gulp from 'gulp'
import pug from 'gulp-pug'
import stylus from 'gulp-stylus'
import rupture from 'rupture'
import postcss from 'gulp-postcss'
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
import replace from 'gulp-replace'
import del from 'del'
import paths from '../config'

let locals = {}

export const yamlStg = () => {
  locals = {}
  return gulp
    .src(paths.yaml_src)
    .pipe(vinylYamlData())
    .pipe(deepExtend(locals))
}

export const webpackStg = () => {
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(paths.js_stg))
}

export const imgStg = () => {
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
    .pipe(gulp.dest(paths.img_staging))
}

export const svgCopyStg = () => {
  return gulp.src(paths.img_src + '**/*.svg').pipe(gulp.dest(paths.img_staging))
}

export const iconFontCopy = () => {
  return gulp
    .src(paths.dest + 'iconfont/*.*')
    .pipe(gulp.dest('staging/iconfont/'))
}

export const webFontCopy = () => {
  return gulp
    .src(paths.dest + 'webfont/*.*')
    .pipe(gulp.dest('staging/webfont/'))
}

export const jsLibCopyStg = () => {
  return gulp
    .src(paths.dest + 'js/lib/**/*.js')
    .pipe(gulp.dest('staging/js/lib/'))
}

// export const jsonCopyStg = () => {
//   return gulp.src('./src/api/**/*.json').pipe(gulp.dest(paths.staging + 'api/'))

export const faviconCopy = () => {
  return gulp
    .src('./src/img/favicon/favicon.ico')
    .pipe(gulp.dest(paths.staging))
}

export const stylusStg = () => {
  return gulp
    .src(paths.stylus_src)
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
    .pipe(gulp.dest(paths.stylus_stg))
}

export const pugStg = () => {
  return gulp
    .src(paths.pug_src)
    .pipe(
      pug({
        pretty: true,
        locals: locals
      })
    )
    .on('error', err => {
      console.log(err.message)
    })
    .pipe(gulp.dest(paths.staging))
}

export const replaceHtml = () => {
  return gulp
    .src('staging/**/*.html')
    .pipe(replace('href="/', 'href="/japan-curtain/'))
    .pipe(replace('content="/', 'content="/japan-curtain/'))
    .pipe(replace('src="/', 'src="/japan-curtain/'))
    .pipe(gulp.dest(paths.staging))
}

export const delStg = () => {
  return del(paths.staging + 'webfont/*.css')
}
