Feature: Geolocation

For this, we are mocking the lat & long coordinates

        Background:
            Given I go to 'the-internet'
             When I click the "Geolocation" link
             Then I am on the "geolocation" page
            
        Scenario: Geolocation
             When I mock my location
              And I click the 'Where am I?' button
             Then my coords are displayed