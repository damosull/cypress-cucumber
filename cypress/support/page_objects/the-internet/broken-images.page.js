class brokenImagesPage {
	images() {
		return cy.get('img');
	}

	thirdImage() {
		return cy.get('[src="img/avatar-blank.jpg"]');
	}
}

module.exports = new brokenImagesPage();
