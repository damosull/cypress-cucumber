import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I navigate to the page using {string} credentials', (credentials) => {
	cy.visit(`${Cypress.config('baseUrl')}/basic_auth`, {
		auth: {
			username: credentials,
			password: credentials,
		},
	});
});

When('I navigate to the page with the credentials in the URL', () => {
	cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth');
});

When('I try to navigate to the page without credentials I receive a {int} error', (errCode) => {
	cy.request({
		method: 'GET',
		url: `${Cypress.config('baseUrl')}/basic_auth`,
		failOnStatusCode: false,
	}).then((response) => {
		expect(response.status).to.eq(errCode);
	});
});

When('I try to navigate to the page with invalid credentials I receive a {int} error', (errCode) => {
	cy.request({
		method: 'GET',
		url: `${Cypress.config('baseUrl')}/basic_auth`,
		failOnStatusCode: false,
		auth: {
			username: 'invalid',
			password: 'invalid',
		},
	}).then((response) => {
		expect(response.status).to.eq(errCode);
	});
});
