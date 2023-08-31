import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import checkboxesPage from '../../page_objects/the-internet/checkboxes.page';

When('I check checkbox {int}', (index) => {
	checkboxesPage.getCheckboxByIndex(index).check();
});

When('I check all checkboxes', () => {
	checkboxesPage.allCheckboxes().check();
});

When('I uncheck checkbox {int}', (index) => {
	checkboxesPage.getCheckboxByIndex(index).uncheck();
});

When('I uncheck all checkboxes', () => {
	checkboxesPage.allCheckboxes().uncheck();
});

Then('checkbox {int} is checked', (index) => {
	checkboxesPage.getCheckboxByIndex(index).should('be.visible').and('be.checked');
});

Then('all checkboxes are checked', () => {
	checkboxesPage.allCheckboxes().should('be.visible').and('be.checked');
});

Then('checkbox {int} is unchecked', (index) => {
	checkboxesPage.getCheckboxByIndex(index).should('be.visible').and('not.be.checked');
});

Then('all checkboxes are unchecked', () => {
	checkboxesPage.allCheckboxes().should('be.visible').and('not.be.checked');
});
