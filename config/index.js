const DBconfig = require('./database');
const EmailConfig = require('./email');

module.exports = {
  ...DBconfig,
  ...EmailConfig,
};
