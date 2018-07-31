const CardDao = require('./card-dao');

class CardController {
  static async test(req, res) {
    const response = await CardDao.index();
    res.json(response);
  }

  static async random(req, res) {
    // Return X (20) random cards
    const response = await CardDao.random(20);
    res.json(response);
  }

  static async search(req, res) {
    const response = await CardDao.search(req.body.q);
    res.json(response);
  }
}

module.exports = CardController;
