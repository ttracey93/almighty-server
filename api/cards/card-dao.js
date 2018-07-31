const DB = require('../../db/knex');

const MAX_SEARCH_LIMIT = 50;

class CardDao {
  static async index() {
    return DB.select('*').from('cards');
  }

  static async random(count) {
    const result = await DB.raw(`SELECT * FROM cards ORDER BY RAND() LIMIT ${count}`);
    return result[0];
  }

  static async search(term) {
    const searchTerm = `%${term.toLowerCase()}%`;

    const result = await DB.select(DB.raw('*, 1 as matched_field')).from('cards')
      .where('name', 'like', searchTerm)
      .union(function() {
        this.select(DB.raw('*, 2 as matched_field')).from('cards')
          .where('description', 'like', searchTerm);
      })
      .orderBy('matched_field')
      .limit(MAX_SEARCH_LIMIT);

    return result;
  }
}

module.exports = CardDao;
