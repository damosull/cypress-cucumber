class fileUploadPage {
	fileUploadControl() {
		return cy.get('#file-upload');
	}

	dragDropUploadArea() {
		return cy.get('#drag-drop-upload');
	}

	uploadedFiles() {
		return cy.get('#uploaded-files');
	}
}

module.exports = new fileUploadPage();
