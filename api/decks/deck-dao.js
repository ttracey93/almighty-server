const DB = require('../../db/knex');

class DeckDao {
  static async get(id) {
    return DB.select('*').from('decks').where('id', id);
  }
  
  static async byUser(uid) {
    return DB.select('*').from('decks').where('owner', uid);
  }

  static async countByUser(uid) {
    const count = await DB('decks').count('* as c')
      .where('owner', uid);

    return count[0].c;
  }

  static async create(data) {
    const currentDeckCount = await DeckDao.countByUser(data.uid);

    console.log(currentDeckCount);

    if (currentDeckCount >= 5) {
      throw new Error('You already have the maximum number of decks');
    }

    const insert = {
      name: data.name,
      description: data.name,
      owner: data.uid,
    };

    return DB('decks').insert(insert);
  }
}

module.exports = DeckDao;
