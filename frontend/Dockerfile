FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]