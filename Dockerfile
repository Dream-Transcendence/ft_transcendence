
# Before running this Dockerfile, run 'npm i' in 'packages/server'
FROM node:18

WORKDIR /app/packages/server

# COPY package*.json ./
# RUN npm install -g @nestjs/cli
# COPY . /app
# RUN npm install

CMD [ "npm", "run", "start:dev" ]
