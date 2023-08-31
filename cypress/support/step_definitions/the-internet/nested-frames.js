// Reference: Jquery API contents() - https://api.jquery.com/contents/

import { When } from '@badeball/cypress-cucumber-preprocessor';

When('the actual frames contain the expected frame contents', () => {
	const locators = ['left', 'middle', 'right', 'bottom']; // Array of locators to represent the frames
	const actualFramesContent = []; // actual contents of the frames
	const expectedFramesContent = ['LEFT', 'MIDDLE', 'RIGHT', 'BOTTOM']; // expected content of the frames

	// 1. Iterate over each locator to checks if it's in the bottom frame or not:
	locators.forEach((locator) => {
		if (locator !== 'bottom') {
			// 2. Within the top frame, find the nested frame with src="/frame_${locator}"
			cy.get('frame[src="/frame_top"]').within(($frame) => {
				cy.wrap($frame.contents().find(`frame[src="/frame_${locator}"]`)).within((frame) => {
					// 3. Use within() to operate within the context of that nested frame, get the body of the frame, & push the text to the actualFramesContent array.
					cy.wrap(frame.contents().find('body'))
						.invoke('text')
						.then((frameBodyText) => {
							actualFramesContent.push(frameBodyText.trim());
						});
				});
			});
		} else {
			cy.get('frame[src="/frame_bottom"]').within(($frame) => {
				cy.wrap($frame.contents()).within((frame) => {
					// 4. Use within() to operate within the context of that nested frame, get the body of the frame, & push the text to the actualFramesContent array.
					cy.wrap(frame.contents().find('body'))
						.invoke('text')
						.then((frameBodyText) => {
							actualFramesContent.push(frameBodyText.trim());
						});
				});
			});
		}
	});

	// 5. Compare both frame content arrays & their order:
	cy.wrap(actualFramesContent).should('have.ordered.members', expectedFramesContent);
});
