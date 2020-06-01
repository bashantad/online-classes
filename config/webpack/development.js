process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.API_HOST = 'http://localhost:3000/api';
process.env.API_WS_ROOT = 'ws://localhost:3000/cable';

const environment = require('./environment')

module.exports = environment.toWebpackConfig()
