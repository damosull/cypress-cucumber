Feature: Broken Images
              As a user I want to check if all images on the broken images page are working
              So that I can ensure that the website is functioning properly

        Scenario: Verify all images on the broken images page are working
        
            Given I navigate to 'the-internet'
             When I click the "Broken Images" link
             Then I am on the "broken_images" page
            
             When the browser has finished loading all images
             Then I check all images on the page
              And the third image is accessible
              And all images are accessible
