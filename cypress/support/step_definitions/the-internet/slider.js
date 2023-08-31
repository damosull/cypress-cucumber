import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import sliderPage from '../../page_objects/slider.page';

Then('the value of the slider is {float}', (val) => {
	sliderPage.slider().should('be.visible').and('have.value', val);
	sliderPage.lblRange().should('be.visible').and('have.text', val);
});

When('I set the value to {int}', (val) => {
	// set the value of the input, & trigger a 'change' event to simulate the user changing the value
	sliderPage.slider().invoke('val', val).trigger('change');
	// using just .invoke() won't change the input value. to simulate the user changing the vlalue & triggering a `change` event, use .trigger() also
});
