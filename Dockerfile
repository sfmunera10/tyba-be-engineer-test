FROM node:lts-alpine

ADD . /app

WORKDIR /app

RUN npm install && \
    npm run clean && npm run build

# RUN MIGRATIONS

EXPOSE 8080

CMD ["node", "./dist/main.js"]