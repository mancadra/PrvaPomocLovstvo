# syntax = docker/dockerfile:1

# Base image for Node.js
FROM node:20.11.1 as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the Angular app
COPY . .
RUN npm run build --prod

# Serve the app using NGINX
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
