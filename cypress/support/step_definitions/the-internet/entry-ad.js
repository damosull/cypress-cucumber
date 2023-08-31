import { Then } from '@badeball/cypress-cucumber-preprocessor';
import entryAdPage from '../../page_objects/the-internet/entry-ad.page';

Then('the modal div is visible', () => {
	entryAdPage.modal().should('be.visible');
});

Then('the modal div is not visible', () => {
	entryAdPage.modal().should('not.be.visible');
});
