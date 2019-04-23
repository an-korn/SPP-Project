module.exports = function (io) {
  io.on('get_user', (data) => require('../controllers/user').getById(io, data, 'get_user'));
  io.on('get_projects', (data) => require('../controllers/project').get(io, data, 'get_projects'));
  io.on('get_project', (data) => require('../controllers/project').getById(io, data, 'get_project'));
  io.on('add_project', (data) => require('../controllers/project').add(io, data, 'add_project'));
  io.on('delete_project', (data) => require('../controllers/project').delete(io, data, 'delete_project'));
  io.on('update_project', (data) => require('../controllers/project').put(io, data, 'update_project'));
  io.on('get_stories', (data) => require('../controllers/story').get(io, data, 'get_stories'));
  io.on('add_story', (data) => require('../controllers/story').add(io, data, 'add_story'));
  io.on('delete_story', (data) => require('../controllers/story').delete(io, data, 'delete_story'));
  io.on('update_story', (data) => require('../controllers/story').put(io, data, 'update_story'));
};