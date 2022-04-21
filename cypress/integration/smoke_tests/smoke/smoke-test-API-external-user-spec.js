import '../../../support/commands.js';
const { USER } = require("../../../support/constants");
const unixTime = Math.floor(Date.now() / 1000);
var baseUrl;

//Go through the pages to check if the proper API loading without interaction.
describe('Smoke test - External user', function () {
    beforeEach(function () {
        cy.loginWithAdmin(USER.AUTOMATIONEXTERNAL);
        baseUrl = Cypress.config().baseUrl;

        cy.intercept('GET', '**/Api/Data/CustomerDetails/GetByID?pCustomerID=0&_=**').as('CustomerDetails');
        cy.intercept('GET', '**/Api/Data/CustomerDetails//GetByID?&pCustomerID=0&_=**').as('Rational_CustomerDetails');
        cy.intercept('GET', '**/Api/Data/AccountsGridState/**').as('AccountsGridState');
        cy.intercept('GET', '**/Api/Data/Accounts//GetAccountFiltersByScreenID**').as('GetAccountFiltersByScreenID');
        cy.intercept('GET', '**/Api/WebUI/FilterCriteriaEditors?filterPreferenceID=193&objectType=AccountsNew&customerId=0&_=**').as('WebUI');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls/MultiSelectStatic/MultiSelectStatic.js&_=**').as('WebUIRes');
        cy.intercept('GET', '**/Api/Data/CustomerDetails/**').as('CUSTOMER_DETAILS');
        cy.intercept('GET', '**/Api/Data/FilterPreference/**').as('FILTER_PREFERENCE');
        cy.intercept('GET', '**/Api/Data/ListService/VpOnlyWatchlists?_=**').as('VP_ONLY_WATCHLIST');
        cy.intercept('GET', '**/Api/Data/ListService/PolicyId**').as('POLICY_ID');
        cy.intercept('GET', '**/Api/Data/UsersForCustomer/GetCurrentUsercolleagues**').as('GET_CURRENT_USER_COLLEAGUES');
        cy.intercept('GET', '**/Scripts/jquery.poshytip.js?_=**').as('poshytip');
        cy.intercept('GET', '**/Scripts/jquery-editable-poshytip.min.js?_=**').as('editable-poshytip');
        cy.intercept('GET', '**/Api/Data/RationaleLibrary/**').as('RationaleLibrary');
        cy.intercept('GET', '**/Api/Data/CustomFields/?customerId=0&_=**').as('CustomFields');
        cy.intercept('GET', '**/Api/Data/CustomFields/GetDetails?fieldId=**').as('CustomFields_2');
        cy.intercept('GET', '**/Api/WebUI/Users/GetUsersList?_=**').as('GetUsersList');
        cy.intercept('GET', '**/Api/WebUI/Users/UserProfileHtml?_=**').as('UserProfileHtml');
    });
   
    it('Done - Workflow page API loaded', function () {
        cy.visit('/Workflow');
        cy.getAutomationUserIDFromDB(USER.AUTOMATIONEXTERNAL).as('userid');

        cy.wait('@CURRENT_USER').then((response) => {

            var csrftoken = response.request.headers.csrftoken;
            cy.wrap(csrftoken).as('csrftoken');

            }).get('@csrftoken').then((token) => {
                cy.request({
                    method: 'GET',
                    url: baseUrl + '/Api/Data/CurrentUser/?_=' + unixTime,
                    headers: {
                        CSRFToken: token,
                        }
                            }).then((response) => {
                                expect(response.status).to.eq(200);
                                cy.get('#logged-in-user').should('have.text', response.body.FullName);
                                expect(response.body.LoginId).to.eq(USER.AUTOMATIONEXTERNAL);
                            })
                    })

        cy.get('@userid').then((uid) => {
            cy.get('@csrftoken').then((token) => {
            cy.request({
                method: 'GET',
                url: baseUrl + '/Api/Data//Spa?_=' + unixTime,
                headers: {
                    CSRFToken: token,
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.PageToRender).to.eq(1);
                
                expect(response.body.UserId).to.eq(uid);
                        })
                })
        })

        cy.stausCode200('@GET_MARKUP_WORKFLOW')
        cy.stausCode200('@DASHBOARD_MARKUP')
        cy.stausCode200('@WORKFLOW_CONFIGURE_COLUMNS')
        cy.stausCode200('@WORKFLOW_META_DATA_1')
        cy.stausCode200('@WORKFLOW_META_DATA_2')
        cy.stausCode200('@FILTERS_DIRECTORY')
        cy.stausCode200('@GET_FOR_USER')
        cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
        cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')       
        cy.stausCode200('@GET_MARKUP_MEETING_DETAILS')
        cy.stausCode200('@GET_USER_PERMISSION')
        cy.stausCode200('@WORKFLOW_FILTER_CRITERIA_EDITORS')
        cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
        cy.stausCode200('@DATE_RANGE')
        cy.stausCode204('@LOGGER')
        cy.stausCode200('@WORKFLOW_EXPANSION')
        cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
        cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')
        cy.stausCode200('@INBOX')
        cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')

    });

    it('Done - Dashboard page API loaded', function () {

        cy.visit('/Dashboard');
        
        //23
        cy.stausCode200('@CURRENT_USER')
        cy.stausCode200('@SPA')
        cy.stausCode200('@GET_MARKUP_WORKFLOW')
        cy.stausCode200('@DASHBOARD_MARKUP')
        cy.stausCode200('@DASHBOARD')
        cy.stausCode200('@WIDGET_META')
        cy.stausCode200('@DASHBOARD_PERMISSIONS')
        cy.stausCode200('@DASHBOARD_SETTINGS')
        cy.stausCode200('@GET_MARKUP_MEETING_DETAILS')
        cy.stausCode200('@GET_USER_PERMISSION')
        cy.stausCode200('@WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH')
        cy.stausCode200('@DASHBOARD_FILTERS')
        cy.stausCode200('@WORKFLOW_META_DATA')
        cy.stausCode200('@ESG_RANKINGS_FIELDS')
        cy.stausCode200('@DASHBOARD_DETAILS')
        cy.stausCode200('@WORKFLOW_WIDGET_DATA')
        cy.stausCode200('@DASHBOARD_FILTER_DETAILS')
        cy.stausCode200('@WORKFLOW_WIDGET_DATA')
        cy.stausCode200('@DASHBOARD_FILTER_DETAILS')
        cy.stausCode200('@WORKFLOW_WIDGET_DATA')
        cy.stausCode200('@DASHBOARD_FILTER_DETAILS')
        cy.stausCode200('@GL_BLOG_DATA')
        cy.stausCode200('@DASHBOARD_SUBSCRIPTION')
        
    });
    

    it('Done - Reporting page API loaded', function () {

        cy.visit('/Reporting');
        
        // 6
        cy.stausCode200('@CURRENT_USER')
        cy.stausCode200('@REPORTS_DEFAULT_DATA')
        cy.stausCode200('@BALLOT_RECONCILIATION')
        cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
        cy.stausCode200('@DATE_RANGE')
        cy.stausCode200('@REPORTS_CRITERIA')
    });

    it('Working on it - MeetingDetails page API loaded', function () {
        
        cy.visit('/Workflow');
        
        // Click on first meeting in order to arrive to the Meeting page
        cy.get('#metaname-CompanyName > div > span > a').eq(1).click();

        cy.stausCode200('@CURRENT_USER')
        cy.stausCode200('@SPA')
        cy.stausCode200('@GET_MARKUP_WORKFLOW')
        cy.stausCode200('@DASHBOARD_MARKUP')
        cy.stausCode200('@WORKFLOW_CONFIGURE_COLUMNS')

    });

    it('Done - Change password page API loaded', function () {

        cy.visit('/SetPsw/Change');

        // 2
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@PASSWORD_VALIDATOR_SETUP');
        
    });

    it('Done - User profile page API loaded', function () {

        cy.visit('/Users/UserProfile');

        // 4
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@GET_AUTHENTICATED_USER');
        
    });

    it('Done - Customer profile / Accounts page API loaded', function () {

        cy.visit('/Accounts/Index/');

        // 14
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@CustomerDetails')
        cy.stausCode200('@AccountsGridState')
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@GetAccountFiltersByScreenID');
        cy.stausCode200('@WebUI');
        cy.stausCode200('@WebUIRes')
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@ACCOUNTS_NEW')
        cy.stausCode200('@LIST_SERVICE_ACCOUNT_STATUS_CODE')

    });

    it('Done - Customer profile / CustomFields page API loaded', function () {

        cy.visit('/CustomerDetails/CustomFields/');

        // 3
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@CustomFields')
        cy.stausCode200('@CustomFields_2')
        
    });

    it('Done - Customer profile / Rationale library page API loaded', function () {

        cy.visit('/CustomerDetails/Rationale/');

        // 7
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@poshytip');
        cy.stausCode200('@editable-poshytip');
        cy.stausCode200('@Rational_CustomerDetails')
        cy.stausCode200('@RationaleLibrary')
        cy.stausCode200('@poshytip')
        cy.stausCode200('@editable-poshytip')
    });

    it('Done - Customer profile page API loaded', function () {
        cy.visit('/CustomerDetails/');

        // 7
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@CUSTOMER_DETAILS')
        cy.stausCode200('@FILTER_PREFERENCE')
        cy.stausCode200('@VP_ONLY_WATCHLIST')
        cy.stausCode200('@POLICY_ID')
        cy.stausCode200('@GET_CURRENT_USER_COLLEAGUES')
        cy.stausCode200('@CUSTOMER_FORMATS');
        
    });

    it('Done - Customer profile / Users/UsersProfiles/ page API loaded', function () {

        cy.visit('/Users/UsersProfiles/');

        // 3
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@GetUsersList')
        cy.stausCode200('@UserProfileHtml')
        
    });

    it('Done - Watch list(s) page API loaded', function () {

        cy.visit('/ManageWatchlists?ref=settings#watchlist2663');
    
        // 4
        cy.stausCode200('@CURRENT_USER')
        cy.stausCode200('@SEARCH_TOOLBAR')
        cy.stausCode200('@WATCHLIST')
        cy.stausCode200('@WATCHLIST_SECURITIES');

    });

});