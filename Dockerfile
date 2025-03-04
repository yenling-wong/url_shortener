FROM node:18 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies, including devDependencies
RUN npm install

# Copy all source files
COPY . .

# Run the build script
RUN npm run build

# Check if dist directory is created
RUN ls -la dist

FROM node:18-alpine AS production

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production
RUN npm install nanoid

# Copy built files from the build stage
COPY --from=build /app/dist ./dist

# Start the application
CMD ["node", "dist/index.js"]