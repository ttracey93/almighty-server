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

  static async create(req, res) {
    try {
      const deck = await DeckDao.create(req.body);
      res.status(201).json(deck);
    } catch (ex) {
      console.log(ex.message);
      res.status(403).send(ex.message);
    }
  }
}

module.exports = DeckController;
