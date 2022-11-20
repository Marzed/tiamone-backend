FROM node:19.1.0-alpine3.16

COPY . /tiamone/core/
WORKDIR /tiamone/core/

RUN mkdir -p build
RUN npm install
# TODO install nodemon -g tsc npm-run-all
RUN npm run clear
RUN npm run prod:build

EXPOSE 25000

CMD "npm" "run" "prod:start"
