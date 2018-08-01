const DeckDao = require('./deck-dao');

class DeckController {
  static async get(req, res) {
    const response = await DeckDao.get(req.params.id);
    res.json(response);
  }

  static async byUser(req, res) {
    const response = await DeckDao.byUser(req.params.uid);
    res.json(response);
  }
}

module.exports = DeckController;
