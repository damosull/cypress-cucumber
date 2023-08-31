import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import fileUploadPage from '../../page_objects/the-internet/file-upload.page';

When('I choose the {string} file', (fileName) => {
	fileUploadPage.fileUploadControl().selectFile(fileName);
});

Then('the uploaded files contain the {string} file', (fileName) => {
	fileUploadPage.uploadedFiles().contains(fileName).should('be.visible');
});

When('I drag and drop the {string} file', (fileName) => {
	fileUploadPage.dragDropUploadArea().selectFile(fileName, { action: 'drag-drop' });
	// 2nd argument above specifies 'how the file is selected'. We tell Cypress to simulate a drag & drop action to select the file instead of opening the file selection dialog
});

Then('the {string} appears within the upload box', (fileName) => {
	fileUploadPage.dragDropUploadArea().contains(fileName).should('be.visible');
});
