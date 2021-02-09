const { getData } = require('../utils');
const { ITUNES_SEARCH_ALBUM, YOUTUBE_TRACK } = require('../utils/constants');
const { PlaylistItem } = require('../models');

const getPlaylistItem = async (data) => {
  const plistItem = data;

  try {
    const foundItem = await PlaylistItem.findOne({
      songTitle: plistItem.songTitle,
    });

    if (foundItem) return { playlistItem: foundItem, isSaved: true };

    console.log(`songtitle = ${plistItem.songTitle}, albumTitle = ${plistItem.albumTitle}`);
    console.log('---------------------------------');

    // itunes/////////////////////

    const itunesInfo = await getData(
      `${ITUNES_SEARCH_ALBUM}${encodeURIComponent(plistItem.albumTitle)}`,
    );

    if (itunesInfo.error) console.log('ITUNES ERROR');

    const itunesAlbums = itunesInfo.results;
    // dont get the itunes data when there is a 403 error or there are no results
    if (!itunesInfo.error && itunesInfo.results && itunesInfo.results.length > 0) {
      let matchedAlbum = {};
      let matched = false;
      // match the artist to get the right album
      for (let i = 0; i < itunesAlbums.length; i += 1) {
        const { artist } = plistItem.spotify;
        for (let y = 0; y < artist.length; y += 1) {
          const nName = artist[y].name;
          if (itunesAlbums[i].artistName.toLowerCase().indexOf(nName) !== -1) {
            const { artistId, collectionId, collectionViewUrl } = itunesAlbums[i];
            matchedAlbum = { artistId, collectionId, collectionViewUrl };
            matched = true;
            break;
          }
        }
        // stop loop when found
        if (matched === true) break;
      }

      plistItem.itunes = matchedAlbum;
    }


    // youtube//////////////////////////////////

    // const { songTitle, spotify } = plistItem;
    // const { artist } = spotify;
    // const artistName = artist[0].name;
    // const details = encodeURIComponent(`${artistName}+${songTitle}+official`);
    // const youtubeData = await getData(`${YOUTUBE_TRACK}${details}`);

    // if (youtubeData.error) return console.log("youtube error");

    // plistItem.videoId = youtubeData.items[0].id.videoId;

    // save//////////////////////////

    const nPlistItem = new PlaylistItem(plistItem);

    return { playlistItem: nPlistItem, isSaved: false };
  } catch (e) {
    return console.log(e);
  }
};

module.exports = getPlaylistItem;
