import gulp from 'gulp'
import del from 'del'
import paths from '../config'

export const imageClean = () => {
  return del(paths.img_dest + '**')
}

export const imageCopy = () => {
  return gulp.src('./src/img/**/*.*').pipe(gulp.dest(paths.img_dest))
}

export const jsonCopy = () => {
  return gulp.src('./src/data/**/*.*').pipe(gulp.dest(paths.img_dest))
}
