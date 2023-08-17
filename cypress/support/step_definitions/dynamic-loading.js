import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import dynamicLoadingPage from '../page_objects/dynamic-loading.page';

Then('the Hello World! element is not visible', () => {
	dynamicLoadingPage.helloWorld().should('not.be.visible');
});

Then('wait until the loading bar disappears', () => {
	dynamicLoadingPage.loadingBar().should('not.be.visible');
});

Then('the Hello World! element is visible', () => {
	dynamicLoadingPage.helloWorld().should('be.visible');
});

When('I trigger the show method of the Hello World! element', () => {
	dynamicLoadingPage.helloWorld().invoke('show').should('be.visible'); // show() is used to display hidden elements
});

Then('the Hello World! element does not exist', () => {
	dynamicLoadingPage.helloWorld().should('not.exist');
});
