import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I click the {string} button using mouse actions', (btnText) => {
	// eslint-disable-next-line
	cy.contains(btnText).trigger('mouseover').click().should('be.visible');
});
