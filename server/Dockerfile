FROM node:alpine AS Build

WORKDIR /app  

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build