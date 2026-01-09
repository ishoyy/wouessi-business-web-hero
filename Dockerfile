FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# build-time args passed by Coolify; expose them to the build environment
ARG DOMAIN
ARG CADDY_EMAIL
ARG NEXT_PUBLIC_SITE_URL
ENV DOMAIN=${DOMAIN}
ENV CADDY_EMAIL=${CADDY_EMAIL}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/data ./data
EXPOSE 3000
CMD ["node","server.js"]
