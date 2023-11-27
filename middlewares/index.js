const validateAuth = require('./validateAuth');
const validateRequest = require('./validateRequest');

module.exports = {
	...validateAuth,
	...validateRequest,
};
