const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const ArtistSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  website: String,
  genre: Array,
  providers: {
    amazon: String,
    spotify: String,
    lastfm: String,
    musicbrainz: String,
    twitter: String,
    facebook: String,
    itunes: String,
    youtube: String,
    instagram: String,
    google: String,
  },
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;
