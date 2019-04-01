const oauth = require('../lib/google_oauth2');

exports.get = function (req, resp) {
  const urlGoogle = oauth.urlGoogle();
  resp.redirect(urlGoogle);
};