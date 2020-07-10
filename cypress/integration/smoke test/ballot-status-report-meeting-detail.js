const { link } = require("cypress/lib/fs");

describe('ballot status report meeting detail page ', function () {

    beforeEach(function () {
        cy.server();
        cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');

        cy.login();
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
    });

    it(`ballot status export PDF report`, function () {

        // cy.visit('https://viewpoint.aqua.glasslewis.com/MeetingDetails/Index/967348');
        cy.visit('https://viewpoint.aqua.glasslewis.com/MeetingDetails/Index/975457');

        // export the ballot status report
        cy.get('#exportMeetingDetails > .nav > .dropdown > .dropdown-toggle').click();
        cy.get('#exportBallotStatusReport').click();
        cy.get('#pdf').click();
        cy.get('#btn-export').click();

        cy.get('.toast-message').should('contain.text', 'Your export was initiated. It will appear in the toolbar shortly.');

        cy.get('.notify-count').click();

        //Ballot Status Report is queued
        cy.get('#inbox-container > [data-bind="if: InboxItems.length > 0"] > ul > :nth-child(1) > .inboxmsg > .msg-txt').should('contain.text', "'Ballot Status Report' export request has been queued");
        cy.reload();
        cy.get('.notify-count').click();
        cy.wait(20000);

        //Ballot Status Report is available for download
        cy.get('#inbox-container > [data-bind="if: InboxItems.length > 0"] > ul > :nth-child(1) > .inboxmsg > .msg-txt').should('contain.text', "'Ballot Status Report' export is ready to download");

        // download PDF & verify
        cy.get('#inbox-container [data-pagelink1]').first().invoke('attr', 'data-pagelink1').should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
            .then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {

                    expect(resp.status).to.eq(200);
                    expect(resp.headers).to.have.property('content-disposition').eql('attachment; filename=BallotStatusReport.pdf');
                    expect(resp.headers).to.have.property('content-type').eql('application/pdf');
                    expect(resp.headers).to.have.property('content-length').greaterThan(1);

                    expect(resp.body).include('%PDF');
                });
            });
    });
});