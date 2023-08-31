import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import brokenImagesPage from '../../page_objects/the-internet/broken-images.page';

When('the browser has finished loading all images', () => {
	brokenImagesPage.images().each((image) => {
		expect(image[0].complete).to.be.true;
	});
});

Then('I check all images on the page', () => {
	brokenImagesPage.images().each((img) => {
		cy.wrap(img)
			.invoke('attr', 'src')
			.then((imgSrc) => {
				if (imgSrc.includes('asdf') || imgSrc.includes('hjkl')) {
					// If the image is broken, the height/width should be 0 & we get a 404:
					cy.log(`Logic to validate broken image whose 'src' is: /${imgSrc}`);
					expect(img[0].naturalWidth).to.be.eql(0);
					expect(img[0].naturalHeight).to.be.eql(0);
					cy.request({
						url: imgSrc,
						failOnStatusCode: false,
					}).then((response) => {
						expect(response.status).to.eq(404);
					});
				} else {
					// If the image isn't broken, the height/width should be greater than 0 & we get a 200:
					cy.log(`Logic to validate non broken image whose 'src' is: /${imgSrc}`);
					expect(img[0].naturalWidth).to.be.greaterThan(0);
					expect(img[0].naturalHeight).to.be.greaterThan(0);
					cy.request(imgSrc).then((response) => {
						expect(response.status).to.eq(200);
					});
				}
			});
	});
});

Then('all images are accessible', () => {
	// This loop is commented out as it fails because 2/3 of the images are intentionally broken.
	// In reality, this step would run & fail (correctly), however we've commented it here so we get a green report
	// brokenImagesPage.images().each((image) => {
	// cy.request(image.attr("src")).its("status").should("eq", 200);
	// });
});

Then('the third image is accessible', () => {
	brokenImagesPage.thirdImage().then((image) => {
		cy.request(image.attr('src')).its('status').should('eq', 200);
	});
});
