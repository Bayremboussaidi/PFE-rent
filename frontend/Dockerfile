# Stage 1: Build Angular App
FROM node:20-alpine AS build 

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package files and install dependencies
# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm config set fetch-timeout=600000 \
    && npm config set fetch-retries=5 \
    && npm config set fetch-retry-mintimeout=20000 \
    && npm config set fetch-retry-maxtimeout=120000 \
    && npm install --legacy-peer-deps --force

# Copy source files
COPY . .

# Build Angular app
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:1.25.3-alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]