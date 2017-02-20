const config = {};

config.port = process.env.PORT || '8080';
config.env = process.env.ENV || 'Development';
config.db = process.env.DB || 'mongodb://localhost:27017/sgl';
config.jwtsecret = process.JWTSECRET || 'sgltestingsecret';
config.jwtaudience = process.JWTAUDIENCE || '';

module.exports = config;
