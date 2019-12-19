import gulp from 'gulp'
import browserSync from 'browser-sync'
import paths from '../config'

export const localServer = () => {
  browserSync({
    server: {
      baseDir: paths.dest
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
    open: 'external',
    online: true,
    port: 3000
  })
}

export const reload = cb => {
  browserSync.reload()
  cb()
}
