FROM node:latest
WORKDIR /usr/src/app
COPY * ./
RUN yarn install
EXPOSE 4242
CMD ["node", "index.js"]