module.exports = {
  stories: ['../**/*.stories.@(mdx|js)'],
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
}
