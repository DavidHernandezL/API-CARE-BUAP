require('dotenv').config();
const { Server } = require('./models');
const { Server: Socket } = require('socket.io');
const http = require('http');

const server = new Server();

server.app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
