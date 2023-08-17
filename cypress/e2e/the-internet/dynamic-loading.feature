Feature: Dynamic Loading
              As a User, I want to validate dynamic loading

              For the 1st 2 scenarios, the element is hidden. It's then displayed as part of those tests.
              For the 3rd scenario, the element doesn't exist initially. It's then rendered as part of the test.
              
        Background:
            Given I go to 'the-internet'
             When I click the "Dynamic Loading" link
             Then I am on the "dynamic_loading" page

        Scenario: Hidden element is visible after clicking a button that invokes the 'show' method
             When I click the "Example 1: Element on page that is hidden" link
             Then I am on the "dynamic_loading/1" page
              And the Hello World! element is not visible

             When I click the 'Start' link
             Then wait until the loading bar disappears
              And the Hello World! element is visible
             
        Scenario: Hidden element is visible after directly invoking the 'show' method
             When I click the "Example 1: Element on page that is hidden" link
             Then I am on the "dynamic_loading/1" page
              And the Hello World! element is not visible

             When I trigger the show method of the Hello World! element
             Then the Hello World! element is visible

        Scenario: New element is rendered after clicking a button
             When I click the "Example 2: Element rendered after the fact" link
             Then I am on the "dynamic_loading/2" page
              And the Hello World! element does not exist

             When I click the 'Start' link
             Then wait until the loading bar disappears
              And the Hello World! element is visible