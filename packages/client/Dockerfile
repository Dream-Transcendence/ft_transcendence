FROM node:18

WORKDIR /app/packages/client

COPY ../../package*.json ./
COPY ../.. /app
RUN npm install
# 정 빌드 안되면 yarn 쓸거임!
CMD [ "npm", "run", "start-react" ]
