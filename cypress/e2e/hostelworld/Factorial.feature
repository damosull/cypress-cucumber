Feature: F123 - Factoriall

    Validate the factorial calculator works as expected with valid inputs (integers) & invalid inputs (decimals, floats, strings, special characters, blanks)

    Scenario: The one where the user enters a valid value to calculate the factorial
        Given the user navigates to the Factoriall calculator screen
        When the user enters a value into the input box
            | value |
            | 12    |
        And the user clicks the Calculate button
        Then a message is displayed to the user
            | message                           |
            | The factorial of 12 is: 479001600 |

    @Regression
    Scenario: The one where the user enters an invalid value to receive an error message
        Given the user navigates to the Factoriall calculator screen
        When the user enters a value into the input box
            | value |
            | 34.56 |
        And the user clicks the Calculate button
        Then a message is displayed to the user
            | message                 |
            | Please enter an integer |