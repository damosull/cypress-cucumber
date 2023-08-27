class formAuthenticationPage {
	txtUsername() {
		return cy.get('#username');
	}

	txtPassword() {
		return cy.get('#password');
	}

	header() {
		return cy.get('h2');
	}

	btnLogout() {
		return cy.contains('Logout');
	}

	warning() {
		return cy.get('#flash');
	}
}

module.exports = new formAuthenticationPage();
