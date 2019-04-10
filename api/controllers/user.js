const {User} = require('../lib/sequelize');

exports.getById = function(req, resp) {
  const {token} = req.query;
  User.findByToken(token)
    .then(data => {
      resp.status(200).send(data.dataValues)
    .catch(err => resp.send(400, {error: {message: "There is no such User"}}))
  })
};
