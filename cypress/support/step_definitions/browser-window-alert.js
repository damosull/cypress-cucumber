import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import contextMenuPage from '../page_objects/context-menu.page';

When('I go to the opt out URL', () => {
	cy.visit('/abtest?optimizely_opt_out=true');
});

When('I right-click on the div', () => {
	contextMenuPage.div().rightclick();
});

Then('the {string} alert is displayed', (txt) => {
	cy.on('window:alert', (alertText) => {
		expect(alertText).eq(txt);
	});
});
