const CardController = require('./card-controller');

class CardRouter {
  static init(router) {
    router.get('/cards/random', CardController.random);
    router.get('/cards/:id', CardController.get);
    router.post('/cards/search', CardController.search);
  }
}

module.exports = CardRouter;
