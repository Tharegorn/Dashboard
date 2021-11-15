FROM node:latest
WORKDIR /usr/src/app
COPY * ./
COPY ./queries/ ./queries/
RUN yarn install
EXPOSE 4242
CMD ["node", "index.js"]