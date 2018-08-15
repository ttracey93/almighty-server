const GameDao = require('./game-dao');

class GameController {
  static async index(req, res) {
    const response = await GameDao.index();
    res.json(response);
  }

  static async getTypes(req, res) {
    const response = await GameDao.getTypes();
    res.json(response);
  }
}

module.exports = GameController;
