# Use an official Node.js runtime as a parent image
FROM node:18

# RUN npm install -g @nestjs/cli

RUN mkdir -p /app/backend

# Set the working directory to /app
WORKDIR /app/backend

COPY package*.json .

# Install dependencies in the backend folder
RUN npm install

# Copy the backend folder into the container
COPY . .


# # Build the app for production
# RUN npm run build --prefix backend

# Expose the port used by the backend app
EXPOSE 7000

# Start the backend app when the container starts
CMD ["npm", "run", "start:dev"]