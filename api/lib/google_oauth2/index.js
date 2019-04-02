import { google } from 'googleapis';

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.GOOGLE_REDIRECT_URL,
};

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

module.exports = {
  urlGoogle: function() {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
  },

  getGoogleAccountFromCode: async function(code) {
    const auth = createConnection();
    const data = await auth.getToken(code);
    auth.setCredentials(data.tokens);
    return {
      tokens: data.tokens
    };
  },

  getClient: function(tokens) {
    const auth = createConnection();
    auth.setCredentials(tokens);
    const client = google.oauth2({
      auth: auth,
      version: 'v2'
    });
    return client;
  }
};

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}
