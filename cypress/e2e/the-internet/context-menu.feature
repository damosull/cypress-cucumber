Feature: Context Menu
              As a user, I want to be able to right-click on the page & access the context menu

        Background:

            Given I navigate to 'the-internet'
             When I click the "Context Menu" link
             Then I am on the "context_menu" page

        Scenario: Context menu is displayed on right-click
        
             When I right-click on the div
             Then the 'You selected a context menu' alert is displayed