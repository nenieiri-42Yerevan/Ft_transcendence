# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# RUN npm install -g react-scripts

COPY ./package*.json /app

RUN npm install

# Copy the backend folder into the container
COPY ./backend /app/backend

# Install dependencies in the backend folder
RUN cd backend && npm install

# # Build the app for production
# RUN npm run build --prefix backend

# Expose the port used by the backend app
EXPOSE 7000

# Start the backend app when the container starts
CMD ["npm", "run", "start:dev", "--watch"]