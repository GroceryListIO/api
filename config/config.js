const config = {};

config.port = process.env.PORT || '8080';
config.mode = process.env.ENV || 'Development';
config.db = process.env.DB || 'mongodb://localhost:27017/sgl';
config.jwtsecret = process.JWTSECRET || '';
config.jwtaudience = process.JWTAUDIENCE || '';

module.exports = config;
