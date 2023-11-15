const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const { createConnectionDB } = require('../config');
const fs = require('fs');
const path = require('path');
const https = require('https');

class Server {
  constructor() {
    const options = {
      key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem')),
    };
    this.app = express();

    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      journals: '/api/journals',
      chats: '/api/chats',
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
    this.apps = https.createServer(options, this.app);
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
  }

  dbConnection() {
    createConnectionDB();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
