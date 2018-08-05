const DeckController = require('./deck-controller');

class DeckRouter {
  static init(router) {
    router.get('/decks/:id', DeckController.get);
    router.get('/decks/user/:uid', DeckController.byUser);

    router.post('/decks', DeckController.create);
  }
}

module.exports = DeckRouter;
