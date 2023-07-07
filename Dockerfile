FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm install --production

CMD npx prisma migrate deploy && npm run db:seed && npm run start:prod
