import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

const url = 'http://qainterview.pythonanywhere.com/factorial';

When('I send a GET request to the Factorial API', () => {
	cy.request(url).as('page');
});

Then('verify the response contains the expected values', () => {
	cy.get('@page').should((response) => {
		expect(response.status).to.eq(200, 'Expected status code 200');
		expect(response.statusText).to.eq('OK', 'Expected status text OK');
		expect(response.isOkStatusCode).to.be.true;
		expect(response.headers.server).to.eq('PythonAnywhere', 'Expected server header to be PythonAnywhere');
		expect(response.body.toString().includes('The greatest factorial calculator!')).to.be.true;
	});
});

When('I send a POST request to the Factorial API with the number {int}', (number) => {
	cy.request({
		method: 'POST',
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		body: `number=${number}`,
		failOnStatusCode: false,
	}).as('factorialResponse');
});

Then('the answer returned in the response is {string}', (answer) => {
	cy.get('@factorialResponse').then((response) => {
		if (response.status === 500) {
			expect(response.body).to.include(
				'Internal Server Error',
				'Expected response body to contain "Internal Server Error"'
			);
		} else if (response.status === 200) {
			const expectedAnswer = answer === 'null' ? null : parseInt(answer, 10); // Convert to integer if it's a numeric string
			expect(response.body.answer).to.deep.equal(expectedAnswer, 'Expected answer to match response body');
		} else {
			throw new Error(`Unexpected response status code: ${response.status}`);
		}
	});
});
