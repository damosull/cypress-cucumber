class dynamicContentPage {
	images() {
		return cy.get('.large-2 img');
	}

	imagesDescriptions() {
		return cy.get('.large-2 + .large-10');
	}
}

module.exports = new dynamicContentPage();
