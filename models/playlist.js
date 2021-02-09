const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const PlaylistSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  service: {
    type: String,
    required: true,
    default: 'spotify',
  },
  playlistId: {
    type: String,
  },
  genre: {
    type: String,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'playlistItem',
    },
  ],
});

const Playlist = mongoose.model('playlist', PlaylistSchema);

module.exports = Playlist;
