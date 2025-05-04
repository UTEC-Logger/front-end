FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g gatsby-cli && npm install

EXPOSE 3000

CMD ["sh", "-c", "gatsby build && npx serve -s public -l 3000"]
