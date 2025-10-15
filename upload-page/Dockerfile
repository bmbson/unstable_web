FROM node:latest

WORKDIR /app

COPY ./app /app

WORKDIR /app/upload-page/

RUN chown -R node:node /app/upload-page
RUN chown -R node:node /app

RUN npm i @next/swc-linux-x64-musl
RUN npm i @next/swc-linux-x64-gnu

RUN npm install 

CMD ["npm", "run", "dev"]
