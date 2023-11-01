class homePage {
	elementLink() {
		return cy.get('h5').eq(0);
	}

	widgetsLink() {
		return cy.get('h5').eq(3);
	}

	brokenLinksLink() {
		return cy.contains('li', 'Broken Links - Images');
	}

	tooltipsLink() {
		return cy.contains('li', 'Tool Tips');
	}
}

module.exports = new homePage();
