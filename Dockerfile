FROM node:16

# add 32-bit support
RUN dpkg --add-architecture i386
RUN apt-get update && apt-get install --yes libc6:i386 libncurses5:i386 libstdc++6:i386

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "server/server.js" ]

# To build the image:
# $ docker build . -t paolini/zork
# $ docker tag paolini/zork paolini/zork:latest
 
# To push the image:
# $ docker push paolini/zork
