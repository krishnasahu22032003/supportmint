FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG SCALEKIT_ENVIRONMENT_URL
ARG SCALEKIT_CLIENT_ID
ARG SCALEKIT_CLIENT_SECRET
ARG MONGO_URL
ARG GEMINI_API_KEY
ARG NODE_ENV

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV SCALEKIT_ENVIRONMENT_URL=$SCALEKIT_ENVIRONMENT_URL
ENV SCALEKIT_CLIENT_ID=$SCALEKIT_CLIENT_ID
ENV SCALEKIT_CLIENT_SECRET=$SCALEKIT_CLIENT_SECRET
ENV MONGO_URL=$MONGO_URL
ENV GEMINI_API_KEY=$GEMINI_API_KEY
ENV NODE_ENV=$NODE_ENV

RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
