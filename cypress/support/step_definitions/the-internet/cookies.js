import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I opt out of AB testing by setting a cookie', () => {
	cy.setCookie('optimizelyOptOut', 'true');
});

When('I clear all cookies', (name) => {
	// You can specify clearing a specific cookie using `cy.clearCookie(name);`
	cy.clearCookies(name);
	cy.getCookies().should('be.empty');
});
