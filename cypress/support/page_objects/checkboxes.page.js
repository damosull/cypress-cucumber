class checkboxesPage {
	allCheckboxes() {
		return cy.get('#checkboxes input[type=checkbox]');
	}

	getCheckboxByIndex(index) {
		return cy.get('#checkboxes input[type=checkbox]').eq(index - 1);
	}
}

module.exports = new checkboxesPage();
