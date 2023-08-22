Feature: Floating Menu

        Background:
            Given I go to 'the-internet'
             When I click the "Floating Menu" link
             Then I am on the "floating_menu" page
              And the floating menu is visible

        Scenario: Drag & Drop a file
             
             When I scroll to the page footer
             Then the floating menu is visible
