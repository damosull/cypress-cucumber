Feature: F123 - Factoriall

    This was developed on Nov. 19 2021 as part of Hostelworld interview assigment for Senior QA Automation Engineer position

    Validate the factorial calculator works as expected with valid inputs (integers) & invalid inputs (decimals, floats, strings, special characters, blanks)

    Scenario: The one where the user enters a valid value to calculate the factorial
        Given the user navigates to the Factoriall calculator screen
        When the user enters <input> into the input box
        And the user clicks the Calculate button
        Then the message '<message>' is displayed

    Examples:
    | input | message |
    | 12 | The factorial of 12 is: 479001600 |
    | 34.56 | Please enter an integer |