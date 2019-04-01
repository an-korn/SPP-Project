const oauth = require('../lib/google_oauth2');

exports.get = function (req, resp) {
  const code = req.query.code;
  oauth.getGoogleAccountFromCode(code).then(data => {
    resp.redirect(`${process.env.FRONTEND_APP_URL}/authentication?token=${data.tokens.access_token}`)
  });
};