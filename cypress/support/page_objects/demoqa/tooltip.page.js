class tooltipPage {
	header() {
		return cy.get('.main-header');
	}

	btnToolTip() {
		return cy.get('#toolTipButton');
	}

	toolTip() {
		return cy.get('.tooltip-inner');
	}
}

module.exports = new tooltipPage();
