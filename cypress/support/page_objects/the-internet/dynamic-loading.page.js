class dynamicLoadingPage {
	helloWorld() {
		return cy.get('#finish');
	}

	loadingBar() {
		return cy.get('#loading').contains('Loading', { timeout: 20000 });
	}
}

module.exports = new dynamicLoadingPage();
