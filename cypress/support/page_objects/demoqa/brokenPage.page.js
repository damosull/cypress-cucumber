class brokenPage {
	header() {
		return cy.get('.main-header');
	}

	allImages() {
		return cy.get('img');
	}
}

module.exports = new brokenPage();
