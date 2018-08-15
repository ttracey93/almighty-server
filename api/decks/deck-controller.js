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
      res.status(403).send(ex.message);
    }
  }

  static async getCards(req, res) {
    try {
      const cards = await DeckDao.getCards(req.params.id);
      res.status(200).json(cards);

      console.log(cards);
    } catch (ex) {
      res.status(403).send(ex.message);
    }
  }

  static async addCard(req, res) {
    try {
      await DeckDao.addCard(req.body);
      res.status(200);
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  }

  static async removeCard(req, res) {
    console.log('remove card', req.body);
  }
}

module.exports = DeckController;
