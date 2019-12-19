'use strict'
import gulp from 'gulp'
import * as build from './tasks/build'
import { imageClean, imageCopy, jsonCopy } from './tasks/copy'
import { faviconGenerate, faviconMarkup } from './tasks/favicon'
import { createIconfont } from './tasks/iconfont'
import { yaml, compilePugAll, compilePug } from './tasks/pug'
import { reload, localServer } from './tasks/server'
import { sftp_staging } from './tasks/sftp'
import * as sprite from './tasks/sprite'
import * as staging from './tasks/staging'
import { compileStylus } from './tasks/stylus'
import { createWebfont } from './tasks/webfont'
import { compileJs } from './tasks/webpack'

// watch
const watch = cb => {
  gulp.watch(['src/js/**/*'], gulp.series(compileJs))
  gulp.watch(['src/stylus/**/*'], compileStylus)
  gulp.watch(['src/pug/**/*', 'src/yaml/**/*'], compilePug)
  gulp.watch(['src/img/**/*'], gulp.series(imageClean, imageCopy, reload))
  cb()
}

// default
exports.default = gulp.series(
  yaml,
  gulp.parallel(compilePug, compileStylus, compileJs, jsonCopy),
  imageClean,
  imageCopy,
  watch,
  localServer
)

// build
exports.build = gulp.series(
  yaml,
  gulp.parallel(compilePug, jsonCopy, createIconfont),
  createWebfont,
  imageClean,
  imageCopy,
  build.yamlBuild,
  gulp.parallel(
    build.iconFontCopyBuild,
    build.webFontCopyBuild,
    build.pugBuild,
    build.stylusBuild,
    build.jsLibCopyBuild,
    build.webpackBuild
  ),
  build.imageCleanBuild,
  build.imgBuild,
  build.svgCopyBuild,
  build.delBuild
)

// deploy
exports.deploy = gulp.series(
  staging.delStg,
  staging.yamlStg,
  gulp.parallel(
    staging.pugStg,
    staging.stylusStg,
    staging.imgStg,
    staging.svgCopyStg,
    staging.iconFontCopy,
    staging.webFontCopy,
    staging.jsLibCopyStg,
    staging.faviconCopy,
    staging.webpackStg
  ),
  staging.replaceHtml,
  sftp_staging
)

// favicon
exports.favicon = gulp.series(faviconGenerate, faviconMarkup)

// iconfont
exports.createIconfont = gulp.series(createIconfont)

// pug
exports.pugAll = gulp.series(yaml, compilePugAll, reload)

// sprite
exports.spritePng = gulp.series(sprite.spritePng)
exports.spriteJpg = gulp.series(sprite.spriteJpg)
exports.spriteSvg = gulp.series(sprite.spriteSvg)
exports.spriteSvgInline = gulp.series(sprite.spriteSvgInline)

// webfont
exports.createWebfont = gulp.series(createWebfont)
