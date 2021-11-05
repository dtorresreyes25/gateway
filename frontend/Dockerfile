
FROM node:16-alpine as builder

COPY package.json package-lock.json ./

RUN npm set strict-ssl false

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . /app/

RUN npm run build:prod

FROM nginx:1.15.8-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
