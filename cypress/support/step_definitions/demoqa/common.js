import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import homePage from '../../page_objects/demoqa/home.page';
import brokenPage from '../../page_objects/demoqa/brokenPage.page';
import toolTipPage from '../../page_objects/demoqa/tooltip.page';

Given('I go to the DemoQA page', () => {
	cy.visit('https://demoqa.com/');
});

When('I go to the broken links page', () => {
	homePage.elementLink().click();
	homePage.brokenLinksLink().click();
});

Then('I am on the broken links page', () => {
	cy.url().should('include', '/broken');
	brokenPage.header().should('be.visible').and('have.text', 'Broken Links - Images');
});

Then('all images are visible', () => {
	brokenPage.allImages().should('be.visible');
});

When('I go to the tooltips page', () => {
	homePage.widgetsLink().click();
	homePage.tooltipsLink().click();
});

Then('I am on the tooltips page', () => {
	cy.url().should('include', '/tool-tips');
	toolTipPage.header().should('be.visible').and('have.text', 'Tool Tips');
});

When('I hover over the button', () => {
	toolTipPage.btnToolTip().should('be.visible').trigger('mouseover');
});

Then('the {string} tooltip is displayed', (txt) => {
	toolTipPage.toolTip().should('be.visible').and('have.text', txt);
});
