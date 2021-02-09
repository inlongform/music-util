

const { createRecord, getData } = require('../utils');
const { Artist } = require('../models');

const {
  MUSICBRAINZ_SEARCH,
  MUSICBRAINZ_RELATED_DATA,
  ITUNES_SEARCH_ARTIST,
} = require('../utils/constants');

module.exports = (spotifyToken) => {
  const module = {};
  const { checkToken } = spotifyToken;
  const spotifyApi = spotifyToken.getSpotifyApi();

  console.log('import artist');

  module.initialize = async (artist) => {
    console.log('initialize', artist);
    const { spotifyId } = artist;
    const artistName = artist.name;
    // return;
    const dbArtistData = await Artist.findOne({
      'providers.spotify': spotifyId,
    });

    if (dbArtistData) return dbArtistData;

    try {
      // get musicbrainz id
      const mbzInit = await getData(
        `${MUSICBRAINZ_SEARCH}${encodeURIComponent(artistName)}`,
      );
      const mbzBasic = await mbzInit.artists[0];

      // get musicbrainz artistData
      const mbzUrl = MUSICBRAINZ_RELATED_DATA.replace(
        '[ARTIST_ID]',
        mbzBasic.id,
      );
      const mbzData = await getData(mbzUrl);

      if (!mbzData.relations) {
        throw new Error('/MUSIC BRAINZ ERROR - STOP');
      }

      // format all musicbrainz linked data
      const info = createRecord(artistName, mbzData);

      // itunes/////////////////////////////////////////

      const { itunes } = info.providers;
      if (!itunes) {
        const itunesData = await getData(`${ITUNES_SEARCH_ARTIST}${encodeURIComponent(artistName.toLowerCase())}`);

        if (itunesData.error) console.log('/ITUNES ERROR');

        // make sure there are reults from itunes
        if (!itunesData.error && itunesData.results.length > 0) {
          const { artistId } = itunesData.results[0];
          info.providers.itunes = artistId;
          // https://music.apple.com/us/artist/bad-religion/150160?uo=4"
          // https://music.apple.com/us/artist/336944256
        }
      }

      const spotifyReady = await checkToken();

      if (spotifyReady) {
        const spotifyData = await spotifyApi.getArtist(spotifyId);

        const { id, images, genres } = spotifyData.body;
        info.genre = genres;
        info.imageUrl = (images.length > 0) ? images[0].url : '';
        info.providers.spotify = id;
      }


      const nArtist = new Artist(info);
      const saved = await nArtist.save();

      return saved;
    } catch (err) {
      console.log('catch', err);
      return console.log('error importing artist');
    }
  };

  return module;
};
