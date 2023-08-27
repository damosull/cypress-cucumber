@40729
Feature: File Upload
          For this feature, I had to add a 'test.txt' file to the project root directory - the-internet/test.txt

          Background:
            Given I go to 'the-internet'
             When I click the "File Upload" link
             Then I am on the "upload" page

          Scenario: Upload file
             When I choose the 'test.txt' file
              And I click the 'Upload' button
             Then the uploaded files contain the 'test.txt' file

          Scenario: Drag & Drop a file
             When I drag and drop the 'test.txt' file
             Then the 'test.txt' appears within the upload box
              And the '✔' appears within the upload box

# Potential negative test case: Attempt to upload a file that's too large