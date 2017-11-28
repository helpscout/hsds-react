const path = require('path');
const paths = require('./paths');
const harvester = require('seed-harvester');
const includePaths = harvester([
  './src/scss'
]);
const testHelperPath = '../test/acceptance/test-helpers.js'
const eslintFormatter = require('react-dev-utils/eslintFormatter')

module.exports = function(config) {
  const configuration = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    files: [
      // entry file for Webpack
      testHelperPath
    ],

    // before serving test/testHelper.js to the browser
    preprocessors: {
      [testHelperPath]: [
        'webpack'
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // for Travis
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: {
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      module: {
        strictExportPresence: true,
        rules: [
          {
            test: /\.(js|jsx)$/,
            include: [
              paths.appSrc,
              paths.testAcceptanceSrc
            ],
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.scss$/,
            include: paths.appSrc,
            use: [{
              loader: 'style-loader'
            }, {
              loader: 'css-loader'
            }, {
              loader: 'sass-loader',
              options: {
                includePaths
              }
            }]
          },
          {
            test: /\.svg$/,
            loader: 'raw-loader'
          }
        ]
      }
    },

    webpackMiddleware: {
      // only output webpack error messages
      stats: 'errors-only'
    },

    // enable our plugins
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-matchers'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher')
    ]
  }

  // For Travis
  if(process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci']
  }

  config.set(configuration)
}
