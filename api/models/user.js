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

  User.add = (email, access_token, refresh_token) => {
  	return new Promise((resolve, reject) => {
	  User.findOrCreate(
	  	{ 
	  	  where: {email: email},
	  	  defaults: {access_token: access_token, refresh_token: refresh_token}
	  	}
	  )
		.then(res => {
          User.update({access_token: access_token, refresh_token: refresh_token}, { where: { id: res[0].id } })
          	.then(result => resolve({ user: result}))
	    })
	})
  }

  User.findByToken = (access_token) => {
  	return new Promise((resolve, reject) => {
	  User.findOne({where: {access_token}})
	    .then(user => resolve(user))
	})
  }

  return User;
}
