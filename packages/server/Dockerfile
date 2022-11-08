
# Before running this Dockerfile, run 'npm i' in 'packages/server'
FROM node:18

WORKDIR /app/packages/server

#컨텍스트 위치 변경
COPY ../../package*.json ./
RUN npm install -g @nestjs/cli
COPY ../.. /app
RUN npm install

# LIFECYCLE에러가 계속 떠서 docker-compose 상에서 캐시삭제 명령으로 교체
# CMD [ "npm", "cache", "clean", "--force", "&& \", "npm", "run", "start-nest" ] 
