module.exports = api => {
  const isTest = api.env('test')
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-flow-strip-types',
    'inline-svg',
    'emotion',
  ]

  if (isTest) {
    plugins.push('@babel/plugin-transform-runtime')
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: '11',
            edge: '16',
            firefox: '60',
            chrome: '65',
            safari: '10',
            node: '8',
          },
          loose: true,
        },
      ],
      '@babel/preset-flow',
      '@babel/react',
    ],
    plugins: plugins,
  }
}
