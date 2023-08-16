Feature: Add/Remove Elements
              As a user I want to be able to add and remove elements

        Background:

            Given I navigate to 'the-internet'
             When I click the "Add/Remove Elements" link
             Then I am on the "add_remove_elements" page

        Scenario: Add & Remove elements using clicks, mouse actions, & keyboard actions
            
             When I click the "Add Element" button
             Then there are 1 Delete buttons displayed on the page
             
             When I click the "Add Element" button using mouse actions
             Then there are 2 Delete buttons displayed on the page
             
             When I click the "Add Element" button using keyboard actions
             Then there are 3 Delete buttons displayed on the page
            
             When I click the 'first' Delete button
             Then there are 2 Delete buttons displayed on the page