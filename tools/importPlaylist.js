const { PlaylistItem } = require('../models');
const getPlaylistItem = require('./getPlaylistItem');
const { matchArtistId } = require('../utils');

module.exports = () => {
  const module = {};

  module.getPlaylist = async (dbPlaylist, playlistItems, dbArtists) => {
    try {
      const totalItems = playlistItems.length;

      const allItems = [];


      const getItem = async (data, count) => {
        const item = await getPlaylistItem(data);

        // add the artists id to the playlist item
        const updatedItem = matchArtistId(item, dbArtists);
        console.log('----------------------------');
        console.log(`playlist Item ready - song: ${item.playlistItem.songTitle}, id: ${item.playlistItem._id}`);
        allItems.push(updatedItem);

        count += 1;
        if (count < totalItems) {
          return getItem(playlistItems[count], count);
          // setTimeout(() => {
          //   return getItem(playlistItems[count], count);
          // }, 500);
        }

        console.log('--------------------------------');
        console.log('PLAYLIST ITEMS CREATION COMPLETE');
        await module.savePlaylist(dbPlaylist, allItems);
        return {
          status: 'complete',
        };
      };


      return getItem(playlistItems[0], 0);
    } catch (e) {
      return console.log(e);
    }
  };

  module.savePlaylist = async (dbPlaylist, allItems) => {
    try {
      // get the unsaved items
      const unsaved = allItems.filter(i => !i.isSaved);
      // pull the playlist obbject from the parent
      const toArray = unsaved.map(i => i.playlistItem);

      // only insert the ones that are not saved
      await PlaylistItem.insertMany(toArray);

      console.log('--------------------------------');
      console.log('PLAYLIST ITEMS INSERTED');

      // get all the ids from saved and unsaved
      const allIds = allItems.map(i => i.playlistItem._id);


      if (dbPlaylist.items.length > 0) {
        // update playlist record in the db
        const updated = await dbPlaylist.updateOne({ $set: { items: allIds } });
        console.log('--------------------------------');
        console.log('PLAYLIST HAS BEEN UPDATED ', updated._id);
        return updated;
      }
      // add inserted playlist items to object
      dbPlaylist.items = allIds;
      // const nPlaylist = new Playlist(listObj);
      const savedPlaylist = await dbPlaylist.save();
      console.log('--------------------------------');
      console.log('NEW PLAYLIST HAS BEEN SAVED ', savedPlaylist._id);
      console.log(savedPlaylist);
      return savedPlaylist;
    } catch (e) {
      return console.log('error saving playlist');
    }
  };

  return module;
};
