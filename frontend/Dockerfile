FROM node:latest AS base

RUN mkdir /ust_dig

COPY ./app/ust_dig/package*.json ./ust_dig/

WORKDIR /ust_dig

RUN npm install 

FROM base AS debug
COPY ./app/ust_dig /ust_dig
CMD ["tail", "-f", "/dev/null"]
  
FROM base AS dev
COPY ./app/ust_dig /ust_dig
CMD ["npm", "run", "dev"] 

FROM base AS prod 
COPY ./app/ust_dig /ust_dig
RUN npm run build
RUN cp -r /ust_dig/.next/static /ust_dig/.next/standalone/.next/static 
CMD ["node", "/ust_dig/.next/standalone/server.js"]
