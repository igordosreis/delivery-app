FROM node:16.14-alpine

WORKDIR /app-backend

EXPOSE 3071

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]