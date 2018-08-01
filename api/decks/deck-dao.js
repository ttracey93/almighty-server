const DB = require('../../db/knex');

class DeckDao {
  static async get(id) {
    return DB.select('*').from('decks').where('id', id);
  }
  
  static async byUser(uid) {
    return DB.select('*').from('decks').where('owner', uid);
  }
}

module.exports = DeckDao;
