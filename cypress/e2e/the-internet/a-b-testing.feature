Feature: A/B Testing
              Users can opt out of the A/B test by setting a cookie.
              After setting this cookie, the "No A/B Test" page is displayed
              After clearing all cookies, the "A/B Test" page is displayed

        @Regression
        Scenario: Set a cookie to opt out of the A/B test
        
            Given I go to 'the-internet'
             When I click the "A/B Testing" link
             Then I am on the "abtest" page
              And the page header contains text 'A/B Test'

             When I opt out of AB testing by setting a cookie
              And I refresh the page

             Then the page header contains text 'No A/B Test'

             When I clear all cookies
              And I refresh the page
             Then the page header contains text 'A/B Test'

        @Smoke
        Scenario: Opt out of the A/B test with the Opt Out URL

             When I go to the opt out URL
             Then the 'You have successfully opted out of Optimizely for this domain.' alert is displayed
             Then the page header contains text 'No A/B Test'