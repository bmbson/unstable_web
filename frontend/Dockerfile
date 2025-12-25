FROM node:latest

COPY ./app/ust_dig /ust_dig
 
WORKDIR /ust_dig
  
RUN npm install 

#CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "dev"]

