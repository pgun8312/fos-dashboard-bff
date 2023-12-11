# FOS Dashboard Backend

This is the Backend For Frontend (BFF) for the FOS Dashboard project.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (if you plan to run the application locally without Docker)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git

2. Change into the project directory:
    cd your-repository

3. Build the Docker image
    docker-compose build

4. Run the Docker container:
    docker-compose up

The application will be accessible at http://localhost:4000

## Running Locally
    If you want to run the application locally without Docker, you can use the following commands:

    Development Mode: If you want to run the application in development mode with live-reloading, use:
        yarn dev

    Production Mode: To run the application in production mode, use:
        yarn start:prod

## Usage

*Development Mode: If you want to run the application in development mode with live-reloading, you can use the following command:
    docker-compose run -p 4000:4000 admin-dashboard yarn dev

*Production Mode: To run the application in production mode, use:
    docker-compose run -p 4000:4000 admin-dashboard yarn start:prod

## Testing
*To run tests, execute the following command:
    docker-compose run admin-dashboard yarn test

## Running Package.json Commands in Docker Container

If you need to run specific commands defined in your package.json inside a Docker container, follow these steps:

# Find the Container ID:

docker ps

Look for the container ID associated with the micro-frontend you want to run commands for.

# Enter the Container:

docker exec -it <container-id> sh

Replace <container-id> with the actual container ID.

# Run Package.json Commands:

cd /app
yarn <your-command>

Replace <your-command> with the specific command you want to run.

Example:
yarn dev

### Extra DOCKER commands

docker build -t admin-dashboard .

docker images
docker run -p 8080:3000 admin-dashboard

# to build images

docker-compose up

# Stop and remove the containers

docker-compose down

# Recreate containers and rebuild images

docker-compose up --build

# when running sonar-scanner locally
sonar-scanner -Dsonar.login=your_sonar_login_token -Dsonar.password=your_sonar_password -Dsonar.host.url=http://your-sonarqube-server-ip:port

ex: sonar-scanner -Dsonar.login=admin -Dsonar.password=pgun8312 -Dsonar.host.url=http://10.97.31.71:8090


