import { When } from '@badeball/cypress-cucumber-preprocessor';
import scrollPage from '../../page_objects/the-internet/scroll.page';

When('I scroll to the page footer', () => {
	scrollPage.footer().scrollIntoView();
});
