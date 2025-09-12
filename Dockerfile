# 1. Base image
FROM node:20

# 2. Working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy app code
COPY . .

# 5. Expose port
EXPOSE 8080

# 6. Start the app
CMD ["node", "index.js"]
