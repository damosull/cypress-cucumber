Feature: Basic Auth
              As a user
              I want to be able to access the page with basic auth,
              & not be able to access the page without basic auth
              & not be able to access the page with incorrect basic auth

        Scenario: I can visit the page with basic auth credentials
             When I navigate to the page using 'admin' credentials
             Then the 'Congratulations! You must have the proper credentials.' message is visible

        Scenario: Handle basic authentication with the credentials in the URL like this https://username:password@www.example.com/
             When I navigate to the page with the credentials in the URL
             Then the 'Congratulations! You must have the proper credentials.' message is visible

        Scenario: I cannot visit the page without basic auth credentials
             When I try to navigate to the page without credentials I receive a 401 error

        Scenario: I cannot visit the page with incorrect basic auth credentials
             When I try to navigate to the page with invalid credentials I receive a 401 error
