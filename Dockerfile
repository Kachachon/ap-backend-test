FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

#COPY package.json ./
COPY . .
RUN npm install

EXPOSE 6300

CMD [ "npm", "start" ]