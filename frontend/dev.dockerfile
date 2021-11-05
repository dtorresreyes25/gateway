
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN npm install -g @angular/cli

COPY . /app/

EXPOSE 4200 49153

CMD [ "npm", "run", "start" ]
