FROM node:21.7.1-alpine3.18

EXPOSE 3000

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . ./

CMD ["npm", "start"]
