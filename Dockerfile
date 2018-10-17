FROM node:10-alpine

WORKDIR /app

COPY package.json /app
RUN yarn install --no-lockfile --silent

COPY ./ /app
RUN yarn build

CMD ["node", "./build/index.js"]
EXPOSE 5000
