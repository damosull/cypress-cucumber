Feature: Nested Frames

Reference: Jquery API contents() - https://api.jquery.com/contents/

        Background:
            Given I go to 'the-internet'
             When I click the "Frames" link
             When I click the "Nested Frames" link
             Then I am on the "nested_frames" page
            
        Scenario: Validate nested frames in the page with Jquery API contents() way
              And the actual frames contain the expected frame contents