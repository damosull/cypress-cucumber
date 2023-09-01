import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import factorial from '../../page_objects/hosteslworld/factorial.page';

Given('the user navigates to the Factoriall calculator screen', () => {
	cy.visit('http://qainterview.pythonanywhere.com/');
});

When('the user enters {float} into the input box', (input) => {
	factorial.getInputBox().type(input);
});

When('the user clicks the Calculate button', () => {
	factorial.getBtnCalculate().click();
});

Then('the message {string} is displayed', (message) => {
	factorial.getResultParagraph().should('be.visible').and('have.text', message);
});
