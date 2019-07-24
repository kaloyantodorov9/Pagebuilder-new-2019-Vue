const mix = require('laravel-mix');

mix.js('src/app.js', 'public/js')
   .sass('scss/app.scss', 'public/css');

//mix.js('./packages/src/resources/assets/js/app.js', './storage/app/scripts/app.js');

//mix.setPublicPath('./');
mix.sourceMaps();