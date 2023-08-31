Feature: F124 - Factoriall API

    This was developed on Nov. 19 2021 as part of Hostelworld interview assigment for Senior QA Automation Engineer position

    Validate the factorial API works as expected with GET & POST requests by returning the expected responses

    Scenario: The one where we send a GET request to the Factorial endpoint and validate the response
        When I send a GET request to the Factorial API
        Then verify the response contains the expected values

    Scenario: The one where we send a POST request to the Factorial endpoint and validate the response
        When I send a POST request to the Factorial API with the number 12
        Then the answer returned in the response is '479001600'

    Scenario Outline: The one where we send a POST request with a large integer to the Factorial endpoint and validate the response
            When I send a POST request to the Factorial API with the number <input>
        Then the answer returned in the response is '<output>'
        Examples:
        | input | output |
        | 900 | null |
        | 1000 | Internal Server Error |