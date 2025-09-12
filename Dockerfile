# 1. Base image
FROM node:20

# 2. Working directory
WORKDIR /app

# 3. Copy and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy app code
COPY . .

# 5. Expose port
EXPOSE 8080

# 6. Start command
CMD ["node", "index.js"]
