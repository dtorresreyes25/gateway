FROM node:16-alpine

COPY package.json package-lock.json ./

RUN npm set strict-ssl false

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . /app/

EXPOSE 3000

CMD ["npm", "start"]
