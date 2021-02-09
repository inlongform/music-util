require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const keys = require('./config/keys');
const SpotifyWebApi = require('./utils/spotify-node/server');

const db = keys.mongoURI;

const spotifyApi = new SpotifyWebApi({
  clientId: keys.spotify.clientId,
  clientSecret: keys.spotify.clientSecret,
});

const spotifyToken = require('./middleware/spotifyToken')(spotifyApi);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('mongo db connnected');
  })
  .catch(err => console.log(err));

const param = process.argv[2];

// console.log(process.argv)

const importData = require('./tools/importData')(spotifyToken, param);

importData.importItems();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
