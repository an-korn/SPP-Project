module.exports = (sequelize, type) => {
  const User = sequelize.define('user', {
	id : {
	  type: type.INTEGER,
	  primaryKey: true,
	  autoIncrement: true
	},
	email: {
	  type: type.STRING,
      allowNull: false
	},
	access_token: type.STRING,
	refresh_token: type.STRING
  })

  User.add = function(email, access_token, refresh_token) {
  	console.log("Here", typeof email, typeof access_token, typeof refresh_token);
  	User.findOrCreate(
  	  { 
  	  	where: {email: email},
  	    defaults: {access_token: access_token, refresh_token: refresh_token}
  	  }
  	)
	  .then(user => console.log(user))
	  .catch(err => console.log("ERROR ADDING USER"));
  }

  return User;
}