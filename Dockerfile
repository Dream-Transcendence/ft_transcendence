FROM node:18

WORKDIR /packages/server

COPY package*.json ./

RUN yarn global add @nestjs/cli
COPY . /
RUN yarn
EXPOSE 3000

CMD [ "yarn", "start:dev" ]