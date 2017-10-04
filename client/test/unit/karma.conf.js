const webpackConfig = require('../../build/webpack.test.conf');

module.exports = (config) => {
  config.set({
    browsers: ['CustomChromeHeadless'],
    customLaunchers: {
      CustomChromeHeadless: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-translate',
          '--headless',
          '--disable-gpu',
          '--disable-extensions',
          '--remote-debugging-port=9222',
        ],
      },
    },
    frameworks: ['mocha', 'promise', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
  });
};
