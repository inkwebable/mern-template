FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm","run","server"]
EXPOSE 5001
#docker build -f Dockerfile.dev .
