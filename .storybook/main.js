module.exports = {
  stories: ['../**/*.stories.js'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
  ],
}
