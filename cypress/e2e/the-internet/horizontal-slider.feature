Feature: Horizontal Slider

For this, we are mocking the lat & long coordinates

        Background:
            Given I go to 'the-internet'
             When I click the "Horizontal Slider" link
             Then I am on the "horizontal_slider" page
            
        Scenario: Horizontal Slider - clicking on slider
              And the value of the slider is 0
             When I set the value to 2
             Then the value of the slider is 2
        
        Scenario: Horizontal Slider - key strokes
              And the value of the slider is 0
              And I type the 'rightarrow' key 5 times
             Then the value of the slider is 2.5