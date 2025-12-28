FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
#RUN npm install react-scripts -g
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Replacing the proxy host, to reference the backend container
RUN sed -i 's/localhost/backend/g' package.json

EXPOSE 3000
CMD [ "npm", "start" ]