# apps/backend/Dockerfile
FROM node:20.2.0

WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install only dependencies (cached if no changes in package*.json)
RUN npm install

# Copy source files
COPY . .

# Expose backend port
EXPOSE 3001

# Run dev command (will be overridden by docker-compose command)
CMD ["npm", "run", "dev"]
