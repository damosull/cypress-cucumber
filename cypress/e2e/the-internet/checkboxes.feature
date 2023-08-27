Feature: Checkboxes
              As a user
              I want to check and uncheck checkboxes
              So that I can verify the functionality of checkboxes
              I can check all checkboxes at once
              I can verify all checkboes are checked/unchecked at once

        Background:

            Given I go to 'the-internet'
             When I click the "Checkboxes" link
             Then I am on the "checkboxes" page
              And checkbox 1 is unchecked
              And checkbox 2 is checked

          @3331      
          Scenario: I can check & uncheck checkboxes

             When I check checkbox 1
             Then checkbox 1 is checked
             
             When I uncheck checkbox 2
             Then checkbox 2 is unchecked

          @28433
          Scenario: Check/Uncheck all checkboxes at one time, verify all checkboxes are checked/unchecked at one time
        
             When I uncheck checkbox 2
             Then all checkboxes are unchecked

             When I check all checkboxes
             Then all checkboxes are checked