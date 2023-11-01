Feature: F125 DemoQA

    Scenario: Tool Tip
        Given I go to the DemoQA page
        When I go to the tooltips page
        Then I am on the tooltips page

        When I hover over the button
        Then the 'You hovered over the Button' tooltip is displayed