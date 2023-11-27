const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const { createConnectionDB } = require('../config');

/**
 * Crea una instancia de la clase Server
 */
class Server {
	/**
	 * @constructor
	 * @description Crea una instancia de la clase Server
	 */
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
		};

		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	/**
	 * @method middlewares
	 * @description Configura los middlewares de la aplicación
	 */
	middlewares() {
		this.app.use(
			cors({
				origin: process.env.FRONTEND_URL,
				credentials: true,
			}),
		);

		this.app.use(express.json());

		this.app.use(morgan('dev'));

		this.app.use(express.urlencoded({ extended: false }));

		this.app.use(cookies());

		this.app.use(express.static('public'));
	}

	/**
	 * @method routes
	 * @description Configura las rutas de la aplicación
	 */
	routes() {
		this.app.use(this.paths.auth, require('../routes/auth.routes'));
		this.app.use(this.paths.users, require('../routes/user.routes'));
		this.app.use(this.paths.journals, require('../routes/journal.routes'));
		this.app.use(this.paths.chats, require('../routes/chat.routes'));
		this.app.use(this.paths.exercises, require('../routes/exercise.routes'));
		this.app.use(
			this.paths.professionals,
			require('../routes/professional.routes'),
		);
	}

	/**
	 * @method dbConnection
	 * @description Conecta la aplicación a la base de datos
	 */
	dbConnection() {
		createConnectionDB();
	}
}

module.exports = Server;
