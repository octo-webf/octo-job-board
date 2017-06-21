const webpackConfig = require('../../build/webpack.test.conf');

module.exports = (config) => {

	config.set({
		browsers: ['PhantomJS'],
		frameworks: ['mocha', 'sinon-stub-promise', 'sinon-chai', 'phantomjs-shim'],
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
