#!/bin/bash
npm install
npm run build # If using TypeScript, compile TS to JS
pm2 start pm2.config.js --no-daemon
