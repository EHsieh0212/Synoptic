FROM node:16-alpine

WORKDIR /app/server

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install 

RUN npm install bcrypt

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "develop-docker"]
