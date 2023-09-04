# Run the Docker container with Cypress tests and capture the container ID
CONTAINER_ID=$(docker run -it -d my-cypress-image)

# Wait for the Cypress tests to complete (adjust the sleep time as needed)
sleep 120

# Copy the HTML report from the container
docker cp $CONTAINER_ID:/cypress-tests/test-results/ test-results/

# Stop and remove the container
docker stop $CONTAINER_ID
docker rm $CONTAINER_ID