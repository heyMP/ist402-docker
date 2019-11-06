FROM node:12

WORKDIR /home/node/app

COPY package.json ./
RUN yarn install

COPY . .

CMD [ "yarn", "start" ]