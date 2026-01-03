FROM node:latest

COPY ./src /src

#RUN chown -R node:node /app

WORKDIR /src

RUN npm install -g
RUN npm install

RUN npm install --dev @types/react

#CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "dev"]
