const Knex = require('../../db/knex');

class GameDao {
  static async index() {
    return Knex.select('*').from('games');
  }

  static async getTypes() {
    return Knex.select('*').from('game_types');
  }
}

module.exports = GameDao;
