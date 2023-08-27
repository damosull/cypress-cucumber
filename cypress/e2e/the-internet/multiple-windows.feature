Feature: Multiple Windows

Clicking this link manually opens a new tab. With Cypress, we remove the 'target' attribute so the new tab opens in the current browser after the click event

        Background:
            Given I go to 'the-internet'
             When I click the "Multiple Windows" link
             Then I am on the "windows" page


        Scenario: Navigate to a new tab
             When I open a new window
             Then the new window appears in the current tab
             When I click the browser 'back' button
             Then I am on the "windows" page
              And I can see the 'Click Here' link