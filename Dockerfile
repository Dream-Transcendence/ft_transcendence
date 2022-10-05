# 명령어 매개변수
#  컨테이너의 기반 이미지 설정
#  FROM 이미지:태그
#  local에 존재한다면, local 아니라면 Docker Hub에서 가져온다.
FROM node:18

# MAINTAINER 이미지 생성자 정보(이름, 이메일 등)
# ENV 환경변수 값
#  환경 변수를 설정하는 커맨드
# ADD '복사할 파일 경로(현재 디렉토리 상위 경로 접근 불가)' '이미지 내에 위치할 경로'
# COPY '복사할 파일 경로' '이미지 내에 위치할 경로'
#  ADD와 COPY의 차이점은 COPY는 압축을 해제하지 않고 URL을 사용할 수 없다.

# WORKDIR 경로
#  WORKDIR 뒤에 오는 명령(RUN, CMD, ENTRYPOINT, COPY, ADD)에 적용된다.(워크디렉토리에서 실행)
WORKDIR /packages/server

COPY package*.json ./

# RUN 스크립트 또는 명령어
# RUN 명령어 형식은 이미지의 /bin/sh를 사용
# RUN ["실행파일", "매개변수"] 형식은 실행 파일에 매개변수를 직접 넘겨주는 방식
RUN npm install -g @nestjs/cli
COPY . /
RUN npm install
# EXPOSE 포트번호
#  HOST와 연결할 포트 번호(2개 이상 지정 가능)
# EXPOSE 3000

# CMD 스크립트 또는 명령어
#  docker run 또는 docker start로 실행할 때, 실행됨
#  Dockerfile 전체에서 한 번만 사용할 수 있다.
CMD [ "npm", "run", "start:dev" ]

# RUN yarn global add @nestjs/cli
# COPY . /
# RUN yarn

# CMD [ "yarn", "start"]
