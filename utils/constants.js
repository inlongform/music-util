const keys = require('../config/keys');

const PORT = parseInt(process.env.PORT, 10) || 8080;
const SERVER = process.env.SERVER || 'http://localhost:';
const BASE_URL = `${SERVER}${PORT}`;
const MODIFICATION_DATE_OFFSET = parseInt(process.env.MODIFICATION_DATE_OFFSET, 10) || 3;
const PLAYLIST_DATE_OFFSET = parseInt(process.env.PLAYLIST_DATE_OFFSET, 10) || 3;
const GENRES = [
  'TOP CHARTS',
  'Pop',
  'Hip Hop',
  'Electronic',
  'Metal',
  'Indie',
  'Country',
];

const LASTFM_API_KEY = keys.lastFM.apiKey;
const LASTFM_TOPCHARTS_URL = `http://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=${LASTFM_API_KEY}&limit=10&format=json`;
const LASTFM_TOPTRACKS_URL = `http://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=${LASTFM_API_KEY}&limit=10&format=json`;
const LASTFM_ARTIST_INFO = `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=${LASTFM_API_KEY}&format=json&artist=`;
const LASTFM_ARTIST_INFO_MBID = `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=${LASTFM_API_KEY}&format=json&mbid=`;
const LASTFM_ARTIST_SEARCH = `http://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=${LASTFM_API_KEY}&format=json&artist=`;
const LASTFM_ARTIST_TOP_TRACKS = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=${LASTFM_API_KEY}&limit=10&format=json&artist=`;

const YOUTUBE_API_KEY = keys.youtube.apiKey;

// CHANGE SPACES TO + IN ARTIST NAME FOR ALL API CALLS
const YOUTUBE_PLAYLIST = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&q=`;
const YOUTUBE_PLAYLIST_ITEMS = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${YOUTUBE_API_KEY}&maxResults=50&playlistId=`;
const YOUTUBE_TRACK = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${YOUTUBE_API_KEY}&q=`;
const YOUTUBE_VID_DETAILS = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${YOUTUBE_API_KEY}&id=`;
const SONGKICK_API_KEY = keys.songKick.apiKey;
// const SONGKICK_SEARCH_ARTIST = `https://api.songkick.com/api/3.0/search/artists.json?apikey=${SONGKICK_API_KEY}&query=[ARTIST]`;
const SONGKICK_SEARCH_EVENTS = `https://api.songkick.com/api/3.0/events.json?apikey=${SONGKICK_API_KEY}&per_page=20&artist_name=`;

// get artist info
const MUSICBRAINZ_SEARCH = 'https://musicbrainz.org/ws/2/artist?fmt=json&query=';
// get artist
const MUSICBRAINZ_RELATED_DATA = 'https://musicbrainz.org/ws/2/artist/[ARTIST_ID]?inc=url-rels&fmt=json';

// itunes
const ITUNES_ALBUM = 'https://itunes.apple.com/lookup?entity=album&id='; // ALBUM ID
const ITUNES_ALBUMS = 'https://itunes.apple.com/lookup?entity=album&id='; // ARTIST ID
const ITUNES_SEARCH_ALBUM = 'https://itunes.apple.com/search?entity=album&term=';
const ITUNES_ARTIST_BYID = 'https://itunes.apple.com/lookup?id='; // ARTIST ID
const ITUNES_SEARCH_ARTIST = 'https://itunes.apple.com/search?entity=musicArtist&term=';

module.exports = {
  BASE_URL,
  SONGKICK_API_KEY,
  LASTFM_TOPCHARTS_URL,
  LASTFM_TOPTRACKS_URL,
  LASTFM_ARTIST_INFO,
  LASTFM_ARTIST_INFO_MBID,
  LASTFM_ARTIST_SEARCH,
  LASTFM_ARTIST_TOP_TRACKS,
  SONGKICK_SEARCH_EVENTS,
  YOUTUBE_PLAYLIST,
  YOUTUBE_PLAYLIST_ITEMS,
  YOUTUBE_TRACK,
  YOUTUBE_VID_DETAILS,
  MUSICBRAINZ_SEARCH,
  MUSICBRAINZ_RELATED_DATA,
  ITUNES_ALBUM,
  ITUNES_ALBUMS,
  ITUNES_ARTIST_BYID,
  ITUNES_SEARCH_ARTIST,
  ITUNES_SEARCH_ALBUM,
  MODIFICATION_DATE_OFFSET,
  PLAYLIST_DATE_OFFSET,
  GENRES,
};
