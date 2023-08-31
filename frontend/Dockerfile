FROM node:16.14-alpine

WORKDIR /app-frontend

EXPOSE 3070

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]