FROM node

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 8081

CMD ["yarn", "start"]