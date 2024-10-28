FROM node:lts

WORKDIR /build

ADD ./src ./src
ADD ./public ./public
ADD ./astro.config.mjs .
ADD ./package.json .
ADD ./package-lock.json .
ADD ./tsconfig.json .
ADD ./.env .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD node ./dist/server/entry.mjs