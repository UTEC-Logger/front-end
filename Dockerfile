FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 9000

ENV LOGGER_PATH=/logs

CMD ["npx", "gatsby", "serve", "--port", "9000", "--host", "0.0.0.0"]
