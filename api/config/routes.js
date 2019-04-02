module.exports = function (app) {
  app.get(`${process.env.API_URL}/authentication`, require('../controllers/authentication').get);
  app.get(`${process.env.API_URL}/authentication/callback`, require('../controllers/authentication').callback);
  app.get(`${process.env.API_URL}/organization/:id`, require('../controllers/organization').getById);
  app.post(`${process.env.API_URL}/organization`, require('../controllers/organization').add);
  app.get(`${process.env.API_URL}/user/:id`, require('../controllers/user').getById);
  app.post(`${process.env.API_URL}/user`, require('../controllers/user').add);
  app.get(`${process.env.API_URL}/note`, require('../controllers/note').get);
  app.post(`${process.env.API_URL}/note`, require('../controllers/note').add);
  app.delete(`${process.env.API_URL}/note/:id`, require('../controllers/note').delete);
  app.put(`${process.env.API_URL}/note/:id`, require('../controllers/note').put);
};