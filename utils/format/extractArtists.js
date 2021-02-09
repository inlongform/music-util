const extractArtists = (data) => {
  // console.log(data);
  const artists = data.map(i => i.spotify.artist);

  const artistsFlat = [].concat(...artists);

  const filteredArr = artistsFlat.reduce((acc, current) => {
    const x = acc.find(item => item.spotifyId === current.spotifyId);
    if (!x) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  return filteredArr;
};

module.exports = extractArtists;
