const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const { createConnectionDB } = require('../config');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server: Socket } = require('socket.io');

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      journals: '/api/journals',
      chats: '/api/chats',
      exercises: '/api/exercises',
      professionals: '/api/professionals',
      bot: '/api/bot',
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      })
    );

    this.app.use(express.json());

    this.app.use(morgan('dev'));

    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(cookies());

    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.users, require('../routes/user.routes'));
    this.app.use(this.paths.journals, require('../routes/journal.routes'));
    this.app.use(this.paths.chats, require('../routes/chat.routes'));
    this.app.use(this.paths.exercises, require('../routes/exercise.routes'));
    this.app.use(this.paths.professionals, require('../routes/professional.routes'));
    this.app.use(this.paths.bot, require('../routes/bot.routes'));
  }

  dbConnection() {
    createConnectionDB();
  }
}

module.exports = Server;
