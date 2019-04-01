module.exports = function (app) {
  app.get(`${process.env.API_URL}/authentication`, require('./authentication').get);
  app.get(`${process.env.API_URL}/authentication/callback`, require('./authentication_callback').get);
};