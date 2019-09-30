const path = require('path')
const paths = require('../config/paths')
const harvester = require('seed-harvester')
const includePaths = harvester(['./src/scss'])

module.exports = ({ config }) => {
  // Storybook StorySource AddOn
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  })
  config.resolve.extensions.push('.js', '.jsx')

  // Typescript
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules|tests/,
    loader: require.resolve('awesome-typescript-loader'),
    options: {
      silent: true,
      useCache: true,
      usePrecompiledFiles: true,
      transpileOnly: true,
    },
  })
  config.resolve.extensions.push('.ts', '.tsx')

  // SCSS
  config.module.rules.push({
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
  })
  config.resolve.extensions.push('.scss')

  // Removes process logging
  config.plugins = config.plugins.filter(
    plugin => plugin.constructor.name !== 'ProgressPlugin'
  )

  return config
}
