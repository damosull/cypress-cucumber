import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I navigate to {string}', (pageId) => {
	if (pageId === 'the-internet') {
		cy.visit(Cypress.config('baseUrl'));
	} else {
		throw new Error('Page Not Specified');
	}
});

When('I click the {string} link', (txt) => {
	cy.contains(txt).click();
});

Then('I am on the {string} page', (pageId) => {
	cy.url().should('contain', `https://the-internet.herokuapp.com/${pageId}`);
});

When('I refresh the page', () => {
	cy.reload();
});

Then('the page header contains text {string}', (txt) => {
	cy.get('h3').should('contain.text', txt).should('be.visible');
});

Then('{string} has the text {string}', (el, txt) => {
	cy.get(`#${el}`).should('have.text', txt);
});

Then('I can see the {string} message', (txt) => {
	cy.get('p').should('be.visible').and('contain.text', `${txt}`);
});

Then('the Hello World! element is not visible', () => {
	cy.get('#finish').should('not.be.visible');
});

Then('the Hello World! element is visible', () => {
	cy.get('#finish').should('be.visible');
});

When('I trigger the show method of the Hello World! element', () => {
	// show() is used to display hidden elements
	cy.get('#finish').invoke('show').should('be.visible');
});

Then('wait until the loading bar disappears', () => {
	cy.get('#loading').contains('Loading', { timeout: 20000 }).should('not.be.visible');
});

Then('the Hello World! element does not exist', () => {
	cy.get('#finish').should('not.exist');
});

Then('the modal div is visible', () => {
	cy.get('.modal').should('be.visible');
});

Then('the modal div is not visible', () => {
	cy.get('.modal').should('not.be.visible');
});

Then('the floating menu is visible', () => {
	cy.get('#menu').should('be.visible');
});

When('I click the {string} button', (btnText) => {
	if (btnText === 'Add Element') {
		// eslint-disable-next-line
		cy.get('[onclick="addElement()"]').click().should('be.visible');
	} else if (btnText === 'Upload') {
		cy.get('#file-submit').click();
	} else if (btnText === 'Retrieve password' || btnText === 'Where am I?') {
		cy.contains(btnText).click();
	} else {
		throw new Error('Element Not Specified');
	}
});

When('I type {string} in the textbox', (txt) => {
	cy.get('#email').type(txt);
});

When('I see the {string} message', (msg) => {
	cy.contains('#content', msg).should('be.visible');
});

When('I can see the {string} link', (txt) => {
	cy.contains(txt).should('be.visible');
});
