class basicAuthPage {
	paragraph() {
		return cy.get('p');
	}
}

module.exports = new basicAuthPage();
