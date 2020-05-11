const webpack = require('webpack')

module.exports = ({ config }) => {
  config.resolve.extensions.push('.js', '.jsx')

  // Removes process logging
  config.plugins = config.plugins.filter(
    plugin => plugin.constructor.name !== 'ProgressPlugin'
  )

  config.plugins.push(new webpack.EnvironmentPlugin(['NODE_ENV', 'SC_ATTR']))

  return config
}
