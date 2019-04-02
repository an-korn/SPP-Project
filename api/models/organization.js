module.exports = (sequelize, type) => (
  sequelize.define('organization', {
	id : {
	  type: type.INTEGER,
	  primaryKey: true,
	  autoIncrement: true
	},
	name: {
	  type: type.STRING,
	  allowNull: false
	},
	domain: {
	  type: type.STRING,
	  allowNull: false
	}
  })
);