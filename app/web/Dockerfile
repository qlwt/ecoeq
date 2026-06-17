FROM oven/bun:1.3.11

WORKDIR /repo-web

COPY ./package.json ./
COPY ./tsconfig.json ./

COPY ./app ./app
COPY ./pckg ./pckg

RUN bun install

RUN bun run --filter "./pckg/math" build
RUN bun run --filter "./pckg/gstate" build
RUN bun run --filter "./app/web" build

EXPOSE 8080

WORKDIR /repo-web/app/web

CMD ["bun", "./build/server/entry/index_prod.js"]
