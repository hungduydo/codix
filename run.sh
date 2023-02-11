#!/bin/bash

# Start the Node.js server
cd server
npm install
npm start &

# Start the Angular app
cd ../client
npm install
npm run build
npm start
