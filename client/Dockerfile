FROM node:alpine3.20 as build
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . .

FROM node:alpine3.20 as production
WORKDIR /app
COPY --from=build /app /app
RUN npm ci --omit=dev
EXPOSE 3000

CMD ["npm", "run", "dev"]
