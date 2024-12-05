FROM node:20-alpine

RUN npm install -g pnpm

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]