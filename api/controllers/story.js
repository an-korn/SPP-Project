const {Story, Project} = require('../lib/sequelize');

exports.get = function(io, data, action) {
  const {project} = data;
  Project.findByPk(parseInt(project))
    .then(project => {
      project.getStories()
        .then(stories => {
          const response = stories.map(story => story.dataValues)
          io.emit(action, response)
        })
    })
    .catch(err => io.emit(action, {errors: "There is no such Project"}))
};

exports.add = function(io, data, action) {
  const {story, project} = data;
  Story.create({description: story.description, stage: story.stage})
    .then(story => {
      Project.findByPk(parseInt(project))
        .then(project => {
          story.setProject(project).then(_ => {
            io.emit(action, story)
            io.broadcast.emit(action, story)
          });
        })
        .catch(err => io.emit(action, {errors: "There is no such Project"}))
    })
};

exports.delete = function(io, data, action) {
  const {id} = data
  Story.findByPk(parseInt(id))
    .then(story => {
      if (!story) io.emit(action, {errors: "No such Story"});
      story.destroy().then(_ =>  {
        io.emit(action, story)
        io.broadcast.emit(action, story)
      });
    })
};

exports.put = function(io, data, action) {
  const {description, stage, id} = data;
  Story.findByPk(parseInt(id))
    .then(story => {
      if (!story) io.emit(action, {errors: "No such Story"});
      story.update({description: description, stage: stage}).then(_ =>  io.emit(action, story));
    })
};
