import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import contextMenuPage from '../../page_objects/the-internet/context-menu.page';

When('I right-click on the div', () => {
	contextMenuPage.div().rightclick();
});

Then('the {string} alert is displayed', (txt) => {
	cy.on('window:alert', (alertText) => {
		expect(alertText).eq(txt);
	});
});
