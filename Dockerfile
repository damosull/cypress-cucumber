#Base Cypress Image
FROM cypress/base:18.16.1

#Working Directory in the container
WORKDIR /cypress-tests

#Adding the below line to prevent cache, followed by copying files to the image
#ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
COPY ./cypress ./cypress
COPY ./cypress.config.js ./cypress.config.js
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

#Install packages & Set proxy to connect to test environments
RUN npm i

#Script to run when running the container
ENTRYPOINT [ "yarn", "test" ]