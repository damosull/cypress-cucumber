Feature: F124 DemoQA

    Scenario: Images
        Given I go to the DemoQA page
        When I go to the broken links page
        Then I am on the broken links page
        And all images are visible
# TODO: what's the 'broken' part about? Am I just missing those steps?