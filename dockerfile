# Use an official Node.js runtime as the base image
FROM  node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 1090

# Define the command to run your app using npm
CMD ["npm", "start"]