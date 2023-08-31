class addRemoveElementsPage {
	allDeleteButtons() {
		return cy.get("button:contains('Delete')");
	}

	getButtonByPos(pos) {
		return cy.get(`.added-manually:${pos}`);
	}
}

module.exports = new addRemoveElementsPage();
