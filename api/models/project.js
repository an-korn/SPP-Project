module.exports = (sequelize, type) => (
 sequelize.define('project', {
	id : {
	  type: type.INTEGER,
	  primaryKey: true,
	  autoIncrement: true
	},
	name: {
	  type: type.STRING,
	  allowNull: false
	}
  })
)
