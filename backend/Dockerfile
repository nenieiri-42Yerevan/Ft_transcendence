# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

COPY ./backend /app/backend

# Install and build project
RUN cd backend && npm install && npm run build 

# Expose the port used by the backend app
EXPOSE 7000

# Start the backend app when the container starts
CMD ["npm","--prefix", "./backend", "run", "start:dev"]
#CMD ["tail","-f"]
