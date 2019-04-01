FROM node:11.3-alpine
RUN mkdir /app
WORKDIR /app

ENV NODE_ENV=development
