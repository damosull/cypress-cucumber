import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import addRemoveElementsPage from '../../page_objects/the-internet/add-remove-elements.page';

Then('there are {int} Delete buttons displayed on the page', (count) => {
	addRemoveElementsPage.allDeleteButtons().should('be.visible').its('length').should('eq', count);
});

When('I click the {string} Delete button', (pos) => {
	addRemoveElementsPage.getButtonByPos(pos).click();
});
