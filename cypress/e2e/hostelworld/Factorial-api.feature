Feature: F124 - Factoriall API

    Validate the factorial API works as expected with GET & POST requests by returning the expected responses

    Scenario: The one where we send a GET request to the Factorial endpoint and validate the response
        Given I have access to the Factorial API
        When I send a GET request to the Factorial API
        Then verify the response contains the expected values

    Scenario: The one where we send a POST request to the Factorial endpoint and validate the response
        Given I have access to the Factorial API
        When I send a POST request to the Factorial API
            | value | expectedAnswer |
            | 12    | 479001600      |
        Then verify the response received contains the expected values

    Scenario: The one where we send a POST request with a large integer to the Factorial endpoint and validate the response
        Given I have access to the Factorial API
        When I send a POST request to the Factorial API
            | value | expectedAnswer   |
            | 900   | Infinity         |
            | 1000  | 4.0238726 E+2567 |
        Then verify the response received contains the expected values