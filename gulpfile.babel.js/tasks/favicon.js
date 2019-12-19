import gulp from 'gulp'
import realFavicon from 'gulp-real-favicon'
import rename from 'gulp-rename'
import fs from 'fs'
import paths from '../config'

// favicon用マークアップ記述ファイル
const FAVICON_DATA_FILE = 'faviconData.json'

// favicon生成タスク
export const faviconGenerate = done => {
  realFavicon.generateFavicon(
    {
      masterPicture: paths.favicon_src,
      dest: paths.favicon_dest,
      iconsPath: '/img/favicon/',
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          },
          appName: 'JAPAN CURTAIN'
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#ffffff',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          },
          appName: 'JAPAN CURTAIN'
        },
        androidChrome: {
          pictureAspect: 'shadow',
          themeColor: '#ffffff',
          manifest: {
            name: 'JAPAN CURTAIN',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 70.3125,
          themeColor: '#ef4349'
        }
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false
      },
      markupFile: FAVICON_DATA_FILE
    },
    function() {
      done()
    }
  )
}

// favicon読み込み用のpugファイルを生成します
export const faviconMarkup = () => {
  return gulp
    .src(paths.favicon_template_src)
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
      )
    )
    .pipe(html2jade())
    .pipe(
      rename({
        extname: 'pug'
      })
    )
    .pipe(gulp.dest(paths.favicon_template_dest))
}

// RealFaviconGeneratorのアップデートを確認します
export const faviconUpdate = done => {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err
    }
  })
}
