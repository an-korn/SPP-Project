const Sequelize = require('sequelize');
const conf = require('../../config/db');
const UserModel = require('../../models/user');
const OrganizationModel = require('../../models/organization');
const NoteModel = require('../../models/note')

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
const Organization = OrganizationModel(sequelize, Sequelize);
const Note = NoteModel(sequelize, Sequelize);

User.hasMany(Note);
User.belongsToMany(Organization, {through: 'UserOrganization'});

Organization.hasMany(Note);
Organization.belongsToMany(User, {through: 'UserOrganization'});

Note.belongsTo(User);
Note.belongsTo(Organization);


sequelize.sync()
  .then(() => {
	console.log(`Database & tables created!`)
});

module.exports = {
  User,
  Organization,
  Note
};