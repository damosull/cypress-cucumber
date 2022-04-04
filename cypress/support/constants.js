export const USER = {
  AUTOMATIONEXTERNAL: 'automation_calpers@glasslewis.com',
  AUTOMATIONINTERNAL: 'automation@glasslewis.com',
  CALPERS: 'CalpersAutomation@glasslewis.com',
  CHARLESSCHWAB: 'CharlesSchwabAutomation@glasslewis.com',
  FEDERATED: 'FederatedAutomation@glasslewis.com',
  IMF: 'IFMAutomation@glasslewis.com',
  NEUBERGER: 'neubergerexternal@glasslewis.com',
  OPERS: 'OpersAutomation@glasslewis.com',
  ADDYINTERNAL: 'pcorcoran@glasslewis.com',
  PUTNAM: 'PutnamAutomation@glasslewis.com',
  ROBECO: 'RobecoAutomation@glasslewis.com',
  ROYALLONDON: 'RoyalLondonAutomation@glasslewis.com',
  RUSSELL: 'RussellAutomation@glasslewis.com',
  WELLINGTON: 'WellingtonAutomation@glasslewis.com',
  PADDYINTERNAL: 'pcorcoran@glasslewis.com',
  PASSWORD:{
    TEST_PASSWORD: 'Test12345%'
  }
};

export const messages = {
  reports: {
    READY: 'report is ready for download',
  },
  toast: {
    DOWNLOAD_STARTED: 'Your download was initiated. It will appear in the toolbar shortly.',
    REVIEW_FIELDS: 'Please review the fields selection, there are invalid fields',
    REPORT_SAVED: 'Report Saved',
    REPORT_DELETED: 'Report configuration deleted.',
    FILTER_CREATED: 'Filter created successfully',
    FILTER_DELETED: 'Filter deleted',
    EXPORT_INITIATED: 'Your export was initiated. It will appear in the toolbar shortly.',
    SUBSCRIPTION_ADDED: 'Subscription added',
    SUBSCRIPTION_DELETED: 'Subscription deleted',
    SHARE_MEETING_REQUEST_SAVED: 'Share meeting request saved',
    ENGAGEMENT_ADDED: 'Engagement added',
    ENGAGEMENT_DELETED: 'Engagement Deleted',
    USER_CREATED_SUCCESSFULLY: 'User created successfully'
  },
};

export const MEETINGID = {
  // first 2 chars = company (NB = Neuberger)
  // second 2 chars = meeting type - Contested = CO,RA = Recommendations Available,RP Recommendations Pending
  // additional chars  = Agenda (M = Management,O = Opposition) MMO = 2 management agendas,one Opposition
  // AG has Account Group associated

  NBCOMMO: '982955',
  NBCOMMO_AGENDA1: '935288666',
  NBCOMMO_AGENDA2: '935279833',
  NBCOMMO_AGENDA3: '935281206',
  NBCOMMO_CTRLNUM1: '8193294880136089',
  NBCOMMO_CTRLNUM2: '8193294880360709',
  NBCOMMO_CTRLNUM3: '8193294880595329',

  WLNCVTD: '1062764', // Charles Schwab - Non Contested - Voted
  WLNCVTD_CTRLNUM: '4000153399354', // Charles Schwab - Non Contested - Voted

  RLNCDRP: '1057618', //Russell - Non Contested -  Recommendations Pending

  RBNCRP: '1058810', //Robeco - Non Contested -  Recommendations Pending
  RBNCAG: '1061320',
  //Calpers
  CANCRA: '1066065',

  //Russell (at least one against policy past 30 days)
  RSNCVAP: '1061109',
  RSNCVAP2: '981568',

  //Russell (at least one against management past 30 days)
  RSNCVAM1: '1068747',
  RSNCVAM2: '1070063',

  //Basic Recommendations pending meeting for Calpers
  CPRP1: '1066197',
  CPRP2: '1065713',
  CPRP3: '1063534',
  CPRP5: '1066044',
  CPRP6: '1066180',

  //Calpers Recommendations Pending (US meeting)
  CPRP4: '1057963',
};

export const API = {
  POST: {
    ADD: '**/Api/Data/BallotVoteData/Add',
    AVA_CRITERIA: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=AVAReport',
    BALLOT_CRITERIA: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotVoteData',
    CREATE_DRAFT_FILTER: '**/Api/Data/Filters/CreateDraftFilter',
    CRITERIA_ENGAGEMENT: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=Engagement',
    DOCUMENTS_DATA: '/Api/Data/DocumentsData',
    FILE_ADD: '**/Api/Data/Policy/Add',
    GET_AVAILABLE_ASSIGNEES_CUSTOMER: '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer',
    GET_STATUS: '**Api/Data//SubscribeToMeeting/GetStatus',
    GET_AGENDA: '**/Api/Data//MdData/GetAgenda',
    LOGGER: '/api/Logger/**',
    MEETING_DETAILS: '**/Api/Data/MeetingDetailsActivity/',
    VOTE_TALLY: '**/Api/Data/VoteTally',
    VOTE_RESULTS: '**/Api/Data/MdVoteResults',
    SHARE_MEETING_MODAL: '**/ShareMeeting/AddShareMeetingModal/',
    POST_CUSTOMER_DYNAMIC: '/Api/Data/CustomerDynamic',
    PROXY_VOTING: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=ProxyVoting',
    VOTE_REQUEST_VALIDATION: '**/Api/Data/VoteRequestValidation', 
    WORKFLOW_EXPANSION: '**/Api/Data/WorkflowExpansion',
    WORKFLOW_SECURITIES_WATCHLIST: '**/Api/Data/WorkflowSecuritiesWatchlists', 
  },
  GET: {
    ACTIVE_FLAG: '**/Api/Data/CustomFieldCRUDWithFilterCheck/SetFieldActiveFlag**',
    AVA_REPORT: '**/Api/Data/AVA/?PageInfo%5BIgnorePagesize%5D=true&ReportType=AVA&_=**',
    ASSIGNED_MEETING_ID: '**/Api/Data/Assignee/?MeetingIDs%5B%5D=**',
    BALLOT_ACTIVITY_LOG: '**/Api/Data/BallotActivityLog/?BallotID=**',
    BALLOT_RECONCILIATION: '**/Api/Data/BallotReconciliation/**',
    BALLOT_VOTE: '**/Api/Data/BallotVoteData/?PageInfo%5BIgnorePagesize%5D=true&ReportType=BallotVoteData&_=**',
    CURRENT_USER: '**/Api/Data/CurrentUser/**',
    DATA: '**/Api/Data/**',
    ENGAGEMENT: '**/Engagement/?PageInfo%5BIgnorePagesize%5D=true&ReportType=Engagement&_=**',
    FILTERS: '**/Api/Data/Filters/**',
    FILTER_CRITERIA_FOR_FIELDS: '**/Api/WebUI//WorkflowFilterCriteriaEditors/ForField?fields=**&objectType=WorkflowExpansion&customerId=**&_=**',
    FILTER_TO_SHARE: '**/Api/Data/FilterPreference/SharedUsers/?FilterToShareID=**',
    FILTERS_DIRECTORY: '**/Api/Data/FiltersDirectories**',
    GET_BY_ID: '**/Api/Data/Filters/GetByID?Id=**',
    GET_CUSTOMER_DYNAMIC: '/Api/Data/CustomerDynamic/**',
    GET_FILINGS: '**/Api/Data/MeetingMaterials/GetFilings?MeetingId=**',
    GET_FOR_USER: '**/Api/Data/Filters/GetForUser?_=**',
    GET_MARKUP: '**/Workflow/GetMarkup?_=**',
    GET_MEETING_ID: '**/Api/Data/MdData/GetAFD?MeetingId=**&AccountIds%5B%5D=**&AgendaId=**&isContested=false&CustomerId=0&_=**',
    GET_USER_PERMISSIONS: '**/Api/Data//MdPermissions/GetUserPermissions?_=**',
    GET_POLICY: '**/Api/Data/Policy/GetById/**',
    IDENTITY_SEARCH: '**/Api/Data/ShareMeetingIdentitySearch/**',
    INBOX: '**/Api/Data/Inbox/**',
    LIST_SERVICE: '/Api/Data//ListService/**',
    LOAD_INBOX: '**/Api/Data/Inbox/?Top=10&IsQueryOnly=false&_=**',
    MANAGE_FILTERS: '**/ManageFilters',
    MEETING_MATERIALS: '**/Api/Data/MeetingMaterials/**',
    MEETING_SECURITY_WATCHLIST: '**/Api/Data/MeetingSecurityWatchlists/**',
    META_BALLOTS_GRID: '**/Api/Data/MetaData/?typeName=BallotsGrid&customerId=**&_=**',
    PAGE_SECTION_ORDER: '**/Api/Data/PageSectionOrder?Page=1&_=**',
    POLICY: '**/Api/Data/Policy/**',
    RELATED_MEETINGS: '**/Api/Data/RelatedMeetings/?QueryValue=**',
    REPORT_TYPE: '**/Api/Data/Inbox/?Top=0&IsNew=true&IsQueryOnly=true&**',
    SHARE_MEETING_LISTS: '**/Api/Data//ShareMeetingLists/**',
    SUBSCRIPTIONS: '**/Api/WebUI/Subscriptions/**',
    SUBSCRIPTION_FILTER: '**/Api/Data/Subscription/?FilterId=**',
    SUSTAIN_ANALYTICS: '**/Scripts/EditorControls/Sustainalytics/**',
    SPA: '**/Api/Data//Spa**',
    WORKFLOW_CONFIGURE_COLUMNS: '**/Api/WebUI//Workflow/WorkflowConfigureColumns**',
    WORKFLOW_RESEARCH_INFO: '**/Api/Data/WorkflowResearchInfo/GetWFResearch?CustomerID=0&_=**',

    GET_MARKUP_WORKFLOW: '**/Workflow/GetMarkup**',
    GET_MARKUP_DASHBOARD: '**/Dashboard/GetMarkup**',
    WORKFLOW_META_DATA_1: '**/Api/Data/WorkflowMetaData/?typeName=WorkflowExpansion&customerId**',
    WORKFLOW_META_DATA_2: '**/Api/Data/WorkflowMetaData/?typeName=WorkflowExpansion&showDenied=true&customerId**',
    GET_AUTHENTICATED_USER: '**/Api/WebUI/Users/GetAuthenticatedUser**',
    REPORTS_DEFAULT_DATA: '**/Api/Data/ReportsDefaultData/**',
    PASSWORD_VALIDATOR_SETUP: '**/Api/Data//PasswordValidatorSetup/**',
    GET_MARKUP_MEETING_DETAILS: '**/MeetingDetails/GetMarkup/**',
    GET_USER_PERMISSION: '**/Api/Data//MdPermissions/GetUserPermissions**',
    WORKFLOW_FILTER_CRITERIA_EDITORS: '**/Api/WebUI/WorkflowFilterCriteriaEditors**',
    DATE_RANGE_KNOCKOUT_BINDINGS: '**/Api/WebUIRes/?path=/Scripts/EditorControls/DateRange/dateRangeKnockoutBindings**',
    DATE_RANGE: '**/Api/WebUIRes/?path=/Scripts/EditorControls/DateRange/DateRange**',
    WATCHLIST_SECURITIES: '**/Api/Data/WatchlistSecurities/**',
    WATCHLIST_IDENTITY_SEARCH: '**/Api/Data/WatchlistIdentitySearch/**'
  },
  PUT: {
    BALLOT_GRID_STATE: '**/Api/Data/BallotsGridState',
  },
  DELETE: {
    REMOVE: '**/Api/Data/Policy/**',
    FILTER_DELETED: '**/Api/Data/WorkflowFilters/**?isConfirmed=false'
  },
  SCRIPT: {
    POSHYTIP: '**/Scripts/jquery.poshytip.js?_=**',
    EDITABLE_POSHYTIP: '**/Scripts/jquery-editable-poshytip.min.js?_=**'
  }
};