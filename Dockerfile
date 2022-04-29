FROM node:16.14.2

WORKDIR /usr/src/clean-node-api

COPY ./package.json .

# No desenvolvimento, instalamos devDependencies, enquanto na produção, removemos adicionando --only=prod.
RUN npm install --only=prod


COPY ./dist ./dist

EXPOSE 5000

CMD npm start