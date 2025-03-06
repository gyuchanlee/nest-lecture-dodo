FROM node:22.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
# ci를 하면 배포할때 더 빠르다고함

COPY . ./

# 중요: Cloud Run에서 사용할 포트 노출
EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]