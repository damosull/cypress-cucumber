const { defineConfig } = require('cypress');
const fs = require('fs-extra');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const stdLibBrowser = require('node-stdlib-browser');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');

async function setupNodeEvents(on, config) {
	config.baseUrl = 'https://the-internet.herokuapp.com';

	await preprocessor.addCucumberPreprocessorPlugin(on, config, {
		omitBeforeRunHandler: true,
		omitAfterRunHandler: true,
	});

	on('before:run', () => {
		fs.emptyDirSync('./test-results');
		console.log(`INITIATING TESTS ON: ${config.baseUrl} at ${new Date()}`);
		preprocessor.beforeRunHandler(config);
	});

	on(
		'file:preprocessor',
		createBundler({
			inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
			define: {
				global: 'global',
				process: 'process',
				Buffer: 'Buffer',
			},
			plugins: [plugin(stdLibBrowser), createEsbuildPlugin.default(config)],
		})
	);

	on('task', {
		log(message) {
			console.log(message);
			return null;
		},
	});

	on('after:run', async (results) => {
		if (results) {
			try {
				await fs.copy('./test-results/screenshots', './test-screenshots');
				console.log('screenshots found! moving them to common directory...');
			} catch (e) {
				console.log('screenshots not found! moving on with the tests...');
			}
			console.log(`FINISHING TESTS ON: ${config.baseUrl} at ${new Date()}`);
			await preprocessor.afterRunHandler(config);
		}
	});

	return config;
}

module.exports = defineConfig({
	chromeWebSecurity: false,
	defaultCommandTimeout: 30000,
	env: {
		testEnv: 'qa',
	},
	experimentalMemoryManagement: true,
	e2e: {
		setupNodeEvents,
		specPattern: '**/*.feature',
	},
	numTestsKeptInMemory: 2,
	pageLoadTimeout: 60000,
	reporter: 'spec',
	requestTimeout: 15000,
	responseTimeout: 30000,
	screenshotOnRunFailure: true,
	screenshotsFolder: 'test-results/screenshots',
	video: false,
	videoCompression: 8,
	videosFolder: 'test-results/videos',
	viewportHeight: 1200,
	viewportWidth: 1920,
	watchForFileChanges: false,
	retries: {
		runMode: 1,
		openMode: 0,
	},
});
