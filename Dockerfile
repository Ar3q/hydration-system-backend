FROM node:12-alpine

WORKDIR /code

COPY package*.json ./

# https://github.com/nodejs/docker-node/issues/282#issue-193774074
RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++ \
  && npm ci \
  && apk del .gyp

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]