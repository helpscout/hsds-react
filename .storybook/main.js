module.exports = {
  stories: ['../**/*.stories.@(mdx|js)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    'storybook-addon-designs',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
  ],
}
