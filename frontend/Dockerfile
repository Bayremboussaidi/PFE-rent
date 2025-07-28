# Stage 1: Build Angular App
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Install Angular CLI globally (specify version if needed)
RUN npm install -g @angular/cli

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --force

# Copy source files
COPY . .

# Build Angular app
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:1.25.3-alpine

# Copy the built Angular app to Nginx's public directory
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
