FROM node:lts-iron

EXPOSE 3000

WORKDIR /api

COPY . /api

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start:prod" ]