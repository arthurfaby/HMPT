FROM node:21.7.1-alpine3.18

WORKDIR /app

COPY . .

RUN npm install -g nodemon node-ts

RUN npm install

CMD [ "npm", "run", "dev"]
