# 1. Use official Node.js image as base
FROM node:20

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. install dependencies
RUN npm install

# 5. Copy all project files
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Expose port 3000 for the container
EXPOSE 3000

# 8. Start the Next.js app
CMD ["npm", "start"]
