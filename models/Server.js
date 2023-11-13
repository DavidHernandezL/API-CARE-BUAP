const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const { createConnectionDB } = require('../config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      journals: '/api/journals',
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(morgan('dev'));

    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(cookies());

    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    //TODO: Hacer test sobre los endpoint de usuarios y diarios para verificar las validaciones funcionen correctamente
    this.app.use(this.paths.users, require('../routes/user.routes'));
    this.app.use(this.paths.journals, require('../routes/journal.routes'));
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
