FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install backend dependencies
COPY package*.json ./
RUN npm install

# Copy client package files and install
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy all source files
COPY . .

# Build the React frontend with legacy OpenSSL support
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN cd client && npm run build

# Expose port
EXPOSE 5000

# Start the server
CMD [ "node", "./bin/www" ]