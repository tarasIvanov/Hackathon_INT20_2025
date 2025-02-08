FROM node:22 AS builder

# Create app directory
WORKDIR /usr/src/frontend

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

## Build for development / staging / production
ARG APP_ENV
RUN echo ">> Current stage: $APP_ENV"
RUN if [ "$APP_ENV" != "local" ] ; then npm run build; else echo 'Nothing to build'; fi

# STEP 2
FROM node:20-alpine3.18

# Create app directory
WORKDIR /usr/src/frontend

# to use in wait-for-it.sh
RUN apk add --no-cache curl

# Copy source from builder
COPY --from=builder /usr/src/frontend .

## THE LIFE SAVER
# RUN chmod +x ./wait-for-it.sh

EXPOSE 3000

# CMD ["./wait-for-it.sh", "api:4000/healthz", "npm", "run", "prod"] // Можна налаштувати, щоб чекало поки апі підніметься 
CMD ["npm", "run", "prod"]