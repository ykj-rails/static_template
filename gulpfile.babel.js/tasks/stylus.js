import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gulpStylus from 'gulp-stylus'
import rupture from 'rupture'
import postcss from 'gulp-postcss'
import mqpacker from 'css-mqpacker'
import sourcemaps from 'gulp-sourcemaps'
import sortCSSmq from 'sort-css-media-queries'
import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import paths from '../config'

export const compileStylus = () => {
  return gulp
    .src(paths.stylus_src)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      gulpStylus({
        'include css': true,
        compress: true,
        use: [rupture()]
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
    .on('error', function(err) {
      console.log(err.message)
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.stylus_dest))
    .pipe(browserSync.stream())
}
