import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import aBTestingPage from '../page_objects/a-b-testing.page';
import basicAuthPage from '../page_objects/basic-auth.page';

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
	aBTestingPage.header().should('be.visible').and('contain.text', txt);
});

Then('{string} has the text {string}', (el, txt) => {
	cy.get(`#${el}`).should('be.visible').and('have.text', txt);
});

Then('the {string} message is visible', (txt) => {
	basicAuthPage.paragraph().should('be.visible').and('contain.text', `${txt}`);
});

Then('the Hello World! element is not visible', () => {
	cy.get('#finish').should('not.be.visible');
});

Then('the Hello World! element is visible', () => {
	cy.get('#finish').should('be.visible');
});

When('I trigger the show method of the Hello World! element', () => {
	cy.get('#finish').invoke('show').should('be.visible'); // show() is used to display hidden elements
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
		cy.get('[onclick="addElement()"]').click();
	} else if (btnText === 'Upload') {
		cy.get('#file-submit').click();
	} else if (btnText === 'Retrieve password' || btnText === 'Where am I?') {
		cy.contains(btnText).click();
	} else {
		throw new Error('Button Not Specified');
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
