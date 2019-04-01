FROM node:11.3-alpine
RUN mkdir -p /api
WORKDIR /api
COPY /api/package.json /api
COPY /api/yarn.lock /api

RUN yarn

COPY /api /api
