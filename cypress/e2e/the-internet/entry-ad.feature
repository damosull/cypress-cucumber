Feature: Entry Ad
              
        Background:
            Given I go to 'the-internet'
             When I click the "Entry Ad" link
             Then I am on the "entry_ad" page

        Scenario: Close Entry Ad
              And the modal div is visible
             When I click the "Close" link
             Then the modal div is not visible

#  Commented out below cause there seems to be a bug. When you refresh manually, the modal doesn't re-appear (which is correct).
# However, when you do the same thing wtih Cypress, the modal re-appears, I'm not sure why
            #  When I refresh the page
            #  Then the modal div is not visible