// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const paths = require('../config/paths')
const harvester = require('seed-harvester')
const includePaths = harvester(['./src/scss'])

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      // Sass
      {
        test: /\.scss$/,
        include: paths.appSrc,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths,
            },
          },
        ],
      },
      // SVG
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
}
