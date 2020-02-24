FROM node:13-slim

COPY . .

EXPOSE 7777

RUN ["npm", "install"]

CMD ["npm", "run", "start"]
