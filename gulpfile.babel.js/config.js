const paths = {
  img_src: './src/img/**/',
  img_dest: './dest/img/',
  img_staging: './staging/img/',
  img_build: './build/img/',
  img_sprite_src: './src/sprite/',
  img_sprite_dest: './src/img/',

  js_src: './src/js/app.js',
  js_dest: './dest/js/',
  js_build: './build/js/',
  js_stg: './staging/js/',

  stylus_src: './src/stylus/app.styl',
  stylus_dest: './dest/css/',
  stylus_build: './build/css/',
  stylus_stg: './staging/css/',

  pug_src: ['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'],

  yaml_src: './src/yaml/**/*.y{,a}ml',

  php_src: './src/php/',

  iconfont_src: './src/iconfont/*.svg',
  iconfont_template_src: './src/template/iconfont/',
  iconfont_template_dest: './dest/template/iconfont/',
  iconfont_stylus_dest: './src/stylus/object/component/',
  iconfont_dest: './dest/iconfont/',
  iconfont_build: './build/iconfont/',
  webfont_src: './src/webfont/*.*',
  webfont_dest: './dest/webfont/',
  webfont_build: './build/webfont/',

  favicon_src: 'src/favicon/favicon.png',
  favicon_dest: 'src/img/favicon/',
  favicon_template_src: 'src/template/favicon/index.html',
  favicon_template_dest: 'dest/template/favicon/',

  dest: './dest/',
  build: './build/',
  staging: './staging/'
}

export default paths
