# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the frontend folder into the container
COPY ./frontend /app/frontend

# Install dependencies in the frontend folder
RUN cd frontend && npm install && npm run build

# Expose the port used by the frontend app
EXPOSE 3000

# Start the frontend app when the container starts
CMD ["npm", "--prefix", "./frontend", "start"]
