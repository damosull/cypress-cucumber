class webDisclosurePage {
	getCompanySearchBox() {
		return cy.get('input[id="kendo-Search-for-company"]');
	}

	getDetailIssuerName() {
		return cy.get('h2[id="detail-issuer-name"]', { timeout: 10000 });
	}

	getCountryFilter() {
		return cy.get('input[id="txt-multiselect-static-search-CountryFilter"]', { timeout: 10000 });
	}

	getBelgiumCheckbox() {
		return cy.get('#Belgium-cb-label-CountryFilter');
	}

	getCountryFilterUpdateButton() {
		return cy.get('#multiselect-static-target-CountryFilter > .btn-container > #btn-update');
	}

	getCountryValuesFromGrid() {
		return cy.get('tr[role="row"] td:nth-child(5)[role="gridcell"]');
	}
}

module.exports = new webDisclosurePage();
