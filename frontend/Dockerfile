FROM node:20 AS builder

# Create app directory
WORKDIR /usr/src/frontend

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# STEP 2
FROM node:20-alpine3.18

# Create app directory
WORKDIR /usr/src/frontend

# to use in wait-for-it.sh
RUN apk add --no-cache curl

# Copy source from builder
COPY --from=builder /usr/src/frontend .

# CMD ["./wait-for-it.sh", "api:4000/healthz", "npm", "run", "prod"] // Можна налаштувати, щоб чекало поки апі підніметься 
CMD ["npm", "run", "dev"]