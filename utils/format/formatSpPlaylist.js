

const formatSpPlaylist = data => data.body.items.map((i) => {
  const { track } = i;
  const { album, artists } = track;
  const {
    images, id, name, external_urls,
  } = album;

  return {
    imageUrl: images[1].url,
    albumTitle: name,
    songTitle: track.name,
    spotify: {
      albumId: id,
      url: external_urls.spotify,
      artist: artists.map(x => ({
        name: x.name.toLowerCase(),
        spotifyId: x.id,
      })),
    },
  };
});

module.exports = formatSpPlaylist;
