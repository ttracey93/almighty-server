const DB = require('../../db/knex');

const MAX_SEARCH_LIMIT = 50;

class CardDao {
  static async get(id) {
    return DB.select('*').from('cards').where('id', id);
  }

  static async random(count) {
    const result = await DB.raw(`SELECT * FROM cards ORDER BY RAND() LIMIT ${count}`);
    return result[0];
  }

  static async search(term) {
    const searchTerm = `%${term}%`;

    const result = await DB.select(DB.raw('*, 1 as matched_field')).from('cards')
      .whereRaw(`name like binary '${searchTerm}'`)
      .union(function() {
        this.select(DB.raw('*, 2 as matched_field')).from('cards')
          .where('name', 'like', searchTerm);
      })
      .union(function() {
        this.select(DB.raw('*, 3 as matched_field')).from('cards')
          .whereRaw(`description like binary '${searchTerm}'`);
      })
      .union(function() {
        this.select(DB.raw('*, 4 as matched_field')).from('cards')
          .where('description', 'like', searchTerm);
      })
      .orderBy('matched_field', 'asc')
      .limit(MAX_SEARCH_LIMIT);

    return result;
  }
}

module.exports = CardDao;
