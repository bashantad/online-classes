process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.API_HOST = 'http://thevcroom.com/api';
process.env.API_WS_ROOT = 'http://thevcroom.com/cable';
const environment = require('./environment')

module.exports = environment.toWebpackConfig()
