module.exports = api => {
  api.cache(true)

  const plugins = [
    [
      'prismjs',
      {
        languages: ['c', 'java', 'javascript', 'objectivec', 'swift'],
        theme: 'twilight',
        css: true,
      },
    ],
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: [
            {
              removeViewBox: false,
              cleanupIDs: false,
            },
          ],
        },
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: true,
      },
    ],
    ['@babel/plugin-transform-runtime'],
  ]

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: '11',
            edge: '16',
            firefox: '85',
            chrome: '86',
            safari: '12',
            node: '16.14.0',
          },
          loose: true,
          shippedProposals: true,
        },
      ],
      '@babel/react',
    ],
    plugins: plugins,
    exclude: ['node_modules'],
  }
}
