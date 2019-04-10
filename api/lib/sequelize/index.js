const Sequelize = require('sequelize');
const conf = require('../../config/db');
const UserModel = require('../../models/user');
const ProjectModel = require('../../models/project');
const StoryModel = require('../../models/story')

const sequelize = new Sequelize(conf.database, conf.user, conf.password, {
  host: "127.0.0.1",
  dialect: conf.dialect,
  operatorsAliases: false,
  port: "3306",
  pool: {
	max: conf.pool.max
  }
});

const User = UserModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const Story = StoryModel(sequelize, Sequelize);

User.hasMany(Project);

Project.hasMany(Story);
Project.belongsTo(User);

Story.belongsTo(Project);


sequelize.sync()
  .then(() => {
	console.log(`Database & tables created!`)
});

module.exports = {
  User,
  Project,
  Story
};