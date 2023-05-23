# Use an official Node.js runtime as a parent image
FROM node:18

# RUN npm install -g @nestjs/cli

RUN mkdir -p /frontend

# Set the working directory to /app
WORKDIR /frontend

COPY --chown=node:node package*.json ./

# Install dependencies in the frontend folder

RUN npm install

# Copy the frontend folder into the container
COPY --chown=node:node ./ ./


# # Build the app for production
# RUN npm run build --prefix frontend

# Expose the port used by the frontend app
EXPOSE 3000

# Start the frontend app when the container starts
CMD ["npm", "run", "start"]
