FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production --verbose && \
    npm cache clean --force && \
    ls -la node_modules/ | head -20

COPY . .

RUN chown -R node:node /app && \
    ls -la /app/ | head -20

EXPOSE 3002

ENV NODE_ENV=production
ENV PORT=3002

USER node

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]

