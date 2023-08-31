class dropdownPage {
	dropdown() {
		return cy.get('#dropdown');
	}

	selectedDropdown() {
		return cy.get("#dropdown option[selected='selected']");
	}
}

module.exports = new dropdownPage();
