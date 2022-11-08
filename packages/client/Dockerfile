
# Before running this Dockerfile, run 'npm i' in 'packages/server'
FROM node:18

WORKDIR /app
COPY ../../package.json ../../package-lock.json /app/

RUN npm install -g @nestjs/cli

COPY package.json tsconfig.json /app/
RUN npm install

COPY . /app



CMD [ "npm", "run", "start-react" ]
