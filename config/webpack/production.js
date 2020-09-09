process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.API_HOST = 'https://updrake.com/api';
process.env.API_WS_ROOT = 'https://updrake.com/cable';
const environment = require('./environment')

module.exports = environment.toWebpackConfig()
