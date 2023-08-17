import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import dynamicContentPage from '../page_objects/dynamic-content.page';

let dynamicImgSrcAttrFirstVisit = [];
let dynamicTrimContentFirstVisit = [];

let staticImgSrcAttrFirstVisit = [];
let staticTrimContentFirstVisit = [];

When('I store the src attributes of all dynamic images during my first visit', () => {
	dynamicContentPage.images().then((images) => {
		dynamicImgSrcAttrFirstVisit = Array.from(images, (image) => image.src);
	});
});

When('I store all dynamic content during my first visit', () => {
	dynamicContentPage.imagesDescriptions().then((textFirstVisit) => {
		dynamicTrimContentFirstVisit = Array.from(textFirstVisit, (element) => element.innerText.trim());
	});
});

Then(
	'the src attributes of all dynamic images during my second visit dont match the values from my first visit',
	() => {
		dynamicContentPage.images().then((imgSecondVisit) => {
			const dynamicImgSrcAttrSecondVisit = Array.from(imgSecondVisit, (img) => img.src);
			expect(dynamicImgSrcAttrSecondVisit).not.to.deep.eq(dynamicImgSrcAttrFirstVisit);
		});
	}
);

Then('all dynamic content stored during my second visit dont match the values from my first visit', () => {
	dynamicContentPage.imagesDescriptions().then((textSecondVisit) => {
		const dynamicTrimContentSecondVisit = Array.from(textSecondVisit, (element) => element.innerText.trim());
		expect(dynamicTrimContentFirstVisit).not.to.deep.eq(dynamicTrimContentSecondVisit);
	});
});

When('I store the src attributes of the first two images during my first visit', () => {
	dynamicContentPage.images().then((images) => {
		staticImgSrcAttrFirstVisit = Array.from(images, (image) => image.src).slice(0, 2);
	});
});

When('I store the first two content during my first visit', () => {
	dynamicContentPage.imagesDescriptions().then((textFirstVisit) => {
		staticTrimContentFirstVisit = Array.from(textFirstVisit, (element) => element.innerText.trim()).slice(0, 2);
	});
});

Then(
	'the first two src attributes of the images during my second visit match the first two values from my first visit',
	() => {
		dynamicContentPage.images().then((imgSecondVisit) => {
			const staticImgSrcAttrSecondVisit = Array.from(imgSecondVisit, (img) => img.src).slice(0, 2);
			expect(staticImgSrcAttrSecondVisit).to.deep.eq(staticImgSrcAttrFirstVisit);
		});
	}
);

Then(
	'the first two dynamic content stored during my second visit matches the first two values from my first visit',
	() => {
		dynamicContentPage.imagesDescriptions().then((textSecondVisit) => {
			const staticTrimContentSecondVisit = Array.from(textSecondVisit, (element) => element.innerText.trim()).slice(
				0,
				2
			);
			expect(staticTrimContentFirstVisit).to.deep.eq(staticTrimContentSecondVisit);
		});
	}
);
