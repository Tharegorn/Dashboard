FROM node:latest
WORKDIR /usr/src/app
COPY * ./
COPY ./queries/ ./queries/
RUN yarn install; ls
EXPOSE 4242
CMD ["node", "index.js"]