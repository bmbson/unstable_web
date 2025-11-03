FROM node:latest
 
COPY ./app/ust_dig /src
 
#RUN chown -R node:node /app
  
WORKDIR /src
  
RUN npm install -g
RUN npm install 

#CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "dev"]

