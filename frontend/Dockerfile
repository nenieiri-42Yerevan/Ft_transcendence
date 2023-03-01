# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# RUN npm install -g react-scripts

COPY ./package*.json /app

RUN npm install

# Copy the frontend folder into the container
COPY ./frontend /app/frontend

# Install dependencies in the frontend folder
RUN cd frontend && npm install

# # Build the app for production
# RUN npm run build --prefix frontend

# Expose the port used by the frontend app
EXPOSE 3000

# Start the frontend app when the container starts
CMD ["npm", "run", "client"]

