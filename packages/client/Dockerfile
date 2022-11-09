FROM node:18

WORKDIR /app
COPY ../../package*.json ./
RUN npm install

COPY ../.. /app
WORKDIR /app/packages/client
RUN npm install
# 정 빌드 안되면 yarn 쓸거임!
CMD [ "npm", "run", "start-react" ]
