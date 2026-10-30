# --- Build: static site (Vite + prerender) and a single-file API server bundle
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG VITE_GA_MEASUREMENT_ID=""
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID
RUN npm run build
RUN npx --yes esbuild@0.25.10 server/index.ts --bundle --platform=node --target=node22 --format=esm \
      --external:pg-native --outfile=build/server.mjs \
      --banner:js="import { createRequire } from 'module'; const require = createRequire(import.meta.url);"

# --- Runtime: no node_modules needed, everything is bundled
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 DIST_DIR=/app/dist SCHEMA_FILE=/app/db/schema.sql
COPY --from=build /app/build/server.mjs ./server.mjs
COPY --from=build /app/dist ./dist
COPY db/schema.sql ./db/schema.sql
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.mjs"]
