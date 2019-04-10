module.exports = (sequelize, type) => (
  sequelize.define('story', {
	id : {
	  type: type.INTEGER,
	  primaryKey: true,
	  autoIncrement: true
	},
	description: {
	  type: type.TEXT,
	  allowNull: false
	},
	stage: {
	  type: type.ENUM('new', 'in progress', 'testing', 'delivered'),
	  defaultValue: 'new',
	  allowNull: false
	}
  })
);