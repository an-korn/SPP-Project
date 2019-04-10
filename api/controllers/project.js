const {Project, User} = require('../lib/sequelize');

exports.get = function(req, resp) {
  const {user} = req.query;
  User.findByPk(parseInt(user))
    .then(user => {
      user.getProjects()
        .then(projects => {
          resp.status(200).send(projects)
        });
    })
    .catch(err => resp.send(400, {errors: "There is no such User"}))
};

exports.getById = function(req, resp) {
  console.log('HEllo')
  Project.findByPk(parseInt(req.params.id))
    .then(project => resp.send(200, project))
    .catch(err => resp.send(404, {errors: "There is no such Project"}))
};

exports.add = function(req, resp) {
  const {project, user} = req.body;
  Project.create({name: project})
    .then(project => {
      User.findByPk(parseInt(user))
        .then(user => {
          project.setUser(user).then(_ => resp.status(200).send(project));
        })
        .catch(err => resp.send(400, {errors: "There is no such User"}))
    })
};

exports.delete = function(req, resp) {
  Project.findByPk(parseInt(req.params.id))
    .then(project => {
      if (!project) resp.status(404).send({errors: "No such Project"});
      project.destroy().then(_ =>  resp.send(200, project));
    })
};

exports.put = function(req, resp) {
  const name = req.body.project;
  Project.findByPk(parseInt(req.params.id))
    .then(project => {
      if (!project) resp.status(404).send({errors: "No such Project"});
      project.update({name: name}).then(_ =>  resp.send(200, project));
    })
};
