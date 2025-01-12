FROM node:19.0.0-alpine3.16 as builder

# Skip Puppeteer's Chromium download since we'll use Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app

# Install dependencies including Chrome and its dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Tell Puppeteer to use the installed Chrome instead of downloading Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install all dependencies (including dev dependencies)
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client and build Next.js app
RUN npx prisma generate
RUN npm run build

# Verify .next directory exists
RUN ls -la .next || exit 1

# Runner stage
FROM node:19.0.0-alpine3.16 as runner

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application from builder stage
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Install production dependencies and Chrome
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

RUN npm ci --only=production
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]

# FROM node:19.0.0-alpine3.16 as builder

# # added
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true


# WORKDIR /app

# RUN apk add --no-cache python3 make g++

# # Install all dependencies (including dev dependencies)
# COPY package*.json ./
# COPY prisma ./prisma/
# RUN npm install

# # Copy source code
# COPY . .

# # Generate Prisma client and build Next.js app
# RUN npx prisma generate
# RUN npm run build  # This creates the .next directory

# RUN ls -la .next || exit 1

# # Runner stage
# FROM node:19.0.0-alpine3.16 as runner

# # added
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true


# WORKDIR /app

# # Set production environment
# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# # Copy built application from builder stage
# COPY --from=builder /app/next.config.mjs ./
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/prisma ./prisma/
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next

# # Install only production dependencies
# RUN apk add --no-cache python3 make g++
# RUN npm ci --only=production
# RUN npx prisma generate


# EXPOSE 3000

# CMD ["npm", "start"]
