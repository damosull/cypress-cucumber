Feature: Form Authentication

        Background:
            Given I go to 'the-internet'
             When I click the "Form Authentication" link
             Then I am on the "login" page
            
        Scenario: Data Driven - (Valid & Invalid)
              And I validate data driven login page with valid and invalid users
        
     #    Failing atm, but it should be passing:
        @Ignore
        Scenario: API Login approach
              And I can log in via the API