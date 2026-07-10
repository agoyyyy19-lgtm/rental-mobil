# --- Base image ---
FROM node:20-bookworm-slim

# better-sqlite3 perlu tools untuk compile native module
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependency dulu (biar layer cache npm install efisien)
COPY package*.json ./
RUN npm install --omit=dev

# Copy semua source code
COPY . .

# Folder untuk volume database persisten (khusus Fly.io, lihat fly.toml)
RUN mkdir -p /data

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_PATH=/data/rental.db

EXPOSE 3000

CMD ["node", "server.js"]
