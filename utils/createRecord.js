const createRecord = (artist, relatedResponse) => {
  const { id } = relatedResponse;
  const info = {
    // searchName: artist.toLowerCase(),
    name: artist,
    modified: new Date(),
    providers: {
      musicbrainz: id,
    },
  };
  const { providers } = info;
  relatedResponse.relations.forEach((i) => {
    const { type } = i;
    const { resource } = i.url;
    const strtIndex = resource.lastIndexOf('/') + 1;
    const nId = resource.substring(strtIndex);
    if (type === 'last.fm') providers.lastfm = nId;
    if (type === 'social network') {
      if (resource.indexOf('twitter') !== -1) providers.twitter = nId;
      if (resource.indexOf('facebook') !== -1) providers.facebook = nId;
      if (resource.indexOf('instagram') !== -1) providers.instagram = resource;
    }
    if (type === 'streaming music') {
      if (resource.indexOf('spotify') !== -1) providers.spotify = nId;
    }
    if (type === 'youtube') providers.youtube = resource;
    if (type === 'official homepage') info.website = resource;
    if (type === 'purchase for download') {
      if (resource.indexOf('itunes') !== -1) { providers.itunes = nId.indexOf('id') !== -1 ? nId.substring(2) : nId; }
      if (resource.indexOf('play.google') !== -1) {
        const idIndx = resource.indexOf('=') + 1;
        providers.google = resource.substring(idIndx);
      }
    }
  });

  return info;
};

module.exports = createRecord;
