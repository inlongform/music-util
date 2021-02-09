const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaylistItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  imageUrl: String,
  songTitle: String,
  albumTitle: String,
  videoId: String,
  spotify: {
    albumId: String,
    url: String,
    artist: [
      {
        name: String,
        spotifyId: String,
      },
    ],
  },
  itunes: {
    artistId: String,
    collectionId: String,
    collectionViewUrl: String,
  },
  artistId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'artist',
    },
  ],
});

const PlaylistItem = mongoose.model('playlistItem', PlaylistItemSchema);


module.exports = PlaylistItem;
