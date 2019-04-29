const {Story, Project} = require('../lib/sequelize');

exports.get = async (data, {projectId}) => {
  try {
    const project = await Project.findByPk(parseInt(projectId))
    if(!project) return {errors: "There is no such Project"};

    const stories = await project.getStories();
    const result = stories.map(story => story.dataValues);

    return result;
  } catch(err) {
    throw err;
  }
};

exports.add = async ({description, stage, projectId}, context) => {
  try {
    const project = await Project.findByPk(parseInt(projectId));
    if(!project) throw "There is no such Project";

    const story = await Story.create({description: description, stage: stage});
    const result = await story.setProject(project);
    const stories = await project.getStories();

    return {
      id: project.id,
      name: project.name,
      stories
    };
  } catch(err) {
    throw err;
  }
};

exports.delete = async ({id}, context) => {
  try{
    const story = await Story.findByPk(parseInt(id));
    if(!story) throw "There is no such Story";


    const result = await story.destroy();
    const project = await result.getProject();
    const stories = await project.getStories();

    return {
      id: project.id,
      name: project.name,
      stories
    };
  } catch(err) {
    throw err;
  }
};

exports.put = async ({id, description, stage}, context) => {
  try{
    const story = await Story.findByPk(parseInt(id));
    if(!story) throw "There is no such Story";

    const result = await story.update({description: description, stage: stage});
    const project = await result.getProject();
    const stories = await project.getStories();

    return {
      id: project.id,
      name: project.name,
      stories
    };
  } catch(err) {
    throw err;
  }
};
