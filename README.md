# Introduction

This repo consists of the cypress end-to-end tests for various applications.

<br/>

# Running Tests for non-techs

If you want to run automated tests on ..., but have little or no idea on how to run specific test scripts, then follow below steps. This will help you run specific automated test scripts from the ... Test Suite.

# Running Tests for non-tech users (on Azure DevOps pipeline - access is not public ATM)

To run tests on Azure Pipelines, go to this link (to be added), click on `Run pipeline`, put the command suggested below under `Build Parameters`. Choose the test environment as required. Then, Click `Run`.

# Running any test case from Azure DevOps (on Azure DevOps pipeline - access is not public ATM)

- To run specific tests where you know the test ID, mention the Azure test IDs in this command. For example, if I want to run test case ID 28722, the command to use in the `Build Parameters` field would be `npx cypress run --env tags=@28722`
- To run multiple tests, just add those test IDs in the tags section of the above command, eg: `tags='@xyz or @abc or @lmn or @pqr or @fgh'`

<br/>

# Development

Before starting the development of test cases, make sure:

- You have nodejs installed. Can be downloaded from here - https://nodejs.org/en/
- Once installed, open/reopen your cli tool, eg: powershell / git bash / cmd, and run the command `npm install -g yarn`
- Clone the repository in your machine. One way to do that is by navigating to the directory where you want the repository on your cli tool, and then running the command `git clone <REPOSITORY-URL>`
- Then, navigate to the project root directory by running `cd <REPOSITORY-URL>`, and run the command `npm install`
- Now run `git checkout -b <your_branch_name>` to create your own working branch.

<br/>

# Build and Test

To run cypress, just execute the following command:

**NOTE:** If you want to run the tests on UAT, just add this to the end of the command `--env testEnv=uat`

- `npx cypress open` or `yarn open` - Opens the Cypress Test Runner in interactive mode.
- `npx cypress run` or `yarn test` - Runs Cypress tests to completion. By default will run all tests headlessly in the Electron browser
- `npm run smoke:tag` or `yarn smoke:tag` - Runs All Smoke Tests (all tests with a `@Smoke` tag).
- `npm run regression:tag` or `yarn regression:tag` - Runs All Regression Tests (all tests with a `@Regression` tag).
- `npm run specific:folder` or `yarn specific:folder` - Runs all tests in a specific folder.
- `npm run specific:feature"` or `yarn specific:feature` - Runs a specific feature file.

**NOTE:** To run tests on Azure Pipelines, go to this link (to be added), click on `Run pipeline`, put the command suggested below under `Build Parameters`. Choose the test environment as required. Then, Click `Run`.

<br/>

# Running With Tags

Using Cucumber tags allows you to run test cases of your choice. Most tests in this repo have been tagged (either with an ID or a Name). You can use the command as seen in below examples.

- Run specific test from entire test suite - `npx cypress run --env tags='@40729'`
- Run multiple tests from entire test suite - `npx cypress run --env tags='@40729 or @3331 or @28433 or @28474'`
- Run specific test from specific file - `npx cypress run --spec 'cypress/e2e/the-internet/dropdown.feature' --env tags='@48678'`
- Run multiple tests from specific folder - `npx cypress run --config specPattern="cypress/e2e/the-internet/*.feature" --env tags='@40724 or @40734'`

<br/>

# CI (Github Actions)

All Github Actions CI Pipelines are available in the [.github/workflows](.github/workflows) folder. Currently we have 3:

- [daily-regression.yml](.github/workflows/daily-regression.yml) - Triggered when code is pushed to master branch, & scheduled to run every weekday.
- [adhoc-tags.yml](.github/workflows/adhoc-tags.yml) - Manually triggered. You specify if you want to run all `@Smoke` or `@Regression` tests.
- [adhoc-full-command.yml](.github/workflows/adhoc-full-command.yml) - Manually triggered. You specify the full run command by updating the default one.

<br/>

# CI (on Azure DevOps pipeline - access is not public ATM)

All Azure DevOps CI Pipelines are available in the [pipelines](pipelines) folder. Currently we have 3:

- [daily-regression.yml](pipelines/daily-regression.yml) - Triggered when code is pushed to master branch, & scheduled to run every weekday.
- [adhoc-tags.yml](pipelines/adhoc-tags.yml) - Manually triggered. You specify if you want to run all `@Smoke` or `@Regression` tests.
- [adhoc-full-command.yml](pipelines/adhoc-full-command.yml) - Manually triggered. You specify the full run command by updating the default one.