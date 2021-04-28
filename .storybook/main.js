const webpack = require('webpack')

module.exports = {
  stories: ['../src/**/*.stories.@(mdx|js)'],
  addons: [
    '@storybook/addon-knobs/preset',
    '@storybook/addon-links',
    '@storybook/addon-actions/preset',
    '@storybook/addon-a11y/preset',
    'storybook-addon-designs',
    {
      name: '@storybook/addon-docs/preset',
      options: { configureJSX: true },
    },
  ],
  features: {
    postcss: false,
  },
  webpackFinal: async config => {
    config.resolve.extensions.push('.js', '.jsx')

    // Removes process logging
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'ProgressPlugin'
    )

    config.plugins.push(new webpack.EnvironmentPlugin(['NODE_ENV', 'SC_ATTR']))

    return config
  },
}
