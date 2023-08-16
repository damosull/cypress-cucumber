import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

Then('there are {int} Delete buttons displayed on the page', (count) => {
	cy.get("button:contains('Delete')").should('be.visible').its('length').should('eq', count);
});

When('I click the {string} Delete button', (pos) => {
	cy.get(`.added-manually:${pos}`).click();
});
