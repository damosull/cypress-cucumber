import { When, Then } from "@badeball/cypress-cucumber-preprocessor"
import vepPage from '../page_objects/vep.page'

Then('I can view the Vote Execution page', () => {
    cy.url().should('include', '/Accounts/VEP/?CustomerID')
    cy.wait('@GET_VEP_DETAILS')
    vepPage.customerName().should('be.visible')
    vepPage.newProfileButton().should('be.visible')
})

When('I click on an existing configuration Name', () => {
    vepPage.configurationNameLabel().click()
})

Then('I can see the OK and Cancel buttons', () => {
    vepPage.configurationNameOkButton().should('be.visible')
    vepPage.configurationNameCancelButton().should('be.visible')
})

When('I amend the configuration name to {string}', (confName) => {
    switch (confName) {
        case "random":
            cy.randomString(5).then((data) => {
                vepPage.configurationNameInput().clear().type(data)
            })
            break
        case "existing":
            vepPage.configurationProfileNameLabel().eq(1).invoke('text').then((text) => {
                vepPage.configurationNameInput().clear().type(text)
            })
            break
        default:
            vepPage.configurationNameInput().clear().type(confName)
    }
})

When('I click on the Ok button for Configuration Name change', () => {
    vepPage.configurationNameOkButton().click()
})

When('I click on the Cancel button for Configuration Name change', () => {
    vepPage.configurationNameCancelButton().click()
})

Then('the configuration name should show as edited', () => {
    vepPage.configurationNameModifiedLabel().should('be.visible')
})

When('I click on Edit button for Voting Groups', () => {
    vepPage.editVotingGroupsButton().click()
})

Then('I save the current voting groups', () => {
    vepPage.votingGroupsLabel().should('be.visible').invoke('text').then((text) => {
        Cypress.env('vepGroups', text)
    })
})

Then('I can view the Voting Groups modal', () => {
    vepPage.votingGroupsModal().should('be.visible')
})

When('I amend the voting groups', () => {
    vepPage.votingGroupsSelectAllCheckbox().check({ force: true })
    vepPage.votingGroupsSelectAllCheckbox().uncheck({ force: true })
    let boxToCheck = Math.floor(Math.random() * (Cypress.$('.vgcheckbox').length - 3) + 2)
    vepPage.allCheckboxes().eq(boxToCheck).check({ force: true })
})

When('I click on the Apply Voting Groups button', () => {
    vepPage.votingGroupsApplyButton().click()
})

When('I click on the Save Vote Execution button', () => {
    cy.intercept('PUT', '**/Api/Data/VepConfigCrud/').as('SUBMIT_VEP_DETAILS')
    vepPage.saveVoteExecutionButton().click()
})

Then('the Vote Execution changes should be saved successfully', () => {
    cy.statusCode204('@SUBMIT_VEP_DETAILS')
    vepPage.votingGroupsLabel().should('not.equal', Cypress.env('vepGroups'))
})