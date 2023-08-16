import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I go to the opt out URL the displayed alert reads {string}', (txt) => {
	cy.log(txt);
	cy.visit('/abtest?optimizely_opt_out=true');
	cy.on('window:alert', (alertText) => {
		expect(alertText).eq('You have successfully opted out of Optimizely for this domain.');
	});
});

When('I right-click on the box the {string} alert is displayed', (txt) => {
	cy.get('#hot-spot').rightclick();
	cy.on('window:alert', (alertText) => {
		expect(alertText).eq(txt);
	});
});
