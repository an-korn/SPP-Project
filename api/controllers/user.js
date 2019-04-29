const {User} = require('../lib/sequelize');

exports.getById = async ({token}, {startTime}) => {
  try {
    const user = await User.findByToken(token);
    if(!user) throw "There is no such User";
    const projects = await user.getProjects();

    return {
      id: user.id,
      email: user.email,
      projects
    }
  } catch(err) {
  	throw err;
  }
};
