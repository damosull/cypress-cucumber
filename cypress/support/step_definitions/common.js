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

Then('the floating menu is visible', () => {
	cy.get('#menu').should('be.visible');
});

When('I click the {string} button', (btnText) => {
	let button;
	if (btnText === 'Add Element') {
		button = cy.get('[onclick="addElement()"]');
	} else if (btnText === 'Upload') {
		button = cy.get('#file-submit');
	} else if (btnText === 'Retrieve password' || btnText === 'Where am I?') {
		button = cy.contains(btnText);
	} else {
		throw new Error('Button Not Specified');
	}
	button.click();
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
