const Knex = require('../../db/knex');

class DeckDao {
  static async get(id) {
    return Knex.select('*').from('decks').where('id', id);
  }

  static async byUser(uid) {
    return Knex.select('*').from('decks').where('owner', uid);
  }

  static async countByUser(uid) {
    const count = await Knex('decks').count('* as c')
      .where('owner', uid);

    return count[0].c;
  }

  static async create(data) {
    const currentDeckCount = await DeckDao.countByUser(data.uid);

    if (currentDeckCount >= 5) {
      throw new Error('You already have the maximum number of decks');
    }

    const insert = {
      name: data.name,
      description: data.name,
      owner: data.uid,
    };

    return Knex('decks').insert(insert);
  }

  static async getCards(id) {
    return Knex.select('*').from('deck_entries').rightJoin('cards', 'deck_entries.card', 'cards.id')
      .where('deck', id);
  }

  static async addCard(data) {
    return Knex('deck_entries').insert(data);
  }

  static async removeCard(data) {
    // TODO: Remove deck entry where deck/card match data
  }
}

module.exports = DeckDao;
