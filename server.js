const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Allow port to be configurable
const PORT = process.env.PORT || 3001; // Changed default to 3001

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static('./'));

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast to all clients
function broadcast() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send('reload');
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { broadcast }; 