FROM node:10.12.0-alpine

WORKDIR /app

COPY package.json /app
RUN yarn install --no-lockfile

COPY ./ /app
RUN yarn build

CMD ["node", "./build/index.js"]
EXPOSE 5000
