/* eslint-disable arrow-body-style */
const matchArtistId = (plistItem, dbArtists) => {
  const { playlistItem } = plistItem;

  const matched = playlistItem.spotify.artist.map((i) => {
    return dbArtists.filter(x => i.name === x.name)[0];
  });


  playlistItem.artistId = matched.map(i => i.id);
  return plistItem;
};

module.exports = matchArtistId;
