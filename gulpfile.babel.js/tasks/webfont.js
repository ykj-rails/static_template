import gulp from 'gulp'
import fontmin from 'gulp-fontmin'
import fs from 'fs'
import paths from '../config'

export const createWebfont = () => {
  return gulp
    .src(paths.webfont_src)
    .pipe(
      fontmin({
        text: getHtmlText()
      })
    )
    .pipe(gulp.dest(paths.webfont_dest))
}

const getHtmlText = () => {
  const ascii =
    '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
  const data = fs.readFileSync('./dest/index.html', {
    encoding: 'utf-8'
  })
  const all =
    ascii +
    data
      .toString()
      .split('\n')
      .join('')
  return all
}
