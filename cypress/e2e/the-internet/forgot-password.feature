@Ignore
Feature: Forgot Password

            
        Scenario: Validate forgot password with API approach
             When I send my email to the forgot_password endpoint, I receive a 200 status code
             # This will fail as the app currently throws a 500 error

        Scenario: Validate forgot password with UI approach
            Given I go to 'the-internet'
             When I click the "Forgot Password" link
             Then I am on the "forgot_password" page

             When I clear the textbox using keyboard actions
              And I type 'test@mail.com' in the textbox
              And I click the 'Retrieve password' button
             Then I see the "Your e-mail's been sent!" message
             # This will fail as the app currently throws a 500 error