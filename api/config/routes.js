module.exports = function (app) {
  app.get(`${process.env.API_URL}/authentication`, require('../controllers/authentication').get);
  app.get(`${process.env.API_URL}/authentication/callback`, require('../controllers/authentication').callback);
  app.get(`${process.env.API_URL}/user`, require('../controllers/user').getById);
  app.get(`${process.env.API_URL}/project`, require('../controllers/project').get);
  app.get(`${process.env.API_URL}/project/:id`, require('../controllers/project').getById);
  app.post(`${process.env.API_URL}/project`, require('../controllers/project').add);
  app.delete(`${process.env.API_URL}/project/:id`, require('../controllers/project').delete);
  app.put(`${process.env.API_URL}/project/:id`, require('../controllers/project').put);
  app.get(`${process.env.API_URL}/story`, require('../controllers/story').get);
  app.post(`${process.env.API_URL}/story`, require('../controllers/story').add);
  app.delete(`${process.env.API_URL}/story/:id`, require('../controllers/story').delete);
  app.put(`${process.env.API_URL}/story/:id`, require('../controllers/story').put);
};