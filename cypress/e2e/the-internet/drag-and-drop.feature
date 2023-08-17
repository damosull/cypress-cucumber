Feature: Drag and drop functionality on the page
              Users can drag & drop an element onto another element on the page
              After the user drags & drops an element, verify the order has been updated

        Scenario: Drag A to B and verify the new locations
            Given I navigate to 'the-internet'
             When I click the "Drag and Drop" link
             Then I am on the "drag_and_drop" page

             When the user drags the "A" element & drops it onto the "B" element
             Then 'column-a' has the text 'B'
              And 'column-b' has the text 'A'
              And the opacity of 'column-a' is '0.4'
              And the opacity of 'column-b' is '1'