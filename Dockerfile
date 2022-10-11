FROM node:18

# WORKDIR /packages/server
WORKDIR /app/packages/server

COPY package*.json ./
RUN npm install -g @nestjs/cli
COPY . /app
RUN npm install

CMD [ "npm", "run", "start:dev" ]