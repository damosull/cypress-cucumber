import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import dropdownPage from '../../page_objects/dropdown.page';

When('I select the option with {string} of {string} from the dropdown', (attribute, value) => {
	dropdownPage.dropdown().select(value);
});

Then('the selected option text is {string}', (txt) => {
	dropdownPage.selectedDropdown().should('be.visible').and('have.text', txt);
});
