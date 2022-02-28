let meetingId;
let meetingName;

describe('Watchlist Assignment tests', function () {

  //Test scenario 37827 - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
  it('Internal User - Select Calpers meeting and add System Watch list', function () {
    cy.loginWithAdmin('AUTOMATIONINTERNAL');

    cy.visit('/Workflow');

    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    cy.get('.customerName-Search .k-input').type('CAL', { force: true });
    cy.get('#kendoCustomers-list .k-item').first().click({ force: true });
    cy.get('#btn-workflow-config-columns').click();
    cy.get('#txt-filter-col-name').type('System Watch List(s)');
    cy.get('input[value="System Watch List(s)"]').check({ force: true });
    cy.get('#txt-filter-col-name').clear();
    cy.get('#btn-apply-configure-columns').click();
    cy.wait('@WORKFLOW_EXPANSION');
    cy.get('#btn-scroll-end').click({ waitForAnimations: false });
    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    cy.get('table > tbody >tr').then(($rows) => {
      $rows.each((index, value) => {
        const wlist = Cypress.$(value).find('td#metaname-SystemWatchlistsName > div > span').text();
        if (wlist === '') {
          cy.get(`.mCSB_container >table > tbody >tr:nth-child(${index + 1}) > td:nth-child(2) > div > span > a`).then(
            (meet) => {
              meetingName = meet.text();
            }
          );
          cy.get(
            `.mCSB_container >table > tbody >tr:nth-child(${index + 1}) > td:nth-child(2) > div > span > a`
          ).click();
          return false;
        }
      });
    });
    //save meeting url
    cy.url().then((url) => {
      meetingId = url;
    });

    cy.log(meetingName);
    cy.get('#md-btn-watchlists').click({ force: true });
    cy.get('div.clearfix.scrollableContainer.systemListOfWatchlists').each((el) => {
      cy.wrap(el).find(':checkbox').uncheck({ force: true });
    });
    cy.get('#md-watchlistsEditorItem2783').check({ force: true });
    cy.get('#divEditorWl2783 > label').then(function (el) {
      const syswl = el.text();
      expect(syswl.includes(`2020 Pay-for-Performance 'F' Grades`)).to.be.true;
    });
    cy.get('#md-btn-update-security-watchlists').click({ force: true });
    cy.get('span[data-bind="text: SecurityWatchlistsCount"]').eq(1).should('have.text', '1');
  });

  //Test scenario 37827 - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
  it('External User - Verify System watch list', function () {
    cy.loginWithAdmin('CALPERS');

    cy.visit('/Workflow');

    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    cy.get('#btn-workflow-config-columns').click();
    cy.get('#txt-filter-col-name').type('System Watch List(s)');
    cy.get('input[value="System Watch List(s)"]').check({ force: true });
    cy.get('#txt-filter-col-name').clear();
    cy.get('#btn-apply-configure-columns').click({ force: true });
    cy.wait('@WORKFLOW_EXPANSION');
    cy.get('#btn-scroll-end').click({ waitForAnimations: false });
    cy.RemoveCriteriaIfExists('#editorDiv10', '#remove-editorDiv10');
    cy.RemoveCriteriaIfExists('#editorDiv49', '#remove-editorDiv49');
    cy.RemoveCriteriaIfExists('#editorDiv51', '#remove-editorDiv51');

    cy.get('table > tbody >tr').then(($rows) => {
      $rows.each((index, value) => {
        const mname = Cypress.$(value).find(`td#metaname-CompanyName > div > span > a`).text();
        const swname = Cypress.$(value).find(`td#metaname-SystemWatchlistsName > div > span`).text();
        if (mname === meetingName) {
          cy.log(swname);
          cy.get(
            `.mCSB_container >table > tbody >tr:nth-child(${index + 1}) > td:nth-child(2) > div > span > a`
          ).click();
          return false;
        }
      });
    });
    cy.get('#btn-watchlists').click({ force: true });
    cy.get('#md-watchlistsEditorItem2783').should('be.checked');
    cy.get('span[data-bind="text: SecurityWatchlistsCount"]').eq(1).should('have.text', '1');
  });

  //Test scenario 37827 - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
  it('Internal User - verify meeting system watch list and deselect', function () {
    cy.loginWithAdmin('AUTOMATIONINTERNAL');

    cy.visit(meetingId);

    cy.get('#md-btn-watchlists').click({ force: true });
    cy.get('#md-watchlistsEditorItem2783').uncheck({ force: true });
    cy.get('#md-watchlistsEditorItem2783').should('not.be.checked');
    cy.get('#md-btn-update-security-watchlists').click({ force: true });
    cy.get('span[data-bind="text: SecurityWatchlistsCount"]').should('have.text', '0');

    //uncheck system watchlist column
    cy.visit('/Workflow');

    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    cy.get('#btn-workflow-config-columns').click();
    cy.get('#txt-filter-col-name').type('System Watch List(s)');
    cy.get('input[value="System Watch List(s)"]').uncheck({ force: true });
    cy.get('#txt-filter-col-name').clear();
    cy.get('#btn-apply-configure-columns').click();
  });
});
