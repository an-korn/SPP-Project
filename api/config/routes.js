const graphqlHTTP = require('express-graphql');
const schema = require('../graphql/schema');

var root = {
  getUser: (obj, context) => require('../controllers/user').getById(obj, context),
  getProject: (obj, context) => require('../controllers/project').getById(obj, context),
  createProject: (obj, context) => require('../controllers/project').add(obj, context),
  updateProject: (obj, context) => require('../controllers/project').put(obj, context),
  deleteProject: (obj, context) => require('../controllers/project').delete(obj, context),
  createStory: (obj, context) => require('../controllers/story').add(obj, context),
  updateStory: (obj, context) => require('../controllers/story').put(obj, context),
  deleteStory: (obj, context) => require('../controllers/story').delete(obj, context)
};

module.exports = function (app) {
  app.get(`${process.env.API_URL}/authentication`, require('../controllers/authentication').get);
  app.get(`${process.env.API_URL}/authentication/callback`, require('../controllers/authentication').callback);

  app.post('/graphql', graphqlHTTP(req => ({
  	schema: schema,
  	rootValue: root,
  	context: { startTime: Date.now() },
    graphiql: true
  })));
};