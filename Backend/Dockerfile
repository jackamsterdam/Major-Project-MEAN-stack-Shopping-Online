FROM node:18-alpine3.15

RUN npm i -g nodemon
RUN npm i -g ts-node 

WORKDIR /app 

COPY package*.json .

RUN npm i 

COPY . . 



