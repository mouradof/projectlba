FROM node:16-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

# Supprime les fichiers node_modules et package-lock.json
RUN rm -rf node_modules package-lock.json && npm install

COPY . .

RUN npm run build

FROM node:16-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./
COPY server.js ./
RUN npm install --production

EXPOSE 3000

CMD ["node", "server.js"]
