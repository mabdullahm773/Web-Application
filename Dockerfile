# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server (like serve) to serve the built app
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 80

# Command to run the app
CMD ["serve", "-s", "build", "-l", "80"]