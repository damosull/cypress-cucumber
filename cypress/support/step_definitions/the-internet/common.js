import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import aBTestingPage from '../../page_objects/the-internet/a-b-testing.page';
import basicAuthPage from '../../page_objects/the-internet/basic-auth.page';

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

Then('I see the {string} message', (msg) => {
	cy.contains('#content', msg).should('be.visible');
});

Then('I can see the {string} link', (txt) => {
	cy.contains(txt).should('be.visible');
});

Then('my coords are displayed', () => {
	cy.fixture('coords.json').then((coords) => {
		cy.contains(coords.latitude).should('be.visible');
		cy.contains(coords.longitude).should('be.visible');
	});
});
