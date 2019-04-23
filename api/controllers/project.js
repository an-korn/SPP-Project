const {Project, User} = require('../lib/sequelize');

exports.get = function(io, data, action) {
  const {user} = data;
  User.findByPk(parseInt(user))
    .then(user => {
      user.getProjects()
        .then(projects => {
          io.emit(action, projects)
        });
    })
    .catch(err => io.emit(action, {errors: "There is no such User"}))
};

exports.getById = function(io, data, action) {
  const {id} = data
  Project.findByPk(parseInt(id))
    .then(project => io.emit(action, project))
    .catch(err => io.emit(action, {errors: "There is no such Project"}))
};

exports.add = function(io, data, action) {
  const {project, user} = data;
  Project.create({name: project})
    .then(project => {
      User.findByPk(parseInt(user))
        .then(user => {
          project.setUser(user).then(_ => io.emit(action, project));
        })
        .catch(err => io.emit(action, {errors: "There is no such User"}))
    })
};

exports.delete = function(io, data, action) {
  Project.findByPk(parseInt(data.id))
    .then(project => {
      if (!project) io.emit(action, {errors: "No such Project"});
      project.destroy().then(_ =>  io.emit(action, project));
    })
};

exports.put = function(io, data, action) {
  const {name,id} = data;
  Project.findByPk(parseInt(id))
    .then(project => {
      if (!project) io.emit(action, {errors: "No such Project"});
      project.update({name: name}).then(_ =>  io.emit(action, project));
    })
};
