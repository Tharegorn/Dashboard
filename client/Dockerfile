FROM node:17.1.0 as build
WORKDIR /app
COPY package.json /app/package.json
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn install && yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]