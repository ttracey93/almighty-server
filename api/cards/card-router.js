const CardController = require('./card-controller');

class CardRouter {
  static init(router) {
    router.get('/cards/random', CardController.random);
    router.post('/cards/search', CardController.search);
  }
}

module.exports = CardRouter;
