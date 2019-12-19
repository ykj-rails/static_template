import gulp from 'gulp'
import sftp from 'gulp-sftp-up4'
import paths from '../config'

export const sftp_staging = () => {
  return gulp.src(`${paths.staging}**/*`).pipe(
    sftp({
      host: 'xxx..jp',
      user: 'username',
      pass: 'pass',
      port: 2222,
      remotePath: '/',
      timeout: 100000
    })
  )
}
