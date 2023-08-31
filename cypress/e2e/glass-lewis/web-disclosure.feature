Feature: F123 - Web Disclosure

    Web Disclosure is public site where our clients can make the votes public.

    Scenario: The one where only meetings associated with the selected country are displayed
        Given user is on the landing page for WD site
        And the Country filter is available
        When user selects the following country from the Country filter list on left panel
            | countryName |
            | Belgium     |
        And clicks on Update button for the country filter list
        Then the grid displays all meetings that are associated with 'Belgium'

    @Regression
    Scenario Outline: The one where the user navigates to the selected company's vote card page
        Given user is on the landing page for WD site
        When user clicks the '<companyName>' hyperlink
        Then the user lands onto the Company vote card page
        And the '<companyName>' should appear in the top banner
        Examples:
        | companyName   |
        | Activision Blizzard Inc |
        | Teladoc Health Inc      |