import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I open a new window', () => {
	cy.contains('Click Here').invoke('removeAttr', 'target').click();
});

Then('the new window appears in the current tab', () => {
	cy.url().should('include', '/windows/new');
	cy.get('h3').should('have.text', 'New Window');
});
