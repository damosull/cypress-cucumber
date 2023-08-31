import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I click the browser {string} button', (direction) => {
	cy.go(direction);
});
