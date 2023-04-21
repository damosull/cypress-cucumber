import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import dayjs from 'dayjs';
import workflowPage from '../page_objects/workflow.page';
const constants = require('../constants');
let wfData = [],
	meetingName;

Then('I can view the workflow page', () => {
	workflowPage.getPageHeading().contains('Upcoming Meetings');
	workflowPage.waitForWorkflowPageLoad();
	workflowPage.workflowMenuButton().should('exist');
});

Then('I navigate to the workflow page', () => {
	cy.visit('/Workflow');
	workflowPage.getLoadingSpinner().should('exist');
});

Then('I set the filter to Upcoming Meetings', () => {
	workflowPage.quickFiltersDiv().contains('Sustainalytics ESG').click();
	workflowPage.getLoadingSpinner().should('exist');
	workflowPage.waitForWorkflowPageLoad();
	workflowPage.quickFiltersDiv().contains('Upcoming Meetings').click();
});

When('I remove all existing selected criteria', () => {
	cy.removeAllExistingSelectedCriteria();
	workflowPage.waitForWorkflowPageLoad();
});

When('I remove all existing selected criteria for the internal user', () => {
	cy.removeAllExistingSelectedCriteria(true);
	workflowPage.waitForWorkflowPageLoad();
});

When('I search for the customer {string}', (customerName) => {
	workflowPage.selectCustomerShadowInput().click({ force: true }).type('{del}', { force: true });
	workflowPage.selectCustomerInput().clear({ force: true }).type(customerName);
	workflowPage.selectCustomerDropdown().should('be.visible');
	workflowPage.selectCustomerInput().type('{downarrow}{enter}');
});

Then('I arrange the table in {string} order for {string}', (order, column_name) => {
	workflowPage.workflowLink().scrollIntoView();
	switch (column_name) {
		case 'policy id':
			workflowPage.policyIdColumnHeader().should('be.visible').click({ force: true, scrollBehavior: false });
			workflowPage.waitForWorkflowPageLoad();
			if (order.includes('descending')) {
				workflowPage.policyIdColumnHeader().should('be.visible').click({ force: true, scrollBehavior: false });
				workflowPage.waitForWorkflowPageLoad();
			}
			break;
		case 'control number':
			workflowPage.controlNumberColumnHeader().should('be.visible').click({ force: true, scrollBehavior: false });
			workflowPage.waitForWorkflowPageLoad();
			if (order.includes('descending')) {
				workflowPage.controlNumberColumnHeader().should('be.visible').click({ force: true, scrollBehavior: false });
				workflowPage.waitForWorkflowPageLoad();
			}
			break;
	}
});

Then('I should be able to see and navigate to the company name saved previously', () => {
	workflowPage.tableRows().within(() => {
		workflowPage.containsText(Cypress.env('companyName')).should('be.visible').click();
	});
});

Then('I have added the filter criteria {string}', (criteria) => {
	cy.AddMultipleCriteria([criteria]);
});

Then('I have added the criteria for {string} {string}', (criteria, value) => {
	workflowPage.waitForWorkflowPageLoad();
	cy.AddMultipleCriteria([criteria]);
	cy.intercept('GET', '**/GetSecurityStartsWith/?QueryValue=**').as('COMPANY_FILTER_SEARCH_RESULTS');
	workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false });
	workflowPage
		.criteriaHeadings()
		.contains(criteria)
		.next()
		.invoke('attr', 'style', 'display: block;')
		.as('FILTER_CRITERIA');
	cy.get('@FILTER_CRITERIA')
		.should('be.visible')
		.within(() => {
			if (value.includes('from')) {
				workflowPage.filterSearchInput().type(Cypress.env('companyName'));
			} else {
				workflowPage.filterSearchInput().type(value);
			}
			cy.wait('@COMPANY_FILTER_SEARCH_RESULTS');
			workflowPage.filterSearchInput().type('{enter}');
			workflowPage.updateComanyName().click({ scrollBehavior: false });
		});
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.waitForWorkflowPageLoad();
});

Then('I have added the criteria for {string} with status {string}', (criteria, status) => {
	cy.AddMultipleCriteria([criteria]);
	workflowPage.criteriaHeadings().contains(criteria).first().click({ scrollBehavior: false });
	workflowPage
		.criteriaHeadings()
		.contains(criteria)
		.first()
		.next()
		.invoke('attr', 'style', 'display: block;')
		.as('FILTER_CRITERIA');
	cy.get('@FILTER_CRITERIA')
		.should('be.visible')
		.within(() => {
			workflowPage.getInputBox().eq(0).should('be.visible').type(status, { scrollBehavior: false });
			workflowPage.containsText(status).click({ scrollBehavior: false });
			workflowPage.updateButtonForCheckbox().click({ scrollBehavior: false });
		});
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.waitForWorkflowPageLoad();
});

Then('I have added the criteria for {string} and checking the checkbox for {string}', (criteria, status) => {
	cy.AddMultipleCriteria([criteria]);
	workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false });
	workflowPage
		.criteriaHeadings()
		.contains(criteria)
		.next()
		.invoke('attr', 'style', 'display: block;')
		.as('FILTER_CRITERIA');
	cy.get('@FILTER_CRITERIA')
		.should('be.visible')
		.within(() => {
			workflowPage.containsText(status).click({ scrollBehavior: false });
			workflowPage.updateButtonForCheckbox().click({ scrollBehavior: false });
		});
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.waitForWorkflowPageLoad();
});

Then('I have added the criteria for {string} and selecting the radio button for {string}', (criteria, status) => {
	cy.AddMultipleCriteria([criteria]);
	workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false });
	workflowPage.criteriaHeadings().contains(criteria).next().invoke('attr', 'style', 'display: block;');
	workflowPage.criteriaOption().contains(status).next().check({ scrollBehavior: false });
	workflowPage.updateButton().click({ scrollBehavior: false });
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.waitForWorkflowPageLoad();
});

When('I click on the Meeting Date radio button', () => {
	workflowPage.meetingDateRadio().check();
});

When('I set the date filter as Next {int} days and Past {int} days', (nextDays, pastDays) => {
	workflowPage.dateFilterModal().invoke('attr', 'style', 'display: block;');
	workflowPage.nextDaysInput().prev().click();
	workflowPage.nextDaysInput().clear().type(nextDays);
	workflowPage.pastDaysInput().prev().click();
	workflowPage.pastDaysInput().clear().type(pastDays);
});

When('I set the date filter between {int} and {int} days from today', (pastDays, nextDays) => {
	let pastDate = dayjs().add(pastDays, 'days').format('DD/MM/YYYY');
	let nextDate = dayjs().add(nextDays, 'days').format('DD/MM/YYYY');
	workflowPage.dateFilterModal().invoke('attr', 'style', 'display: block;');
	workflowPage.dateBetweenRadio().check();
	workflowPage.dateStartInput().clear().type(pastDate);
	workflowPage.dateEndInput().clear().type(nextDate);
});

When('I update the date filter', () => {
	workflowPage.updateDateFilter().click();
});

Then('I click on the Columns dropdown', () => {
	workflowPage.columnsListButton().click({ force: true });
});

Then('I have added the column {string}', (columnName) => {
	cy.checkColumnFieldApplyAndVerifyIsChecked(columnName);
});

When('I select the first available meeting', () => {
	workflowPage
		.tableRows()
		.eq(0)
		.within(() => {
			workflowPage.companyNameLink().click({ force: true });
		});
});

Then('I set the meetings per page value to {string}', (pages) => {
	workflowPage.meetingsPerPageDropdown().select(pages, { force: true }).invoke('val').should('eq', pages);
});

When('I select a random meeting', () => {
	workflowPage
		.tableRows()
		.its('length')
		.then((n) => {
			const meetingRows = n - 1;
			const randomRow = Math.floor(Math.random() * meetingRows);
			workflowPage
				.tableRows()
				.eq(randomRow)
				.within(() => {
					workflowPage.companyNameLink().click({ force: true });
					cy.log(`Selected row number ${randomRow + 1} from the top`);
				});
		});
});

Then('I navigate to the {int} meeting', (company_sequence) => {
	workflowPage
		.tableRows()
		.eq(company_sequence - 1)
		.within(() => {
			workflowPage.companyNameLink().click({ force: true });
		});
});

When('I navigate to a meeting with same deadline date and {int} meeting date ahead', (mdDays) => {
	workflowPage
		.tableRows()
		.eq(0)
		.within(() => {
			workflowPage
				.companyNameLink()
				.invoke('attr', 'href')
				.then((val) => {
					let meetingid = val.split('/Index/')[1];
					cy.executeUpdateQuery(
						`UPDATE PX_Meeting SET MeetingDate = DATEADD(DAY, ${mdDays}, getdatE()) WHERE MeetingID = '${meetingid}'`
					);
					cy.visit('MeetingDetails/Index/' + meetingid);
				});
		});
});

Then('I should be {string} to see the text {string} on the UI', (condition, text) => {
	if (condition.includes('unable')) {
		workflowPage.containsText(text).should('not.exist');
	} else {
		workflowPage.containsText(text).should('exist');
	}
});

Then(
	'I can verify that "Upcoming Meetings" displayed under the "Quick Filters" category on the left side of the screen',
	() => {
		workflowPage.quickFiltersDiv().contains('Upcoming Meetings').should('be.visible');
		workflowPage.selectedQuickFilterName().should('contain.text', 'Upcoming Meetings');
		workflowPage.selectedQuickFilterName().should('have.css', 'background-color', 'rgb(30, 64, 101)');
	}
);

When('I navigate to {string} meeting', (company_name) => {
	workflowPage.containsText(company_name).click();
});

Then('I filter for meetings without ballots', () => {
	workflowPage.ballotCriteriaFilter().click();
	workflowPage.meetingWithoutBallotsRadio().check();
	workflowPage.updateNumberOfBallotsButton().click();
	workflowPage.waitForWorkflowPageLoad();
});

When('I select {int} meetings from the top', (noOfMeetings) => {
	for (var i = 0; i < Number(noOfMeetings); i++) {
		workflowPage.meetingCheckbox().eq(i).should('not.be.visible').check({ force: true });
	}
});

Then('I scroll to the end of the meetings table', () => {
	for (let n = 0; n < 11; n++) {
		workflowPage.scrollEndButton().click({ waitForAnimations: false });
	}
});

Then('I select {string} from the Quick Pick dropdown', (value) => {
	workflowPage.quickPickDropdown().click();
	workflowPage.quickPickModal().contains(value).click({ force: true });
	workflowPage.quickPickModal().contains('Update').click({ force: true });
	workflowPage.proceedButton().click();
	workflowPage.waitForWorkflowPageLoad();
});

Then('I should be able to see {string} in the column {string}', (column_value, column_name) => {
	switch (column_name) {
		case 'Controversy Alert':
			column_value = new RegExp(column_value);
			workflowPage.controversyAlertTableData().each(($column) => {
				expect($column.text().trim()).to.match(column_value);
			});
			break;
		default:
			break;
	}
});

Then('I should be able to see a {string} named {string}', (fieldType, fieldName) => {
	workflowPage.containsText(fieldName).should('be.visible');
});

Then('I should be able to verify that the column {string} is {string}', (columnName, isChecked) => {
	workflowPage.columnsListButton().click();
	if (isChecked.includes('not')) {
		workflowPage.columnsListDiv().find(`input[value='${columnName}']`).should('not.be.checked');
	} else {
		workflowPage.columnsListDiv().find(`input[value='${columnName}']`).should('be.checked');
	}
});

Then('I generate a request for Workflow Export as {string} for {string} fields', (extension, fields) => {
	workflowPage.exportWorkflowDropdown().click();
	workflowPage.exportResultsLink().click();
	extension.includes('csv') ? cy.get('#csv').check({ force: true }) : cy.get('#html').check({ force: true });
	fields.includes('all') ? cy.get('#all').check({ force: true }) : cy.get('#displayed').check({ force: true });
	workflowPage.exportResultsButton().click();
});

Then('I verify that all the relevant API calls for workflow page are made for {string} user', (userType) => {
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@SPA');
	cy.statusCode200('@GET_MARKUP_WORKFLOW');
	cy.statusCode200('@DASHBOARD_MARKUP');
	cy.statusCode200('@WORKFLOW_CONFIGURE_COLUMNS');
	cy.statusCode200('@WORKFLOW_META_DATA_1');
	cy.statusCode200('@WORKFLOW_META_DATA_2');
	cy.statusCode200('@FILTERS_DIRECTORY');
	cy.statusCode200('@GET_FOR_USER');
	cy.statusCode200('@WORKFLOW_SECURITIES_WATCHLIST');
	cy.statusCode200('@GET_MARKUP_MEETING_DETAILS');
	cy.statusCode200('@GET_USER_PERMISSION');
	cy.statusCode200('@WORKFLOW_FILTER_CRITERIA_EDITORS');
	cy.statusCode200('@INBOX');
	cy.statusCode200('@DATE_RANGE_KNOCKOUT_BINDINGS');
	cy.statusCode200('@DATE_RANGE');

	if (userType.includes('external')) {
		cy.statusCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER');
	}
});

Then('the filtered results should be displayed', () => {
	workflowPage.containsText('Decision Status (1)');
});

Then('I save the filter', () => {
	const unixTime = Math.floor(Date.now() / 1000);
	const filterName = `MyFilter_${unixTime}`;
	cy.saveFilter(filterName);
	workflowPage.toastMessage().should('contain.text', constants.messages.toast.FILTER_CREATED);
	workflowPage.containsText('My Filters').siblings().find('span').should('contain', filterName);
});

Then('I should be able to verify the different column actions on the workflow page', () => {
	const testCol = 'Last Voted By';
	const columns = [
		'Agenda Key',
		'Ballot Blocking',
		'Control Number',
		'Deadline Date',
		'Decision Status',
		'Meeting Type',
		'Policy ID',
		'Record Date',
		'Security Country of Trade',
		'Shares',
	];
	//Step 3
	workflowPage.columnsListButton().click();

	columns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).should('be.checked');
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnCancelButton().click();

	//Step 4 and step 5
	cy.checkColumnFieldApplyAndVerifyIsChecked(testCol);
	workflowPage.waitForWorkflowPageLoad();

	// add test col to stack
	columns.push(testCol);

	//sort columns in alphabetical order
	columns.sort();

	workflowPage.columnsListButton().click();

	//verify all checked after adding new column
	columns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).should('be.checked');
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnCancelButton().click();

	//uncheck the added column and remove from sorted array
	cy.uncheckColumnFieldApplyAndVerifyNotChecked(testCol);
	workflowPage.waitForWorkflowPageLoad();
	columns.splice(5, 1);

	//Step 6 - Verify User unchecks Multiple fields (Eg : Decision Status, Ballot Status etc.) from the top of the list by selecting the checkboxes & Clicks 'Apply' button.
	//uncheck multiple checkboxes and remove from array as unchecked
	cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[2]);
	workflowPage.waitForWorkflowPageLoad();
	columns.splice(2, 1);
	cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[3]);
	workflowPage.waitForWorkflowPageLoad();
	columns.splice(3, 1);
	cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[4]);
	workflowPage.waitForWorkflowPageLoad();
	columns.splice(4, 1);

	//resort array after removing items
	columns.sort();

	//Step 7 - Verify that the Removed fields (Eg : Decision Status, Ballot Status etc.) should be available in the rendered list in alphabetic order with unchecked in Configure 'Columns' modal
	workflowPage.columnsListButton().click();
	columns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).should('be.checked');
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnCancelButton().click();

	workflowPage.filterSectionDiv().should('be.visible');
	workflowPage.workflowLink().should('exist');

	cy.removeAllExistingSelectedCriteria();
	workflowPage.workflowMenuButton().scrollIntoView();
	cy.AddMultipleCriteria(['Decision Status']);
	cy.addCriteriaStatus(['Recommendations Available']);

	//Step 9 - Go Back to the Workflow Page, Verify Removed Columns are not displayed/Auto Saved [Eg : Decision Status, Ballot Status etc]
	workflowPage.columnsListButton().click({ timeout: 10000 });
	columns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).should('be.checked');
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnCancelButton().click();
});

Then('There is no reference to my picklist {string} on the workflow page', (lbl) => {
	workflowPage.containsText(lbl).should('not.exist');
});

Then('I should be able to see the results only for {string}', (filterName) => {
	workflowPage.workflowLink().scrollIntoView();
	workflowPage.criteriaHeadings().contains(filterName).click({ scrollBehavior: false });
	workflowPage
		.criteriaHeadings()
		.contains(filterName)
		.next()
		.invoke('attr', 'style', 'display: block;')
		.as('FILTER_CRITERIA');
	switch (filterName) {
		case 'ESG Risk Rating Assessment':
			cy.get(workflowPage.ESG_Risk_Rating_Assessment_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Exposure Assessment':
			cy.get(workflowPage.ESG_Risk_Exposure_Assessment_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Management Assessment':
			cy.get(workflowPage.ESG_Risk_Management_Assessment_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Rating Percentile Global':
			cy.get(workflowPage.ESG_Risk_Rating_Percentile_Global_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Rating Percentile Industry':
			cy.get(workflowPage.ESG_Risk_Rating_Percentile_Industry_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Rating Percentile Sub Industry':
			cy.get(workflowPage.ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Rating Highest Controversy':
			cy.get(workflowPage.ESG_Risk_Rating_Highest_Controversy_filter.editorModal).should('be.visible');
			break;
		default:
			cy.log('Filter not found!!');
	}
});

Then('I can see the filter columns are displayed in the correct order', () => {
	workflowPage.dateFilterLink().contains('Next 30 Days').should('be.visible');
	workflowPage.numberOfBallotsFilterLink().contains('Number of Ballots > 0').should('be.visible');
	workflowPage.quickFiltersDiv().contains('Upcoming Meeting').should('have.class', 'highlightedFilter');

	const filterColumns = [
		'Company Name',
		'Agenda Key',
		'Policy ID',
		'Control Number',
		'Decision Status',
		'Security Country of Trade',
		'Deadline Date',
		'Meeting Date',
		'Record Date',
		'Meeting Type',
		'Shares',
		'Ballot Blocking',
	];

	filterColumns.forEach((column) => {
		workflowPage.columnDataTitle(column);
		filterColumns.index == column;
	});
});

Then('all the meetings on the screen have a CalPERS customer id', () => {
	// check all meetings in response have CalPERS customer id
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 }).then((xhr) => {
		//handle response. Cache service returns string, while DB returns object
		const data = typeof xhr.response.body == 'string' ? JSON.parse(xhr.response.body) : xhr.response.body;
		const items = data.items;

		items.forEach((item) => {
			const ballots = item.Agendas[0].Policies[0].Ballots;
			ballots.forEach((ballot) => {
				const value = ballot.Summaries.CustomerID.Value;
				expect(value).to.equal(196);
			});
		});
	});
});

When('I search for a company on the search bar and choose meetings', () => {
	workflowPage.searchResultsDiv().invoke('attr', 'style', 'display: block');
	// Search Customer ('Meetings'option is default) & verify user is navigated to correct Meeting Detail page
	workflowPage.mainSearchInput().type('International Breweries plc');
	cy.statusCode200('@TOOLBAR_SEARCH');
	workflowPage.containsText('International Breweries Plc | NG').click();
});

When('I search for a company on the search bar and choose companies', () => {
	workflowPage.searchResultsDiv().invoke('attr', 'style', 'display: block');
	// Search customer ('Companies' option) & verify user is navigated to correct Company page
	workflowPage.mainSearchInput().type('international business machines');
	workflowPage.companiesRadio().should('have.value', 'Companies').click();
	cy.statusCode200('@TOOLBAR_SEARCH');
	workflowPage.companiesResultsBlueIcon().should('be.visible');
	workflowPage.containsText('International Business Machines Corp. | US').click();
});

When('I try to add the first four available Sustainalytics ESG columns', () => {
	workflowPage.columnsListButton().click();
	workflowPage.fourEsgColumns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).check({ force: true });
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnApplyButton().click();
});

Then('I should be able to see these {string} columns on the workflow table', (noOfColumns) => {
	//Waiting for page load
	workflowPage.waitForWorkflowPageLoad();
	workflowPage.meetingsHorizontalScrollBar().should('be.visible');
	// Moves the horizontal sidebar to the far right
	for (let n = 0; n < 11; n++) {
		workflowPage.scrollEndButton().click();
	}

	switch (noOfColumns) {
		case 'four':
			workflowPage.fourEsgColumns.forEach((column) => {
				workflowPage.columnDataTitle(column).should('be.visible');
			});
			break;
		case 'three':
			workflowPage.threeEsgColumns.forEach((column) => {
				workflowPage.columnDataTitle(column).should('be.visible');
			});
			break;
	}
});

When('I try to add the remaining three Sustainalytics ESG columns', () => {
	workflowPage.columnsListButton().click();

	workflowPage.threeEsgColumns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).check({ force: true });
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnApplyButton().click();
});

When('I try to remove the first column on the workflow table', () => {
	let column = 'Agenda Key';
	workflowPage.columnDataTitle(column).should('be.visible');
	workflowPage.columnsListButton().click();
	workflowPage.columnLabelValue(column).first().uncheck({ force: true });
	workflowPage.columnApplyButton().click();
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
});

Then('I should be unable to see the first column on the workflow table', () => {
	let column = 'Agenda Key';
	workflowPage.columnDataTitle(column).should('not.exist');
});

When('I apply the policy criteria for one of the policies', () => {
	cy.removeAllExistingSelectedCriteria();
	workflowPage.containsText('Upcoming Meetings').click({ force: true });
	// Step 2 - User clicks on Add Criteria & selects Policy ID
	cy.AddMultipleCriteria(['Policy ID']);
	cy.wait('@LIST_SERVICE');
	// Step 3 - User selects one policy from the list (e.g. TCW-TH) & clicks Update
	cy.addCriteriaStatus([`${workflowPage.workflowFilterData.policy}`]);
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
	cy.wait('@GET_AVAILABLE_ASSIGNEES_CUSTOMER');
});

Then('I click on the control number link', () => {
	// Step 4 - User clicks on the Control Number hyperlink on the workflow page
	// Go through the list of meetings and click in the record that matches the name
	workflowPage.policyIdTableData().each(($list, index) => {
		if ($list.text() == workflowPage.workflowFilterData.policy) {
			workflowPage.controlNumberTableData().eq(index).find('a').click({ force: true });
			return false;
		}
	});
	cy.wait('@GET_MEETING_ID');
	cy.wait('@RELATED_MEETINGS');
	cy.wait('@GET_AGENDA');
	cy.wait('@PAGE_SECTION_ORDER');
	cy.wait('@MEETING_SECURITY_WATCHLIST');
	cy.wait('@ASSIGNED_MEETING_ID');
	cy.wait('@VOTE_TALLY');
});

When('I apply the System Watch list for {string}', (client) => {
	workflowPage.customerNameInput().type(client, { force: true });
	workflowPage.customerNameSearchResult().first().click({ force: true });
	workflowPage.columnsListButton().click();
	workflowPage.columnNameInput().type('System Watch List(s)');
	workflowPage.columnLabelValue('System Watch List(s)').check({ force: true });
	workflowPage.columnNameInput().clear();
	workflowPage.columnApplyButton().click();
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
	workflowPage.scrollEndButton().click({ waitForAnimations: false });
});

Then('all the results on the table should belong to "Calpers"', () => {
	workflowPage.tableRows().then(($rows) => {
		$rows.each((index, value) => {
			const wlist = Cypress.$(value).find('td#metaname-SystemWatchlistsName > div > span').text();
			if (wlist === '') {
				cy.get(`.mCSB_container >table > tbody >tr:nth-child(${index + 1}) > td:nth-child(2) > div > span > a`).then(
					(meet) => {
						meetingName = meet.text();
					}
				);
				cy.get(`.mCSB_container >table > tbody >tr:nth-child(${index + 1}) > td:nth-child(2) > div > span > a`).click();
				return false;
			}
		});
	});
});

When('I apply the System Watch list', () => {
	workflowPage.columnsListButton().click();
	workflowPage.columnNameInput().type('System Watch List(s)');
	workflowPage.columnLabelValue('System Watch List(s)').check({ force: true });
	workflowPage.columnNameInput().clear();
	workflowPage.columnApplyButton().click({ force: true });
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.scrollEndButton().click({ waitForAnimations: false });
	cy.RemoveCriteriaIfExists('#editorDiv10', '#remove-editorDiv10');
	cy.RemoveCriteriaIfExists('#editorDiv49', '#remove-editorDiv49');
	cy.RemoveCriteriaIfExists('#editorDiv51', '#remove-editorDiv51');
});

Then('all the results on the table should show relevant System Watch list and Meeting name', () => {
	workflowPage.tableRows().then(($rows) => {
		$rows.each((index, value) => {
			const mname = Cypress.$(value).find(`td#metaname-CompanyName > div > span > a`).text();
			if (mname === meetingName) {
				cy.get(`.mCSB_container >table > tbody >tr:nth-child(${index + 1}) > td:nth-child(2) > div > span > a`).click();
				return false;
			}
		});
	});
	workflowPage.watchListDropDownButton().click({ force: true });
	workflowPage.watchListCheckbox().should('be.checked');
	workflowPage.securityWatchListCount().eq(1).should('have.text', '1');
});

Then('I should be able to deselect the watch list from the previous scenario', () => {
	workflowPage.watchListButton().click({ force: true });
	workflowPage.watchListCheckbox().uncheck({ force: true });
	workflowPage.watchListCheckbox().should('not.be.checked');
	workflowPage.updateWatchListButton().click({ force: true });
	workflowPage.securityWatchListCount().should('have.text', '0');
});

Then('I should be able to deselect the system watch list from the workflow page', () => {
	//load workflow page and verify
	cy.visit('/Workflow');
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	cy.statusCode200('@WORKFLOW_SECURITIES_WATCHLIST');
	workflowPage.waitForWorkflowPageLoad();
	//deselect system watch list
	workflowPage.columnsListButton().click();
	workflowPage.columnNameInput().type('System Watch List(s)');
	workflowPage.columnLabelValue('System Watch List(s)').uncheck({ force: true });
	workflowPage.columnNameInput().clear();
	workflowPage.columnApplyButton().click();
});

Then('I can verify that the voted shares value matches the saved value', () => {
	workflowPage.votedSharesData().should('contain.text', Cypress.env('partialVoteNominalAmount'));
});

When('I save the data from row {int} on the workflow grid', (rowNo) => {
	workflowPage.rowData(rowNo).each((index, value) => {
		wfData[value] = Cypress.$(index).text().trim();
	});
});

Then('I verify the Workflow Export Report contains data seen on the UI', () => {
	workflowPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/Downloads/')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				wfData.forEach((value) => {
					expect(resp.body).include(value);
				});
			});
		});
});

Then('I verify the workflow table and filters have loaded', () => {
	workflowPage.tableData().should('be.visible');
	workflowPage.highlightedFilter().should('be.visible');
	workflowPage.addCriteriaButton().should('be.visible').and('have.text', 'Add Criteria');
});
