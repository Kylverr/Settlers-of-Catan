# Use node version 22 as base image
FROM node:22

# Goes to the src directory
WORKDIR /src

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install react-scripts
RUN npm install -g react-scripts

# Copy rest of app into the container
COPY . .

# Set port environemnt variable
ENV PORT=3000
# Expose the port so our computer can access it
EXPOSE 3000

# Run app
CMD ["npm", "start"]