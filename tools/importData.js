const { playlists } = require('../utils');
const { formatSpPlaylist, extractArtists } = require('../utils/format');
const { Playlist } = require('../models');

module.exports = (spotifyToken, info) => {
  const module = {};
  const playlistId = playlists.spotify[info];
  const importPlaylist = require('./importPlaylist')();
  const importArtist = require('./importArtist')(spotifyToken);

  const TIMER_TIME = 1000;

  module.getPlaylistData = async () => {
    const { checkToken } = spotifyToken;
    const spotifyApi = spotifyToken.getSpotifyApi();

    try {
      const validToken = await checkToken();
      if (!validToken) return console.log('problem with spotify token');

      // get all the playlist info from spotify
      const spData = await spotifyApi.getPlaylistItems(playlistId);

      if (!spData) return console.log('spotify playlist error');

      const playlistItems = formatSpPlaylist(spData);
      // extract the artists included in the playlist so we can make sure they are in the db
      const extractedArtists = extractArtists(playlistItems);


      console.log('--------------------');
      console.log('artists to import');
      console.log(extractedArtists);

      console.log('--------------------------------');
      console.log('INITIAL PLAYLIST READY');
      return { playlistItems, extractedArtists };
    } catch (e) {
      throw e;
    }
  };

  module.artistImport = async (playlistData) => {
    const { playlistItems, extractedArtists } = playlistData;
    const totalItems = extractedArtists.length;
    console.log('--------------------------------');
    console.log('IMPORT ARTISTS');
    const artistsWithIds = [];
    const getArtist = async (artistData, count) => {
      // get all the artist info and insert in db return record
      const dbArtist = await importArtist.initialize(artistData);
      artistsWithIds.push(dbArtist);

      console.log(`artist imported name=${dbArtist.name} id=${dbArtist._id}`);
      console.log('-------------------------');
      count += 1;

      let timer = {};

      if (count < totalItems) {
        timer = setTimeout(getArtist(extractedArtists[count], count), TIMER_TIME);
      } else {
        // done get the artist name and record id so we can associate it with the plistitem
        clearTimeout(timer);
        const dbArtists = artistsWithIds.map(i => ({
          id: i._id,
          name: i.name,
        }));
        console.log('--------------------------------');
        console.log('ARTIST IMPORT COMPLETE');
        // done inserting arists into db
        // import the playlist items
        module.playlistImport(playlistItems, dbArtists);
      }
    };

    getArtist(extractedArtists[0], 0);

  };

  module.playlistImport = async (playlistItems, dbArtists) => {
    // new playlist base object

    console.log('IMPORT PLAYLIST /////////////////////////////');

    try {
      // check if there is  a playlist for that genre yet
      let dbPlaylist = await Playlist.findOne({ playlistId });

      // if there is no playlist create one
      if (!dbPlaylist) {
        dbPlaylist = new Playlist({
          service: 'spotify',
          playlistId,
          genre: info,
        });
      }

      await importPlaylist.getPlaylist(dbPlaylist, playlistItems, dbArtists);
    } catch (e) {
      return console.log('error getting initial playlist');
    }
  };

  module.importItems = async () => {
    const playlistData = await module.getPlaylistData();
    await module.artistImport(playlistData);
  };

  return module;
};
