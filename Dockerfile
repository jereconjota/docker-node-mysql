FROM node:18

#create app directory in container
WORKDIR /myapp 

#copy package.json and package-lock.json to container
COPY package.json ./

#install dependencies
RUN npm install

#copy all files from current directory to container
COPY . .
CMD ["npm", "start"]