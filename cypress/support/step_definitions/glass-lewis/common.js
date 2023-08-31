import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import webDisclosure from '../../page_objects/glass-lewis/webDisclosure.page';

Given('user is on the landing page for WD site', () => {
	cy.visit('https://viewpoint.glasslewis.com/WD/?siteId=DemoClient');
});

Given('the Country filter is available', () => {
	webDisclosure.getCountryFilter().should('be.visible');
});

When('user selects the following country from the Country filter list on left panel', (countries) => {
	countries.hashes().forEach((country) => {
		countryName = country.countryName;
		webDisclosure.getCountryFilter().type(countryName);
		webDisclosure.getBelgiumCheckbox().click();
	});
});

When('clicks on Update button for the country filter list', () => {
	cy.intercept('POST', '**/Api/Data//Issuers').as('getIssuers');
	webDisclosure.getCountryFilterUpdateButton().click();
});

Then('the grid displays all meetings that are associated with {string}', (expCountry) => {
	cy.wait('@getIssuers').then((interception) => {
		const responseBody = interception.response.body;
		const apiMeetings = responseBody.Total;

		// No. of records displayed matches the number of records returned in the response
		cy.get('tr').should('have.length', apiMeetings + 1); // Adding 1 for the table header

		// The country of each item returned by the API is Belgium
		responseBody.Data.forEach((meeting) => {
			expect(meeting.Country).to.equal(expCountry);
		});

		// Assert the country values in the grid using custom command
		webDisclosure.getCountryValuesFromGrid().each((element) => {
			const uiCountry = element.text();
			assert.equal(uiCountry, expCountry, 'Country Mismatch');
		});
	});
});

When('user clicks the {string} hyperlink', (company) => {
	cy.intercept({
		url: '**/Api/Data//ToolbarSearch/Get?SiteId=DemoClient*',
		method: 'GET',
	}).as('searchRequest');

	webDisclosure.getCompanySearchBox().clear().type(company);

	cy.wait('@searchRequest');

	webDisclosure.getCompanySearchBox().type('{enter}');
});

Then('the user lands onto the Company vote card page', () => {
	webDisclosure.getDetailIssuerName().should('be.visible');
});

Then('the {string} should appear in the top banner', (company) => {
	webDisclosure.getDetailIssuerName().should('be.visible').and('have.text', company);
});
