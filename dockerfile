
FROM node:16-alpine as builder

COPY frontend/package.json frontend/package-lock.json ./

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY /frontend .

RUN npm run build:prod

FROM node:16-alpine

WORKDIR /app

COPY /api/ /app/

RUN npm ci

COPY --from=builder /app/dist /app/public

EXPOSE 3000

CMD ["node",  "server.js"]
