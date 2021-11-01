
FROM node:16-alpine

WORKDIR /api

COPY package.json package-lock.json ./

RUN npm ci

RUN npm install -g nodemon

COPY . /api/

EXPOSE 3000

CMD [ "npm", "run", "dev-server" ]
