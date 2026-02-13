### STAGE 1: Build ###
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

### STAGE 2: Production SSR Server ###
FROM node:24-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json* ./

RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

RUN apk add --no-cache wget

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/ || exit 1

CMD ["node", "dist/larry-motalavigne-com/server/server.mjs"]
