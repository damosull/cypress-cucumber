class abTestingPage {
	header() {
		return cy.get('h3');
	}
}

module.exports = new abTestingPage();
