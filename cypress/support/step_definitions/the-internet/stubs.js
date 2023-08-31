import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I mock my location', () => {
	cy.fixture('coords.json').then((coords) => {
		cy.window().then(($window) => {
			cy.stub($window.navigator.geolocation, 'getCurrentPosition').callsFake((callback) => {
				return callback({ coords: { latitude: coords.latitude, longitude: coords.longitude } });
			});
		});
	});
});
