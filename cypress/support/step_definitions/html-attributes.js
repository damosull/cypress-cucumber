import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the opacity of {string} is {string}', (el, val) => {
	cy.get(`#${el}`).should('have.css', 'opacity', val);
});

Then('the first option is disabled', () => {
	// 2 ways to check:
	cy.get('#dropdown option').eq(0).should('have.attr', 'disabled', 'disabled');
	cy.get('#dropdown option:first').should('be.disabled');
});

Then('the selected option {string} is {string}', (attribute, expectedValue) => {
	cy.get("#dropdown option[selected='selected']").should('have.attr', attribute, expectedValue);
});
