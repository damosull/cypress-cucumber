Feature: Dynamic Content
              As a User, I want to verify that when I go to the webpage several times, the content is different each time.
              Here, we are comparing an array of values retrieved during the first visit, versus an array of values retrieved during the second visit.

              For Scenario 1, we get the images & text during the first visit. Reload the page, then compare those images & text with the images & text appearing on the page after the reload. As this content is dynamic, the arrays will not match
              For Scenario 2, we add a parameter to the URL which keeps the first 2 images & text static. We capture those values, reload the page, then compare those now static values against what appears on the page now. As this content is now static, the arrays will match

        Scenario: Compare dynamic content before & after reloading the page (comparing arrays)
            Given I go to 'the-internet'
             When I click the "Dynamic Content" link
             Then I am on the "dynamic_content" page

             When I store the src attributes of all dynamic images during my first visit
              And I store all dynamic content during my first visit
              And I refresh the page
             Then the src attributes of all dynamic images during my second visit dont match the values from my first visit
              And all dynamic content stored during my second visit dont match the values from my first visit

        Scenario: Compare static content before & after reloading the page
            Given I go to the dynamic content page with the static content suffix
             Then I am on the "dynamic_content?with_content=static" page
             
             When I store the src attributes of the first two images during my first visit
              And I store the first two content during my first visit
              And I refresh the page
             Then the first two src attributes of the images during my second visit match the first two values from my first visit
              And the first two dynamic content stored during my second visit matches the first two values from my first visit
            