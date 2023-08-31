import { Then } from '@badeball/cypress-cucumber-preprocessor';
import formAuthentication from '../../page_objects/the-internet/form-authentication.page';

const users = [
	{
		username: 'tomsmith',
		password: 'SuperSecretPassword!',
	},
	{
		username: 'tomsmithfail',
		password: 'SuperSecretPasswordFail',
	},
];

Then('I validate data driven login page with valid and invalid users', () => {
	users.forEach((user) => {
		formAuthentication.txtUsername().type(user.username);
		formAuthentication.txtPassword().type(user.password);
		cy.get('.fa').click();
		if (user.username == 'tomsmith' && user.password == 'SuperSecretPassword!') {
			formAuthentication.header().should('be.visible').and('have.text', ' Secure Area');
			formAuthentication.btnLogout().click();
		} else {
			formAuthentication.warning().should('be.visible').and('contain', 'Your username is invalid!');
		}
	});
});

Then('I can log in via the API', () => {
	// Failing atm, but it should be passing:
	cy.request({
		method: 'POST',
		url: `${Cypress.config('baseUrl')}/authenticate`,
		form: true,
		body: {
			username: users[0].username,
			password: users[0].password,
		},
	}).then((response) => {
		expect(response.status).to.eq(200);
		expect(response.body).to.include('You logged into a secure area!');
	});
});
