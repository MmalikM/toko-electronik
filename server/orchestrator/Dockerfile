FROM node:lts-hydrogen

ENV DATABASE_URL_MONGO = $(DATABASE_URL_MONGO)

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start"]