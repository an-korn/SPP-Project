const {User} = require('../lib/sequelize');

exports.getById = function(io, data, action) {
  console.log(data);
  const {token} = data;
  User.findByToken(token)
    .then(data => io.emit(action, data.dataValues))
    .catch(err => io.emit(action, {error: {message: "There is no such User"}}))
};
