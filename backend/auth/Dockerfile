FROM node:16-alpine as base

WORKDIR /src/app

COPY package*.json ./

FROM base as production
ENV NODE_ENV=production

RUN npm install
RUN npm install -g nodemon
COPY . .

EXPOSE 3000
CMD npm start