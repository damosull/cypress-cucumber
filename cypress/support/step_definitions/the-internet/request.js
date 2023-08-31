import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I send my email to the forgot_password endpoint, I receive a {int} status code', (code) => {
	cy.request({
		method: 'POST',
		url: '/forgot_password', // BaseUrl is prepend to URL
		form: true, // Indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
		body: {
			email: 'test@mail.com',
		},
	}).then((response) => {
		expect(response.status).to.eq(code); // Expect to fail as currently application throws 500 error
	});
});
