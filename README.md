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

Environment Variables

Create a .env file in the root of the project with the necessary environment variables. Sample content:
```
NODE_ENV=development
PORT=4000
AWS_CLIENT_ID=your-aws-client-id
AWS_REGION=your-aws-region
AWS_USER_POOL=your-aws-pool
AWS_USER_POOL_ID=your-aws-user-pool-id
AWS_JWKS=cognito-user-pool


# HOST URL , change this to mahcine ipv4 address
HOST_URL=your-machine-ipv4-address

# API endpoints
PRODUCT_SERVICE_URL=${HOST_URL}:8080/api/v1
ORDER_SERVICE_URL=${HOST_URL}:8081/api/v1
USER_SERVICE_URL=${HOST_URL}:8082/api/v1

# SONAR_HOST_URL=http://your-dynamic-hostname:8090, host with frontend
SONAR_HOST_URL=${HOST_URL}:8090
SONAR_LOGIN=your-sonar-login-user-name
SONAR_PASSWORD=your-sonar-password

```

2. Change into the project directory:
    `cd your-repository`

3. Build the Docker image
    `docker-compose build`

4. Run the Docker container:
    `docker-compose up`

The application will be accessible at http://localhost:4000

## Running Locally
    If you want to run the application locally without Docker, you can use the following commands:

    Development Mode: If you want to run the application in development mode with live-reloading, use:
        `yarn dev`

    Production Mode: To run the application in production mode, use:
        `yarn start:prod`

## Usage

*Development Mode: If you want to run the application in development mode with live-reloading, you can use the following command:
    `docker-compose run -p 4000:4000 admin-dashboard yarn dev`

*Production Mode: To run the application in production mode, use:
    `docker-compose run -p 4000:4000 admin-dashboard yarn start:prod`

## Testing
*To run tests, execute the following command:
    `docker-compose run admin-dashboard yarn test`

## Running Package.json Commands in Docker Container

If you need to run specific commands defined in your package.json inside a Docker container, follow these steps:

# Find the Container ID:

`docker ps`

Look for the container ID associated with the micro-frontend you want to run commands for.

# Enter the Container:
```
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

```


