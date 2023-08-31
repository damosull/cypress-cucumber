import { When } from '@badeball/cypress-cucumber-preprocessor';

When('the user drags the {string} element & drops it onto the {string} element', (dragElement, dropElement) => {
	const dataTransfer = new DataTransfer(); // used to transfer data during a drag & drop operation
	cy.contains(dragElement).trigger('dragstart', { dataTransfer }); // this is the start of a drag & drop operation
	cy.contains(dropElement).trigger('drop', { dataTransfer }); // triggers a 'drop' event on the element (the end of a drag & drop operation)
});
