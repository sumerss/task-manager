FROM node:20.2.0

WORKDIR /app

# Enable dev dependency installation
ENV NODE_ENV=development

# Copy package files and install ALL dependencies (including ts-node-dev)
COPY package*.json ./
RUN npm install

# Copy your app code
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
