const {Project, User} = require('../lib/sequelize');

exports.get = async (data, context) => {
  try {
    const user = await User.findByPk(parseInt(userId));
    if (!user) return {errors: "There is no such User"};
    const projects = await user.getProjects();

    return projects;
  } catch(err) {
    throw err;
  }
}

exports.getById = async ({id}, context) => {
  try {
    const project = await Project.findByPk(parseInt(id));
    if(!project) throw "There is no such Project";

    const stories = await project.getStories();

    return {
      id: project.id,
      name: project.name,
      stories
    };
  } catch(err) {
    throw err;
  }
}

exports.add = async ({userId, name}, context) => {
  try {
    const user = await User.findByPk(parseInt(userId));
    if(!user) throw 'There is no such User';

    const project = await Project.create({name: name});
    const result = await project.setUser(user);
    const projects = await user.getProjects();

    return {
      id: user.id,
      email: user.email,
      projects
    };
  } catch(err) {
    throw err;
  }
}

exports.delete = async ({id}, context) => {
  try {
    const project = await Project.findByPk(parseInt(id));
    if(!project) return {errors: 'There is no such Project'};

    const result = await project.destroy();

    return {
      id: result.dataValues.id,
      name: result.dataValues.name,
    };
  } catch(err) {
    throw err;
  }
};

exports.put = async ({id, name}, context) => {
  try {
    const project = await Project.findByPk(parseInt(id));
    if(!project) return {errors: "No such Project"};
    const result = await project.update({name: name});
    const stories = await result.getStories();

    return {
      id: result.dataValues.id,
      name: result.dataValues.name,
      stories
    };
  } catch(err) {
    throw err;
  }
};
