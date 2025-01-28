FROM node:alpine3.20 AS build
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . .


CMD ["npm", "run", "dev"]
