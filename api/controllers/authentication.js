const oauth = require('../lib/google_oauth2');
const {User} = require('../lib/sequelize');

exports.get = function (req, resp) {
  const urlGoogle = oauth.urlGoogle();
  resp.redirect(urlGoogle);
};

exports.callback = function (req, resp) {
  const code = req.query.code;
  oauth.getGoogleAccountFromCode(code).then(data => {
  	oauth.getClient(data.tokens).userinfo.get(
  	  function(err, res) {
  	  	const email = res.data.email;
  	  	const access_token = data.tokens.access_token;
  	  	const refresh_token = data.tokens.refresh_token;
  	  	User.add(email, access_token, refresh_token)
  	  	  .then(_ => resp.send(200, {message: "ok"}))
  	  }
  	);
    resp.redirect(`${process.env.FRONTEND_APP_URL}/authentication?token=${data.tokens.access_token}`)
  });
};