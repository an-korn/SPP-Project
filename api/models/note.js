module.exports = (sequelize, type) => (
  sequelize.define('note', {
	id : {
	  type: type.INTEGER,
	  primaryKey: true,
	  autoIncrement: true
	},
	text: {
	  type: type.TEXT,
	  allowNull: false
	}
  })
);