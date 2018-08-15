const DeckController = require('./deck-controller');

class DeckRouter {
  static init(router) {
    router.get('/decks/:id', DeckController.get);
    router.get('/decks/user/:uid', DeckController.byUser);
    router.get('/decks/cards/:id', DeckController.getCards);

    router.post('/decks', DeckController.create);
    router.post('/decks/add', DeckController.addCard);
    router.post('/decks/remove', DeckController.removeCard);
  }
}

module.exports = DeckRouter;
