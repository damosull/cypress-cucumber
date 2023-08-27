class sliderPage {
	slider() {
		return cy.get('input')
	}

    lblRange() {
        return cy.get('#range')
    }
}

module.exports = new sliderPage();
