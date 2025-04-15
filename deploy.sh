#!/bin/bash

# Build React app
echo "Building React app..."
cd client
npm install
npm run build

# Copy build files to server
echo "Copying build files to server..."
cp -r build/* ../server/public/

# Install PM2 if not installed
echo "Installing PM2..."
npm install -g pm2

# Start/Restart server
echo "Starting server..."
cd ../server
npm install
pm2 startOrRestart ecosystem.config.js

echo "Deployment completed!" 