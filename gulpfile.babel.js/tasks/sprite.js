import gulp from 'gulp'
import spritesmith from 'gulp.spritesmith'
import buffer from 'vinyl-buffer'
import merge from 'merge-stream'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'
import imageminJpg from 'imagemin-jpeg-recompress'
import svgmin from 'gulp-svgmin'
import svgstore from 'gulp-svgstore'
import rename from 'gulp-rename'
import cheerio from 'gulp-cheerio'
import temp from 'gulp-template'
import inject from 'gulp-inject'
import paths from '../config'

// png
export const spritePng = () => {
  const spriteData = gulp.src(`${paths.img_sprite_src}png/*.png`).pipe(
    spritesmith({
      imgName: '../img/common/sprite_curtain.png',
      cssName: 'sprite_curtain.styl',
      padding: 5
    })
  )

  const imgStream = spriteData.img

    .pipe(buffer())
    .pipe(imagemin([pngquant()]))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img_sprite_dest))

  const cssStream = spriteData.css.pipe(
    gulp.dest('./src/stylus/object/component/')
  )

  return merge(imgStream, cssStream)
}

// jpg
export const spriteJpg = () => {
  const spriteData = gulp.src(`${paths.img_sprite_src}*.jpg`).pipe(
    spritesmith({
      imgName: '../img/top/color.jpg',
      cssName: 'sprite-color.styl',
      padding: 100
    })
  )

  const imgStream = spriteData.img

    .pipe(buffer())
    .pipe(imagemin([imageminJpg()]))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img_sprite_dest))

  const cssStream = spriteData.css.pipe(
    gulp.dest('./src/stylus/object/component/')
  )

  return merge(imgStream, cssStream)
}

// svg
export const spriteSvg = () => {
  return gulp
    .src(`${paths.img_sprite_src}svg/*.svg`)
    .pipe(svgmin())
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(
      cheerio({
        run: function($, file) {
          $('svg').attr('style', 'display:none')
          $('title').remove()
          $('style').remove()
          // _base.htmlに渡すid
          var symbols = $('svg > symbol')
            .map(function() {
              return {
                id: $(this).attr('id')
              }
            })
            .get()

          // _base.htmlを基に、_sample.htmlをルートに生成
          gulp
            .src('./src/template/svgsprite/svgsprite.html')
            .pipe(
              temp({
                inlineSvg: $('svg'),
                symbols: symbols
              })
            )
            .pipe(gulp.dest('./dest/template/svgsprite/'))
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./src/img/common/'))
}

// svg inline
export const spriteSvgInline = () => {
  const svgs = gulp
    .src(`${paths.img_sprite_src}inline/*.svg`)
    .pipe(svgmin())
    .pipe(svgstore({ inlineSvg: true }))

  function fileContents(filePath, file) {
    return file.contents.toString()
  }

  return gulp
    .src('./src/template/svgsprite-inline/inline-svg.html')
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest('./dest/template/svgsprite-inline/'))
}
