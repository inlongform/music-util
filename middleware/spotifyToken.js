
module.exports = (spotifyApi) => {
  const module = {};
  let tokenData = {};

  module.getTokenData = () => tokenData;

  module.getSpotifyApi = () => spotifyApi;

  // use this when we are not using as middleware
  module.checkToken = async () => {
    if (
      Object.keys(tokenData).length !== 0
      || Date.now() < tokenData.expireTime - 300
    ) { return true; }
    try {
      const token = await spotifyApi.clientCredentialsGrant();

      // console.log(token);

      const { access_token, expires_in } = token.body;
      spotifyApi.setAccessToken(access_token);
      const expireTime = new Date().getTime() + expires_in;

      tokenData = {
        expireTime,
        expires_in,
        access_token,
      };

      return true;
    } catch (e) {
      return false;
    }
  };


  return module;
};
