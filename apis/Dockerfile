FROM node:latest
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/routes/
COPY ./routes/* /usr/src/app/routes/
COPY index.js /usr/src/app/
COPY Output.js /usr/src/app/
COPY package.json /usr/src/app/
RUN yarn install
EXPOSE 4244
CMD ["node", "index.js"]