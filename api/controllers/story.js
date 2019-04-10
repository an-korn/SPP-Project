const {Story, Project} = require('../lib/sequelize');

exports.get = function(req, resp) {
  const {project} = req.query;
  Project.findByPk(parseInt(project))
    .then(project => {
      project.getStories()
        .then(stories => {
          const response = stories.map(story => story.dataValues)
          resp.status(200).send(response)
        })
    })
    .catch(err => resp.send(400, {errors: "There is no such Project"}))
};

exports.add = function(req, resp) {
  const {story, project} = req.body;
  Story.create({description: story.description, stage: story.stage})
    .then(story => {
      Project.findByPk(parseInt(project))
        .then(project => {
          story.setProject(project).then(_ => resp.status(200).send(story));
        })
        .catch(err => resp.send(400, {errors: "There is no such Project"}))
    })
};

exports.delete = function(req, resp) {
  Story.findByPk(parseInt(req.params.id))
    .then(story => {
      if (!story) resp.status(404).send({errors: "No such Story"});
      story.destroy().then(_ =>  resp.send(200, story));
    })
};

exports.put = function(req, resp) {
  const {description, stage} = req.body;
  console.log(req.params.id);
  Story.findByPk(parseInt(req.params.id))
    .then(story => {
      if (!story) resp.status(404).send({errors: "No such Story"});
      story.update({description: description, stage: stage}).then(_ =>  resp.send(200, story));
    })
};
