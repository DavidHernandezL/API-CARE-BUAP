const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createConnectionDB } = require('../config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(morgan('dev'));

    this.app.use(express.static('public'));
  }

  routes() {}

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
