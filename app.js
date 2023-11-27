require('dotenv').config();
const { Server } = require('./models');

const server = new Server();

server.app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
