const webpack = require('webpack')

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

  // Removes process logging
  config.plugins = config.plugins.filter(
    plugin => plugin.constructor.name !== 'ProgressPlugin'
  )

  config.plugins.push(new webpack.EnvironmentPlugin(['NODE_ENV', 'SC_ATTR']))

  return config
}
