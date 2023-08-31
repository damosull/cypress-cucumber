import { Given, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I go to {string}', (pageId) => {
	if (pageId === 'the-internet') {
		cy.visit(Cypress.config('baseUrl'));
	} else {
		throw new Error('Page Not Specified');
	}
});

When('I go to the opt out URL', () => {
	cy.visit('/abtest?optimizely_opt_out=true');
});

When('I go to the dynamic content page with the static content suffix', () => {
	cy.visit(`${Cypress.config('baseUrl')}/dynamic_content?with_content=static`);
});
