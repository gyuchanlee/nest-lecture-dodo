FROM node:22.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
# ci를 하면 배포할때 더 빠르다고함

COPY . ./

ENTRYPOINT ["npm", "run", "start"]

# 중요: Cloud Run에서 사용할 포트 노출
EXPOSE 8080

CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]