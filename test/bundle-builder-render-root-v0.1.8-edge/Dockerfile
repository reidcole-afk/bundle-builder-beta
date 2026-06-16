FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src
COPY public ./public

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8788

EXPOSE 8788

CMD ["npm", "start"]
