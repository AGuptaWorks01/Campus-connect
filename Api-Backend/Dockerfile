# Use Nodejs Base Image
FROM node:22

# Set Working directory inside container
WORKDIR /app

# Copy Packages files and install dependencies
COPY package*.json ./
RUN npm install 

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3100

# Start app 
CMD ["node", "server.js"]

