FROM node:latest

COPY ./app /app

RUN chown -R node:node /app

WORKDIR /app/upload-page

RUN npm install -g

#CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "dev"]
