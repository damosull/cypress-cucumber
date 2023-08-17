Feature: Dropdown functionality on the-internet.herokuapp.com
              As a user,
              I want to be able to select different options from the dropdown menu
              So that I can test the dropdown functionality

        Background: Go to the Dropdown page, the default selected option is disabled
            Given I navigate to 'the-internet'
             When I click the "Dropdown" link
             Then I am on the "dropdown" page
              And the selected option text is 'Please select an option'


        Scenario: User can select an option from the dropdown based on it's text or it's value
             When I select the option with 'text' of 'Option 1' from the dropdown
             Then the selected option text is 'Option 1'
              And the selected option 'value' is '1'

             When I select the option with 'value' of '2' from the dropdown
             Then the selected option text is 'Option 2'
              And the selected option 'value' is '2'

        Scenario: The first dropdown option is disabled (has the disabled attribute)
              And the first option is disabled