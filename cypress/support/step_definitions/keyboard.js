import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I click the {string} button using keyboard actions', (btnText) => {
	cy.contains(btnText).type('{enter}');
});

When('I clear the textbox using keyboard actions', () => {
	cy.get('#email').type('{selectall}{backspace}');
});

When('I type the {string} key {int} times', (key, no) => {
	// The `Cypress._.repeat()` function repeats the given string the specified no. of times
	// eslint-disable-next-line
	cy.get('input')
		.type(Cypress._.repeat(`{${key}}-{enter}`, no))
		.trigger('change');
	// .trigger() is used to simulate the change event after setting the input value through the .type() command
	// .type() on it's own doesn't trigger the change event automatically, yo uneed to use .trigger() with the 'change' event
});
