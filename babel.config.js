module.exports =
  process.env.NODE_ENV === 'test'
    ? {
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
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-flow-strip-types',
          '@babel/plugin-transform-runtime',
          'inline-svg',
          'emotion',
        ],
      }
    : {
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
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-flow-strip-types',
          'inline-svg',
          'emotion',
        ],
      }
