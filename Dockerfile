# Use an official Node runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install --production

# Copy the local code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 4000

# Command to run the application
CMD ["yarn", "start:prod"]
