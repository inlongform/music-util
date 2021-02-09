module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  sessionKey: process.env.SESSION_KEY,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY,
  },
  lastFM: {
    apiKey: process.env.LASTFM_API_KEY,
  },
  songKick: {
    apiKey: process.env.SONGKICK_API_KEY,
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
  twitter: {
    twitterApiKey: process.env.TWITTER_API_KEY,
    twitterSecretKey: process.env.TWITTER_SECRET_KEY,
    twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN,
    twitterTokenSecret: process.env.TWITTER_TOKEN_SECRET,
  },
  admin: {
    userName: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
};
